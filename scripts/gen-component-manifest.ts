/*
 * Component manifest generator — counts the "own + library-specific" props of
 * every vendored component, straight from the typed source via the TypeScript
 * compiler. Like `gen-styles.ts`, the output is generated from the typed source
 * so it can never drift: re-run `pnpm gen:manifest` after vendoring or forking
 * a component.
 *
 * "Own props" = the apparent properties of a component's props type, minus the
 * generic DOM/React attribute soup (anything declared in `@types/react` or
 * `lib.dom.d.ts`). What's left is the meaningful API surface — cva variants,
 * Radix behaviour props (`open`, `onOpenChange`, …), and bespoke props — which
 * is the number worth showing on a catalog card.
 */

import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const componentsDir = path.join(root, "src/components");
const outFile = path.join(root, "stories/components/component-manifest.ts");

const files = readdirSync(componentsDir)
  .filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx"))
  .map((f) => path.join(componentsDir, f));

const program = ts.createProgram(files, {
  jsx: ts.JsxEmit.ReactJSX,
  esModuleInterop: true,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  module: ts.ModuleKind.ESNext,
  target: ts.ScriptTarget.ESNext,
  skipLibCheck: true,
  strict: true,
});
const checker = program.getTypeChecker();

/** Props declared in React's typings or the DOM lib are inherited noise. */
function isInheritedNoise(symbol: ts.Symbol): boolean {
  const decls = symbol.getDeclarations() ?? [];
  if (decls.length === 0) return false;
  return decls.every((d) => {
    const f = d.getSourceFile().fileName;
    return (
      /node_modules\/@types\/react\b/.test(f) ||
      /lib\.dom\.d\.ts$/.test(f) ||
      /lib\.dom\.iterable\.d\.ts$/.test(f) ||
      /node_modules\/typescript\//.test(f)
    );
  });
}

function countProps(propsType: ts.Type): number {
  let n = 0;
  for (const prop of propsType.getApparentProperties()) {
    const name = prop.getName();
    if (name.startsWith("__")) continue; // internal markers
    if (isInheritedNoise(prop)) continue;
    n++;
  }
  return n;
}

/** A component's props = the first parameter of its first call signature. */
function propCountOfComponent(symbol: ts.Symbol, decl: ts.Declaration): number | null {
  const type = checker.getTypeOfSymbolAtLocation(symbol, decl);
  const signatures = type.getCallSignatures();
  if (signatures.length === 0) return null;
  const param = signatures[0]!.getParameters()[0];
  if (!param) return 0;
  const paramType = checker.getTypeOfSymbolAtLocation(param, decl);
  return countProps(paramType);
}

const manifest: Record<string, number> = {};

for (const file of files) {
  const sourceFile = program.getSourceFile(file);
  if (!sourceFile) continue;
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) continue;

  for (const exported of checker.getExportsOfModule(moduleSymbol)) {
    const name = exported.getName();
    if (!/^[A-Z]/.test(name)) continue; // components are PascalCase

    let symbol = exported;
    if (exported.flags & ts.SymbolFlags.Alias) {
      symbol = checker.getAliasedSymbol(exported);
    }
    const decl = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];
    if (!decl) continue;

    const count = propCountOfComponent(symbol, decl);
    if (count === null) continue; // not a renderable component (type, enum, …)
    manifest[name] = count;
  }
}

const sorted = Object.keys(manifest)
  .sort()
  .map((k) => `  ${JSON.stringify(k)}: ${manifest[k]},`)
  .join("\n");

const banner = `/*
 * GENERATED FILE — do not edit by hand.
 * Run \`pnpm gen:manifest\` to regenerate from src/components/*.tsx.
 *
 * Maps each exported component to the count of its meaningful props (own +
 * library-specific, excluding inherited DOM/React attributes). Consumed by the
 * "Components/Introduction" catalog story.
 */

export const COMPONENT_PROP_COUNTS: Record<string, number> = {
${sorted}
};
`;

writeFileSync(outFile, banner);
console.log(
  `Wrote ${Object.keys(manifest).length} component prop counts to ${path.relative(root, outFile)}`,
);
