export const theme = {
  colors: {
    page: "#f6f1ed",
    ink: "#151417",
    text: "#27242a",
    muted: "#70676d",
    faint: "#a39a9f",
    white: "#ffffff",
    primary: "#426f68",
    primaryDark: "#163b3a",
    moss: "#5d807a",
    amber: "#d09d72",
    copper: "#b66d75",
    plum: "#725c82",
    success: "#3f8b7d",
    warning: "#c4864a",
    glass: "rgba(255, 255, 255, 0.42)",
    glassStrong: "rgba(255, 255, 255, 0.64)",
    border: "rgba(255, 255, 255, 0.72)",
    borderStrong: "rgba(73, 61, 47, 0.16)",
  },
  gradients: {
    brand: "linear-gradient(135deg, #153839 0%, #5a877e 48%, #d39b76 100%)",
    liquid:
      "linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.32) 46%, rgba(247,229,221,0.68) 100%)",
    page:
      "linear-gradient(120deg, #f6f1ed 0%, #e7f0ec 38%, #fbf2ea 72%, #ece8f2 100%)",
    dark: "linear-gradient(135deg, #151417 0%, #213d3d 52%, #5a4357 100%)",
    aurora:
      "radial-gradient(circle at 10% 12%, rgba(87,135,126,0.30), transparent 32%), radial-gradient(circle at 86% 16%, rgba(211,155,118,0.30), transparent 34%), radial-gradient(circle at 76% 84%, rgba(114,92,130,0.22), transparent 30%)",
  },
  shadows: {
    sm: "0 8px 24px rgba(37, 35, 45, 0.08)",
    md: "0 18px 46px rgba(37, 35, 45, 0.12)",
    lg: "0 30px 80px rgba(37, 35, 45, 0.18)",
    glow: "0 20px 52px rgba(66, 111, 104, 0.25)",
    glass:
      "0 18px 60px rgba(37, 35, 45, 0.13), inset 0 1px 0 rgba(255,255,255,0.78)",
  },
  radii: {
    sm: "10px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    pill: "999px",
  },
  fonts: {
    sans: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  layout: {
    maxWidth: "1120px",
    navHeight: "68px",
  },
  breakpoints: {
    sm: "640px",
    md: "820px",
    lg: "1080px",
  },
  transition: "220ms cubic-bezier(0.2, 0.8, 0.2, 1)",
};

export default theme;
