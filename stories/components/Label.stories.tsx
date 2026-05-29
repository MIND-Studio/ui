import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "../../src/components/input";
import { Label } from "../../src/components/label";

const meta = {
  title: "Components/Forms/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="mind" />
    </div>
  ),
};
