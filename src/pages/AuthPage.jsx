import { useState } from "react";
import styled from "styled-components";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import GlassPanel from "../components/ui/GlassPanel";
import { Icon } from "../components/ui/Icon";
import { login, signup, toErrorMessage } from "../services/api";

const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 28px 0;
`;

const Shell = styled(Container)`
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 18px;
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Intro = styled(GlassPanel)`
  padding: 28px;
  border-radius: 34px;
  background: ${({ theme }) => theme.gradients.dark};
  color: rgba(255,255,255,0.78);

  h1 {
    margin-top: 18px;
    max-width: 460px;
    color: #fff;
    font-size: clamp(34px, 5vw, 54px);
    font-weight: 850;
  }

  p {
    margin-top: 14px;
    max-width: 480px;
    color: rgba(255,255,255,0.68);
    font-size: 15px;
  }
`;

const Signal = styled.div`
  margin-top: 34px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  span {
    height: 86px;
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.18));
    opacity: 0.84;
  }

  span:nth-child(2) {
    height: 130px;
    align-self: end;
  }

  span:nth-child(3) {
    height: 104px;
    align-self: center;
  }
`;

const Panel = styled(GlassPanel)`
  padding: clamp(20px, 4vw, 34px);
  border-radius: 34px;

  h2 {
    margin-top: 18px;
    font-size: clamp(26px, 4vw, 36px);
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
  }
`;

const Form = styled.form`
  margin-top: 24px;
  display: grid;
  gap: 13px;

  label {
    display: grid;
    gap: 7px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
    font-weight: 800;
  }

  input {
    width: 100%;
    padding: 14px;
    border: 1px solid rgba(255,255,255,0.72);
    border-radius: 18px;
    outline: none;
    background: rgba(255,255,255,0.52);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.64);
  }

  input:focus {
    border-color: rgba(103,115,91,0.5);
  }

  .switch {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
    text-align: center;
  }

  .switch button {
    color: ${({ theme }) => theme.colors.primaryDark};
    background: transparent;
    font-weight: 900;
    cursor: pointer;
  }
`;

const Error = styled.div`
  padding: 11px 12px;
  border-radius: 15px;
  background: rgba(167, 104, 77, 0.12);
  color: ${({ theme }) => theme.colors.copper};
  font-size: 13px;
  font-weight: 800;
`;

export function AuthPage({ mode, setAuth, navigate }) {
  const isSignup = mode === "signup";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = isSignup ? await signup(form) : await login(form);
      setAuth(response);
      navigate("/");
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Shell>
        <Intro>
          <Badge>
            <Icon name="activity" size={15} /> EstateVoice
          </Badge>
          <h1>Sign in before the agent starts listening.</h1>
          <p>
            Your account email becomes the verified meeting email, so the voice
            agent can schedule online meetings without asking you to repeat it.
          </p>
          <Signal aria-hidden="true">
            <span />
            <span />
            <span />
          </Signal>
        </Intro>

        <Panel>
          <Badge>
            <Icon name="users" size={15} /> {isSignup ? "Create account" : "Welcome back"}
          </Badge>
          <h2>{isSignup ? "Create your account" : "Login to continue"}</h2>
          <p>
            After this, you will land on the main page and can open the voice bot.
          </p>
          <Form onSubmit={submit}>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={update}
                placeholder={isSignup ? "Minimum 8 characters" : "Your password"}
                minLength={isSignup ? 8 : 1}
                required
              />
            </label>
            {error && <Error>{error}</Error>}
            <Button type="submit" disabled={loading} $size="lg">
              {loading ? "Please wait..." : isSignup ? "Create account" : "Login"}
            </Button>
            <div className="switch">
              {isSignup ? "Already have an account?" : "New here?"}{" "}
              <button
                type="button"
                onClick={() => navigate(isSignup ? "/login" : "/signup")}
              >
                {isSignup ? "Login" : "Create account"}
              </button>
            </div>
          </Form>
        </Panel>
      </Shell>
    </Page>
  );
}

export default AuthPage;
