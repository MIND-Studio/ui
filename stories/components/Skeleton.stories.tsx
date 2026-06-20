import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from "../../src/components/skeleton";

const meta = {
  title: "🧩 Components/Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

export const Card: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  ),
};
