export const theme = {
  colors: {
    page: "#f3f1eb",
    ink: "#151612",
    text: "#24251f",
    muted: "#696b60",
    faint: "#9a9b90",
    white: "#ffffff",
    primary: "#67735b",
    primaryDark: "#343a2e",
    moss: "#738465",
    amber: "#c29b62",
    copper: "#a7684d",
    plum: "#6c6370",
    success: "#5f8f68",
    warning: "#b9823f",
    glass: "rgba(255, 255, 255, 0.42)",
    glassStrong: "rgba(255, 255, 255, 0.64)",
    border: "rgba(255, 255, 255, 0.72)",
    borderStrong: "rgba(73, 61, 47, 0.16)",
  },
  gradients: {
    brand: "linear-gradient(135deg, #2f352a 0%, #758466 52%, #c29b62 100%)",
    liquid:
      "linear-gradient(135deg, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0.34) 46%, rgba(239,236,226,0.70) 100%)",
    page:
      "linear-gradient(120deg, #f3f1eb 0%, #e6e5dd 42%, #f5f1e9 72%, #e1e4da 100%)",
    dark: "linear-gradient(135deg, #151612 0%, #2c3026 52%, #4b4130 100%)",
    aurora:
      "radial-gradient(circle at 12% 10%, rgba(194,155,98,0.34), transparent 30%), radial-gradient(circle at 88% 14%, rgba(115,132,101,0.34), transparent 34%), radial-gradient(circle at 78% 84%, rgba(167,104,77,0.20), transparent 28%)",
  },
  shadows: {
    sm: "0 8px 24px rgba(54, 43, 31, 0.08)",
    md: "0 18px 46px rgba(54, 43, 31, 0.12)",
    lg: "0 30px 80px rgba(54, 43, 31, 0.18)",
    glow: "0 20px 52px rgba(103, 115, 91, 0.24)",
    glass:
      "0 18px 60px rgba(54, 43, 31, 0.13), inset 0 1px 0 rgba(255,255,255,0.76)",
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
