import { useEffect, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./pages/LandingPage";
import { BotPage } from "./pages/BotPage";
// import { AuthPage } from "./pages/AuthPage";

function loadStoredEmail() {
  try {
    return localStorage.getItem("voice-agent-email") || "";
  } catch {
    return "";
  }
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [email, setEmailState] = useState(loadStoredEmail);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath) => {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setEmail = (value) => {
    const normalized = value.trim().toLowerCase();
    setEmailState(normalized);
    try {
      if (normalized) {
        localStorage.setItem("voice-agent-email", normalized);
      } else {
        localStorage.removeItem("voice-agent-email");
      }
    } catch {
      // Browser storage may be unavailable in strict/private contexts.
    }
  };

  const logout = () => {
    setEmail("");
    navigate("/");
  };

  const auth = email ? { access_token: null, user: { email } } : null;
  let page;
  /*
  Login/register flow kept for later use:
  if (!auth) {
    page = (
      <AuthPage
        mode={path === "/signup" ? "signup" : "login"}
        setAuth={setAuth}
        navigate={navigate}
      />
    );
  }
  */
  if (path === "/bot") {
    page = <BotPage auth={auth} navigate={navigate} logout={logout} />;
  } else {
    page = <LandingPage auth={auth} navigate={navigate} setEmail={setEmail} />;
  }

  return (
    <Layout path={path} navigate={navigate} auth={auth} logout={logout}>
      {page}
    </Layout>
  );
}
