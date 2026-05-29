/*
 * The contrast gate. Resolves a theme's alias tokens (layered over the Mind
 * defaults, following the base ramp) to literal colors and checks every
 * required foreground/background pair against WCAG AA.
 *
 * `validateThemeContrast` is exported for CONSUMERS to check their own custom
 * themes; the built-in suite (tests/contrast.test.ts) uses the same function.
 */

import { CONTRAST_PAIRS } from "../tokens/aliases";
import { mindDark, mindLight } from "../themes/mind";
import { contrast } from "./color";
import type { Theme } from "./schema";
import { type Mode, resolveAliases } from "./serialize";

export const AA_MIN = 4.5;

export interface ContrastViolation {
  theme: string;
  mode: Mode;
  pair: string;
  ratio: number;
  fg: string;
  bg: string;
}

const DEFAULTS = { light: mindLight, dark: mindDark };
const MODES: readonly Mode[] = ["light", "dark"];

/** Contrast violations for a single mode of a theme. */
export function themeContrastViolations(theme: Theme, mode: Mode): ContrastViolation[] {
  const resolved = resolveAliases(theme, DEFAULTS, mode);
  const violations: ContrastViolation[] = [];

  for (const pair of CONTRAST_PAIRS) {
    const fg = resolved[pair.fg];
    const bg = resolved[pair.bg];
    if (fg === undefined || bg === undefined) {
      if (pair.required) {
        violations.push({
          theme: theme.name,
          mode,
          pair: pair.label,
          ratio: 0,
          fg: fg ?? "(missing)",
          bg: bg ?? "(missing)",
        });
      }
      continue;
    }
    const ratio = contrast(fg, bg);
    if (ratio < AA_MIN) {
      violations.push({
        theme: theme.name,
        mode,
        pair: pair.label,
        ratio: Number(ratio.toFixed(2)),
        fg,
        bg,
      });
    }
  }
  return violations;
}

/** All contrast violations for a theme across light and dark. Empty = passes AA. */
export function validateThemeContrast(theme: Theme): ContrastViolation[] {
  return MODES.flatMap((mode) => themeContrastViolations(theme, mode));
}

/** Human-readable one-line-per-violation summary. */
export function formatViolations(violations: readonly ContrastViolation[]): string {
  return violations
    .map((v) => `  • [${v.theme}/${v.mode}] ${v.pair}: ${v.ratio}:1 (fg=${v.fg}, bg=${v.bg})`)
    .join("\n");
}
