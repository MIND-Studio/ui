import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { toast } from "sonner";
import { Button } from "../../src/components/button";
import { Toaster } from "../../src/components/sonner";

const meta = {
  title: "Components/Feedback/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button onClick={() => toast("Event has been created.")}>Show toast</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Toaster />
      <Button variant="outline" onClick={() => toast.success("Saved successfully.")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Something went wrong.")}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => toast("Scheduled", { description: "Friday at 10:00 AM." })}
      >
        With description
      </Button>
    </div>
  ),
};
