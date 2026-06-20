import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { icons } from "lucide-react";

/*
 * The complete lucide-react icon set in one place. `icons` is lucide's own
 * registry (name → component) — no deprecated aliases, no utility exports — so
 * this gallery always reflects exactly the icons the package ships. Every icon
 * inherits `currentColor`, so it picks up the active theme's foreground in both
 * light and dark mode.
 */

const meta = {
  title: "🌱 Foundations/Icons",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const entries = Object.entries(icons);

// Hidden from the sidebar (!dev): the visible page is Icons.mdx, which embeds
// this story via <Canvas of={...}> and stays covered by the axe gate.
export const All: Story = {
  tags: ["!dev"],
  render: () => (
    <div>
      <p className="text-muted-foreground mb-4 text-sm">
        {entries.length} icons from <code className="font-mono">lucide-react</code>
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-2">
        {entries.map(([name, Icon]) => (
          <div
            key={name}
            title={name}
            className="text-foreground hover:bg-accent hover:text-accent-foreground flex aspect-square flex-col items-center justify-center gap-1.5 rounded-md border p-2 text-center"
          >
            <Icon className="size-5" aria-hidden />
            <span className="text-muted-foreground w-full truncate text-[10px] leading-tight">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};
