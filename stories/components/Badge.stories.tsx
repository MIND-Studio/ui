import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BadgeCheck, Clock, X } from "lucide-react";
import { Badge } from "../../src/components/badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Badge" },
  argTypes: {
    variant: { control: "select", options: ["default", "secondary", "destructive", "outline"] },
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>
        <BadgeCheck />
        Verified
      </Badge>
      <Badge variant="secondary">
        <Clock />
        Pending
      </Badge>
      <Badge variant="destructive">
        <X />
        Failed
      </Badge>
    </div>
  ),
};
