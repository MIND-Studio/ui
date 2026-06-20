import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/*
 * Shape tokens. Today this is radius only: one base radius drives a derived
 * scale, each box rendered with its live var() so switching brand in the
 * toolbar re-rounds the whole scale.
 */

const meta = {
  title: "🌱 Foundations/Shapes",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ radius */

const RADII = [
  { varName: "--radius-sm", util: "rounded-sm", calc: "−4px" },
  { varName: "--radius-md", util: "rounded-md", calc: "−2px" },
  { varName: "--radius-lg", util: "rounded-lg", calc: "base" },
  { varName: "--radius-xl", util: "rounded-xl", calc: "+4px" },
] as const;

// Hidden from the sidebar (!dev): the visible page is Shapes.mdx, which embeds
// this story via <Canvas of={...}> so it renders through the brand/mode
// decorator (live radii) and stays covered by the axe gate.
export const Shapes: Story = {
  tags: ["!dev"],
  render: () => (
    <section className="space-y-3">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-5">
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
