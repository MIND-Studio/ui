# M2 — Curated core ✅

**Goal:** port the curated v1 component set (retokenized, pristine), add example stories +
autodocs, and make the story catalog itself the accessibility suite.

## Delivered

- **Curated core (pristine-vendored shadcn)** — re-exported from `src/index.ts`:
  Button (M0), Input, Label, Card, Badge, Checkbox, Switch, Select, Tabs, Dialog, Tooltip,
  Separator. Only edit vs. upstream is the `cn` import path (`../lib/cn`); all brand variation
  lives in tokens.
- **Example stories + autodocs** — one `*.stories.tsx` per component under `stories/components/`,
  authored accessibly (labels associated, dialog titled, etc.), full-width `fullscreen` layout.
- **Stories-as-tests + axe gate** — `stories/stories.test.tsx`: `composeStories` +
  `setProjectAnnotations` (shared ThemeProvider decorator) render **every story** through axe in
  happy-dom. axe's layout-dependent `color-contrast` rule is disabled here (covered by the
  math-based contrast gate instead).
- **Behavioral tests** — `src/components/dialog.test.tsx` (opens, **focus trap**, Escape closes)
  and `src/components/select.test.tsx` (combobox name, **keyboard open + arrow-nav + select**).
  happy-dom shims for Radix (`scrollIntoView`, pointer capture, `matchMedia`) live in
  `vitest.setup.ts`.
- **Storybook UI** — dark chrome (`.storybook/manager.ts` + `docs.theme`), iframe `body` themed so
  the whole canvas follows the brand × mode toggle.

## Definition of Done — verified

- `pnpm test` green across **all components × brands**: contrast + 24 stories-as-tests with axe +
  Dialog/Select behavior = **44 tests passing**.
- `pnpm build` green (ESM, `"use client"` preserved across all interactive chunks).
- `pnpm build-storybook` exits 0; `pnpm pack` tarball = `dist/` + `styles.css`, excludes
  `src`/`stories`/`tests`/`.storybook`.

## Decisions made here

- **Stories-as-tests via `composeStories` + axe in happy-dom** (from `@storybook/react-vite`),
  not Storybook's Playwright browser runner — offline-deterministic and fast.
- The shared decorator lives in `.storybook/with-theme.tsx` (no CSS import) so both Storybook's
  preview and the vitest gate apply the same `<ThemeProvider>`.
