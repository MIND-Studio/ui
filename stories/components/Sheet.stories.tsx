import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../../src/components/button";
import { Input } from "../../src/components/input";
import { Label } from "../../src/components/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../src/components/sheet";

const meta = {
  title: "Components/Overlays/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Opened by default so the sheet content is rendered for docs/axe. */
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4">
          <div className="grid gap-2">
            <Label htmlFor="sheet-name">Name</Label>
            <Input id="sheet-name" defaultValue="Ada Lovelace" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sheet-username">Username</Label>
            <Input id="sheet-username" defaultValue="@ada" />
          </div>
        </div>
        <SheetFooter>
          <Button>Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/** `side` controls which edge the sheet slides in from. */
export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open navigation</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Jump to a section of the app.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
