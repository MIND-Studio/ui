import { z } from "zod";
import { ALIAS_TOKENS } from "../tokens/aliases";
import { GRAY_STEPS } from "../tokens/base";

/*
 * The typed, Zod-validated Theme — the authoring surface for a brand. Carries
 * all seven axes (color, grayscale, radius, font, logo, symbol, pattern) with
 * EXPLICIT light/dark color sets (no derivation engine). Anything a theme omits
 * falls back to the base layer; a missing `dark` token falls back to the base
 * dark value, never the light one.
 */

const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be kebab-case (lowercase + digits + hyphens)");

const hexColorSchema = z
  .string()
  .regex(
    /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
    "must be a hex color (#rgb, #rrggbb, or #rrggbbaa)",
  );

const oklchColorSchema = z
  .string()
  .regex(
    /^oklch\(\s*[\d.]+%?\s+[\d.]+\s+-?[\d.]+(?:\s*\/\s*[\d.]+)?\s*\)$/,
    "must be an oklch() literal (e.g. oklch(0.6 0.18 264))",
  );

const varRefSchema = z
  .string()
  .regex(
    /^var\(--mind-[a-z0-9-]+\)$/,
    "must reference a base primitive, e.g. var(--mind-gray-200)",
  );

export const cssColorSchema = z.union([hexColorSchema, oklchColorSchema, varRefSchema]);

const assetUrlSchema = z
  .string()
  .min(1)
  .refine(
    (value) =>
      value.startsWith("/") ||
      /^https?:\/\//.test(value) ||
      /^data:image\/(?:svg\+xml|png|jpeg|gif|webp);/.test(value),
    "must be a root-relative path (/…), an http(s) URL, or a data:image/* URI",
  );

export const assetSchema = z
  .object({
    light: assetUrlSchema,
    dark: assetUrlSchema,
  })
  .strict();

export const aliasMapSchema = z.partialRecord(z.enum(ALIAS_TOKENS), cssColorSchema);

export const grayscaleOverrideSchema = z.partialRecord(
  z.enum(GRAY_STEPS.map(String) as [string, ...string[]]),
  cssColorSchema,
);

export const fontSchema = z
  .object({
    sans: z.string().min(1).optional(),
    serif: z.string().min(1).optional(),
    mono: z.string().min(1).optional(),
  })
  .strict();

export const patternSchema = z.discriminatedUnion("kind", [
  z
    .object({
      kind: z.enum(["grid", "dots", "noise", "mesh"]),
      opacity: z.number().min(0).max(1),
    })
    .strict(),
  z.object({ kind: z.literal("none") }).strict(),
]);

export const themeSchema = z
  .object({
    /** kebab-case identifier, written to `[data-mind-theme]`. */
    name: slugSchema,
    /** Human-readable display name. */
    label: z.string().min(1),
    /** Light-mode alias overrides (partial; falls back to base). */
    light: aliasMapSchema.optional(),
    /** Dark-mode alias overrides (partial; falls back to base dark). */
    dark: aliasMapSchema.optional(),
    /** Override one or more steps of the neutral grayscale ramp. */
    grayscale: grayscaleOverrideSchema.optional(),
    /** Base corner radius, e.g. "0.4rem". */
    radius: z.string().min(1).optional(),
    /** Font-family stacks. */
    font: fontSchema.optional(),
    /** Full wordmark logo, per mode. */
    logo: assetSchema.optional(),
    /** Compact symbol / glyph, per mode. */
    symbol: assetSchema.optional(),
    /** Decorative background pattern. */
    pattern: patternSchema.optional(),
  })
  .strict();

export type Theme = z.infer<typeof themeSchema>;
export type Pattern = z.infer<typeof patternSchema>;
export type Asset = z.infer<typeof assetSchema>;
export type ThemeFonts = z.infer<typeof fontSchema>;

export interface ParseThemeOptions {
  source?: string;
}

/** Validate an unknown value as a Theme, throwing a readable error on failure. */
export function parseTheme(input: unknown, opts: ParseThemeOptions = {}): Theme {
  const result = themeSchema.safeParse(input);
  if (result.success) return result.data;
  const prefix = opts.source ? `Invalid theme (${opts.source}):` : "Invalid theme:";
  const error = new Error(`${prefix}\n${z.prettifyError(result.error)}`) as Error & {
    cause?: unknown;
  };
  error.cause = result.error;
  throw error;
}

/** Encode an SVG string as a `data:image/svg+xml` URI for logo/symbol assets. */
export function toDataUrl(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
