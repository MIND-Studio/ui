"use client";

import type { CSSProperties } from "react";
import { useMindTheme } from "../theme/provider";
import type { Pattern as PatternConfig } from "../theme/schema";
import { cn } from "../lib/cn";

/*
 * Brand-asset components for the logo / symbol / pattern axes. Each reads the
 * active theme (and resolved mode) from the ThemeProvider.
 */

function pickMode(resolvedMode: string | undefined): "light" | "dark" {
  return resolvedMode === "dark" ? "dark" : "light";
}

export type LogoProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  alt?: string;
};

/** The active brand's wordmark for the current mode. Renders nothing if unset. */
export function Logo({ className, alt, ...props }: LogoProps) {
  const { theme, resolvedMode } = useMindTheme();
  const src = theme.logo?.[pickMode(resolvedMode)];
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element -- data-URI brand asset
  return (
    <img
      src={src}
      alt={alt ?? `${theme.label} logo`}
      className={cn("h-8 w-auto", className)}
      {...props}
    />
  );
}

/** The active brand's compact symbol/glyph for the current mode. */
export function Symbol({ className, alt, ...props }: LogoProps) {
  const { theme, resolvedMode } = useMindTheme();
  const src = theme.symbol?.[pickMode(resolvedMode)];
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element -- data-URI brand asset
  return (
    <img
      src={src}
      alt={alt ?? `${theme.label} symbol`}
      className={cn("size-8", className)}
      {...props}
    />
  );
}

const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * The CSS for a decorative pattern layer, in the given ink color (default
 * `currentColor`). Returns `undefined` for `kind: "none"`. Exported so consumers
 * can apply a brand pattern anywhere.
 */
export function patternStyle(
  pattern: PatternConfig,
  color = "currentColor",
): CSSProperties | undefined {
  if (pattern.kind === "none") return undefined;
  const { opacity } = pattern;
  switch (pattern.kind) {
    case "grid":
      return {
        opacity,
        backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      };
    case "dots":
      return {
        opacity,
        backgroundImage: `radial-gradient(${color} 1.2px, transparent 1.2px)`,
        backgroundSize: "24px 24px",
      };
    case "mesh":
      return {
        opacity,
        backgroundImage: `radial-gradient(at 20% 20%, ${color} 0, transparent 45%), radial-gradient(at 80% 60%, ${color} 0, transparent 45%)`,
      };
    case "noise":
      return { opacity, backgroundImage: NOISE_SVG };
  }
}

export type PatternProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * An absolutely-positioned, aria-hidden layer rendering the active brand's
 * pattern. Place inside a `relative` container. Renders nothing for `none`.
 */
export function Pattern({ className, style, ...props }: PatternProps) {
  const { theme } = useMindTheme();
  const patternCss = patternStyle(theme.pattern ?? { kind: "none" });
  if (!patternCss) return null;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 text-foreground", className)}
      style={{ ...patternCss, ...style }}
      {...props}
    />
  );
}
