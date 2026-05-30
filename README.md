# @mind-studio/ui

A shadcn-native, multi-brand design system for Mind projects. Ships React
components, theme tokens, and blocks, with a generated `styles.css` token sheet.

Published to **GitHub Packages** under the `MIND-Studio` org.

## Install (consumers)

GitHub Packages requires authentication even for public packages, so each
consumer repo needs a scoped `.npmrc`:

```ini
# .npmrc
@mind-studio:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Then set `NODE_AUTH_TOKEN` to a GitHub PAT with `read:packages` (in CI, the
job's `GITHUB_TOKEN` works for same-org repos), and:

```bash
npm install @mind-studio/ui
```

Wire the styles in your `globals.css` (Tailwind v4):

```css
@import "tailwindcss";
@import "../../node_modules/@mind-studio/ui/dist/styles.css"; /* real path, not the exports subpath */
@source "../../node_modules/@mind-studio/ui/dist";
```

## Publishing (maintainers)

```bash
pnpm build            # gen:css → bunchee → copy-styles
npm version <patch|minor|major>
npm publish           # publishConfig points at npm.pkg.github.com
```

Requires a token with `write:packages` (`gh auth refresh -s write:packages,read:packages`).
The package links to its repo via the `repository` field in `package.json`.

## Develop

```bash
pnpm storybook        # component workbench on :6006
pnpm test             # vitest
pnpm typecheck
```

See `PRD.md` / `GOAL.md` / `GLOSSARY.md` for design rationale.
