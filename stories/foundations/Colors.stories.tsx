import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ALIAS_TOKENS } from "../../src/tokens/aliases";
import { GRAY_STEPS } from "../../src/tokens/base";
import { Group, Pair, Swatch, swatchGrid } from "./_token-ui";

/*
 * Color tokens, auto-rendered from the typed token source (ALIAS_TOKENS,
 * GRAY_STEPS) so the swatches can never drift from the CSS the package emits.
 * Each chip resolves a live CSS variable, so switching brand/mode in the
 * toolbar re-paints the whole palette with that brand's colors.
 */

const meta = {
  title: "🌱 Foundations/Colors",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------- data */

const SURFACE_PAIRS = [
  ["background", "foreground"],
  ["card", "card-foreground"],
  ["popover", "popover-foreground"],
  ["muted", "muted-foreground"],
  ["accent", "accent-foreground"],
] as const;
const SURFACE_LINES = ["border", "input", "ring"] as const;

const BRAND_PAIRS = [
  ["primary", "primary-foreground"],
  ["secondary", "secondary-foreground"],
  ["destructive", "destructive-foreground"],
] as const;

const STATE_PAIRS = [
  ["success", "success-foreground"],
  ["warning", "warning-foreground"],
  ["error", "error-foreground"],
  ["info", "info-foreground"],
] as const;

const CHART_TOKENS = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"] as const;

const SIDEBAR_PAIRS = [
  ["sidebar", "sidebar-foreground"],
  ["sidebar-primary", "sidebar-primary-foreground"],
  ["sidebar-accent", "sidebar-accent-foreground"],
] as const;
const SIDEBAR_LINES = ["sidebar-border", "sidebar-ring"] as const;

// Anything in the typed alias source we didn't place in a group above shows up
// in "Other" — so a newly added token can never silently go undocumented.
const GROUPED = new Set<string>([
  ...SURFACE_PAIRS.flat(),
  ...SURFACE_LINES,
  ...BRAND_PAIRS.flat(),
  ...STATE_PAIRS.flat(),
  ...CHART_TOKENS,
  ...SIDEBAR_PAIRS.flat(),
  ...SIDEBAR_LINES,
]);
const UNGROUPED = ALIAS_TOKENS.filter((t) => !GROUPED.has(t));

/* ------------------------------------------------------------------ colors */

// Hidden from the sidebar (!dev): the visible page is Colors.mdx, which embeds
// this story via <Canvas of={...}> so it renders through the brand/mode
// decorator (live swatches) and stays covered by the axe gate.
export const Colors: Story = {
  tags: ["!dev"],
  render: () => (
    <section className="space-y-8">
      <Group
        title="Neutrals — base ramp"
        hint="The brand-agnostic --mind-gray-* primitives (plus pure white/black). Structural aliases reference these; brands can retint the ramp."
      >
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
          {GRAY_STEPS.map((step) => (
            <Swatch key={step} varName={`--mind-gray-${step}`} sub={String(step)} />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
          <Swatch varName="--mind-white" sub="white" />
          <Swatch varName="--mind-black" sub="black" />
        </div>
      </Group>

      <Group
        title="Surfaces & UI"
        hint="Semantic surfaces with their on-color, plus the line tokens used for borders, inputs, and focus rings."
      >
        <div className={swatchGrid}>
          {SURFACE_PAIRS.map(([bg, fg]) => (
            <Pair key={bg} bg={bg} fg={fg} />
          ))}
          {SURFACE_LINES.map((token) => (
            <Swatch key={token} varName={`--${token}`} />
          ))}
        </div>
      </Group>

      <Group
        title="Brand & status"
        hint="The brand primary, the secondary surface, and the destructive (error) color — each with its on-color."
      >
        <div className={swatchGrid}>
          {BRAND_PAIRS.map(([bg, fg]) => (
            <Pair key={bg} bg={bg} fg={fg} />
          ))}
        </div>
      </Group>

      <Group
        title="Semantic state"
        hint="Success, warning, error, and info — each with its on-color. Use these (e.g. text-success, bg-warning/10) for state, not raw palette colors. Like primary, they brighten in dark mode with dark on-color; error is the semantic alias of destructive."
      >
        <div className={swatchGrid}>
          {STATE_PAIRS.map(([bg, fg]) => (
            <Pair key={bg} bg={bg} fg={fg} />
          ))}
        </div>
      </Group>

      <Group title="Charts" hint="The five categorical data-viz colors — for data only, not state or brand surfaces.">
        <div className={swatchGrid}>
          {CHART_TOKENS.map((token) => (
            <Swatch key={token} varName={`--${token}`} />
          ))}
        </div>
      </Group>

      <Group title="Sidebar" hint="A self-contained palette so the app sidebar can theme independently of page surfaces.">
        <div className={swatchGrid}>
          {SIDEBAR_PAIRS.map(([bg, fg]) => (
            <Pair key={bg} bg={bg} fg={fg} />
          ))}
          {SIDEBAR_LINES.map((token) => (
            <Swatch key={token} varName={`--${token}`} />
          ))}
        </div>
      </Group>

      {UNGROUPED.length > 0 ? (
        <Group title="Other" hint="Alias tokens not yet placed in a group.">
          <div className={swatchGrid}>
            {UNGROUPED.map((token) => (
              <Swatch key={token} varName={`--${token}`} />
            ))}
          </div>
        </Group>
      ) : null}
    </section>
  ),
};
