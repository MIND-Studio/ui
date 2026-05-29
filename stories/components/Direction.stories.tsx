import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  DirectionProvider,
  useDirection,
} from "../../src/components/direction";
import { Input } from "../../src/components/input";
import { Label } from "../../src/components/label";

const meta = {
  title: "Components/Utilities/Direction",
  component: DirectionProvider,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DirectionProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function DirectionReadout() {
  const dir = useDirection();
  return (
    <p className="text-sm text-muted-foreground">
      Current direction: <span className="font-medium text-foreground">{dir}</span>
    </p>
  );
}

export const Default: Story = {
  render: () => (
    <DirectionProvider dir="ltr">
      <div dir="ltr" className="grid w-72 gap-2 p-6">
        <DirectionReadout />
        <Label htmlFor="dir-ltr">Name</Label>
        <Input id="dir-ltr" placeholder="Ada Lovelace" />
      </div>
    </DirectionProvider>
  ),
};

export const RightToLeft: Story = {
  render: () => (
    <DirectionProvider dir="rtl">
      <div dir="rtl" className="grid w-72 gap-2 p-6">
        <DirectionReadout />
        <Label htmlFor="dir-rtl">الاسم</Label>
        <Input id="dir-rtl" placeholder="آدا لوفلايس" />
      </div>
    </DirectionProvider>
  ),
};
