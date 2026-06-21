/*
 * Brand assets — compact inline SVGs encoded as data URIs. Each brand ships a
 * wordmark `logo` and a compact `symbol`, in light and dark variants (dark =
 * light ink for dark backgrounds).
 *
 * Mind ships its real `symbol` — the gradient weave from `./mind-mark` (reused by
 * the Foundations → Logo page). Mind has no baked `logo` image: the `Logo`
 * component composes the wordmark live so "Mind" renders in the brand serif
 * (Fraunces) — an <img>-embedded SVG can't reach the app's webfonts. The demo
 * brands (ember, arctic) keep placeholder shapes that just exercise the
 * logo/symbol axis until real art lands.
 */

import { toDataUrl } from "../theme/schema";
import { MIND_MARK_SVG } from "./mind-mark";

const LIGHT_INK = "#18181b";
const DARK_INK = "#fafafa";

function wordmark(label: string, dot: string, ink: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132 32" role="img" aria-label="${label}"><circle cx="16" cy="16" r="9" fill="${dot}"/><circle cx="16" cy="16" r="4" fill="${ink}"/><text x="34" y="22" font-family="ui-sans-serif,system-ui,sans-serif" font-size="19" font-weight="700" fill="${ink}">${label}</text></svg>`;
}

function symbol(letter: string, bg: string, fg: string, rx: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="${letter} symbol"><rect width="32" height="32" rx="${rx}" fill="${bg}"/><text x="16" y="23" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="19" font-weight="700" fill="${fg}">${letter}</text></svg>`;
}

const EMBER = "#e8693a";
const ARCTIC = "#2b8fd6";

export const assets = {
  mind: {
    // No baked wordmark — the Logo component composes the symbol + serif "Mind".
    // The gradient mark is identical in both modes.
    symbol: { light: toDataUrl(MIND_MARK_SVG), dark: toDataUrl(MIND_MARK_SVG) },
  },
  ember: {
    logo: { light: toDataUrl(wordmark("Ember", EMBER, LIGHT_INK)), dark: toDataUrl(wordmark("Ember", EMBER, DARK_INK)) },
    symbol: { light: toDataUrl(symbol("E", EMBER, "#ffffff", 14)), dark: toDataUrl(symbol("E", EMBER, "#ffffff", 14)) },
  },
  arctic: {
    logo: { light: toDataUrl(wordmark("Arctic", ARCTIC, LIGHT_INK)), dark: toDataUrl(wordmark("Arctic", ARCTIC, DARK_INK)) },
    symbol: { light: toDataUrl(symbol("A", ARCTIC, "#ffffff", 0)), dark: toDataUrl(symbol("A", ARCTIC, "#ffffff", 0)) },
  },
} as const;
