import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import {
  CreditCard,
  Keyboard,
  LogOut,
  Plus,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import { Button } from "../../src/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../src/components/dropdown-menu";

const meta = {
  title: "🧩 Components/Overlays/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 * DropdownMenuItem renders its children in a flex `gap-2` row with built-in svg
 * sizing, so a leading lucide icon just goes before the label. Icons default to
 * `text-muted-foreground`; the `destructive` variant recolors its icon to match.
 */
const Menu = (props: React.ComponentProps<typeof DropdownMenu>) => (
  <DropdownMenu {...props}>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Open menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="start">
      <DropdownMenuLabel>My account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User />
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard />
          Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Keyboard />
          Keyboard shortcuts
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <UserPlus />
          Invite users
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Plus />
          New team
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const Default: Story = {
  render: () => <Menu />,
};

/** Opened by default so the menu items (and their icons) are visible in docs. */
export const MenuItems: Story = {
  render: () => <Menu defaultOpen modal={false} />,
};
