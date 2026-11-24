import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ThemeValue {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeValue>({ isDark: true, toggleTheme: () => {} });

const readInitial = (): boolean => {
  try {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
  } catch {
    /* storage unavailable */
  }
  // Dark is the signature look; only fall back to light when nothing is stored
  // and the visitor explicitly prefers light.
  return !window.matchMedia("(prefers-color-scheme: light)").matches;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(readInitial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

/** Colours the WebGL scenes use, kept in sync with the CSS tokens. */
// eslint-disable-next-line react-refresh/only-export-components
export const scenePalette = (isDark: boolean) =>
  isDark
    ? {
        accent: "#fd6f00",
        accent2: "#ffa726",
        pink: "#f472b6",
        sky: "#38bdf8",
        amber: "#fbbf24",
        ink: "#f5f4f2",
        muted: "#a3a09c",
        body: "#232327",
        desk: "#2b2622",
        floor: "#111113",
        line: "#fd6f00",
      }
    : {
        accent: "#ea580c",
        accent2: "#d97706",
        pink: "#db2777",
        sky: "#0284c7",
        amber: "#d97706",
        ink: "#161412",
        muted: "#68625c",
        body: "#2e2b29",
        desk: "#d9cdbb",
        floor: "#f2ede6",
        line: "#ea580c",
      };
