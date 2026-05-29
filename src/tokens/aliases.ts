/*
 * Alias layer — the semantic tokens components actually consume. These use
 * shadcn's EXACT variable names so vendored shadcn primitives work unmodified.
 * Each alias resolves to a base primitive (`var(--mind-*)`) or a literal color.
 */

export const ALIAS_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
] as const;

export type AliasToken = (typeof ALIAS_TOKENS)[number];

/** A partial set of alias overrides for a single mode. */
export type AliasMap = Partial<Record<AliasToken, string>>;

/** A complete alias set (every token present) — what a base/default theme ships. */
export type CompleteAliasMap = Record<AliasToken, string>;

/**
 * Foreground/background pairs the contrast gate enforces. `required` pairs must
 * score ≥ AA (4.5:1) in every built-in theme × mode; non-required pairs are
 * checked only when both tokens are present.
 */
export interface ContrastPair {
  label: string;
  fg: AliasToken;
  bg: AliasToken;
  required: boolean;
}

export const CONTRAST_PAIRS: readonly ContrastPair[] = [
  { label: "foreground on background", fg: "foreground", bg: "background", required: true },
  { label: "card-foreground on card", fg: "card-foreground", bg: "card", required: true },
  {
    label: "popover-foreground on popover",
    fg: "popover-foreground",
    bg: "popover",
    required: true,
  },
  {
    label: "primary-foreground on primary",
    fg: "primary-foreground",
    bg: "primary",
    required: true,
  },
  {
    label: "secondary-foreground on secondary",
    fg: "secondary-foreground",
    bg: "secondary",
    required: true,
  },
  { label: "muted-foreground on muted", fg: "muted-foreground", bg: "muted", required: true },
  { label: "accent-foreground on accent", fg: "accent-foreground", bg: "accent", required: true },
  {
    label: "destructive-foreground on destructive",
    fg: "destructive-foreground",
    bg: "destructive",
    required: true,
  },
  { label: "foreground on card", fg: "foreground", bg: "card", required: true },
];
