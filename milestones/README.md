# Milestones — `@mind-studio/ui`

Progress log for the build defined in [`../GOAL.md`](../GOAL.md), spec'd in
[`../PRD.md`](../PRD.md). Each milestone has a verifiable Definition of Done; the table
below reflects the state as of PR [#1](https://github.com/MIND-Studio/ui/pull/1)
(`feat/mind-ui-v1-core`).

| Milestone | Scope | Status |
|---|---|---|
| [M0 — Skeleton](./M0-skeleton.md) | Package, tokens, ThemeProvider, one component live | ✅ Done |
| [M1 — Token foundation](./M1-token-foundation.md) | 2 demo brands, grayscale override, logo/symbol/pattern, contrast gate, token docs | ✅ Done |
| [M2 — Curated core](./M2-curated-core.md) | 12-component core, stories-as-tests + axe gate | ✅ Done |
| M3 — DX & publish | Changesets, polish, first npm publish (0.x) | ⏳ Not started |
| M4 — First consumer | Dogfood in a real Mind app, then cut 1.0 | ⏳ Not started |

## Current state at a glance

- **Green gates:** `pnpm build && pnpm typecheck && pnpm test` all pass — bunchee ESM build
  (`"use client"` preserved), strict typecheck, and **44 tests** (contrast across 3 brands ×
  light/dark, 24 stories-as-tests with axe, Dialog focus-trap + Select keyboard-nav).
- **Storybook:** `pnpm build-storybook` exits 0; brand × mode toolbar, auto-rendered token
  docs, brand summary; dark Storybook UI chrome.
- **Package:** `pnpm pack` ships `dist/` (ESM + `.d.ts`) + `styles.css` only.

## How to verify

```bash
pnpm install
pnpm build && pnpm typecheck && pnpm test   # all green
pnpm storybook                              # brand × mode toolbar, live switching
```

## Out of scope for v1 core (tracked for later)

- Real `b1aKNEsKI` preset values (base tokens currently seeded from a neutral OKLCH ramp +
  Mind indigo, tuned to pass the contrast gate).
- Real demo-brand identities + brand-asset art (Ember/Arctic logos, symbols, patterns are
  placeholders).
- Per-component subpath exports (barrel-only for now).
- Visual-regression suite (deferred; axe + contrast cover the high-value regressions).
