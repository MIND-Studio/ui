import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ScrollArea } from "../../src/components/scroll-area";

const meta = {
  title: "🧩 Components/Layout/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 30 }, (_, i) => `v1.2.0-beta.${i + 1}`);

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-64 w-56 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className="border-b py-2 text-sm last:border-b-0">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-72 rounded-md border whitespace-nowrap">
      <div className="flex gap-3 p-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="flex size-28 shrink-0 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
