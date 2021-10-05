import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "../contexts/ThemeContext";

export default function Layout({ startingTheme, children }) {
  return (
    <ThemeProvider>
      <LayoutNoThemeProvider>{children}</LayoutNoThemeProvider>
    </ThemeProvider>
  );
}

function LayoutNoThemeProvider({ children }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme === "light" ? "container light" : "container dark"}>
      {children}
    </div>
  );
}
