import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Separator } from "../../src/components/separator";

const meta = {
  title: "🧩 Components/Layout/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-72 space-y-3 text-sm">
      <div>Mind UI</div>
      <Separator />
      <div className="text-muted-foreground">A multi-brand design system.</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-3 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Source</span>
      <Separator orientation="vertical" />
      <span>Storybook</span>
    </div>
  ),
};
