import type { Preview } from "@storybook/nextjs-vite";
import { mindManagerTheme } from "./mind-manager-theme";
import { globalTypes, withTheme } from "./with-theme";
import "./tailwind.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "error" },
    layout: "fullscreen",
    // Docs page chrome stays Mind (fixed); the component examples inside follow
    // the selected brand via the ThemeProvider decorator.
    docs: { theme: mindManagerTheme },
    // Sidebar ordering: top-level sections first, then the Components groups in
    // a deliberate order (instead of alphabetical). Anything unlisted falls to
    // the end. Within a group, components stay alphabetical.
    options: {
      storySort: {
        order: [
          "Foundations",
          "Tokens",
          "Brands",
          "Components",
          [
            "Introduction",
            "Forms",
            "Buttons & Actions",
            "Overlays",
            "Navigation",
            "Data Display",
            "Feedback",
            "Layout",
            "Utilities",
          ],
        ],
      },
    },
  },
  globalTypes,
  decorators: [withTheme],
};

export default preview;
