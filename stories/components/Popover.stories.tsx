import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../../src/components/button";
import { Input } from "../../src/components/input";
import { Label } from "../../src/components/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../src/components/popover";

const meta = {
  title: "🧩 Components/Overlays/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Opened by default so the content is rendered for docs/axe. `PopoverHeader`,
 * `PopoverTitle`, and `PopoverDescription` are Mind-specific layout parts for the
 * heading block inside the content.
 */
export const Default: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="grid gap-4">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="popover-width">Width</Label>
            <Input id="popover-width" defaultValue="100%" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="popover-height">Height</Label>
            <Input id="popover-height" defaultValue="25px" className="col-span-2 h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/** A minimal popover with just a heading and description. */
export const Simple: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="outline">Show details</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Keyboard shortcut</PopoverTitle>
          <PopoverDescription>Press ⌘K to open the command palette anywhere.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};
