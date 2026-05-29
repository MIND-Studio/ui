import type { Theme } from "../theme/schema";
import { arctic } from "./arctic";
import { ember } from "./ember";
import { mind } from "./mind";

export { mind } from "./mind";
export { ember } from "./ember";
export { arctic } from "./arctic";
export { mindLight, mindDark } from "./mind";

/** All built-in themes, keyed by name. Mind is the default. */
export const themes = { mind, ember, arctic } as const;

/** Ordered list of built-in themes (Mind first). */
export const themeList: readonly Theme[] = [mind, ember, arctic];
