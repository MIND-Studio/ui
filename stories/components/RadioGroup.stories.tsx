import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RadioGroup, RadioGroupItem } from "../../src/components/radio-group";
import { Label } from "../../src/components/label";

const meta = {
  title: "Components/Forms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" className="w-72">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="r-default" />
        <Label htmlFor="r-default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="r-comfortable" />
        <Label htmlFor="r-comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="r-compact" />
        <Label htmlFor="r-compact">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <RadioGroup defaultValue="card" className="w-72">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="card" id="p-card" />
        <Label htmlFor="p-card">Card</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="paypal" id="p-paypal" />
        <Label htmlFor="p-paypal">PayPal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="wire" id="p-wire" disabled />
        <Label htmlFor="p-wire">Wire transfer (unavailable)</Label>
      </div>
    </RadioGroup>
  ),
};
