import styled from "styled-components";

const GlassPanel = styled.div`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.gradients.liquid};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme, $radius }) => $radius || theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.glass};
  backdrop-filter: blur(30px) saturate(180%);

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    pointer-events: none;
    border-radius: inherit;
    border: 1px solid rgba(255, 255, 255, 0.48);
  }
`;

export default GlassPanel;
