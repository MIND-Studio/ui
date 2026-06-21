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
  primary: "oklch(0.52 0.105 172)",
  "primary-foreground": "var(--mind-gray-50)",
  secondary: "var(--mind-gray-100)",
  "secondary-foreground": "var(--mind-gray-900)",
  muted: "var(--mind-gray-100)",
  "muted-foreground": "var(--mind-gray-600)",
  accent: "var(--mind-gray-100)",
  "accent-foreground": "var(--mind-gray-900)",
  destructive: "oklch(0.505 0.19 27.3)",
  "destructive-foreground": "var(--mind-gray-50)",
  // Semantic state colors (light mode): mid-dark fills carry white text, like
  // destructive. `text-success`/`text-warning` read as the darker tone on a
  // light page; `bg-success text-success-foreground` is the filled pairing.
  success: "oklch(0.5 0.12 162)",
  "success-foreground": "var(--mind-gray-50)",
  warning: "oklch(0.5 0.13 70)",
  "warning-foreground": "var(--mind-gray-50)",
  error: "oklch(0.505 0.19 27.3)",
  "error-foreground": "var(--mind-gray-50)",
  info: "oklch(0.5 0.15 250)",
  "info-foreground": "var(--mind-gray-50)",
  border: "var(--mind-gray-200)",
  input: "var(--mind-gray-200)",
  ring: "oklch(0.52 0.105 172)",
  "chart-1": "oklch(0.6 0.13 168)",
  "chart-2": "oklch(0.58 0.16 258)",
  "chart-3": "oklch(0.5 0.16 300)",
  "chart-4": "oklch(0.62 0.18 50)",
  "chart-5": "oklch(0.58 0.2 340)",
  sidebar: "var(--mind-gray-50)",
  "sidebar-foreground": "var(--mind-gray-950)",
  "sidebar-primary": "oklch(0.52 0.105 172)",
  "sidebar-primary-foreground": "var(--mind-gray-50)",
  "sidebar-accent": "var(--mind-gray-100)",
  "sidebar-accent-foreground": "var(--mind-gray-900)",
  "sidebar-border": "var(--mind-gray-200)",
  "sidebar-ring": "oklch(0.52 0.105 172)",
};

export const mindDark: CompleteAliasMap = {
  background: "var(--mind-gray-950)",
  foreground: "var(--mind-gray-50)",
  card: "var(--mind-gray-900)",
  "card-foreground": "var(--mind-gray-50)",
  popover: "var(--mind-gray-900)",
  "popover-foreground": "var(--mind-gray-50)",
  primary: "oklch(0.72 0.142 165)",
  "primary-foreground": "var(--mind-gray-950)",
  secondary: "var(--mind-gray-800)",
  "secondary-foreground": "var(--mind-gray-50)",
  muted: "var(--mind-gray-800)",
  "muted-foreground": "var(--mind-gray-400)",
  accent: "var(--mind-gray-800)",
  "accent-foreground": "var(--mind-gray-50)",
  destructive: "oklch(0.5 0.19 27.3)",
  "destructive-foreground": "var(--mind-gray-50)",
  // Semantic state colors (dark mode): brighter fills with dark text, like
  // primary — so `text-success`/`text-warning` stay legible on the deep navy
  // surface while `bg-* text-*-foreground` filled pairs keep AA.
  success: "oklch(0.72 0.142 162)",
  "success-foreground": "var(--mind-gray-950)",
  warning: "oklch(0.8 0.15 78)",
  "warning-foreground": "var(--mind-gray-950)",
  error: "oklch(0.68 0.19 25)",
  "error-foreground": "var(--mind-gray-950)",
  info: "oklch(0.7 0.15 250)",
  "info-foreground": "var(--mind-gray-950)",
  border: "oklch(1 0 0 / 0.1)",
  input: "oklch(1 0 0 / 0.15)",
  ring: "oklch(0.72 0.142 165)",
  "chart-1": "oklch(0.72 0.142 165)",
  "chart-2": "oklch(0.68 0.15 258)",
  "chart-3": "oklch(0.66 0.16 300)",
  "chart-4": "oklch(0.75 0.18 50)",
  "chart-5": "oklch(0.72 0.19 340)",
  sidebar: "var(--mind-gray-900)",
  "sidebar-foreground": "var(--mind-gray-50)",
  "sidebar-primary": "oklch(0.72 0.142 165)",
  "sidebar-primary-foreground": "var(--mind-gray-950)",
  "sidebar-accent": "var(--mind-gray-800)",
  "sidebar-accent-foreground": "var(--mind-gray-50)",
  "sidebar-border": "oklch(1 0 0 / 0.1)",
  "sidebar-ring": "oklch(0.72 0.142 165)",
};

export const mind: Theme = parseTheme(
  {
    name: "mind",
    label: "Mind",
    light: mindLight,
    dark: mindDark,
    radius: "0.625rem",
    // Fleet type: Fraunces (optical serif display) / Hanken Grotesk (warm body) /
    // JetBrains Mono. The theme names the families only — the actual webfonts are
    // loaded per-app via next/font, which exposes the `--font-*` vars referenced
    // below. Named-family + generic fallbacks keep type sane before the webfont
    // resolves (and in non-Next consumers). Flows to shadcn's --font-* via
    // serialize.ts (--mind-font-* → --font-*).
    font: {
      sans: 'var(--font-hanken), "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif',
      serif:
        'var(--font-fraunces), "Fraunces", ui-serif, Georgia, Cambria, "Times New Roman", serif',
      mono: 'var(--font-jb), "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, "Liberation Mono", monospace',
    },
    // No `logo` image: the Logo component composes the wordmark live so "Mind"
    // renders in the brand serif (Fraunces). See src/components/brand.tsx.
    symbol: assets.mind.symbol,
    pattern: { kind: "dots", opacity: 0.06 },
  },
  { source: "@mind-studio/ui/themes/mind" },
);
