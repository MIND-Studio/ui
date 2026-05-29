import type { Preview } from "@storybook/nextjs-vite";
import { themes } from "storybook/theming";
import { globalTypes, withTheme } from "./with-theme";
import "./tailwind.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "error" },
    layout: "fullscreen",
    docs: { theme: themes.dark },
  },
  globalTypes,
  decorators: [withTheme],
};

export default preview;
