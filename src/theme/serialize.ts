/*
 * Shared CSS serialization + variable resolution. Used by the static-CSS
 * generator (`scripts/gen-styles.ts`), the runtime injector (`inject.ts`), and
 * the contrast resolver (`contrast.ts`) so they always agree on the math.
 */

import { ALIAS_TOKENS, type AliasMap } from "../tokens/aliases";
import { basePrimitiveVars, type GrayStep } from "../tokens/base";
import type { Pattern, Theme } from "./schema";

export type Mode = "light" | "dark";

const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * The `background-image` (and optional `background-size`) that draws a pattern,
 * inked with `color`. `none` → undefined. The single source of truth for the
 * pattern geometry, shared by the `<Pattern>` component and the page emitter.
 */
export function patternBackground(
  pattern: Pattern,
  color: string,
): { image: string; size?: string } | undefined {
  if (pattern.kind === "none") return undefined;
  switch (pattern.kind) {
    case "grid":
      return {
        image: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
        size: "24px 24px",
      };
    case "dots":
      return {
        image: `radial-gradient(${color} 1.2px, transparent 1.2px)`,
        size: "24px 24px",
      };
    case "mesh":
      return {
        image: `radial-gradient(at 20% 20%, ${color} 0, transparent 45%), radial-gradient(at 80% 60%, ${color} 0, transparent 45%)`,
      };
    case "noise":
      return { image: NOISE_SVG };
  }
}

/**
 * A CSS rule that paints `pattern` onto `selector` (a page background) by
 * default — opacity folded into the ink via `color-mix` so it needs no separate
 * layer or z-index. `none` resets the background-image; an absent pattern emits
 * nothing (the element inherits whatever the default page rule painted).
 */
export function emitPatternCss(pattern: Pattern | undefined, selector: string): string {
  if (!pattern) return "";
  if (pattern.kind === "none") {
    return `${selector} {\n  background-image: none;\n}`;
  }
  const pct = +(pattern.opacity * 100).toFixed(2);
  const ink = `color-mix(in oklab, var(--foreground) ${pct}%, transparent)`;
  const bg = patternBackground(pattern, ink);
  if (!bg) return "";
  const decls = [`  background-image: ${bg.image};`];
  if (bg.size) decls.push(`  background-size: ${bg.size};`);
  return `${selector} {\n${decls.join("\n")}\n}`;
}

/** Render a `{ "--name": "value" }` map as indented CSS declarations. */
export function cssDeclarations(vars: Record<string, string>, indent = "  "): string {
  return Object.entries(vars)
    .map(([name, value]) => `${indent}${name}: ${value};`)
    .join("\n");
}

/** Resolve a `var(--x)` reference chain against a flat variable map. */
export function resolveVarRef(value: string, vars: Record<string, string>, depth = 0): string {
  const m = /^var\(\s*(--[a-z0-9-]+)\s*\)$/i.exec(value.trim());
  if (!m || !m[1] || depth > 16) return value;
  const next = vars[m[1]];
  if (next === undefined) return value;
  return resolveVarRef(next, vars, depth + 1);
}

/** Alias map → `{ "--token": value }`. */
export function aliasVars(map: AliasMap): Record<string, string> {
  const out: Record<string, string> = {};
  for (const token of ALIAS_TOKENS) {
    const value = map[token];
    if (value !== undefined) out[`--${token}`] = value;
  }
  return out;
}

/** Mode-independent vars a theme contributes: grayscale ramp, radius, fonts. */
export function themeBaseVars(theme: Theme): Record<string, string> {
  const out: Record<string, string> = {};
  if (theme.grayscale) {
    for (const [step, value] of Object.entries(theme.grayscale)) {
      if (value !== undefined) out[`--mind-gray-${step}`] = value;
    }
  }
  if (theme.radius) out["--mind-radius"] = theme.radius;
  if (theme.font?.sans) out["--mind-font-sans"] = theme.font.sans;
  if (theme.font?.serif) out["--mind-font-serif"] = theme.font.serif;
  if (theme.font?.mono) out["--mind-font-mono"] = theme.font.mono;
  return out;
}

const escapeAttr = (value: string) => value.replace(/["\\]/g, "\\$&");

/**
 * Emit a theme as scoped CSS keyed by `[data-mind-theme]`. BOTH modes are
 * always emitted so the active one is selected purely by the `.dark` class —
 * the brand stays painted even across an SSR→client mode flip.
 */
export function emitScopedCss(theme: Theme): string {
  const sel = `[data-mind-theme="${escapeAttr(theme.name)}"]`;
  const blocks: string[] = [];

  const base = { ...themeBaseVars(theme), ...aliasVars(theme.light ?? {}) };
  if (Object.keys(base).length > 0) {
    blocks.push(`${sel} {\n${cssDeclarations(base)}\n}`);
  }

  const dark = aliasVars(theme.dark ?? {});
  if (Object.keys(dark).length > 0) {
    blocks.push(`${sel}.dark {\n${cssDeclarations(dark)}\n}`);
  }

  const pattern = emitPatternCss(theme.pattern, `${sel} body`);
  if (pattern) blocks.push(pattern);

  return blocks.join("\n\n");
}

/**
 * Emit a complete theme (Mind default) as the unscoped `:root` / `.dark` base,
 * plus the `--mind-*` primitives and the Tailwind `@theme inline` mapping that
 * lets shadcn utilities (`bg-background`, `rounded-lg`, …) resolve.
 */
export function emitRootCss(theme: Theme): string {
  const root = {
    ...basePrimitiveVars(),
    ...themeBaseVars(theme),
    "--radius": "var(--mind-radius)",
    ...aliasVars(theme.light ?? {}),
  };
  const dark = aliasVars(theme.dark ?? {});

  return [
    `:root {\n${cssDeclarations(root)}\n}`,
    `.dark {\n${cssDeclarations(dark)}\n}`,
    emitPatternCss(theme.pattern, "body"),
  ]
    .filter(Boolean)
    .join("\n\n");
}

/** The Tailwind v4 `@theme inline` block + dark variant. */
export function emitThemeInline(): string {
  const colorLines = ALIAS_TOKENS.map((t) => `  --color-${t}: var(--${t});`).join("\n");
  return `@custom-variant dark (&:is(.dark *));

@theme inline {
${colorLines}
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --font-sans: var(--mind-font-sans);
  --font-serif: var(--mind-font-serif);
  --font-mono: var(--mind-font-mono);
}`;
}

/**
 * Resolve every alias of `theme` (layered over `defaults`) for `mode` into a
 * literal color, following `var(--mind-*)` references through the (possibly
 * brand-overridden) primitive ramp. Used by the contrast gate.
 */
export function resolveAliases(
  theme: Theme,
  defaults: { light: AliasMap; dark: AliasMap },
  mode: Mode,
): Record<string, string> {
  const primitives = basePrimitiveVars(theme.grayscale as Partial<Record<GrayStep, string>>);
  const merged: AliasMap = { ...defaults[mode], ...(theme[mode] ?? {}) };
  const out: Record<string, string> = {};
  for (const token of ALIAS_TOKENS) {
    const raw = merged[token];
    if (raw !== undefined) out[token] = resolveVarRef(raw, primitives);
  }
  return out;
}
