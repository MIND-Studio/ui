import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../../src/components/command";

const meta = {
  title: "Components/Buttons & Actions/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    // cmdk registers its options (role="option") into the listbox via effects
    // that depend on measurement; these don't run under happy-dom, so the
    // listbox renders without option children and axe flags it. Works in a real
    // browser / Storybook.
    a11y: { disabledRules: ["aria-required-children"] },
  },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 * Rendered inside the bordered `<Command>` (not `CommandDialog`) so the input and
 * list stay visible and testable. `CommandInput` wraps cmdk's input — we add an
 * explicit `aria-label` so it always has an accessible name.
 */
export const Default: Story = {
  render: () => (
    <Command className="w-96 rounded-lg border shadow-md">
      <CommandInput
        placeholder="Type a command or search..."
        aria-label="Command search"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            Calendar
          </CommandItem>
          <CommandItem>
            <Smile />
            Search emoji
          </CommandItem>
          <CommandItem>
            <Calculator />
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/** A single ungrouped list of selectable items. */
export const Simple: Story = {
  render: () => (
    <Command className="w-96 rounded-lg border shadow-md">
      <CommandInput placeholder="Search fruit..." aria-label="Search fruit" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Fruit">
          <CommandItem>Apple</CommandItem>
          <CommandItem>Banana</CommandItem>
          <CommandItem>Cherry</CommandItem>
          <CommandItem>Date</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
