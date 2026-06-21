import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "../theme/provider";
import { arctic } from "../themes/arctic";
import { ember } from "../themes/ember";
import { mind } from "../themes/mind";
import { themeList } from "../themes/index";
import { expectNoAxeViolations } from "../test/axe";
import { Logo, Pattern, Symbol, patternStyle } from "./brand";

describe("patternStyle", () => {
  it("returns undefined for kind:none", () => {
    expect(patternStyle({ kind: "none" })).toBeUndefined();
  });

  it("carries opacity and a background image for visual patterns", () => {
    const grid = patternStyle({ kind: "grid", opacity: 0.04 });
    expect(grid?.opacity).toBe(0.04);
    expect(grid?.backgroundImage).toContain("linear-gradient");

    const dots = patternStyle({ kind: "dots", opacity: 0.05 });
    expect(dots?.backgroundImage).toContain("radial-gradient");
  });
});

describe("brand assets", () => {
  it("every built-in theme ships a symbol for both modes", () => {
    for (const theme of themeList) {
      expect(theme.symbol?.light).toMatch(/^data:image\/svg\+xml/);
      expect(theme.symbol?.dark).toMatch(/^data:image\/svg\+xml/);
    }
  });

  it("a theme's logo asset, when present, is a data URI for both modes", () => {
    for (const theme of themeList) {
      if (!theme.logo) continue;
      expect(theme.logo.light).toMatch(/^data:image\/svg\+xml/);
      expect(theme.logo.dark).toMatch(/^data:image\/svg\+xml/);
    }
  });

  it("Mind composes its wordmark live (no baked logo image)", () => {
    expect(mind.logo).toBeUndefined();
  });
});

describe("brand components", () => {
  it("render logo + symbol with accessible labels under a theme", async () => {
    const { container } = render(
      <ThemeProvider theme={ember} forcedTheme="light" enableSystem={false}>
        <Logo />
        <Symbol />
        <div className="relative">
          <Pattern />
        </div>
      </ThemeProvider>,
    );
    expect(screen.getByAltText("Ember logo")).toBeInTheDocument();
    expect(screen.getByAltText("Ember symbol")).toBeInTheDocument();
    await expectNoAxeViolations(container);
  });

  it("composes the symbol + serif wordmark for a theme with no logo image", async () => {
    const { container } = render(
      <ThemeProvider theme={mind} forcedTheme="light" enableSystem={false}>
        <Logo />
      </ThemeProvider>,
    );
    expect(screen.getByText("Mind")).toBeInTheDocument();
    // The composed lockup paints the symbol as a presentational (aria-hidden) img.
    expect(container.querySelector("img")).toBeInTheDocument();
    await expectNoAxeViolations(container);
  });

  it("drops the wordmark with symbolOnly", () => {
    render(
      <ThemeProvider theme={mind} forcedTheme="light" enableSystem={false}>
        <Logo symbolOnly />
      </ThemeProvider>,
    );
    expect(screen.queryByText("Mind")).not.toBeInTheDocument();
  });

  it("renders a grid pattern layer for arctic", () => {
    render(
      <ThemeProvider theme={arctic} forcedTheme="dark" enableSystem={false}>
        <div className="relative">
          <Pattern data-testid="pat" />
        </div>
      </ThemeProvider>,
    );
    expect(screen.getByTestId("pat")).toHaveStyle({ backgroundSize: "24px 24px" });
  });
});
