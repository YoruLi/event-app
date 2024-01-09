import React, { useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = React.useState(() =>
    window.localStorage.getItem("theme")
      ? window.localStorage.getItem("theme")
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  useEffect(() => {
    if (theme) {
      document.querySelector("html")?.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return {
    theme,
    setTheme,
  };
};
