import { create } from "storybook/theming";

/*
 * The Storybook chrome theme, pinned to the Mind brand (dark). Shared by the
 * manager (sidebar/toolbars) and the Docs container so the Storybook UI always
 * stays Mind — it never follows the Brand/Mode toolbar. Switching brands only
 * re-themes the rendered component canvases/docs blocks (via the ThemeProvider
 * decorator). Colors mirror Mind's dark alias map.
 */

const navy950 = "#0c151d"; // --mind-gray-950 — app/preview background
const navy900 = "#0f1b28"; // --mind-gray-900 — panels, inputs
const navy800 = "#1b2835"; // --mind-gray-800 — borders
const ink = "#f8fafc"; // --mind-gray-50  — primary text
const muted = "#96a1ac"; // --mind-gray-400 — muted text
const teal = "#29c08e"; // primary (dark)

/*
 * Titillium (Bold), subset to just the "MIND/UI" glyphs and embedded as a
 * data-URI @font-face. The brand image is rendered as an <img>, which can't
 * pull a system/web font by name — the face must travel inside the SVG. The
 * subset keeps it ~1KB. Regenerate with:
 *   python3 -m fontTools.subset Titillium-Bold.otf \
 *     --text="MIND/UI" --flavor=woff2 --layout-features='' --output-file=out.woff2
 */
const TITILLIUM_WOFF2_B64 =
  "d09GMk9UVE8AAAO0AAsAAAAABfwAAANsAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAADYRPGyAcKgZgAFQBNgIkAxwEBgWCTgcgGzYFQB6F6RbLt1NObftO0k7oKqfuCTgIUuQQKA6UCO10qiLQi4h//THtOReg5/F272+Ms8ADCjhQykMVrkI6pZs98385vbHwDo/vffITP5GxG2PhHF5CCfWieE3rLIqnxUWRddguAOftV55FCAMkEtLZ9UQFd/zwvBOt5I31Dk0AmkiqfzCAmhy1eBopMM7g9xkCG8celJ4p/S7ixZADtFU43gsDISL7x0ytUs3xer3EE5m+rKNzjrwXdEs38Pk+GaDoDrD97oOlwyX2q5fL62O7jBnojhh5qUZ4rPNla6r++n/LMYRFbCN8YZAjVWvWbdi0XSePiXPSNbwRjYvOYhBOwwndfrLZSWxyeW2JGvgviuXMqMHiLS9t/V7C+E0dWFaSTlJMfSYa+iu0dLQkPVXzmLg7RdOflE8BkCabI19VoeSIoIe26NR/EnsS/GZpqmabwWlashaMd3dNoHvQ8Zi0aYr2KhotumeLhHFl88RUcwGisS1lezbXB2qzmRIzUj8zCmmtLhhTlqaZGO/i0YL/JJsk3cQFKZqtBVdzA/PIfprN718bhdoAPBnoybRTYvDMjXTRRmy/UWJTdgZKN67dKKOhoaXjwUh6PupABCiRnBZde/bzDx6OA3FiFO3BrLKuMqv7thHWxTn0Im7Rrltn9JBr+fw1a/qOvda7n95cL2Hdspsikj9QO6m7OVti1emGZjZd0j0mr5K8x5KAb8PraGRoOtu2a4KOybxOW6OhAwGgSWQhp2nrzqAQAEClAABAcOkycZMFPwPGjYBYOBgO873jLoJImSVcdwBotbSW3GCVCwCgGPiErS5Xt7Zgy9dlvldK7go9STUolnzc3pKNAz3MlyLxSMwI6p9nUHAE+Rproa0uf2XWkTYfcC4557SjvENAYluXfevX9wup/U/h+Y8AAA/Kuk2NT1Taf09IEXoCwePwNFnNvvspuSOAGOKyL1D9L7TMgparZ0/PKbh0BTTuOSSB9kAGIGmLR7YKRCxYAxxFLOAVsoEgUUcgmmDENSWJ3kJnrnFcwwzjGm84W0N+DY00jF8Bh7f5Vi1dtNJNW7XwPHk4g/aS9q9dlRhjLNdII9j0p7fXia2KaltbBxtpHB+8d0KedFTLW4cbYKgSqOQgDsfWgQo5qkzFjC5SMLy8QV4lVLks";

// "MIND/UI" wordmark (Titillium) + primary circle — the Mind product logo, retitled for the UI kit.
const brandImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 40" role="img" aria-label="MIND/UI">` +
      `<defs><style>@font-face{font-family:'TitilliumMind';font-weight:700;font-style:normal;src:url(data:font/woff2;base64,${TITILLIUM_WOFF2_B64}) format('woff2');}</style></defs>` +
      `<text x="0" y="28" font-family="TitilliumMind, ui-sans-serif, system-ui, sans-serif" font-size="24" font-weight="700" letter-spacing="2">` +
      `<tspan fill="${ink}">MIND</tspan>` +
      `<tspan fill="${muted}" dx="3">/</tspan>` +
      `<tspan fill="${ink}" dx="3">UI</tspan>` +
      `</text>` +
      `<circle cx="160" cy="20" r="7" fill="${teal}"/>` +
      `</svg>`,
  );

export const mindManagerTheme = create({
  base: "dark",
  brandTitle: "MIND/UI",
  brandImage,
  brandTarget: "_self",

  colorPrimary: teal,
  colorSecondary: teal,

  appBg: navy900,
  appContentBg: navy950,
  appPreviewBg: navy950,
  appBorderColor: navy800,
  appBorderRadius: 10,

  textColor: ink,
  textInverseColor: navy950,
  textMutedColor: muted,

  barBg: navy950,
  barTextColor: muted,
  barSelectedColor: teal,
  barHoverColor: teal,

  inputBg: navy900,
  inputBorder: navy800,
  inputTextColor: ink,
  inputBorderRadius: 8,

  fontBase: 'ui-sans-serif, system-ui, -apple-system, sans-serif, "Apple Color Emoji"',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
});
