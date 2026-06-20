import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../../src/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../src/components/tooltip";

const meta = {
  title: "🧩 Components/Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  ),
};
