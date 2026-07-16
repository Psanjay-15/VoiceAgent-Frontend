import styled from "styled-components";
import Container from "../ui/Container";
import { Icon } from "../ui/Icon";

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  min-height: ${({ theme }) => theme.layout.navHeight};
  display: flex;
  align-items: center;
  background: rgba(246, 244, 239, 0.66);
  border-bottom: 1px solid rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(22px) saturate(180%);
`;

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding-block: 10px;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 900;

  span {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 14px;
    color: #fff;
    background: ${({ theme }) => theme.gradients.brand};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.5);

  a {
    padding: 8px 13px;
    border-radius: ${({ theme }) => theme.radii.pill};
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
    font-weight: 700;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.ink};
    background: rgba(255, 255, 255, 0.72);
  }

  a[aria-current="page"] {
    color: ${({ theme }) => theme.colors.primaryDark};
    background: rgba(255, 255, 255, 0.78);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export function Navbar({ path, navigate }) {
  const go = (event, nextPath) => {
    event.preventDefault();
    navigate(nextPath);
  };

  return (
    <Header>
      <Inner>
        <Brand href="/" onClick={(event) => go(event, "/")}>
          <span>
            <Icon name="activity" size={19} />
          </span>
          EstateVoice
        </Brand>
        <NavLinks aria-label="Primary navigation">
          <a href="/" onClick={(event) => go(event, "/")} aria-current={path === "/" ? "page" : undefined}>
            Home
          </a>
          <a href="/bot" onClick={(event) => go(event, "/bot")} aria-current={path === "/bot" ? "page" : undefined}>
            Bot
          </a>
        </NavLinks>
      </Inner>
    </Header>
  );
}

export default Navbar;
