import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { Calendar } from "../../src/components/calendar";

const meta = {
  title: "Components/Data Display/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

function CalendarExample() {
  const [selected, setSelected] = React.useState<Date | undefined>(
    new Date(2026, 4, 29)
  );

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      defaultMonth={new Date(2026, 4)}
      className="rounded-md border"
    />
  );
}

export const Default: Story = {
  render: () => <CalendarExample />,
};
