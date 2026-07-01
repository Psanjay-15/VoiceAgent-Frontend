import { useCallback, useEffect, useRef, useState } from "react";

const SAMPLE_RATE = 24000;
const RECORDER_TIMESLICE_MS = Number(import.meta.env.VITE_RECORDER_TIMESLICE_MS || 120);

function apiBaseToWsUrl(apiBaseUrl) {
  if (!apiBaseUrl) return "";
  const url = new URL(apiBaseUrl, window.location.origin);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = "/ws";
  url.search = "";
  url.hash = "";
  return url.toString();
}

function normalizeWsUrl(wsUrl) {
  if (!wsUrl) return "";
  const url = new URL(wsUrl, window.location.origin);
  url.protocol = url.protocol === "https:" ? "wss:" : url.protocol;
  url.protocol = url.protocol === "http:" ? "ws:" : url.protocol;
  if (!url.pathname || url.pathname === "/") {
    url.pathname = "/ws";
  }
  return url.toString();
}

function getWsUrl(token) {
  const baseUrl =
    normalizeWsUrl(import.meta.env.VITE_WS_URL) ||
    apiBaseToWsUrl(import.meta.env.VITE_API_BASE_URL) ||
    (() => {
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      return `${protocol}://${window.location.host}/ws`;
    })();
  if (!token) return baseUrl;
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}token=${encodeURIComponent(token)}`;
}

function appendToken(turns, token) {
  const last = turns[turns.length - 1];
  if (last?.role === "assistant" && last.streaming) {
    return [...turns.slice(0, -1), { ...last, text: last.text + token }];
  }
  return [...turns, { role: "assistant", text: token, streaming: true }];
}

function finalizeAssistant(turns) {
  const last = turns[turns.length - 1];
  if (last?.role === "assistant") {
    return [...turns.slice(0, -1), { ...last, streaming: false }];
  }
  return turns;
}

function mergeTranscript(turns, text, isFinal) {
  const finalText = text.trim();
  if (!finalText) return turns;
  const last = turns[turns.length - 1];
  if (!isFinal) {
    if (last?.role === "user" && last.live) {
      return [...turns.slice(0, -1), { role: "user", text: finalText, live: true }];
    }
    return [...turns, { role: "user", text: finalText, live: true }];
  }
  if (last?.role === "user" && last.live) {
    return [...turns.slice(0, -1), { role: "user", text: finalText, live: false }];
  }
  return [...turns, { role: "user", text: finalText, live: false }];
}

async function playLinear16(arrayBuffer, audioContextRef, nextStartRef, activeSourcesRef) {
  const context =
    audioContextRef.current ||
    new (window.AudioContext || window.webkitAudioContext)({ sampleRate: SAMPLE_RATE });
  audioContextRef.current = context;
  if (context.state === "suspended") await context.resume();

  const int16 = new Int16Array(arrayBuffer);
  const audioBuffer = context.createBuffer(1, int16.length, SAMPLE_RATE);
  const channel = audioBuffer.getChannelData(0);
  for (let index = 0; index < int16.length; index += 1) {
    channel[index] = int16[index] / 32768;
  }

  const source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(context.destination);
  activeSourcesRef.current.add(source);
  source.onended = () => activeSourcesRef.current.delete(source);

  const startAt = Math.max(context.currentTime + 0.02, nextStartRef.current);
  source.start(startAt);
  nextStartRef.current = startAt + audioBuffer.duration;
}

function stopQueuedAudio(audioContextRef, nextStartRef, activeSourcesRef) {
  activeSourcesRef.current.forEach((source) => {
    try {
      source.stop();
    } catch {
      // Source may already have ended.
    }
  });
  activeSourcesRef.current.clear();
  nextStartRef.current = audioContextRef.current?.currentTime || 0;
}

export function useVoiceAgent(token) {
  const [status, setStatus] = useState("idle");
  const [turns, setTurns] = useState([
    { role: "assistant", text: "Click on Start talking." },
  ]);
  const [error, setError] = useState("");
  const [latency, setLatency] = useState({
    state: "idle",
    firstTextMs: null,
    firstAudioMs: null,
  });

  const wsRef = useRef(null);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioContextRef = useRef(null);
  const nextStartRef = useRef(0);
  const activeSourcesRef = useRef(new Set());
  const statusRef = useRef("idle");
  const interruptSentRef = useRef(false);
  const awaitingResponseSinceRef = useRef(null);
  const textLatencyCapturedRef = useRef(false);
  const audioLatencyCapturedRef = useRef(false);

  const markUserFinished = useCallback(() => {
    awaitingResponseSinceRef.current = performance.now();
    textLatencyCapturedRef.current = false;
    audioLatencyCapturedRef.current = false;
    setLatency({
      state: "waiting",
      firstTextMs: null,
      firstAudioMs: null,
    });
  }, []);

  const captureFirstTextLatency = useCallback(() => {
    if (!awaitingResponseSinceRef.current || textLatencyCapturedRef.current) return;
    textLatencyCapturedRef.current = true;
    const firstTextMs = performance.now() - awaitingResponseSinceRef.current;
    setLatency((current) => ({
      ...current,
      state: current.firstAudioMs == null ? "text_received" : "spoken",
      firstTextMs,
    }));
  }, []);

  const captureFirstAudioLatency = useCallback(() => {
    if (!awaitingResponseSinceRef.current || audioLatencyCapturedRef.current) return;
    audioLatencyCapturedRef.current = true;
    const firstAudioMs = performance.now() - awaitingResponseSinceRef.current;
    setLatency((current) => ({
      ...current,
      state: "spoken",
      firstAudioMs,
    }));
  }, []);

  const stop = useCallback(() => {
    stopQueuedAudio(audioContextRef, nextStartRef, activeSourcesRef);
    recorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "stop" }));
      wsRef.current.close();
    }
    recorderRef.current = null;
    streamRef.current = null;
    wsRef.current = null;
    setStatus("idle");
    statusRef.current = "idle";
  }, []);

  const updateStatus = useCallback((nextStatus) => {
    statusRef.current = nextStatus;
    setStatus(nextStatus);
  }, []);

  const interruptAssistant = useCallback(() => {
    if (interruptSentRef.current || statusRef.current !== "speaking") return;
    interruptSentRef.current = true;
    stopQueuedAudio(audioContextRef, nextStartRef, activeSourcesRef);
    setTurns(finalizeAssistant);
    updateStatus("listening");
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "interrupt" }));
    }
  }, [updateStatus]);

  const start = useCallback(async () => {
    setError("");
    updateStatus("connecting");
    try {
      const ws = new WebSocket(getWsUrl(token));
      ws.binaryType = "arraybuffer";
      wsRef.current = ws;

      ws.onopen = async () => {
        updateStatus("listening");
        ws.send(JSON.stringify({ type: "start" }));
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        streamRef.current = stream;
        const recorder = new MediaRecorder(stream);
        recorderRef.current = recorder;
        recorder.ondataavailable = async (event) => {
          if (event.data.size && ws.readyState === WebSocket.OPEN) {
            ws.send(await event.data.arrayBuffer());
          }
        };
        recorder.start(RECORDER_TIMESLICE_MS);
      };

      ws.onmessage = async (event) => {
        if (typeof event.data === "string") {
          const payload = JSON.parse(event.data);
          if (payload.type === "transcript") {
            if (payload.text?.trim()) interruptAssistant();
            setTurns((current) => mergeTranscript(current, payload.text, payload.is_final));
            if (payload.is_final && payload.text?.trim()) markUserFinished();
          }
          if (payload.type === "llm_start" && awaitingResponseSinceRef.current) {
            setLatency((current) => ({ ...current, state: "thinking" }));
          }
          if (payload.type === "llm_start") {
            interruptSentRef.current = false;
          }
          if (payload.type === "llm") {
            captureFirstTextLatency();
            updateStatus("speaking");
            setTurns((current) => appendToken(current, payload.text));
          }
          if (payload.type === "llm_end") {
            updateStatus("listening");
            setTurns(finalizeAssistant);
          }
          if (payload.type === "llm_interrupted") {
            stopQueuedAudio(audioContextRef, nextStartRef, activeSourcesRef);
            updateStatus("listening");
            setTurns(finalizeAssistant);
          }
          return;
        }
        captureFirstAudioLatency();
        await playLinear16(event.data, audioContextRef, nextStartRef, activeSourcesRef);
      };

      ws.onclose = () => {
        stopQueuedAudio(audioContextRef, nextStartRef, activeSourcesRef);
        recorderRef.current?.stop();
        streamRef.current?.getTracks().forEach((track) => track.stop());
        updateStatus("idle");
      };

      ws.onerror = () => {
        setError(`Could not connect to the voice server at ${getWsUrl(token).split("?")[0]}.`);
        stop();
      };
    } catch (err) {
      setError(err?.message || "Microphone permission or connection failed.");
      stop();
    }
  }, [
    captureFirstAudioLatency,
    captureFirstTextLatency,
    interruptAssistant,
    markUserFinished,
    stop,
    token,
    updateStatus,
  ]);

  useEffect(() => stop, [stop]);

  return { status, turns, error, latency, start, stop, isActive: status !== "idle" };
}

export default useVoiceAgent;
