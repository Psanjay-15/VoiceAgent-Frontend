import styled, { css } from "styled-components";

const variants = {
  primary: css`
    color: #fff;
    background: ${({ theme }) => theme.gradients.brand};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  `,
  secondary: css`
    color: ${({ theme }) => theme.colors.ink};
    background: rgba(255, 255, 255, 0.68);
    border-color: ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    backdrop-filter: blur(18px) saturate(165%);
  `,
};

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 42px;
  padding: ${({ $size }) => ($size === "lg" ? "13px 20px" : "10px 16px")};
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transition},
    box-shadow ${({ theme }) => theme.transition},
    border-color ${({ theme }) => theme.transition};

  ${({ $variant = "primary" }) => variants[$variant]}

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(121, 96, 62, 0.34);
  }

  &:disabled {
    opacity: 0.58;
    cursor: not-allowed;
    transform: none;
  }
`;

export default Button;
