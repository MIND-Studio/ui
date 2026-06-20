import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/*
 * Typography tokens — the three font-family stacks the package ships, each
 * rendered with its live --font-* variable so switching brand in the toolbar
 * swaps the specimen to that brand's chosen stack.
 */

const meta = {
  title: "🌱 Foundations/Typography",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------- typography */

const FONTS = [
  { varName: "--font-sans", label: "Sans — UI & body" },
  { varName: "--font-serif", label: "Serif — editorial" },
  { varName: "--font-mono", label: "Mono — code & data" },
] as const;

// Hidden from the sidebar (!dev): the visible page is Typography.mdx, which
// embeds this story via <Canvas of={...}> so it renders through the brand/mode
// decorator (live specimens) and stays covered by the axe gate.
export const Typography: Story = {
  tags: ["!dev"],
  render: () => (
    <section className="space-y-3">
      <div className="space-y-6">
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
