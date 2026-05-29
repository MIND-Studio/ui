/*
 * Base layer — brand-agnostic primitives, the single source of truth for the
 * `--mind-*` CSS variables. Mind's neutrals are a cool, blue-tinted (navy) ramp
 * in OKLCH (hue ~248): light end is near-white with a faint cool cast, dark end
 * lands on the deep navy-black (#0c151d) of the Mind product surface. Values are
 * tunable — the contrast gate (tests/contrast.test.ts) is the source of truth.
 *
 * Components NEVER reference these directly — only the alias layer does.
 */

/** Cool navy-tinted grayscale ramp (mode-independent). */
export const grayRamp = {
  50: "oklch(0.985 0.003 248)",
  100: "oklch(0.967 0.005 248)",
  200: "oklch(0.922 0.008 248)",
  300: "oklch(0.871 0.011 248)",
  400: "oklch(0.704 0.02 248)",
  500: "oklch(0.554 0.028 248)",
  600: "oklch(0.44 0.034 248)",
  700: "oklch(0.372 0.034 250)",
  800: "oklch(0.27 0.03 250)",
  900: "oklch(0.219 0.03 250)",
  950: "oklch(0.191 0.021 246)",
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
