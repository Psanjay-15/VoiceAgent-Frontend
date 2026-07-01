import { useEffect, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./pages/LandingPage";
import { BotPage } from "./pages/BotPage";
import { AuthPage } from "./pages/AuthPage";

function loadStoredAuth() {
  try {
    const raw = localStorage.getItem("voice-agent-auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem("voice-agent-auth");
    return null;
  }
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [auth, setAuthState] = useState(loadStoredAuth);

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

  const setAuth = (value) => {
    setAuthState(value);
    if (value) {
      localStorage.setItem("voice-agent-auth", JSON.stringify(value));
    } else {
      localStorage.removeItem("voice-agent-auth");
    }
  };

  const logout = () => {
    setAuth(null);
    navigate("/login");
  };

  let page;
  if (!auth) {
    page = (
      <AuthPage
        mode={path === "/signup" ? "signup" : "login"}
        setAuth={setAuth}
        navigate={navigate}
      />
    );
  } else if (path === "/bot") {
    page = <BotPage auth={auth} navigate={navigate} logout={logout} />;
  } else if (path === "/login") {
    page = <LandingPage auth={auth} navigate={navigate} />;
  } else if (path === "/signup") {
    page = <LandingPage auth={auth} navigate={navigate} />;
  } else {
    page = <LandingPage auth={auth} navigate={navigate} />;
  }

  return (
    <Layout path={path} navigate={navigate} auth={auth} logout={logout}>
      {page}
    </Layout>
  );
}
