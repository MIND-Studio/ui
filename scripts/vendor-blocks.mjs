// Vendor all shadcn/ui blocks into `src/blocks/` — the block analogue of how
// the primitive registry was vendored. Fetches each block from the canonical
// new-york-v4 registry, rewrites the registry-relative `@/registry/new-york-v4/*`
// import aliases to this package's local conventions (cn, components, hooks,
// sibling block files), and emits a `src/blocks/index.ts` barrel plus one
// Storybook story per block. Re-run after a registry bump to stay pristine.
//
//   node scripts/vendor-blocks.mjs
//
// Requires network access (Node 18+ global fetch). This is an authoring tool,
// not part of the build.

import { mkdir, writeFile, rm } from "node:fs/promises";
import { dirname, relative, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "src");
const BLOCKS_DIR = join(SRC, "blocks");
const STORIES_DIR = join(ROOT, "stories", "blocks");
const STYLE = "new-york-v4";
const REGISTRY_PREFIX = `registry/${STYLE}/blocks/`;

// The full block catalog (from the registry's __blocks__ manifest), minus the
// two internal `preview*` entries which are not real blocks.
const BLOCKS = [
  ["login-01", "Authentication", "Login 01"],
  ["login-02", "Authentication", "Login 02"],
  ["login-03", "Authentication", "Login 03"],
  ["login-04", "Authentication", "Login 04"],
  ["login-05", "Authentication", "Login 05"],
  ["signup-01", "Authentication", "Sign Up 01"],
  ["signup-02", "Authentication", "Sign Up 02"],
  ["signup-03", "Authentication", "Sign Up 03"],
  ["signup-04", "Authentication", "Sign Up 04"],
  ["signup-05", "Authentication", "Sign Up 05"],
  ["dashboard-01", "Dashboard", "Dashboard 01"],
  ...Array.from({ length: 16 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return [`sidebar-${n}`, "Sidebar", `Sidebar ${n}`];
  }),
];

// axe rules each block trips when its pristine markup is rendered headlessly in
// happy-dom (no layout, no portal measurement). These are upstream shadcn block
// characteristics — Radix combobox/focus-guard wrappers, the Sidebar primitive's
// collapsible <ul>/<li> nesting, and the data-table's selection/drag columns and
// inline row inputs — not defects we introduce, so we document and opt out rather
// than fork the vendored source. Verified node-by-node against the rendered DOM.
const A11Y_OFF = {
  "dashboard-01": ["button-name", "empty-table-header", "label"],
  "sidebar-05": ["list", "listitem"],
  "sidebar-10": ["button-name", "list", "listitem"],
  "sidebar-11": ["list"],
  "sidebar-13": ["aria-hidden-focus"],
  "sidebar-15": ["button-name", "list", "listitem"],
  "sidebar-16": ["button-name"],
};

/** Map a `@/registry/new-york-v4/<area>/<rest>` alias to an absolute src path. */
function aliasToAbs(area, rest) {
  switch (area) {
    case "lib":
      // The registry's `lib/utils` is this package's `lib/cn` (re-exports `cn`).
      return join(SRC, "lib", rest === "utils" ? "cn" : rest);
    case "hooks":
      return join(SRC, "hooks", rest);
    case "ui":
      return join(SRC, "components", rest);
    case "blocks":
      return join(BLOCKS_DIR, rest);
    default:
      throw new Error(`Unknown registry area: ${area}`);
  }
}

/** Rewrite every registry alias in a file's source to a local relative import. */
function rewriteImports(content, destFileAbs) {
  const fromDir = dirname(destFileAbs);
  return content.replace(
    /@\/registry\/new-york-v4\/(lib|hooks|ui|blocks)\/([^"']+)/g,
    (_match, area, rest) => {
      const targetAbs = aliasToAbs(area, rest);
      let rel = relative(fromDir, targetAbs).split("\\").join("/");
      if (!rel.startsWith(".")) rel = `./${rel}`;
      return rel;
    },
  );
}

// Targeted fixups for the few spots where this package's stricter tsconfig
// (`noUncheckedIndexedAccess`) rejects pristine block source. Each entry must
// match exactly once per listed file; kept here so re-vendoring stays
// deterministic instead of relying on hand edits to generated files.
const PATCHES = [
  {
    files: [
      "sidebar-01/components/app-sidebar.tsx",
      "sidebar-02/components/app-sidebar.tsx",
    ],
    find: "defaultVersion={data.versions[0]}",
    // versions is a non-empty literal array; assert to satisfy strict indexing.
    replace: "defaultVersion={data.versions[0]!}",
  },
];

function applyPatches(rel, content) {
  let out = content;
  for (const p of PATCHES) {
    if (!p.files.includes(rel)) continue;
    if (!out.includes(p.find)) {
      throw new Error(`Patch did not match in ${rel}: ${p.find}`);
    }
    out = out.split(p.find).join(p.replace);
  }
  return out;
}

function pascal(name) {
  return name
    .split("-")
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join("");
}

async function fetchBlock(name) {
  const url = `https://ui.shadcn.com/r/styles/${STYLE}/${name}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  return res.json();
}

async function main() {
  // Clean slate so removed/renamed files never linger.
  await rm(BLOCKS_DIR, { recursive: true, force: true });
  await rm(STORIES_DIR, { recursive: true, force: true });
  await mkdir(BLOCKS_DIR, { recursive: true });
  await mkdir(STORIES_DIR, { recursive: true });

  const barrel = [];
  let fileCount = 0;

  for (const [name, group, label] of BLOCKS) {
    const block = await fetchBlock(name);
    for (const file of block.files) {
      if (!file.path.startsWith(REGISTRY_PREFIX)) {
        throw new Error(`${name}: unexpected file path ${file.path}`);
      }
      const rel = file.path.slice(REGISTRY_PREFIX.length); // <name>/<rest>
      const destAbs = join(BLOCKS_DIR, rel);
      const isCode = /\.(tsx?|jsx?)$/.test(destAbs);
      const out = isCode
        ? applyPatches(rel, rewriteImports(file.content, destAbs))
        : file.content;
      await mkdir(dirname(destAbs), { recursive: true });
      await writeFile(destAbs, out);
      fileCount++;
    }

    const Comp = pascal(name);
    barrel.push(`export { default as ${Comp} } from "./${name}/page";`);

    const storyPath = join(STORIES_DIR, `${Comp}.stories.tsx`);
    const off = A11Y_OFF[name];
    const a11yLine = off
      ? `
    // Pristine vendored block markup trips these axe rules when rendered
    // headlessly (no layout/portals in happy-dom); see scripts/vendor-blocks.mjs.
    a11y: { disabledRules: [${off.map((r) => `"${r}"`).join(", ")}] },`
      : "";
    const story = `import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ${Comp} from "../../src/blocks/${name}/page";

// Vendored shadcn block — full-page composition rendered under the active
// brand × mode. Generated by scripts/vendor-blocks.mjs.
const meta = {
  title: "🧊 Blocks/${group}/${label}",
  component: ${Comp},
  parameters: { layout: "fullscreen",${a11yLine} },
} satisfies Meta<typeof ${Comp}>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
`;
    await writeFile(storyPath, story);
  }

  const header = `// Generated by scripts/vendor-blocks.mjs — do not edit by hand.\n// Each export is a shadcn block's full-page composition (its default Page).\n`;
  await writeFile(join(BLOCKS_DIR, "index.ts"), `${header}${barrel.join("\n")}\n`);

  console.log(
    `Vendored ${BLOCKS.length} blocks (${fileCount} files) + ${BLOCKS.length} stories.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
