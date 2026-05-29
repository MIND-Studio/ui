import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { type DateRange } from "react-day-picker";
import {
  DatePicker,
  DateRangePicker,
} from "../../src/components/date-picker";
import { Label } from "../../src/components/label";

const meta = {
  title: "Components/Forms/Date Picker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 * `DatePicker` composes `Popover` + `Calendar` + `Button`. It works uncontrolled
 * (via `defaultValue`) or controlled (via `value` + `onValueChange`). The trigger
 * shows the formatted date or the `placeholder`; selecting a day closes the popover.
 */
export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="date">Date of birth</Label>
      <DatePicker
        defaultValue={new Date(2026, 4, 29)}
        aria-label="Date of birth"
      />
    </div>
  ),
};

/*
 * Empty state — no `defaultValue`, so the trigger renders the muted placeholder.
 */
export const Empty: Story = {
  render: () => <DatePicker placeholder="Select a date" />,
};

/*
 * Controlled usage: the selected date lives in parent state and is mirrored below.
 */
export const Controlled: Story = {
  render: function ControlledExample() {
    const [date, setDate] = React.useState<Date | undefined>(
      new Date(2026, 4, 29)
    );
    return (
      <div className="flex flex-col gap-2">
        <DatePicker value={date} onValueChange={setDate} />
        <p className="text-sm text-muted-foreground">
          Selected: {date ? date.toLocaleDateString() : "none"}
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => <DatePicker defaultValue={new Date(2026, 4, 29)} disabled />,
};

/*
 * `DateRangePicker` switches the calendar to `mode="range"` and renders
 * `numberOfMonths` months side by side. The trigger shows `from – to`.
 */
export const Range: StoryObj<typeof DateRangePicker> = {
  render: () => (
    <DateRangePicker
      defaultValue={{
        from: new Date(2026, 4, 12),
        to: new Date(2026, 4, 26),
      }}
      aria-label="Date range"
    />
  ),
};

/*
 * Controlled range with the selection mirrored below.
 */
export const RangeControlled: StoryObj<typeof DateRangePicker> = {
  render: function RangeControlledExample() {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 4, 12),
      to: new Date(2026, 4, 26),
    });
    return (
      <div className="flex flex-col gap-2">
        <DateRangePicker value={range} onValueChange={setRange} />
        <p className="text-sm text-muted-foreground">
          {range?.from?.toLocaleDateString() ?? "—"} →{" "}
          {range?.to?.toLocaleDateString() ?? "—"}
        </p>
      </div>
    );
  },
};
