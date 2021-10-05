import { useState } from "react";

function useTheme(startingTheme = "light") {
  const [theme, setTheme] = useState(startingTheme);

  function checkTheme(themeValue) {
    if (themeValue === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return {
    theme,
    setTheme: checkTheme,
  };
}

export default useTheme;
