import styled from "styled-components";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  isolation: isolate;
`;

export function Layout({ children, path, navigate, auth, logout }) {
  return (
    <Shell>
      <Navbar path={path} navigate={navigate} auth={auth} logout={logout} />
      <Main>{children}</Main>
      <Footer />
    </Shell>
  );
}

export default Layout;
