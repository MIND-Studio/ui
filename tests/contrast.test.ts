import { describe, expect, it } from "vitest";
import { type Mode } from "../src/theme/serialize";
import {
  type ContrastViolation,
  formatViolations,
  themeContrastViolations,
} from "../src/theme/contrast";
import { contrast } from "../src/theme/color";
import { parseTheme } from "../src/theme/schema";
import { mind } from "../src/themes/mind";
import { themeList } from "../src/themes/index";

const MODES: readonly Mode[] = ["light", "dark"];

describe.each(themeList.map((t) => [t.name, t] as const))(
  "theme %s — WCAG AA on every required pair",
  (_name, theme) => {
    it.each(MODES)("mode %s scores ≥ 4.5:1", (mode) => {
      const violations: ContrastViolation[] = themeContrastViolations(theme, mode);
      if (violations.length > 0) {
        throw new Error(`Contrast violations:\n${formatViolations(violations)}`);
      }
      expect(violations).toEqual([]);
    });
  },
);

describe("contrast gate self-tests", () => {
  it("flags a deliberately low-contrast override", () => {
    const broken = parseTheme(
      { ...mind, name: "broken-aa", light: { ...mind.light, "primary-foreground": "#9a9a9a" } },
      { source: "contrast.test.ts" },
    );
    const violations = themeContrastViolations(broken, "light");
    expect(violations.some((v) => v.pair === "primary-foreground on primary")).toBe(true);
  });

  it("anchors the math: white on black is ~21:1", () => {
    expect(contrast("oklch(1 0 0)", "oklch(0 0 0)")).toBeCloseTo(21, 0);
  });
});
