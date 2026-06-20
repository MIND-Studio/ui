"use client";

import type { CSSProperties } from "react";
import { useMindTheme } from "../theme/provider";
import type { Pattern as PatternConfig } from "../theme/schema";
import { patternBackground } from "../theme/serialize";
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

/**
 * The CSS for a decorative pattern layer, in the given ink color (default
 * `currentColor`). Returns `undefined` for `kind: "none"`. Exported so consumers
 * can apply a brand pattern anywhere. Shares its geometry with the page-default
 * emitter via `patternBackground`.
 */
export function patternStyle(
  pattern: PatternConfig,
  color = "currentColor",
): CSSProperties | undefined {
  if (pattern.kind === "none") return undefined;
  const bg = patternBackground(pattern, color);
  if (!bg) return undefined;
  return {
    opacity: pattern.opacity,
    backgroundImage: bg.image,
    ...(bg.size ? { backgroundSize: bg.size } : {}),
  };
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
