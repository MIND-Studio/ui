import { parseTheme, type Theme } from "../theme/schema";
import { assets } from "./assets";

/*
 * Ember — warm / rounded demo brand. Overrides only the tokens it changes;
 * everything else inherits the Mind base. Full axes (logo/symbol/pattern) are
 * authored in M1. Color values clear WCAG AA against the inherited foregrounds.
 */

export const ember: Theme = parseTheme(
  {
    name: "ember",
    label: "Ember",
    radius: "1rem",
    light: {
      primary: "oklch(0.52 0.17 40)",
      ring: "oklch(0.52 0.17 40)",
      "sidebar-primary": "oklch(0.52 0.17 40)",
      "sidebar-ring": "oklch(0.52 0.17 40)",
      "chart-1": "oklch(0.6 0.18 40)",
    },
    dark: {
      primary: "oklch(0.72 0.15 55)",
      ring: "oklch(0.72 0.15 55)",
      "sidebar-primary": "oklch(0.72 0.15 55)",
      "sidebar-ring": "oklch(0.72 0.15 55)",
      "chart-1": "oklch(0.72 0.15 55)",
    },
    logo: assets.ember.logo,
    symbol: assets.ember.symbol,
    pattern: { kind: "dots", opacity: 0.05 },
  },
  { source: "@mind/ui/themes/ember" },
);
