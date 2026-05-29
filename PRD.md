# Mind UI — PRD

**Status:** draft v0.1 — 2026-05-29
**Owner:** Sven
**Package:** `@mind/ui`

---

## 1. One-liner

A **shadcn-native, multi-brand design system** for all Mind projects, built on Tailwind v4 + Next.js + shadcn/ui and distributed as a single published npm package. Brands are typed theme objects; consumers pick the default `Mind` brand or inject a custom theme into the `<ThemeProvider>`. Storybook is the documentation and quality surface.

## 2. Goals

- **One package, N brands.** `pnpm add @mind/ui`, wrap the app in `<ThemeProvider>`, get the `Mind` brand by default; switch or inject custom brands at runtime.
- **Brand = typed config, not code.** A brand is a Zod-validated TS object. No new components needed to add a brand. Custom themes can live in *other* packages and be injected.
- **Two clean token layers** (base → alias) with full shadcn variable compatibility, so vendored components stay pristine.
- **Accessibility is a system property, not a suggestion.** WCAG AA enforced as a hard CI gate (axe + contrast).
- **Composability over completeness.** Pristine shadcn primitives, retokenized via the token layer. No business logic, no data fetching, no auth.
- **Clean documentation.** Storybook with live brand × mode switching, auto-generated token docs, and per-component playgrounds.

## 3. Non-goals (v1)

- No business logic, API layer, forms-with-mutations, or auth widgets.
- No per-brand component *overrides* — all brands share one component set; differences live in tokens only.
- No CMS or in-app brand editor (themes are authored as typed TS objects).
- No mobile-native targets. Web only, Next.js-targeted.
- No light/dark **derivation engine** in v1 — light & dark are authored explicitly (optional derivation helper may come later).
- No visual-regression suite in v1 (deferred; axe + contrast gates cover the high-value regressions).
- No public shadcn registry / preset distribution — npm package only.

## 4. Users

| Persona | Need |
|---|---|
| **Sven (system owner)** | Add/tune brands, port components, keep the catalog clean and accessible. |
| **Project dev (consumer)** | `pnpm add @mind/ui`, pick or inject a brand, build a UI without reinventing primitives. |
| **Designer / stakeholder** | Open Storybook, switch brands and modes, inspect tokens, copy a component example. |

## 5. Architecture decisions (locked)

| Decision | Choice | Why |
|---|---|---|
| Relationship to `facet` | **Fresh rebuild** | facet is dead; no code carried over. Cleaner shadcn-native take. |
| Distribution | **Published npm package** `@mind/ui` | Single source, versioned releases, `import`-based consumption. Public npm. |
| shadcn CLI | **Internal authoring tool only** | Used by the maintainer to vendor primitives; the `b1aKNEsKI` preset seeds the Mind default theme. Consumers never run shadcn. |
| Repo shape | **Single package + colocated Storybook** | Exactly one shippable artifact. Monorepo only when a 2nd appears. |
| Framework | **Next-coupled** | `next` is a peer dep; `next/link`/`next/image` used directly. Targets Mind's Next apps. |
| Tailwind | **v4, CSS-first `@theme`** | Native CSS variables, runtime-theming friendly, current shadcn default. |
| Style delivery | **Source-scanned utilities** + static token CSS | Consumers (all Tailwind v4) add `@source` to scan `dist`; smaller output + real integration. |
| Token layers | **Two: base → alias** | Alias uses shadcn's exact var names so vendored components stay pristine. No component-token layer. |
| Theme format | **Typed, Zod-validated object** with explicit light/dark | Predictable, authorable from another package, no derivation engine to trust. |
| Theme delivery | **Dual: static CSS for default + ThemeProvider for custom/runtime** | Mind default is SSR-perfect; custom themes inject at runtime. |
| Provider | **`<ThemeProvider>` wraps `next-themes`** | One export. Mode = `.dark` class, brand = `[data-mind-theme]`, both on `<html>`. |
| Components | **Pristine vendored shadcn, theme-via-tokens** | Fork only when a token can't express the need; shadcn upgrades stay cheap. |
| Build | **bunchee, ESM-only** | Preserves `"use client"`, reads `exports`, no dual-package hazard. |
| Accessibility | **Hard CI gate (axe + contrast)** | Accessibility is a property of the system, enforced not suggested. |
| Versioning | **Changesets → public npm, 0.x until first consumer** | Standard release flow; cut 1.0 after dogfooding. |

## 6. Token model

Two layers, both shipped as CSS variables:

1. **Base (primitives)** — raw, brand-agnostic scales seeded from the `b1aKNEsKI` preset: a grayscale ramp (light + dark), accent ramps, radius scale, font stacks, spacing. Named `--mind-*`. Components never reference these directly.
2. **Alias (semantic)** — what components consume: `--background`, `--foreground`, `--primary`, `--border`, `--ring`, `--radius`, etc. **These use shadcn's exact names**, so vendored shadcn components work unmodified. Each alias points at a base token.

A **brand/theme** remaps which base tokens the aliases resolve to, and may extend base (e.g. add an accent ramp) or **override the grayscale ramp**. By default a brand **inherits the base grayscale**.

### Theme object — full 7 axes

A `Theme` is a Zod-validated object carrying **all seven axes**: color (`light`/`dark` alias
maps), grayscale (ramp override), radius, font (sans/serif/mono), logo (`{light,dark}`), symbol
(`{light,dark}`), and pattern (discriminated union: `grid`/`dots`/`noise`/`mesh` + opacity, or
`none`). Every axis except `name`/`label` is optional and falls back to base.

```ts
export const mind: Theme = {
  name: 'mind',
  label: 'Mind',
  light: { /* alias overrides for light mode */ },
  dark:  { /* alias overrides for dark mode  */ },
  radius: '0.625rem',
  // optional: grayscale, font, logo, symbol, pattern
};
```

- A brand writes only the tokens it **changes**, for whichever modes it changes.
- Anything unspecified falls back to **base** — which already ships both light and dark grayscale.
- If `light.primary` is set but `dark.primary` is omitted, dark falls back to the **base** primary (never the light value).
- **No derivation** — light and dark are authored explicitly. A derivation helper (object → `Theme`) may be added later as build-time authoring sugar, never a runtime dependency.

### Delivery

- **Default Mind theme** is emitted as **static CSS** (`@mind/ui/styles.css`), imported in the consumer's `globals.css` — SSR-perfect, zero JS for the common case.
- **`<ThemeProvider theme={...}>`** serializes any theme into a scoped `<style>` block (`[data-mind-theme="x"]{…}` + `[data-mind-theme="x"].dark{…}`), so custom themes from other packages inject cleanly and mode is a class flip.
- The provider wraps `next-themes` (`attribute="class"`) for mode (system detection, persistence, no-flash). Mode = `.dark` on `<html>`; brand = `[data-mind-theme]` on `<html>`.

## 7. Component scope

- **Strategy:** vendor shadcn primitives with ~zero edits, re-export from `@mind/ui`. All brand variation lives in the token layer. Fork a component only when a real need can't be tokenized.
- **v1 — curated core** (exercises every token axis: color, radius, font, focus ring, light/dark):
  Button, Input, Label, Card, Badge, Checkbox, Switch, Select, Tabs, Dialog, Tooltip, Separator.
- Expand toward fuller shadcn parity after the core proves the pipeline end-to-end.

## 8. Brands

- **Mind** — the polished default, tuned from the `b1aKNEsKI` seed.
- **Two contrasting demo brands** — one **warm / rounded**, one **cool / sharp** — so brand-switching is visibly dramatic in Storybook and the demos double as worked **"custom theme from another package"** examples. (Names/values TBD when authored.)

Each built-in brand is a living test in the contrast suite.

## 9. Documentation & quality — Storybook

- **Storybook 9 + Next adapter** (`@storybook/experimental-nextjs-vite`).
- **Brand + mode toolbar globals** drive a `<ThemeProvider>` decorator — every story renders under any brand × mode.
- **Token docs auto-rendered from the typed token source** (base, aliases) — single source of truth, can't drift.
- **Component docs:** autodocs (props from TS types) + hand-written example stories ("playground and example stories").
- **Accessibility — hard CI gate:**
  - `@storybook/addon-a11y` for in-panel axe feedback during dev.
  - **Vitest + Storybook Vitest addon** runs every story as a test with axe; CI **fails on violations**.
  - **Contrast assertions** (plain Vitest) over the 3 built-in themes × light/dark on key alias pairs (`fg/bg`, `primary/on-primary`).
  - `validateThemeContrast(theme)` helper shipped for consumers to check their own custom themes (not a gate we own).
  - **React Testing Library** interaction tests only for behavioral components (Dialog focus trap, Select keyboard nav).
- **Visual regression:** deferred to a later milestone.

## 10. Tech stack

- **Runtime target:** Next.js 15 (App Router), React 19.
- **Styling:** Tailwind v4 (CSS-first `@theme`), CSS variables for all tokens.
- **Components:** shadcn/ui primitives, vendored + retokenized via the token layer.
- **Theming:** typed `Theme` (Zod-validated), `next-themes` under the `<ThemeProvider>`.
- **Build:** bunchee, ESM-only. `react`/`react-dom`/`next`/`tailwindcss` as peer deps. `sideEffects: ["*.css"]`.
- **Exports:** `.` (components + ThemeProvider), `./themes` (Mind + 2 demos), `./styles.css` (static base + default theme).
- **Docs:** Storybook 9 + Next adapter.
- **Testing:** Vitest, Storybook Vitest addon (stories-as-tests + axe), contrast suite, RTL where behavioral.
- **Release:** Changesets → public npm, 0.x until first consumer, then 1.0.
- **Package manager:** pnpm (matches Mind house style).

## 11. Repo structure

Single package, Storybook colocated:

```
ui/
├── .storybook/                 # Storybook 9 config (Next adapter, ThemeProvider decorator, brand+mode globals)
├── src/
│   ├── components/             # vendored shadcn primitives, re-exported
│   ├── theme/
│   │   ├── provider.tsx        # <ThemeProvider> (wraps next-themes + brand injection)
│   │   ├── schema.ts           # Theme Zod schema
│   │   ├── inject.ts           # theme object → scoped <style>
│   │   └── contrast.ts         # validateThemeContrast()
│   ├── tokens/
│   │   ├── base.ts             # primitive ramps (grayscale, accents, radius, fonts) — single source of truth
│   │   └── aliases.ts          # semantic → base mapping (shadcn var names)
│   ├── themes/
│   │   ├── mind.ts             # default brand (seeded from b1aKNEsKI)
│   │   ├── <warm-demo>.ts
│   │   ├── <cool-demo>.ts
│   │   └── index.ts
│   ├── styles.css              # static: base tokens + Mind default (light/dark)
│   └── index.ts                # barrel
├── stories/                    # token docs (auto-rendered) + per-component example stories
├── tests/                      # contrast suite
├── components.json             # shadcn config (internal authoring)
├── package.json                # exports map, peer deps, sideEffects
├── bunchee / tsup config
├── vitest config               # + Storybook Vitest addon
└── PRD.md
```

## 12. Phased milestones

**M0 — Skeleton.** Single package, Tailwind v4, bunchee build, `Theme` Zod schema, base + alias tokens seeded from `b1aKNEsKI`, Mind default theme as static CSS, `<ThemeProvider>` wrapping next-themes, one **Button** rendering live in Storybook under all 3 brands × light/dark.

**M1 — Token foundation.** Base + alias layers locked, grayscale-override path working, 2 demo brands authored, contrast CI gate green across 3 themes × light/dark, auto-rendered token docs.

**M2 — Core components.** The v1 curated set ported, retokenized, example stories + autodocs, axe CI gate green across all stories.

**M3 — DX & publish.** `validateThemeContrast` helper, Storybook polish, Changesets release pipeline, first publish to public npm (0.x).

**M4 — First consumer.** Import into one real Mind app, dogfood, fix what hurts, then cut 1.0.

## 13. Open questions / secondary decisions

1. **Demo brand identities** — real names + token values for the warm/rounded and cool/sharp demos. *(TBD at M1.)*
2. **`b1aKNEsKI` preset contents** — confirm it defines a full light+dark OKLCH token set before seeding base. *(Verify at M0.)*
3. **Per-component subpath exports** — barrel-only for v1; revisit if tree-shaking needs it.
4. **Theme axes — RESOLVED:** v1 carries the full 7 axes (color, grayscale, radius, font, logo, symbol, pattern). A build-time object→`Theme` derivation helper remains deferred; explicit light/dark authoring for v1.
5. **Visual regression** — Chromatic vs Playwright screenshots. *(Deferred; revisit if drift hurts.)*
6. **Versioning cutover** — 1.0 after first consumer dogfoods (M4).
