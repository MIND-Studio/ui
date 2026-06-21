import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { toDataUrl } from "../../src/theme/schema";
import {
  MIND_CONSTRUCTION_SVG,
  MIND_GREEN,
  MIND_MARK_SVG,
  monoMarkSvg,
} from "../../src/themes/mind-mark";

/*
 * Logo specimens for the Foundations → Logo page. Everything here is derived
 * from the canonical mark in `src/themes/mind-mark.ts` (the same source the Mind
 * theme's logo/symbol assets use), so the documentation can never drift from the
 * shipped artwork. Stories are hidden from the sidebar (!dev); the visible page
 * is Logo.mdx, which embeds them via <Canvas of={...}> so they stay axe-covered.
 */

const meta = {
  title: "🌱 Foundations/Logo",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ----------------------------------------------------------------- assets */

const MARK = toDataUrl(MIND_MARK_SVG);
const MONO_BLACK = toDataUrl(monoMarkSvg("#18181b"));
const MONO_WHITE = toDataUrl(monoMarkSvg("#ffffff"));
const CONSTRUCTION = toDataUrl(MIND_CONSTRUCTION_SVG);

const LIGHT_BG = "#ffffff";
const DARK_BG = "#0a0a0a";
const GREEN_BG = `linear-gradient(135deg, ${MIND_GREEN.light}, ${MIND_GREEN.base})`;

/* --------------------------------------------------------------- atoms */

function Caption({ children }: { children: React.ReactNode }) {
  return <figcaption className="text-muted-foreground text-xs">{children}</figcaption>;
}

/**
 * The live wordmark lockup — symbol + "Mind" in the brand serif (`font-serif` →
 * Fraunces). Composed from DOM text, exactly like the <Logo> component, so it
 * renders in the real typeface rather than a baked image. `ink` fixes the text
 * colour for the panel it sits on.
 */
function Wordmark({ ink, size = 40 }: { ink: string; size?: number }) {
  return (
    <span className="inline-flex items-center" style={{ gap: size * 0.28 }}>
      <img src={MARK} alt="" aria-hidden style={{ height: size, width: "auto" }} />
      <span
        className="font-serif font-semibold leading-none tracking-tight"
        style={{ fontSize: size * 0.82, color: ink }}
      >
        Mind
      </span>
    </span>
  );
}

/** A specimen panel with a fixed (non-theme) background — for showing a fixed
 *  asset on the surface it is actually approved for. */
function Panel({
  bg,
  dark,
  label,
  children,
}: {
  bg: string;
  dark?: boolean;
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className="m-0 space-y-2">
      <div
        className="flex h-44 items-center justify-center rounded-lg border border-border p-8"
        style={{ background: bg, color: dark ? "#fafafa" : "#18181b" }}
      >
        {children}
      </div>
      <Caption>{label}</Caption>
    </figure>
  );
}

/* ----------------------------------------------------------------- lockups */

export const Lockups: Story = {
  tags: ["!dev"],
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Panel bg={LIGHT_BG} label="Wordmark · light background">
        <Wordmark ink="#18181b" size={48} />
      </Panel>
      <Panel bg={DARK_BG} dark label="Wordmark · dark background">
        <Wordmark ink="#fafafa" size={48} />
      </Panel>
      <Panel bg={LIGHT_BG} label="Symbol (mark only) · light background">
        <img src={MARK} alt="Mind symbol" className="h-20 w-auto" />
      </Panel>
      <Panel bg={DARK_BG} dark label="Symbol (mark only) · dark background">
        <img src={MARK} alt="Mind symbol" className="h-20 w-auto" />
      </Panel>
    </div>
  ),
};

/* ------------------------------------------------------------ construction */

export const Construction: Story = {
  tags: ["!dev"],
  render: () => (
    <figure className="m-0 space-y-2">
      <div
        className="flex items-center justify-center rounded-lg border border-border p-8"
        style={{ background: DARK_BG }}
      >
        <img
          src={CONSTRUCTION}
          alt="Mind mark construction grid"
          className="h-auto w-full max-w-3xl"
        />
      </div>
      <Caption>
        The mark is built on a circular grid: three interlocking nodes per loop, set on a shared
        baseline and unit radius. The far-right loop shows the resolved outline the grid produces.
      </Caption>
    </figure>
  ),
};

/* ------------------------------------------------------------- clearspace */

export const Clearspace: Story = {
  tags: ["!dev"],
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <figure className="m-0 space-y-2">
        <div className="flex h-56 items-center justify-center rounded-lg border border-border bg-card">
          <div className="relative" style={{ padding: "calc(80px * 0.4)" }}>
            <div className="absolute inset-0 rounded-md border border-primary/40 border-dashed" />
            <img src={MARK} alt="" aria-hidden className="relative h-20 w-auto" />
          </div>
        </div>
        <Caption>
          Symbol clearspace = <strong>0.4 × the mark height (x)</strong> on every side. Keep this
          zone free of type, imagery, and other marks.
        </Caption>
      </figure>
      <figure className="m-0 space-y-2">
        <div className="flex h-56 items-center justify-center rounded-lg border border-border bg-card">
          <div className="relative" style={{ padding: "calc(40px * 0.5)" }}>
            <div className="absolute inset-0 rounded-md border border-primary/40 border-dashed" />
            <span className="relative block dark:hidden">
              <Wordmark ink="#18181b" />
            </span>
            <span className="relative hidden dark:block">
              <Wordmark ink="#fafafa" />
            </span>
          </div>
        </div>
        <Caption>
          Wordmark clearspace = <strong>0.5 × the cap height</strong> of "Mind" on every side.
        </Caption>
      </figure>
    </div>
  ),
};

/* ----------------------------------------------------------------- sizing */

const MIN_SIZES = [
  { px: 16, use: "Favicon · 16px" },
  { px: 24, use: "Dense UI · 24px" },
  { px: 32, use: "App bars · 32px" },
  { px: 48, use: "Comfortable · 48px" },
] as const;

export const Sizing: Story = {
  tags: ["!dev"],
  render: () => (
    <section className="space-y-6">
      <div>
        <h3 className="mb-3 font-medium text-foreground text-sm">Symbol — minimum sizes</h3>
        <div className="flex flex-wrap items-end gap-8">
          {MIN_SIZES.map((s) => (
            <figure key={s.px} className="m-0 flex flex-col items-center gap-2">
              <img src={MARK} alt="" aria-hidden style={{ height: s.px, width: "auto" }} />
              <Caption>{s.use}</Caption>
            </figure>
          ))}
        </div>
      </div>
      <p className="max-w-2xl text-muted-foreground text-xs">
        Never render the symbol below <strong>16px</strong> or the wordmark below{" "}
        <strong>96px wide</strong> — below that the weave loses definition. Prefer the symbol over
        the wordmark in small or square placements.
      </p>
    </section>
  ),
};

/* --------------------------------------------------------------- app icon */

export const AppIcon: Story = {
  tags: ["!dev"],
  render: () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <Panel bg={GREEN_BG} dark label="Primary — white mark on brand green">
        <div
          className="flex size-28 items-center justify-center"
          style={{ background: GREEN_BG, borderRadius: "22%" }}
        >
          <img src={MONO_WHITE} alt="Mind app icon" className="h-16 w-auto" />
        </div>
      </Panel>
      <Panel bg={LIGHT_BG} label="On light — gradient mark on white">
        <div
          className="flex size-28 items-center justify-center bg-white shadow-sm"
          style={{ borderRadius: "22%" }}
        >
          <img src={MARK} alt="Mind app icon" className="h-16 w-auto" />
        </div>
      </Panel>
      <Panel bg={DARK_BG} dark label="On dark — gradient mark on near-black">
        <div
          className="flex size-28 items-center justify-center"
          style={{ background: "#161616", borderRadius: "22%" }}
        >
          <img src={MARK} alt="Mind app icon" className="h-16 w-auto" />
        </div>
      </Panel>
    </div>
  ),
};

/* ---------------------------------------------------------------- favicon */

const FAVICON_SIZES = [16, 32, 48] as const;

export const Favicon: Story = {
  tags: ["!dev"],
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Panel bg={LIGHT_BG} label="Favicon · light tab">
        <div className="flex items-end gap-6">
          {FAVICON_SIZES.map((px) => (
            <figure key={px} className="m-0 flex flex-col items-center gap-2">
              <img src={MARK} alt="" aria-hidden style={{ height: px, width: "auto" }} />
              <span className="text-[#71717a] text-xs">{px}px</span>
            </figure>
          ))}
        </div>
      </Panel>
      <Panel bg={DARK_BG} dark label="Favicon · dark tab">
        <div className="flex items-end gap-6">
          {FAVICON_SIZES.map((px) => (
            <figure key={px} className="m-0 flex flex-col items-center gap-2">
              <img src={MARK} alt="" aria-hidden style={{ height: px, width: "auto" }} />
              <span className="text-[#a1a1aa] text-xs">{px}px</span>
            </figure>
          ))}
        </div>
      </Panel>
    </div>
  ),
};

/* ------------------------------------------------------------- monochrome */

export const Monochrome: Story = {
  tags: ["!dev"],
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Panel bg={LIGHT_BG} label="Single-colour ink — for engraving, fax, one-colour print">
        <img src={MONO_BLACK} alt="Mind mark, black" className="h-20 w-auto" />
      </Panel>
      <Panel bg={DARK_BG} dark label="Single-colour reversed — for dark or photographic grounds">
        <img src={MONO_WHITE} alt="Mind mark, white" className="h-20 w-auto" />
      </Panel>
    </div>
  ),
};

/* ----------------------------------------------------------------- misuse */

const MISUSES = [
  { label: "Don't recolour the mark", transform: "none", filter: "hue-rotate(140deg) saturate(2)" },
  { label: "Don't stretch or distort", transform: "scaleX(1.5)", filter: "none" },
  { label: "Don't rotate", transform: "rotate(18deg)", filter: "none" },
  { label: "Don't add effects / shadows", transform: "none", filter: "drop-shadow(4px 6px 2px rgba(0,0,0,0.5))" },
] as const;

export const Misuse: Story = {
  tags: ["!dev"],
  render: () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {MISUSES.map((m) => (
        <figure key={m.label} className="m-0 space-y-2">
          <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-lg border border-border bg-card">
            <img
              src={MARK}
              alt=""
              aria-hidden
              className="h-16 w-auto"
              style={{ transform: m.transform, filter: m.filter }}
            />
            <span className="absolute top-2 right-2 text-base" aria-hidden>
              🚫
            </span>
          </div>
          <Caption>{m.label}</Caption>
        </figure>
      ))}
    </div>
  ),
};
