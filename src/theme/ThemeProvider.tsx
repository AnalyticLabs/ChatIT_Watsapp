// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { COLORS } from "../utils/constants";

type ThemeMode = "light" | "dark" | "system";

interface ThemeColors {
  primary: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  card: string;
  border: string;
  success: string;
  error: string;
  green:string
}

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  resolvedTheme: "light" | "dark";
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "system",
  setMode: () => { },
  resolvedTheme: "light",
  colors: {
    // primary: "#8A2BE2",
    // primary: "#3C0E66",
    primary: "#0098FF",
    background: "#FFFFFF",
    // textPrimary: "#000000",
    // textPrimary: '#3C0E66',
    textPrimary: '#0098FF',
    textSecondary: "#000000",
    card: "#F6F6F6",
    border: "#E5E5E5",
    success: "#34C759",
    error: "#FF3B30",
    green:'#25D366'
  },
  toggleTheme: () => { },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    Appearance.getColorScheme() || "light"
  );

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme || "light");
    });
    return () => listener.remove();
  }, []);

  const resolvedTheme = mode === "system" ? systemTheme : mode;

  const lightColors: ThemeColors = {
    primary: "#25D366", // WhatsApp green
    background: "#FFFFFF",
    textPrimary: "#000000",
    textSecondary: "#666666",
    card: "#F2F2F2",
    border: "#E5E5E5",
    success: "#34C759",
    error: "#FF3B30",
    green:'#25D366'
  };

  const darkColors: ThemeColors = {
    primary: "#25D366",
    background: "#0B141A",
    textPrimary: "#EDEDED",
    textSecondary: "#999999",
    card: "#1F2C34",
    border: "#263238",
    success: "#34C759",
    error: "#FF453A",
    green:'#25D366'
  };

  const colors = resolvedTheme === "dark" ? darkColors : lightColors;

  const toggleTheme = () => {
    if (mode === "light") setMode("dark");
    else if (mode === "dark") setMode("light");
    else setMode(systemTheme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, resolvedTheme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
