/*
 * Theme → injectable CSS. Wraps the shared serializer so the provider and any
 * static multi-theme emission go through one path. Each theme emits BOTH light
 * and dark rules under `[data-mind-theme="…"]`; the active mode is the `.dark`
 * class. Tokens a theme omits fall through to the `:root` base (Mind default).
 */

import type { Theme } from "./schema";
import { emitScopedCss } from "./serialize";

/** Scoped CSS for a single theme (both modes). */
export function themeCss(theme: Theme): string {
  return emitScopedCss(theme);
}

/** Scoped CSS for several themes, concatenated. */
export function themesCss(themes: readonly Theme[]): string {
  return themes.map(emitScopedCss).join("\n\n");
}
