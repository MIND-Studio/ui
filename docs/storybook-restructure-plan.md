# 📚 Storybook Docs Restructure — Implementation Plan

## 🎯 Goal

Reorganize Storybook from `Foundations(Icons) · Tokens · Brands · Components · Patterns · Blocks`
into a 5-section IA: **👋 Getting Started · 🌱 Foundations · 🧩 Components · 🎛️ Patterns · 🧊 Blocks**,
dissolving `Tokens` into Foundations and adding Welcome, Motion, Imagery, and Avatars pages.

## 🧭 Guiding constraints (locked decisions)

- **Blocks stays `./blocks`** — no rename of the published export.
- **Generated token renderings are reused, not rewritten** — drift-proof guarantee preserved.
- **No vendored-component edits** (Motion stays descriptive).
- **No binary assets in the package** — Imagery/Avatars reference CDN URLs (free CDN now → Mind CDN later).
- Emoji on **top-level sections only**; story **IDs stay stable** (Storybook strips emoji from slugs, so no deep-links/URLs break).
- **MDX** for prose pages (Welcome, Motion, Imagery, Avatars); **TSX** for generated/interactive pages (Colors, Typography, Shapes, Brands, Icons).
- **Getting Started** = orientation only (Welcome, Brands). **Foundations** owns design language *and* assets, flat list, design-language first.

## 📐 Final structure

```
👋 Getting Started
   • Welcome            (MDX — intro, using the package, contribute via GitHub/
                         conventional-commits/release-please, curated deep-links)
   • Brands             (TSX — toolbar-driven single-brand preview + 3-brand intro)

🌱 Foundations
   • Colors             (TSX — existing generated swatches + guidance prose)
   • Typography         (TSX — existing generated story + guidance prose)
   • Shapes             (TSX — existing Radius story, renamed + prose; radius only)
   • Motion             (MDX — descriptive conventions + a few live previews)
   • Icons              (TSX — existing lucide grid)
   • Imagery            (MDX — reference gallery, CDN-hosted URLs)
   • Avatars            (MDX — reference gallery, CDN-hosted URLs)

🧩 Components           (unchanged — Introduction + existing group order)

🎛️ Patterns            (the existing "Coming Soon" demo, room to grow)

🧊 Blocks               (unchanged — the real ./blocks shadcn compositions)
```

---

## Phase 1 — 🏗️ Section scaffolding & `storySort`

**1.1** Rewrite `.storybook/preview.tsx` `options.storySort.order`:

```
["👋 Getting Started", ["Welcome", "Brands"],
 "🌱 Foundations", ["Colors","Typography","Shapes","Motion","Icons","Imagery","Avatars"],
 "🧩 Components", ["Introduction","Forms","Buttons & Actions","Overlays",
                   "Navigation","Data Display","Feedback","Layout","Utilities"],
 "🎛️ Patterns",
 "🧊 Blocks"]
```

**1.2** Create `stories/getting-started/` and `stories/foundations/` dirs (MDX glob already matches `stories/**/*.mdx`, so no `main.ts` change needed).

**1.3 — ⚠️ Emoji prefix churn.** To make the 5 top-level chips show emoji, every story's title prefix must change segment text:

- `stories/components/*.stories.tsx` → `Components/…` ⇒ `🧩 Components/…` (hand-authored — direct edits, ~90 files, scripted find-replace).
- Blocks: **edit `scripts/vendor-blocks.mjs`** (it generates the block titles) so it emits `🧊 Blocks/…`, then re-run it — *do not* hand-edit generated `stories/blocks/*`.
- `SidebarComingSoon.stories.tsx` → `🎛️ Patterns/Sidebar/Coming Soon`.
- Verify: story IDs are unchanged (emoji stripped on slugify) — confirm with a quick `storybook build` or by diffing the `__id` of one story before/after.

---

## Phase 2 — 👋 Getting Started

**2.1 Welcome** — new `stories/getting-started/Welcome.mdx`:

- Intro to `@mind-studio/ui` (shadcn-native, multi-brand, two-layer tokens) — sourced from README/CLAUDE.md, not re-invented.
- "Using the package" (install, `<ThemeProvider>`, `styles.css` vs runtime injection, import paths incl. `./blocks`).
- "Contributing / requesting changes" — internal team: clone → branch → Conventional Commit → PR → release-please; request = open a GitHub issue.
- **Curated deep-links** (Storybook `?path=/docs/...` / story IDs) to: `🌱 Foundations/Colors`, `🧩 Components/Introduction`, `🧊 Blocks`. Keep the set small.

**2.2 Brands** — `stories/Brands.stories.tsx`:

- Retitle `Brands/Summary` → `👋 Getting Started/Brands`.
- Add a short intro paragraph naming the 3 built-in brands (Mind/Ember/Arctic) and pointing at the toolbar switcher; keep the existing toolbar-driven live `Summary` body unchanged.

---

## Phase 3 — 🌱 Foundations (the big one)

**3.1 Dissolve `Tokens.stories.tsx`** into three TSX files, **reusing the existing render code verbatim**:

- Extract shared atoms (`Swatch`, `Pair`, `Group`, `swatchGrid`) into `stories/foundations/_token-ui.tsx`.
- `stories/foundations/Colors.stories.tsx` → title `🌱 Foundations/Colors` — the existing `Colors` story body + a short guidance prose intro (two-layer model, when to use surfaces vs brand vs sidebar).
- `stories/foundations/Typography.stories.tsx` → `🌱 Foundations/Typography` — existing `Typography` story + prose.
- `stories/foundations/Shapes.stories.tsx` → `🌱 Foundations/Shapes` — existing `Radius` story (renamed) + prose. **Scope: radius only** (honest, like Motion), noted as "room to grow into borders/shadows."
- Delete `stories/Tokens.stories.tsx`.

**3.2 Motion** — new `stories/foundations/Motion.mdx`:

- Descriptive only. Document shadcn's existing vocabulary (`animate-in/out`, `fade/zoom/slide-in-from`), the de-facto duration ladder (100/200/300ms), `prefers-reduced-motion`.
- A few **live previews** via embedded TSX (a dialog open, accordion expand, skeleton pulse) — import real components into the MDX.
- Explicit framing: "conventions, not enforced tokens."

**3.3 Icons** — `stories/Icons.stories.tsx`: retitle `Foundations/Icons` → `🌱 Foundations/Icons` (move file to `stories/foundations/` for tidiness). Body unchanged.

**3.4 CDN asset module** — `stories/foundations/_assets.ts`:

- Single source of truth: `const CDN_BASE = "..."` (free CDN now) + typed arrays `IMAGERY[]` and `AVATARS[]` (url, alt, credit/license). Later Mind-CDN swap = change `CDN_BASE` in one place.

**3.5 Imagery** — `stories/foundations/Imagery.mdx`:

- Guidance prose (tone, do/don't, aspect ratios) + a gallery rendered from `IMAGERY[]` with copy-the-URL affordance + license credit.

**3.6 Avatars** — `stories/foundations/Avatars.mdx`:

- Short prose + grid rendered from `AVATARS[]` (5 male / 5 female), copy-URL + credit. Reference-only.

---

## Phase 4 — 🎛️ Patterns & 🧊 Blocks

- **Patterns:** retitle the existing Coming-Soon demo to `🎛️ Patterns/Sidebar/Coming Soon` (Phase 1.3). Ships thin as an intentional placeholder.
- **Blocks:** title prefix only, via the vendor script (Phase 1.3). Compositions and `./blocks` export untouched.

---

## Phase 5 — ✅ Verify

- `pnpm typecheck` (moved/renamed files, new TSX imports).
- `pnpm test` — **check `stories/stories.test.tsx` picks up the new files and tolerates MDX pages** (axe runs on rendered stories; MDX docs may need inclusion or exclusion — confirm the harness). Imagery/Avatars galleries: ensure `alt` text so axe passes.
- `pnpm storybook` — eyeball: 5 emoji sections, correct order, deep-links resolve, brand toolbar still repaints Foundations/Brands, no orphaned `Tokens` entry.
- `pnpm build-storybook` — confirm clean build + stable story IDs.
- Run `pnpm gen:css`/`pnpm build` only if tokens changed — **they don't** here, so skip.

---

## 📋 File-change summary

| Action | Path |
|---|---|
| ✏️ Rewrite | `.storybook/preview.tsx` (storySort) |
| ➕ New MDX | `Welcome`, `Motion`, `Imagery`, `Avatars` |
| ➕ New TSX | `foundations/Colors`, `Typography`, `Shapes`, `_token-ui.tsx`, `_assets.ts` |
| 🔀 Move/retitle | `Brands`, `Icons`, `SidebarComingSoon` |
| 🗑️ Delete | `stories/Tokens.stories.tsx` |
| 🔧 Script edit + re-run | `scripts/vendor-blocks.mjs` (Blocks emoji prefix) |
| 🔁 Bulk retitle | `stories/components/*.stories.tsx` (Components emoji prefix) |

## ⚠️ Risks / watch-items

1. **Emoji-prefix bulk rename** is the largest churn — mechanical but touches ~90 component files + the block script. Mitigated by stable IDs.
2. **MDX in the test harness** — `stories.test.tsx` may not currently expect `.mdx`; verify before assuming green.
3. **Asset licensing** — even CDN-referenced images need a clear license noted per asset in `_assets.ts`.
4. **Shared token atoms** — extracting `Swatch`/`Pair`/`Group` must keep the live-CSS-var rendering intact so brand/mode toolbar still repaints.
