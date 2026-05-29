# Mind UI — Automode Goal

**Build `@mind/ui` through the full v1 core (M0 → M2)**, following [`PRD.md`](./PRD.md) and the locked decisions in PRD §5. Track terminology against [`GLOSSARY.md`](./GLOSSARY.md) and the build plan in `.claude/plans/i-want-you-to-playful-gizmo.md`.

---

## Done when

1. **Build + types + tests all green:**
   ```
   pnpm build && pnpm typecheck && pnpm test
   ```
   covering — build (bunchee ESM, `"use client"` preserved, `.d.ts` emitted), typecheck, stories-as-tests, axe a11y, and contrast assertions (≥4.5 AA) across **all 3 brands × light/dark**.

2. **Storybook proves multi-brand theming live:**
   ```
   pnpm storybook
   ```
   shows the curated-core components switching live across **Mind + 2 demo brands** in **light/dark**, with the static Mind CSS showing no SSR flash.

3. **Published tarball is clean** (`pnpm pack`): contains `dist` (ESM + `.d.ts` + preserved `"use client"`) + `styles.css`; excludes `.storybook` and stories.

---

## Scope (M0 → M2)

| Milestone | End state |
|---|---|
| **M0 — Skeleton** | Single package, Tailwind v4, bunchee build, Zod `Theme` schema (full 7 axes), base + alias tokens seeded from `b1aKNEsKI`, Mind default as static CSS, `<ThemeProvider>` wrapping `next-themes`, one **Button** live in Storybook across 3 brands × light/dark. Ends with `CLAUDE.md`. |
| **M1 — Token foundation** | Base + alias layers locked, grayscale-override path working, 2 demo brands authored (warm/rounded, cool/sharp) with full axes, contrast CI gate green across 3 themes × light/dark, auto-rendered token docs + brand-summary story. |
| **M2 — Curated core** | Curated set ported & retokenized (Input, Label, Card, Badge, Checkbox, Switch, Select, Tabs, Dialog, Tooltip, Separator — Button done in M0), example stories + autodocs, axe CI gate green over all stories, RTL tests for Dialog focus trap + Select keyboard nav. |

Out of scope for this goal: M3 (DX & publish) and M4 (first consumer) — see PRD §12.

## Theme axes (v1, full set of 7)

`color` · `grayscale` · `radius` · `font` (sans/serif/mono) · `logo` (`{light,dark}`) · `symbol` (`{light,dark}`) · `pattern` (discriminated union: `grid`/`noise`/`dots`/`mesh` + opacity, or `none`).

## Guardrails

- Keep shadcn components **pristine** — fork only when a need can't be expressed through tokens.
- Aliases use **shadcn's exact var names** so vendored components stay unmodified.
- **Verify the `b1aKNEsKI` preset** defines a full light+dark OKLCH token set before seeding base tokens.
- Explicit light/dark — **no derivation engine** in v1; missing `dark.*` falls back to **base**, never the light value.
