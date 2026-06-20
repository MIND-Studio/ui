import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "../../src/components/textarea";
import { Label } from "../../src/components/label";

const meta = {
  title: "🧩 Components/Forms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here." />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="note">Note</Label>
      <Textarea id="note" placeholder="Editing is disabled." disabled />
    </div>
  ),
};
