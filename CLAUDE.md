# CLAUDE.md — `@mind/ui`

Mind UI is a **shadcn-native, multi-brand design system** for Mind projects: a single
published npm package of pristine-vendored shadcn components, a two-layer token system, a
`<ThemeProvider>`, and the built-in brands. See **[PRD.md](./PRD.md)** for the full spec,
**[GLOSSARY.md](./GLOSSARY.md)** for vocabulary, and **[GOAL.md](./GOAL.md)** for the
current build goal.

## Commands

```bash
pnpm gen:css        # regenerate styles.css from the typed token source
pnpm build          # gen:css → bunchee (ESM) → copy styles.css into dist
pnpm typecheck      # tsc --noEmit
pnpm test           # vitest: contrast gate + stories/components + axe
pnpm storybook      # dev Storybook (brand × mode toolbar)
pnpm build-storybook
```

> Native build scripts (esbuild/sharp/swc) are approved in `pnpm-workspace.yaml`
> (`allowBuilds`). `.npmrc` sets `verify-deps-before-run=false`.

## Architecture (locked — see PRD §5)

- **Two token layers.** `base` = brand-agnostic primitives named `--mind-*`
  (`src/tokens/base.ts`). `alias` = semantic tokens using **shadcn's exact variable names**
  (`--background`, `--primary`, `--radius`, …; `src/tokens/aliases.ts`) so vendored shadcn
  components stay pristine. Structural aliases reference `var(--mind-*)`; brand colors are
  OKLCH literals. **Components never reference base tokens directly.**
- **Theme = typed Zod object, explicit light/dark, 7 axes** (`src/theme/schema.ts`):
  color, grayscale, radius, font, logo, symbol, pattern. **No derivation engine** — a token a
  theme omits falls back to base; a missing `dark` token falls back to the base **dark** value,
  never light.
- **Mind is the default** (`src/themes/mind.ts`): its alias maps are *complete* and populate
  the unscoped `:root` / `.dark`. Demo brands (`ember`, `arctic`) ship only their diffs.
- **CSS is generated from TS** (`scripts/gen-styles.ts` → `styles.css`) so the static CSS can
  never drift from the token source. `src/theme/serialize.ts` is the one serializer shared by
  the generator, the runtime injector, and the contrast resolver.
- **`<ThemeProvider>`** (`src/theme/provider.tsx`) wraps `next-themes` (`attribute="class"`,
  `.dark` = mode) and injects the active theme's scoped CSS under `[data-mind-theme]`. Both
  modes are always emitted.
- **Dual delivery.** Mind default ships as static CSS (`@mind/ui/styles.css`, SSR-perfect);
  any theme injects at runtime via the provider.

## Conventions

- **Pristine vendoring.** Vendor shadcn primitives with ~zero edits (only the `cn` import path
  → `../lib/cn`). Re-export from `src/index.ts`. Fork only when a need can't be tokenized.
- **Accessibility is a hard gate.** `tests/contrast.test.ts` enforces WCAG AA (≥4.5:1) on every
  required pair across all built-in themes × light/dark. Component/story render tests run axe
  (`src/test/axe.ts`) — axe's `color-contrast` rule is disabled there (no layout in happy-dom);
  contrast is covered by the math-based gate instead. `validateThemeContrast()` is exported for
  consumers to check their own themes.
- **Build:** bunchee, ESM-only, preserves `"use client"`, `sideEffects: ["*.css"]`.
- After changing tokens or themes, run `pnpm gen:css` (or `pnpm build`) so `styles.css` matches.

## Layout

```
src/
  components/   vendored shadcn primitives + *.test.tsx
  theme/        schema · serialize · inject · provider · contrast · color
  tokens/       base (--mind-*) · aliases (shadcn names) + CONTRAST_PAIRS
  themes/       mind (default, complete) · ember · arctic · index
  lib/cn.ts · test/axe.ts · index.ts (barrel)
scripts/        gen-styles.ts · copy-styles.mjs
stories/        component example stories (+ token docs in M1)
tests/          contrast gate
.storybook/     main · preview (brand × mode toolbar) · tailwind.css
```

> The `b1aKNEsKI` shadcn preset named in the PRD was not available as a file; base tokens were
> seeded from a standard neutral OKLCH ramp and a Mind indigo. Values are tunable — the contrast
> gate is the source of truth for "is this accessible."
