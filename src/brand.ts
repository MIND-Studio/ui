/*
 * Public brand-artwork entry (`@mind-studio/ui/brand`).
 *
 * Re-exports the canonical Mind mark as framework-agnostic SVG strings and
 * helpers, so apps can author favicons, app icons, OG images and manifests from
 * the single source of truth instead of vendoring a copy that drifts. This entry
 * is deliberately React-free — it imports no components and carries no
 * `"use client"`, so it is safe to import from plain Node build scripts.
 */

export {
  MIND_MARK_SVG,
  MIND_MARK_VIEWBOX,
  MIND_GREEN,
  monoMarkSvg,
  MIND_CONSTRUCTION_SVG,
} from "./themes/mind-mark";
