/*
 * Pure color math for the contrast gate. Implements Björn Ottosson's
 * sRGB ↔ OKLCH transform and WCAG relative luminance / contrast ratio.
 * No runtime deps, no React, no schema imports — adapted from the facet
 * prototype's `oklch.ts`.
 */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface Oklch {
  L: number;
  C: number;
  h: number;
}

export function parseHex(hex: string): Rgb {
  const m = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.exec(hex.trim());
  const captured = m?.[1];
  if (!captured) throw new Error(`parseHex: not a hex color: ${hex}`);
  let body = captured;
  if (body.length === 3) {
    body = body
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (body.length === 8) body = body.slice(0, 6); // drop alpha
  const n = Number.parseInt(body, 16);
  return {
    r: ((n >> 16) & 0xff) / 255,
    g: ((n >> 8) & 0xff) / 255,
    b: (n & 0xff) / 255,
  };
}

function srgbToLinearChannel(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgbChannel(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

export function oklchToSrgb({ L, C, h }: Oklch): Rgb {
  const hr = (h * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const bb = C * Math.sin(hr);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * bb;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bb;
  const s_ = L - 0.0894841775 * a - 1.291485548 * bb;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return {
    r: linearToSrgbChannel(lr),
    g: linearToSrgbChannel(lg),
    b: linearToSrgbChannel(lb),
  };
}

export function relativeLuminance(rgb: Rgb): number {
  const lr = srgbToLinearChannel(rgb.r);
  const lg = srgbToLinearChannel(rgb.g);
  const lb = srgbToLinearChannel(rgb.b);
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Parse any CSS color literal we emit — a hex string or an `oklch(L C h)`
 * literal (optional ` / alpha`, which is ignored) — into sRGB.
 */
export function parseCssColor(value: string): Rgb {
  const trimmed = value.trim();
  if (trimmed.startsWith("#")) return parseHex(trimmed);
  const m = /^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+(-?[\d.]+)(?:\s*\/\s*[\d.]+)?\s*\)$/.exec(trimmed);
  if (!m || !m[1] || !m[2] || !m[3]) {
    throw new Error(`parseCssColor: not a hex or oklch literal: ${value}`);
  }
  const lRaw = m[1];
  const L = lRaw.endsWith("%") ? Number.parseFloat(lRaw) / 100 : Number.parseFloat(lRaw);
  return oklchToSrgb({
    L,
    C: Number.parseFloat(m[2]),
    h: Number.parseFloat(m[3]),
  });
}

/** Contrast ratio between two CSS color literals. */
export function contrast(a: string, b: string): number {
  return contrastRatio(parseCssColor(a), parseCssColor(b));
}
