import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Kbd, KbdGroup } from "../../src/components/kbd";

const meta = {
  title: "🧩 Components/Data Display/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Kbd>Esc</Kbd>,
};

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const InText: Story = {
  render: () => (
    <p className="text-sm text-muted-foreground">
      Press{" "}
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>{" "}
      to open the command palette.
    </p>
  ),
};
