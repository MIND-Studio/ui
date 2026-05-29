import { parseTheme, type Theme } from "../theme/schema";
import { assets } from "./assets";

/*
 * Arctic — cool / sharp demo brand. Sharp corners (radius 0), a cool primary,
 * and a cooler neutral ramp via a grayscale override (which automatically
 * retints every structural alias that references the base grays). Full axes
 * (logo/symbol/pattern) are authored in M1.
 */

export const arctic: Theme = parseTheme(
  {
    name: "arctic",
    label: "Arctic",
    radius: "0rem",
    grayscale: {
      "100": "oklch(0.968 0.007 247.896)",
      "200": "oklch(0.929 0.013 255.508)",
      "800": "oklch(0.279 0.041 260.031)",
      "900": "oklch(0.208 0.042 265.755)",
      "950": "oklch(0.129 0.042 264.695)",
    },
    light: {
      primary: "oklch(0.5 0.13 233)",
      ring: "oklch(0.5 0.13 233)",
      "sidebar-primary": "oklch(0.5 0.13 233)",
      "sidebar-ring": "oklch(0.5 0.13 233)",
      "chart-1": "oklch(0.55 0.15 233)",
    },
    dark: {
      primary: "oklch(0.72 0.12 225)",
      ring: "oklch(0.72 0.12 225)",
      "sidebar-primary": "oklch(0.72 0.12 225)",
      "sidebar-ring": "oklch(0.72 0.12 225)",
      "chart-1": "oklch(0.72 0.12 225)",
    },
    logo: assets.arctic.logo,
    symbol: assets.arctic.symbol,
    pattern: { kind: "grid", opacity: 0.04 },
  },
  { source: "@mind/ui/themes/arctic" },
);
