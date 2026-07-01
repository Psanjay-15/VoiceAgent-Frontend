import styled from "styled-components";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { Icon } from "../components/ui/Icon";

const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(28px, 6vh, 60px) 0;
`;

const Hero = styled(Container)`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);
  gap: clamp(28px, 5vw, 70px);
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    inset: -30px 35% auto -18px;
    height: 260px;
    pointer-events: none;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(255,255,255,0.64), transparent 68%);
    filter: blur(18px);
    opacity: 0.9;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Intro = styled.section`
  position: relative;
  z-index: 1;
  max-width: 730px;

  h1 {
    margin-top: 20px;
    max-width: 700px;
    font-size: clamp(42px, 6vw, 76px);
    font-weight: 900;
    line-height: 0.96;
  }

  p {
    margin-top: 20px;
    max-width: 610px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: clamp(16px, 1.8vw, 19px);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const HeroMeta = styled.div`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 34px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  font-weight: 850;

  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  i {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.success};
    box-shadow: 0 0 0 6px rgba(95, 143, 104, 0.12);
  }
`;

const Console = styled.aside`
  position: relative;
  z-index: 1;
  min-height: 520px;
  padding: 22px;
  border-radius: 44px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.78);
  background:
    linear-gradient(145deg, rgba(255,255,255,0.72), rgba(255,255,255,0.24)),
    radial-gradient(circle at 25% 16%, rgba(194,155,98,0.18), transparent 34%),
    radial-gradient(circle at 88% 76%, rgba(103,115,91,0.20), transparent 34%);
  box-shadow:
    0 30px 90px rgba(54, 43, 31, 0.16),
    inset 0 1px 0 rgba(255,255,255,0.88);
  backdrop-filter: blur(34px) saturate(170%);

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: inherit;
    pointer-events: none;
    border: 1px solid rgba(255,255,255,0.46);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 460px;
    border-radius: 34px;
  }
`;

const ConsoleTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  font-weight: 850;
`;

const Orb = styled.div`
  width: min(300px, 76vw);
  aspect-ratio: 1;
  margin: 48px auto 34px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: #fff;
  background:
    radial-gradient(circle at 32% 26%, rgba(255,255,255,0.88), transparent 14%),
    radial-gradient(circle at 54% 40%, rgba(194,155,98,0.76), transparent 30%),
    linear-gradient(135deg, #22271f, #6f8063 52%, #c29b62);
  box-shadow:
    0 34px 100px rgba(103, 115, 91, 0.32),
    inset 0 12px 30px rgba(255,255,255,0.20),
    inset 0 -18px 42px rgba(0,0,0,0.22);

  svg {
    filter: drop-shadow(0 12px 24px rgba(0,0,0,0.22));
  }
`;

const LiveLine = styled.div`
  display: grid;
  gap: 10px;
  padding: 18px;
  border-radius: 28px;
  background: rgba(255,255,255,0.46);
  border: 1px solid rgba(255,255,255,0.64);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: ${({ theme }) => theme.colors.ink};
    font-weight: 900;
  }

  .email {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
    font-weight: 800;
    overflow-wrap: anywhere;
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.primaryDark};
    font-size: 12px;
    font-weight: 900;
  }
`;

const CapabilityRail = styled(Container)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(18px, 3vw, 44px);
  margin-top: clamp(34px, 6vh, 64px);
  padding-top: 22px;
  border-top: 1px solid rgba(73, 61, 47, 0.14);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const Capability = styled.div`
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 14px;
  align-items: start;

  .icon {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    color: ${({ theme }) => theme.colors.primaryDark};
    background: rgba(255,255,255,0.62);
    border: 1px solid rgba(255,255,255,0.78);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  h3 {
    font-size: 18px;
  }

  p {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
  }
`;

const steps = [
  ["zap", "Low latency voice", "Streams speech, LLM text, and audio in small chunks so replies begin quickly."],
  ["calendar", "Meet scheduling", "Schedules Google Calendar meetings with the admin and sends Google Meet invites."],
  ["cpu", "LLM-based information", "Understands real estate and renovation queries, then responds with useful next steps."],
];

export function LandingPage({ auth, navigate }) {
  return (
    <Page>
      <Hero>
        <Intro>
          <Badge>
            <Icon name="home" size={15} /> Dashboard
          </Badge>
          <h1>Real estate conversations that act.</h1>
          <p>
            Qualify buyers, capture renovation needs, schedule Google Meet
            calls, and send clean admin summaries from a real-time voice flow.
          </p>
          <Actions>
            <Button onClick={() => navigate("/bot")} $size="lg">
              Open bot <Icon name="arrowRight" size={17} />
            </Button>
          </Actions>

          {/* <HeroMeta>
            <span><i /> Low latency replies</span>
            <span><i /> Google Meet scheduling</span>
            <span><i /> LLM-guided information</span>
          </HeroMeta> */}
        </Intro>

        <Console aria-label="Voice agent status">
          <ConsoleTop>
            <span>EstateVoice live console</span>
            <Icon name="activity" size={18} />
          </ConsoleTop>
          <Orb>
            <Icon name="mic" size={58} />
          </Orb>
          {/* <LiveLine>
            <div className="row">
              <span>Signed in</span>
              <span className="status"><Icon name="shield" size={14} /> verified</span>
            </div>
            <span className="email">{auth?.user?.email}</span>
          </LiveLine> */}
        </Console>
      </Hero>

      <CapabilityRail>
        {steps.map(([icon, title, text]) => (
          <Capability key={title}>
            <span className="icon">
              <Icon name={icon} size={19} />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </Capability>
        ))}
      </CapabilityRail>
    </Page>
  );
}

export default LandingPage;
