import "./seo/tracking";
import "./config/platform";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@thesyedfaaiz/ui";
import App from "./App";
import "./styles.css";

try {
  const savedTheme = localStorage.getItem("syedfaaiz-ui-theme");
  const previousTheme = localStorage.getItem("theme");
  if (!savedTheme && (previousTheme === "light" || previousTheme === "dark")) {
    localStorage.setItem("syedfaaiz-ui-theme", previousTheme);
  }
} catch {
  // Storage can be unavailable in private or embedded browsing contexts.
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultThemeId="dark">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
