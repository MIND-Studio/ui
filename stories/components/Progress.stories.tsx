import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Progress } from "../../src/components/progress";

const meta = {
  title: "🧩 Components/Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Progress value={50} aria-label="Download progress" className="w-72" />,
};

export const Values: Story = {
  render: () => (
    <div className="w-72 space-y-4">
      <Progress value={0} aria-label="Progress at 0 percent" />
      <Progress value={33} aria-label="Progress at 33 percent" />
      <Progress value={66} aria-label="Progress at 66 percent" />
      <Progress value={100} aria-label="Progress at 100 percent" />
    </div>
  ),
};
