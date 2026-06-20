import { describe, expect, it } from "vitest";
import { emitPatternCss, emitRootCss, emitScopedCss } from "./serialize";
import { mind } from "../themes/mind";
import { arctic } from "../themes/arctic";

describe("emitPatternCss", () => {
  it("paints the pattern onto the selector with opacity folded into the ink", () => {
    const css = emitPatternCss({ kind: "dots", opacity: 0.06 }, "body");
    expect(css).toContain("body {");
    expect(css).toContain("background-image: radial-gradient(");
    expect(css).toContain("color-mix(in oklab, var(--foreground) 6%, transparent)");
    expect(css).toContain("background-size: 24px 24px;");
  });

  it("resets the background-image for kind:none", () => {
    expect(emitPatternCss({ kind: "none" }, "body")).toBe("body {\n  background-image: none;\n}");
  });

  it("emits nothing for an absent pattern", () => {
    expect(emitPatternCss(undefined, "body")).toBe("");
  });
});

describe("page-default pattern in emitted CSS", () => {
  it("the Mind default emits an unscoped body pattern", () => {
    expect(emitRootCss(mind)).toContain("body {\n  background-image: radial-gradient(");
  });

  it("a brand emits its pattern scoped under its data attribute", () => {
    expect(emitScopedCss(arctic)).toContain('[data-mind-theme="arctic"] body {');
  });
});
