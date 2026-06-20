import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ALIAS_TOKENS } from "../src/tokens/aliases";
import { GRAY_STEPS } from "../src/tokens/base";

// Custom docs page: show each story once (no duplicated Primary block).
function TokensDocs() {
  return (
    <>
      <Title />
      <Description />
      <Stories includePrimary title="" />
    </>
  );
}

/*
 * Token documentation — every token the package ships (colors, radius, and
 * typography) auto-rendered from the typed token source (ALIAS_TOKENS,
 * GRAY_STEPS) so the swatches can never drift from the CSS the package emits.
 * Each chip resolves a live CSS variable, so switching brand/mode in the
 * toolbar re-paints the whole chapter with that brand's tokens.
 */

const meta = {
  title: "Tokens/Overview",
  parameters: {
    layout: "fullscreen",
    docs: {
      page: TokensDocs,
      description: {
        component:
          "Every design token Mind UI ships — color, radius, and typography — rendered live from " +
          "the typed token source. Switch brand and mode in the toolbar to see all tokens update " +
          "at once.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ pieces */

/** A single color, painted from one CSS variable. */
function Swatch({ varName, sub }: { varName: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 w-full rounded-md border border-border"
        style={{ background: `var(${varName})` }}
      />
      <code className="text-foreground text-xs">{varName}</code>
      {sub ? <span className="text-muted-foreground text-xs">{sub}</span> : null}
    </div>
  );
}

/** A background/foreground pair, previewing real text on the surface. */
function Pair({ bg, fg }: { bg: string; fg: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="flex h-20 w-full items-center justify-center rounded-md border border-border"
        style={{ background: `var(--${bg})`, color: `var(--${fg})` }}
      >
        <span className="font-semibold text-xl">Aa</span>
      </div>
      <div className="leading-relaxed">
        <code className="block text-foreground text-xs">--{bg}</code>
        <code className="block text-muted-foreground text-xs">--{fg}</code>
      </div>
    </div>
  );
}

function Group({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h3 className="font-medium text-foreground text-sm">{title}</h3>
        {hint ? <p className="max-w-2xl text-muted-foreground text-xs">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}

const swatchGrid = "grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6";

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
  ...CHART_TOKENS,
  ...SIDEBAR_PAIRS.flat(),
  ...SIDEBAR_LINES,
]);
const UNGROUPED = ALIAS_TOKENS.filter((t) => !GROUPED.has(t));

/* ------------------------------------------------------------------ colors */

export const Colors: Story = {
  render: () => (
    <section className="space-y-8">
      <h2 className="font-semibold text-lg">Colors</h2>

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

      <Group title="Charts" hint="The five categorical data-viz colors.">
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

/* ------------------------------------------------------------------ radius */

const RADII = [
  { varName: "--radius-sm", util: "rounded-sm", calc: "−4px" },
  { varName: "--radius-md", util: "rounded-md", calc: "−2px" },
  { varName: "--radius-lg", util: "rounded-lg", calc: "base" },
  { varName: "--radius-xl", util: "rounded-xl", calc: "+4px" },
] as const;

export const Radius: Story = {
  render: () => (
    <section className="space-y-3">
      <h2 className="font-semibold text-lg">Radius</h2>
      <p className="max-w-2xl text-muted-foreground text-sm">
        One base radius (<code>--radius</code> ← <code>--mind-radius</code>) drives a derived scale.
        Brands set a single value — Mind <code>0.625rem</code>, Ember <code>1rem</code>, Arctic{" "}
        <code>0rem</code> — and the whole scale follows.
      </p>
      <div className="grid grid-cols-2 gap-6 pt-2 sm:grid-cols-4 lg:grid-cols-5">
        {RADII.map((r) => (
          <div key={r.varName} className="flex flex-col items-start gap-2">
            <div
              className="h-20 w-20 border border-border bg-muted"
              style={{ borderRadius: `var(${r.varName})` }}
            />
            <code className="text-foreground text-xs">{r.varName}</code>
            <span className="text-muted-foreground text-xs">
              {r.util} · {r.calc}
            </span>
          </div>
        ))}
      </div>
    </section>
  ),
};

/* -------------------------------------------------------------- typography */

const FONTS = [
  { varName: "--font-sans", label: "Sans — UI & body" },
  { varName: "--font-serif", label: "Serif — editorial" },
  { varName: "--font-mono", label: "Mono — code & data" },
] as const;

export const Typography: Story = {
  render: () => (
    <section className="space-y-3">
      <h2 className="font-semibold text-lg">Typography</h2>
      <p className="max-w-2xl text-muted-foreground text-sm">
        Three font-family stacks (<code>--font-*</code> ← <code>--mind-font-*</code>). Brands can
        swap any of them; everything else inherits the system defaults.
      </p>
      <div className="space-y-6 pt-2">
        {FONTS.map((f) => (
          <div key={f.varName} className="space-y-2 border-border border-b pb-6 last:border-b-0">
            <div className="flex items-baseline justify-between gap-4">
              <code className="text-foreground text-xs">{f.varName}</code>
              <span className="text-muted-foreground text-xs">{f.label}</span>
            </div>
            <p className="text-3xl text-foreground" style={{ fontFamily: `var(${f.varName})` }}>
              The quick brown fox jumps over the lazy dog
            </p>
            <p
              className="text-muted-foreground text-sm"
              style={{ fontFamily: `var(${f.varName})` }}
            >
              ABCDEFGHIJKLM abcdefghijklm 0123456789 &amp; ?!#@
            </p>
          </div>
        ))}
      </div>
    </section>
  ),
};
