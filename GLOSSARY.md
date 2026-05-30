# Mind UI — Glossary

The shared vocabulary for `@mind-studio/ui`. Terms are grouped by domain (brand, tokens, theming, distribution, quality). When code, docs, or commits use one of these words, it means *exactly* what's defined here.

---

## Brand & product

**Mind**
Our core brand name for the open-source community. We attempt to decentralize the web by building applications for people, not profits — data is owned and controlled by everyone autonomously. In `@mind-studio/ui`, **Mind** is also the name of the **default brand/theme**.

**Mind UI** (`@mind-studio/ui`)
The core multi-brand design system for all Mind projects. A single published npm package: shadcn-native components, a two-layer token system, a `<ThemeProvider>`, and the built-in brands.

**Brand**
A visual identity expressed entirely as tokens — never as component code. Every brand shares the same component set; only the tokens differ. Realized as a **Theme** object. (Used interchangeably with **Theme** in most contexts.)

**Default brand**
**Mind**. Ships as static CSS so the common case ("just use Mind") is server-rendered correctly with zero client JS.

**Demo brand**
One of the two contrasting example brands (one **warm/rounded**, one **cool/sharp**) bundled to (a) make brand-switching visibly dramatic in Storybook and (b) serve as worked examples a consumer copies when authoring their own theme.

**Consumer**
A downstream Mind app (Next.js) that runs `pnpm add @mind-studio/ui`, imports components, and either uses the Mind brand or injects a custom theme.

---

## Tokens

**Token**
A named design value exposed as a CSS variable. Mind UI has exactly **two token layers**: base and alias.

**Base token** (primitive)
A raw, brand-agnostic scale value — the grayscale ramp (light + dark), accent ramps, radius scale, font stacks, spacing. Named `--mind-*` (e.g. `--mind-gray-500`). Seeded from the `b1aKNEsKI` preset. **Components never reference base tokens directly.**

**Alias token** (semantic)
The layer components actually consume — `--background`, `--foreground`, `--primary`, `--border`, `--ring`, `--radius`, etc. Each alias *points at* a base token. Aliases deliberately use **shadcn's exact variable names** so vendored shadcn components work unmodified.

**Grayscale ramp**
The neutral color scale (light + dark) living in **base**. A brand **inherits** it by default but **may override** it.

**`b1aKNEsKI` preset**
The shadcn theme config chosen as the **seed** for Mind's base tokens / default theme. Used only at authoring time; consumers never see it.

---

## Theming

**Theme**
A Zod-validated TS object describing a brand's token overrides, with explicit `light` and `dark` sections. A brand writes only the tokens it *changes*; everything else falls back to **base**. Authorable in *any* package and injected into the `<ThemeProvider>`.

**Base fallback**
The rule that any token a theme doesn't specify resolves to its **base** value. If `light.primary` is set but `dark.primary` is omitted, dark uses the **base** primary — never the light value.

**Explicit light/dark**
Light and dark values are *authored*, not computed. Mind UI has **no derivation engine** in v1 (an optional build-time `object → Theme` helper may come later).

**`<ThemeProvider>`**
The single Mind UI provider component. **Wraps `next-themes`** for mode (system detection, persistence, no-flash) and adds **brand injection** on top. Accepts a `theme` prop. Sets `[data-mind-theme]` and the mode class on `<html>`.

**Brand injection**
Passing a `Theme` to `<ThemeProvider theme={...}>`. The provider serializes it into a scoped `<style>` block (`[data-mind-theme="x"]{…}` + `[data-mind-theme="x"].dark{…}`), so custom themes from other packages apply at runtime.

**Dual delivery**
The two ways theme CSS reaches the page: (1) the **default Mind theme as static CSS** (`@mind-studio/ui/styles.css`, SSR-perfect), and (2) **any theme via the ThemeProvider** at runtime. Both coexist.

**Mode**
Light or dark. Implemented as the `.dark` class on `<html>` (shadcn-compatible), managed by `next-themes`. Orthogonal to brand.

---

## Components & distribution

**Pristine vendoring**
Importing shadcn primitives with ~zero edits and re-exporting them. All brand variation lives in tokens, so a shadcn upgrade is a re-vendor, not a merge. A component is **forked** only when a real need can't be tokenized.

**Curated core**
The v1 component set (Button, Input, Label, Card, Badge, Checkbox, Switch, Select, Tabs, Dialog, Tooltip, Separator) — chosen to exercise every token axis before widening toward shadcn parity.

**Source-scanned delivery**
How Mind UI's Tailwind utility classes reach a consumer: the package ships transpiled JS with class strings intact, and the consumer's Tailwind v4 config adds `@source` pointing at `@mind-studio/ui`'s `dist`, so *their* build generates the needed utilities. (Contrast: a precompiled CSS bundle, which Mind UI does **not** use for utilities.)

**Static token CSS**
The `@mind-studio/ui/styles.css` artifact carrying base tokens + the Mind default theme (light/dark). Imported by the consumer; protected from tree-shaking via `sideEffects: ["*.css"]`.

**ESM-only**
The package ships ECMAScript modules exclusively (no CJS). Built with **bunchee**, which preserves `"use client"` directives and reads the `exports` map.

**Internal authoring tool**
The shadcn CLI's role: the *maintainer* uses it to vendor primitives and seed the theme. It is never part of the consumer story.

---

## Quality

**Hard a11y gate**
WCAG AA is enforced, not suggested. CI **fails** on axe violations and contrast failures.

**Stories-as-tests**
Every Storybook story is executed as a test (via the Storybook Vitest addon) with **axe** run against it — so the story catalog *is* the accessibility/render suite.

**Contrast assertion**
A Vitest check that a built-in theme's key alias pairs (`fg/bg`, `primary/on-primary`) meet WCAG AA across light *and* dark.

**`validateThemeContrast(theme)`**
A helper shipped for consumers to check their *own* custom themes for AA compliance. Not a gate Mind UI owns (we can't gate a consumer's CI).

**Token docs**
Storybook documentation for base and alias tokens, **auto-rendered from the typed token source** so values can't drift from reality.
