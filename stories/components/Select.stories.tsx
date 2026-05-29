import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CloudSun, Monitor, Moon, Sun } from "lucide-react";
import { Label } from "../../src/components/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../src/components/select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-64 gap-2">
      <Label htmlFor="fruit">Favorite fruit</Label>
      <Select>
        <SelectTrigger id="fruit" className="w-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

/*
 * SelectItem already lays out an icon + text row (it renders children in a
 * flex `gap-2` slot), so an icon just goes before the label. The trigger shows
 * the selected item's icon too via SelectValue.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="grid w-64 gap-2">
      <Label htmlFor="theme">Theme</Label>
      <Select defaultValue="system">
        <SelectTrigger id="theme" className="w-full">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <Sun />
            Light
          </SelectItem>
          <SelectItem value="dark">
            <Moon />
            Dark
          </SelectItem>
          <SelectItem value="system">
            <Monitor />
            System
          </SelectItem>
          <SelectItem value="auto">
            <CloudSun />
            Auto (by daylight)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
