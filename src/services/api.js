import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 30000,
});

export async function sendLead(payload) {
  const { data } = await api.post("/api/v1/leads", payload);
  return data;
}

export async function signup(payload) {
  const { data } = await api.post("/api/v1/auth/signup", payload);
  return data;
}

export async function login(payload) {
  const { data } = await api.post("/api/v1/auth/login", payload);
  return data;
}

export function toErrorMessage(error) {
  const detail = error?.response?.data?.detail || error?.response?.data?.error;
  return detail ? String(detail) : error?.message || "Something went wrong.";
}
