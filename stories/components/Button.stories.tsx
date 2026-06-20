import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Download, Plus, Settings, Trash2 } from "lucide-react";
import { Button } from "../../src/components/button";

const meta = {
  title: "🧩 Components/Forms/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Button" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: { control: "select", options: ["default", "sm", "lg", "icon"] },
    disabled: { control: "boolean" },
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>
        <Download />
        Download
      </Button>
      <Button {...args} variant="secondary">
        <Plus />
        New project
      </Button>
      <Button {...args} variant="outline">
        Continue
        <ArrowRight />
      </Button>
      <Button {...args} variant="destructive">
        <Trash2 />
        Delete
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="icon" aria-label="Settings">
        <Settings />
      </Button>
      <Button {...args} size="icon" variant="secondary" aria-label="Add">
        <Plus />
      </Button>
      <Button {...args} size="icon" variant="outline" aria-label="Download">
        <Download />
      </Button>
      <Button {...args} size="icon" variant="ghost" aria-label="Delete">
        <Trash2 />
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
