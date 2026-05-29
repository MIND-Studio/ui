/// <reference types="vite/client" />
import { composeStories, setProjectAnnotations } from "@storybook/react-vite";
import { render } from "@testing-library/react";
import type { ComponentType } from "react";
import { describe, it } from "vitest";
import { globalTypes, withTheme } from "../.storybook/with-theme";
import { expectNoAxeViolations } from "../src/test/axe";

// A composed story is a renderable component that may carry a `play` interaction
// and Storybook `parameters` (e.g. opted-out axe rules). `composeStories` widens
// to `unknown` values when fed an untyped module, so we narrow to this shape.
type ComposedStory = ComponentType & {
  play?: (ctx: { canvasElement: HTMLElement }) => Promise<void> | void;
  parameters?: { a11y?: { disabledRules?: string[] } };
};

/*
 * Stories-as-tests: every story is rendered (under the shared ThemeProvider
 * decorator) and checked with axe. The story catalog IS the a11y/render suite.
 * axe's color-contrast rule is disabled here (no layout in happy-dom); contrast
 * is enforced separately by tests/contrast.test.ts.
 */

setProjectAnnotations([{ decorators: [withTheme], globalTypes }]);

const storyModules = import.meta.glob("./**/*.stories.tsx", { eager: true });

for (const [path, mod] of Object.entries(storyModules)) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const composed = composeStories(mod as any);
  const entries = Object.entries(composed) as [string, ComposedStory][];
  if (entries.length === 0) continue;

  describe(`stories: ${path}`, () => {
    for (const [name, Story] of entries) {
      it(`${name} renders with no axe violations`, async () => {
        const { container } = render(<Story />);
        if (typeof Story.play === "function") {
          await Story.play({ canvasElement: container });
        }
        // A story may opt out of specific axe rules that can't be satisfied in
        // happy-dom (no layout) or by a pristine primitive — declared via the
        // Storybook-standard `parameters.a11y.disabledRules`. Each use is
        // documented in the story with the reason.
        const disabledRules = Story.parameters?.a11y?.disabledRules;
        await expectNoAxeViolations(container, { disabledRules });
      });
    }
  });
}
