"use client";
import { useEffect, useState } from "react";
import { themes, ThemeName } from "./themes";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>("light");

  useEffect(() => {
    const saved = localStorage.getItem("um-theme") as ThemeName | null;
    if (saved && themes[saved]) setThemeState(saved);
  }, []);

  useEffect(() => {
    const vars = themes[theme].vars;
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.setAttribute("data-theme", theme);
    localStorage.setItem("um-theme", theme);
  }, [theme]);

  const setTheme = (t: ThemeName) => setThemeState(t);
  return { theme, setTheme };
}
