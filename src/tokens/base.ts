/*
 * Base layer — brand-agnostic primitives, the single source of truth for the
 * `--mind-*` CSS variables. Seeded from a shadcn/new-york neutral (zinc) ramp
 * in OKLCH. (The `b1aKNEsKI` shadcn preset referenced in the PRD was not
 * available as a file when the base was authored; these are standard neutral
 * OKLCH values and are meant to be tuned, not treated as final.)
 *
 * Components NEVER reference these directly — only the alias layer does.
 */

/** Neutral grayscale ramp (mode-independent). */
export const grayRamp = {
  50: "oklch(0.985 0 0)",
  100: "oklch(0.967 0.001 286.375)",
  200: "oklch(0.92 0.004 286.32)",
  300: "oklch(0.871 0.006 286.286)",
  400: "oklch(0.705 0.015 286.067)",
  500: "oklch(0.552 0.016 285.938)",
  600: "oklch(0.442 0.017 285.786)",
  700: "oklch(0.37 0.013 285.805)",
  800: "oklch(0.274 0.006 286.033)",
  900: "oklch(0.21 0.006 285.885)",
  950: "oklch(0.141 0.005 285.823)",
} as const;

export type GrayStep = keyof typeof grayRamp;

export const GRAY_STEPS = Object.keys(grayRamp).map(Number) as GrayStep[];

export const baseColors = {
  white: "oklch(1 0 0)",
  black: "oklch(0 0 0)",
} as const;

export const baseRadius = "0.625rem";

export const baseFonts = {
  sans: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
} as const;

/**
 * The flat `--mind-*` primitive map, optionally with a grayscale-ramp override
 * (used by brands that retint the neutrals). This is the authoritative input
 * to both the static CSS generator and the runtime resolver.
 */
export function basePrimitiveVars(
  grayOverride?: Partial<Record<GrayStep, string>>,
): Record<string, string> {
  const ramp = { ...grayRamp, ...grayOverride };
  const out: Record<string, string> = {};
  for (const step of GRAY_STEPS) {
    out[`--mind-gray-${step}`] = ramp[step] as string;
  }
  out["--mind-white"] = baseColors.white;
  out["--mind-black"] = baseColors.black;
  out["--mind-radius"] = baseRadius;
  out["--mind-font-sans"] = baseFonts.sans;
  out["--mind-font-serif"] = baseFonts.serif;
  out["--mind-font-mono"] = baseFonts.mono;
  return out;
}
