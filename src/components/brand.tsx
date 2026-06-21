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

export type SymbolProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  alt?: string;
};

export type LogoProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Render only the symbol, dropping the wordmark text. */
  symbolOnly?: boolean;
  /**
   * Wordmark text. Defaults to the active theme's `label` ("Mind"). Pass the
   * product name (e.g. `"Drive"`) so an app's lockup reads as the shared mark +
   * its own name, set in the same brand serif. Overrides only the text — the
   * symbol/mark still comes from the active theme.
   */
  label?: string;
};

/**
 * The active brand's logo lockup: the symbol followed by the wordmark, set in
 * the brand serif (Fraunces for Mind). The wordmark is composed from live DOM
 * text — not a baked image — so it renders in the real brand webfont (an
 * `<img>`-embedded SVG can't reach the app's fonts). A theme may still supply a
 * fully bespoke wordmark image via its `logo` asset; when present that image is
 * used as-is instead.
 */
export function Logo({ className, symbolOnly, label, ...props }: LogoProps) {
  const { theme, resolvedMode } = useMindTheme();
  const mode = pickMode(resolvedMode);
  const wordmark = label ?? theme.label;
  const custom = theme.logo?.[mode];
  if (custom) {
    return (
      <div className={cn("flex items-center", className)} {...props}>
        {/* eslint-disable-next-line @next/next/no-img-element -- data-URI brand asset */}
        <img src={custom} alt={`${wordmark} logo`} className="h-8 w-auto" />
      </div>
    );
  }
  const symbolSrc = theme.symbol?.[mode];
  return (
    <div className={cn("flex items-center gap-2.5 text-foreground", className)} {...props}>
      {symbolSrc ? (
        // eslint-disable-next-line @next/next/no-img-element -- data-URI brand asset
        <img src={symbolSrc} alt="" aria-hidden className="h-8 w-auto" />
      ) : null}
      {symbolOnly ? null : (
        <span className="font-serif font-semibold text-2xl leading-none tracking-tight">
          {wordmark}
        </span>
      )}
    </div>
  );
}

/** The active brand's compact symbol/glyph for the current mode. */
export function Symbol({ className, alt, ...props }: SymbolProps) {
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
