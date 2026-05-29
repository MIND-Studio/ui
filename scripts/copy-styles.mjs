/* Copy the generated token stylesheet into dist/ after bunchee builds. */
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, "../styles.css");
const distDir = resolve(here, "../dist");
const dest = resolve(distDir, "styles.css");

if (!existsSync(src)) {
  console.error("[copy-styles] missing styles.css — run `pnpm gen:css` first");
  process.exit(1);
}
if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });
copyFileSync(src, dest);
console.log(`[copy-styles] ${src} -> ${dest}`);
