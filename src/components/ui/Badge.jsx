import styled from "styled-components";

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 7px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.primaryDark};
  background: rgba(255, 255, 255, 0.62);
  font-size: 13px;
  font-weight: 800;
  backdrop-filter: blur(16px);
`;

export default Badge;
