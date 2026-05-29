import { addons } from "storybook/manager-api";
import { mindManagerTheme } from "./mind-manager-theme";

// Storybook chrome is pinned to the Mind brand (dark) — see ./mind-manager-theme.
addons.setConfig({ theme: mindManagerTheme });
