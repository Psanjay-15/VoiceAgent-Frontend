import styled from "styled-components";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import GlassPanel from "../components/ui/GlassPanel";
import { Icon } from "../components/ui/Icon";
import { useVoiceAgent } from "../hooks/useVoiceAgent";

const Page = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  padding: 16px 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    overflow: hidden;
  }
`;

const Shell = styled(Container)`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 18px;
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Side = styled(GlassPanel)`
  padding: 24px;
  border-radius: 32px;
  min-height: 0;
  overflow: auto;

  h1 {
    font-size: 26px;
    margin: 18px 0 10px;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
  }
`;

const ChatPanel = styled(GlassPanel)`
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  border-radius: 34px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 620px;
  }
`;

const ChatTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.55);

  h2 {
    font-size: 22px;
  }

  span {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
    font-weight: 800;
  }
`;

const Transcript = styled.div`
  min-height: 0;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

const Bubble = styled.div`
  width: fit-content;
  max-width: min(680px, 88%);
  align-self: ${({ $role }) => ($role === "user" ? "flex-end" : "flex-start")};
  padding: 13px 15px;
  border-radius: ${({ $role }) =>
    $role === "user" ? "20px 20px 6px 20px" : "20px 20px 20px 6px"};
  color: ${({ $role, theme }) => ($role === "user" ? "#fff" : theme.colors.text)};
  background: ${({ $role, theme }) =>
    $role === "user" ? theme.gradients.brand : "rgba(255,255,255,0.62)"};
  border: 1px solid rgba(255,255,255,0.54);
  box-shadow: ${({ theme }) => theme.shadows.sm};
  font-size: 14px;

  small {
    display: block;
    margin-top: 5px;
    opacity: 0.66;
    font-size: 11px;
    font-weight: 800;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  padding: 18px 20px;
  border-top: 1px solid rgba(255,255,255,0.55);

  .hint {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
  }
`;

const Error = styled.p`
  margin-top: 14px;
  color: ${({ theme }) => theme.colors.copper};
  font-weight: 800;
  font-size: 13px;
`;

export function BotPage() {
  const { status, turns, error, start, stop, isActive } = useVoiceAgent();

  return (
    <Page>
      <Shell>
        <Side>
          <Badge>
            <Icon name="message" size={15} /> Conversation page
          </Badge>
          <h1>Talk to the real estate agent.</h1>
          <p>
            Meeting invites and admin follow-ups are handled automatically.
          </p>
          {error && <Error>{error}</Error>}
        </Side>

        <ChatPanel>
          <ChatTop>
            <div>
              <h2>Voice bot</h2>
              <span>{isActive ? "Session running" : "Session idle"}</span>
            </div>
            <Badge>{status}</Badge>
          </ChatTop>

          <Transcript>
            {turns.map((turn, index) => (
              <Bubble key={`${turn.role}-${index}`} $role={turn.role}>
                {turn.text}
                {turn.live && <small>listening...</small>}
                {turn.streaming && <small>speaking...</small>}
              </Bubble>
            ))}
          </Transcript>

          <Controls>
            {/* <span className="hint">
              Try: “Schedule a meeting with admin on July 2 at 11 AM.”
            </span> */}
            {isActive ? (
              <Button onClick={stop} $variant="secondary">
                <Icon name="stop" size={16} /> Stop
              </Button>
            ) : (
              <Button onClick={start}>
                <Icon name="mic" size={16} /> Start talking
              </Button>
            )}
          </Controls>
        </ChatPanel>
      </Shell>
    </Page>
  );
}

export default BotPage;
