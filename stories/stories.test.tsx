import { composeStories, setProjectAnnotations } from "@storybook/react-vite";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { globalTypes, withTheme } from "../.storybook/with-theme";
import { expectNoAxeViolations } from "../src/test/axe";

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
  const entries = Object.entries(composed);
  if (entries.length === 0) continue;

  describe(`stories: ${path}`, () => {
    for (const [name, Story] of entries) {
      it(`${name} renders with no axe violations`, async () => {
        const { container } = render(<Story />);
        if (typeof (Story as { play?: unknown }).play === "function") {
          await (Story as unknown as { play: (ctx: { canvasElement: HTMLElement }) => Promise<void> }).play(
            { canvasElement: container },
          );
        }
        // A story may opt out of specific axe rules that can't be satisfied in
        // happy-dom (no layout) or by a pristine primitive — declared via the
        // Storybook-standard `parameters.a11y.disabledRules`. Each use is
        // documented in the story with the reason.
        const disabledRules = (Story as { parameters?: { a11y?: { disabledRules?: string[] } } })
          .parameters?.a11y?.disabledRules;
        await expectNoAxeViolations(container, { disabledRules });
      });
    }
  });
}
