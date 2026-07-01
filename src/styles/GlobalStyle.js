import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #root {
    min-height: 100%;
  }

  #root {
    min-height: 100vh;
  }

  html {
    min-width: 320px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    overflow-x: hidden;
    font-family: ${({ theme }) => theme.fonts.sans};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.gradients.page};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -2;
    pointer-events: none;
    background: ${({ theme }) => theme.gradients.aurora};
  }

  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: 0.14;
    background-image:
      linear-gradient(rgba(37,32,25,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,32,25,0.08) 1px, transparent 1px);
    background-size: 52px 52px;
    mask-image: linear-gradient(to bottom, black, transparent 74%);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, textarea {
    font: inherit;
    color: inherit;
  }

  button {
    border: 0;
  }

  img {
    display: block;
    max-width: 100%;
  }

  h1, h2, h3 {
    color: ${({ theme }) => theme.colors.ink};
    line-height: 1.05;
    letter-spacing: 0;
  }

  p {
    line-height: 1.65;
    overflow-wrap: anywhere;
  }

  ::selection {
    color: #fff;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export default GlobalStyle;
