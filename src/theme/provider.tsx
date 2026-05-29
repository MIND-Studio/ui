"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps as NextThemesProviderProps,
  useTheme as useNextTheme,
} from "next-themes";
import { createContext, type ReactNode, useContext, useEffect, useMemo } from "react";
import { mind } from "../themes/mind";
import { themeCss } from "./inject";
import type { Theme } from "./schema";

/*
 * The single Mind UI provider. Wraps next-themes for MODE (light/dark/system,
 * persistence, no-flash via the `.dark` class) and adds BRAND on top: it
 * injects the active theme's scoped CSS and sets `[data-mind-theme]` on <html>.
 */

interface MindThemeContextValue {
  theme: Theme;
}

const MindThemeContext = createContext<MindThemeContextValue | null>(null);

export interface ThemeProviderProps extends Omit<NextThemesProviderProps, "children" | "attribute"> {
  /** The active brand theme. Defaults to Mind. */
  theme?: Theme;
  children: ReactNode;
}

export function ThemeProvider({ theme = mind, children, ...nextThemesProps }: ThemeProviderProps) {
  useEffect(() => {
    document.documentElement.setAttribute("data-mind-theme", theme.name);
  }, [theme.name]);

  const css = useMemo(() => themeCss(theme), [theme]);
  const value = useMemo<MindThemeContextValue>(() => ({ theme }), [theme]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...nextThemesProps}
    >
      <style data-mind-theme={theme.name} dangerouslySetInnerHTML={{ __html: css }} />
      <MindThemeContext.Provider value={value}>{children}</MindThemeContext.Provider>
    </NextThemesProvider>
  );
}

export interface UseMindThemeResult {
  /** The active brand theme object. */
  theme: Theme;
  /** Current mode setting: "light" | "dark" | "system". */
  mode: string | undefined;
  /** Set the mode. */
  setMode: (mode: string) => void;
  /** Resolved mode after system detection: "light" | "dark". */
  resolvedMode: string | undefined;
}

export function useMindTheme(): UseMindThemeResult {
  const ctx = useContext(MindThemeContext);
  if (!ctx) {
    throw new Error("useMindTheme() must be called inside a <ThemeProvider>.");
  }
  const { theme: mode, setTheme: setMode, resolvedTheme: resolvedMode } = useNextTheme();
  return { theme: ctx.theme, mode, setMode, resolvedMode };
}
