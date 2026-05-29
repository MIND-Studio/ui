/*
 * Lightweight axe-core harness for stories-as-tests. We run axe against
 * rendered DOM in happy-dom and fail on any violation. The `color-contrast`
 * rule is disabled here because it requires real layout (unavailable in a
 * headless DOM) — color contrast is instead enforced mathematically by the
 * token-level contrast gate (src/theme/contrast.ts).
 */

import axe from "axe-core";

export interface AxeOptions {
  /** Extra axe rule ids to disable. */
  disabledRules?: string[];
}

export async function getAxeViolations(
  container: Element,
  options: AxeOptions = {},
): Promise<axe.Result[]> {
  const disabled = ["color-contrast", ...(options.disabledRules ?? [])];
  const results = await axe.run(container as axe.ElementContext, {
    rules: Object.fromEntries(disabled.map((id) => [id, { enabled: false }])),
    resultTypes: ["violations"],
  });
  return results.violations;
}

export async function expectNoAxeViolations(
  container: Element,
  options: AxeOptions = {},
): Promise<void> {
  const violations = await getAxeViolations(container, options);
  if (violations.length > 0) {
    const summary = violations
      .map((v) => `  • ${v.id} (${v.impact ?? "n/a"}): ${v.help} [${v.nodes.length} node(s)]`)
      .join("\n");
    throw new Error(`axe found ${violations.length} violation(s):\n${summary}`);
  }
}
