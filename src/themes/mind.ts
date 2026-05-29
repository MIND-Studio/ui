import type { CompleteAliasMap } from "../tokens/aliases";
import { parseTheme, type Theme } from "../theme/schema";
import { assets } from "./assets";

/*
 * Mind — the default brand. Its alias maps are COMPLETE (every token present):
 * they populate the unscoped `:root` / `.dark` base, so "just use Mind" is
 * server-rendered with zero client JS. Structural tokens reference the base
 * grayscale ramp (`var(--mind-gray-*)`); brand colors are OKLCH literals.
 *
 * Demo brands (see ./index.ts) ship only the tokens they change and inherit the
 * rest from this map. Color values were chosen to clear WCAG AA (≥4.5:1) on
 * every required pair in both modes — enforced by tests/contrast.test.ts.
 */

export const mindLight: CompleteAliasMap = {
  background: "var(--mind-white)",
  foreground: "var(--mind-gray-950)",
  card: "var(--mind-white)",
  "card-foreground": "var(--mind-gray-950)",
  popover: "var(--mind-white)",
  "popover-foreground": "var(--mind-gray-950)",
  primary: "oklch(0.48 0.2 285)",
  "primary-foreground": "var(--mind-gray-50)",
  secondary: "var(--mind-gray-100)",
  "secondary-foreground": "var(--mind-gray-900)",
  muted: "var(--mind-gray-100)",
  "muted-foreground": "var(--mind-gray-600)",
  accent: "var(--mind-gray-100)",
  "accent-foreground": "var(--mind-gray-900)",
  destructive: "oklch(0.505 0.19 27.3)",
  "destructive-foreground": "var(--mind-gray-50)",
  border: "var(--mind-gray-200)",
  input: "var(--mind-gray-200)",
  ring: "oklch(0.48 0.2 285)",
  "chart-1": "oklch(0.55 0.2 285)",
  "chart-2": "oklch(0.6 0.118 184.704)",
  "chart-3": "oklch(0.5 0.16 230)",
  "chart-4": "oklch(0.62 0.18 50)",
  "chart-5": "oklch(0.58 0.2 340)",
  sidebar: "var(--mind-gray-50)",
  "sidebar-foreground": "var(--mind-gray-950)",
  "sidebar-primary": "oklch(0.48 0.2 285)",
  "sidebar-primary-foreground": "var(--mind-gray-50)",
  "sidebar-accent": "var(--mind-gray-100)",
  "sidebar-accent-foreground": "var(--mind-gray-900)",
  "sidebar-border": "var(--mind-gray-200)",
  "sidebar-ring": "oklch(0.48 0.2 285)",
};

export const mindDark: CompleteAliasMap = {
  background: "var(--mind-gray-950)",
  foreground: "var(--mind-gray-50)",
  card: "var(--mind-gray-900)",
  "card-foreground": "var(--mind-gray-50)",
  popover: "var(--mind-gray-900)",
  "popover-foreground": "var(--mind-gray-50)",
  primary: "oklch(0.72 0.15 285)",
  "primary-foreground": "var(--mind-gray-950)",
  secondary: "var(--mind-gray-800)",
  "secondary-foreground": "var(--mind-gray-50)",
  muted: "var(--mind-gray-800)",
  "muted-foreground": "var(--mind-gray-400)",
  accent: "var(--mind-gray-800)",
  "accent-foreground": "var(--mind-gray-50)",
  destructive: "oklch(0.5 0.19 27.3)",
  "destructive-foreground": "var(--mind-gray-50)",
  border: "oklch(1 0 0 / 0.1)",
  input: "oklch(1 0 0 / 0.15)",
  ring: "oklch(0.72 0.15 285)",
  "chart-1": "oklch(0.72 0.15 285)",
  "chart-2": "oklch(0.696 0.17 162.48)",
  "chart-3": "oklch(0.7 0.15 230)",
  "chart-4": "oklch(0.75 0.18 50)",
  "chart-5": "oklch(0.72 0.19 340)",
  sidebar: "var(--mind-gray-900)",
  "sidebar-foreground": "var(--mind-gray-50)",
  "sidebar-primary": "oklch(0.72 0.15 285)",
  "sidebar-primary-foreground": "var(--mind-gray-950)",
  "sidebar-accent": "var(--mind-gray-800)",
  "sidebar-accent-foreground": "var(--mind-gray-50)",
  "sidebar-border": "oklch(1 0 0 / 0.1)",
  "sidebar-ring": "oklch(0.72 0.15 285)",
};

export const mind: Theme = parseTheme(
  {
    name: "mind",
    label: "Mind",
    light: mindLight,
    dark: mindDark,
    radius: "0.625rem",
    logo: assets.mind.logo,
    symbol: assets.mind.symbol,
    pattern: { kind: "none" },
  },
  { source: "@mind/ui/themes/mind" },
);
