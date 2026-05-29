import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "../../src/components/native-select";
import { Label } from "../../src/components/label";

const meta = {
  title: "Components/Forms/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="fruit">Favorite fruit</Label>
      <NativeSelect id="fruit" defaultValue="apple">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const WithOptGroups: Story = {
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="food">Order</Label>
      <NativeSelect id="food" defaultValue="apple">
        <NativeSelectOptGroup label="Fruit">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Vegetable">
          <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
          <NativeSelectOption value="pepper">Pepper</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="size">Size</Label>
      <NativeSelect id="size" size="sm" defaultValue="md">
        <NativeSelectOption value="sm">Small</NativeSelectOption>
        <NativeSelectOption value="md">Medium</NativeSelectOption>
        <NativeSelectOption value="lg">Large</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};
