import { useEffect, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./pages/LandingPage";
import { BotPage } from "./pages/BotPage";
// import { AuthPage } from "./pages/AuthPage";

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

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
    page = <BotPage />;
  } else {
    page = <LandingPage navigate={navigate} />;
  }

  return (
    <Layout path={path} navigate={navigate}>
      {page}
    </Layout>
  );
}
