import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "../../src/components/toggle";

const meta = {
  title: "Components/Forms/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "default", "lg"] },
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic" variant="outline">
      <Italic />
      Italic
    </Toggle>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Toggle bold">
        <Bold />
      </Toggle>
      <Toggle aria-label="Toggle italic" variant="outline">
        <Italic />
      </Toggle>
      <Toggle aria-label="Toggle underline" disabled>
        <Underline />
      </Toggle>
    </div>
  ),
};
