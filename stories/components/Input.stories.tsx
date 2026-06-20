import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Mail, Search } from "lucide-react";
import { Input } from "../../src/components/input";
import { Label } from "../../src/components/label";

const meta = {
  title: "🧩 Components/Forms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Email", type: "email", "aria-label": "Email" },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@mind.dev" />
    </div>
  ),
};

/*
 * Input is vendored pristine (no icon slot), so a leading icon is composed with
 * a relative wrapper: an absolutely-positioned, `aria-hidden` icon plus left
 * padding on the field. The icon uses `text-muted-foreground` to sit quietly.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="grid w-72 gap-4">
      <div className="relative">
        <Search
          aria-hidden
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <Input type="search" placeholder="Search…" aria-label="Search" className="pl-9" />
      </div>
      <div className="relative">
        <Mail
          aria-hidden
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <Input type="email" placeholder="you@mind.dev" aria-label="Email" className="pl-9" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: { placeholder: "Disabled", disabled: true, "aria-label": "Disabled input" },
};
