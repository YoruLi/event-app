import React, { useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = React.useState(() => {
    if (window.localStorage.getItem("theme")) return window.localStorage.getItem("theme");

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

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
