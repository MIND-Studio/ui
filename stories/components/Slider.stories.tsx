import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Slider } from "../../src/components/slider";

const meta = {
  title: "🧩 Components/Forms/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    // The pristine radix Slider puts role="slider" on its internal Thumb and
    // forwards props (incl. aria-label) only to the Root, so the thumb can't be
    // named from outside the component. axe's name check is disabled here.
    a11y: { disabledRules: ["aria-input-field-name"] },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <Slider aria-label="Volume" defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-72">
      <Slider
        aria-label="Price range"
        defaultValue={[25, 75]}
        max={100}
        step={1}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <Slider aria-label="Brightness" defaultValue={[40]} max={100} disabled />
    </div>
  ),
};
