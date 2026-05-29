# M1 — Token foundation ✅

**Goal:** lock the token layers, prove the grayscale-override path, author the two contrasting
demo brands with full axes, stand up the hard contrast gate, and auto-render token docs.

## Delivered

- **Two demo brands (full axes)**
  - `src/themes/ember.ts` — **warm / rounded** (`radius: 1rem`, warm primary, dots pattern).
  - `src/themes/arctic.ts` — **cool / sharp** (`radius: 0`, cool primary, grid pattern) with a
    **grayscale-ramp override** that automatically retints every structural alias referencing
    `var(--mind-gray-*)` — the two-layer model paying off.
  - Both ship only their diffs and inherit the rest from Mind.
- **Logo / symbol / pattern axes**
  - `src/themes/assets.ts` — compact inline-SVG wordmarks + symbols (light/dark) as data URIs.
  - `src/components/brand.tsx` — `Logo`, `Symbol`, `Pattern` components (read the active theme +
    resolved mode) and a standalone `patternStyle()` helper (grid/dots/noise/mesh).
- **Contrast gate (the hard a11y rule for color)**
  - `src/theme/color.ts` — inlined sRGB↔OKLCH + WCAG relative-luminance / contrast-ratio math.
  - `src/theme/contrast.ts` — resolves a theme's aliases (layered over Mind, following the base
    ramp) to literal colors and checks every required pair; exports `validateThemeContrast()` for
    consumers.
  - `tests/contrast.test.ts` — asserts ≥4.5:1 on every required pair across **all 3 brands ×
    light/dark**, plus gate self-tests.
- **Auto-rendered docs**
  - `stories/Tokens.stories.tsx` — base grayscale + alias swatches rendered from `GRAY_STEPS` /
    `ALIAS_TOKENS` (the token source), so values can't drift. Custom docs page (no duplicate
    Primary block).
  - `stories/Brands.stories.tsx` — per-brand summary (logo, symbol, pattern, palette, radius).

## Definition of Done — verified

- `pnpm test` green including contrast across 3 themes × light/dark.
- Token docs + brand summary render live values in Storybook (brand × mode toolbar).

## Decisions made here

- Color schema accepts `var(--mind-*)` references (not just hex/oklch) so structural aliases can
  point at base primitives — the contrast resolver follows the references through the
  (possibly brand-overridden) ramp.
- Dark borders use low-opacity white (`oklch(1 0 0 / 0.1)`) rather than a solid gray step, for a
  subtle edge on dark surfaces.
