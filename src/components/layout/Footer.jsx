import styled from "styled-components";
import Container from "../ui/Container";

const Wrap = styled.footer`
  flex-shrink: 0;
  padding: 22px 0;
  color: rgba(255, 255, 255, 0.78);
  background: ${({ theme }) => theme.gradients.dark};
`;

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
  font-size: 14px;
`;

export function Footer() {
  return (
    <Wrap>
      <Inner>
        <strong>EstateVoice</strong>
        <span>Real estate voice conversations, scheduling, and admin summaries.</span>
      </Inner>
    </Wrap>
  );
}

export default Footer;
