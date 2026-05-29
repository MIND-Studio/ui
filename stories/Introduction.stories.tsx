import { Description, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  ArrowRight,
  Bold,
  Calendar as CalendarIcon,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  File as FileIcon,
  Info,
  Inbox,
  Search,
  Smile,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../src/lib/cn";
import { COMPONENT_PROP_COUNTS } from "./components/component-manifest";

/*
 * Introduction — the component library at a glance. A generated overview of the
 * whole catalog: the total component count, one section per category, and a
 * preview card per component (name, prop count, and a simplified visual). Prop
 * counts come from `component-manifest.ts`, generated from the typed source by
 * `pnpm gen:manifest`, so the numbers can never drift from what ships.
 */

// ---------------------------------------------------------------------------
// Tiny presentational atoms for the simplified previews. Everything here is
// pure CSS/markup (no interactive primitives, no portals) so the catalog page
// renders fast and stays axe-clean; decorative icons are aria-hidden.
// ---------------------------------------------------------------------------

function Bar({ w = "100%", tone = "muted" }: { w?: string; tone?: "muted" | "strong" }) {
  return (
    <div
      className={cn("h-1.5 rounded-full", tone === "strong" ? "bg-foreground/70" : "bg-muted")}
      style={{ width: w }}
    />
  );
}

const iconClass = "size-3.5 shrink-0";

// ---------------------------------------------------------------------------
// Catalog — categories mirror the Storybook sidebar groups; `propsKey` is the
// exported symbol each story documents (its `component:`), used to read the
// generated prop count.
// ---------------------------------------------------------------------------

interface Entry {
  name: string;
  propsKey: string;
  preview: ReactNode;
}
interface Category {
  name: string;
  blurb: string;
  items: Entry[];
}

const CATEGORIES: Category[] = [
  {
    name: "Forms",
    blurb: "Inputs, controls, and everything you compose into a form.",
    items: [
      {
        name: "Button",
        propsKey: "Button",
        preview: (
          <div className="rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground text-xs shadow-sm">
            Button
          </div>
        ),
      },
      {
        name: "Checkbox",
        propsKey: "Checkbox",
        preview: (
          <div className="flex items-center gap-2">
            <div className="flex size-4 items-center justify-center rounded-[4px] bg-primary text-primary-foreground">
              <Check className="size-3" aria-hidden />
            </div>
            <Bar w="3.5rem" />
          </div>
        ),
      },
      {
        name: "Combobox",
        propsKey: "Combobox",
        preview: (
          <div className="w-36 space-y-1">
            <div className="flex items-center justify-between rounded-md border border-border px-2 py-1.5 text-muted-foreground text-xs">
              Select…
              <ChevronsUpDown className="size-3" aria-hidden />
            </div>
            <div className="space-y-1 rounded-md border border-border bg-popover p-1 shadow-sm">
              <div className="rounded bg-accent px-2 py-1">
                <Bar w="80%" />
              </div>
              <div className="px-2 py-1">
                <Bar w="55%" />
              </div>
            </div>
          </div>
        ),
      },
      {
        name: "Date Picker",
        propsKey: "DatePicker",
        preview: (
          <div className="flex w-36 items-center gap-2 rounded-md border border-border px-2 py-1.5 text-muted-foreground text-xs">
            <CalendarIcon className={iconClass} aria-hidden />
            May 30, 2026
          </div>
        ),
      },
      {
        name: "Field",
        propsKey: "Field",
        preview: (
          <div className="w-36 space-y-1.5">
            <Bar w="2.5rem" tone="strong" />
            <div className="h-7 rounded-md border border-border" />
            <Bar w="4.5rem" />
          </div>
        ),
      },
      {
        name: "Form",
        propsKey: "Form",
        preview: (
          <div className="w-36 space-y-2">
            <div className="h-6 rounded-md border border-border" />
            <div className="h-6 rounded-md border border-border" />
            <div className="h-6 w-16 rounded-md bg-primary" />
          </div>
        ),
      },
      {
        name: "Input",
        propsKey: "Input",
        preview: (
          <div className="flex h-8 w-36 items-center rounded-md border border-border px-2 text-muted-foreground text-xs">
            email@mind.dev
          </div>
        ),
      },
      {
        name: "InputOTP",
        propsKey: "InputOTP",
        preview: (
          <div className="flex gap-1.5">
            {["2", "4", "", ""].map((d, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static demo slots
                key={i}
                className="flex size-8 items-center justify-center rounded-md border border-border font-medium text-sm"
              >
                {d}
              </div>
            ))}
          </div>
        ),
      },
      {
        name: "Label",
        propsKey: "Label",
        preview: (
          <div className="w-36 space-y-1.5">
            <span className="font-medium text-foreground text-xs">Email address</span>
            <div className="h-7 rounded-md border border-border" />
          </div>
        ),
      },
      {
        name: "NativeSelect",
        propsKey: "NativeSelect",
        preview: (
          <div className="flex w-36 items-center justify-between rounded-md border border-border px-2 py-1.5 text-xs">
            Option A
            <ChevronDown className="size-3 text-muted-foreground" aria-hidden />
          </div>
        ),
      },
      {
        name: "RadioGroup",
        propsKey: "RadioGroup",
        preview: (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex size-4 items-center justify-center rounded-full border-2 border-primary">
                <div className="size-1.5 rounded-full bg-primary" />
              </div>
              <Bar w="3.5rem" />
            </div>
            <div className="flex items-center gap-2">
              <div className="size-4 rounded-full border-2 border-input" />
              <Bar w="2.5rem" />
            </div>
          </div>
        ),
      },
      {
        name: "Select",
        propsKey: "Select",
        preview: (
          <div className="w-32 space-y-0.5 rounded-md border border-border bg-popover p-1 text-xs shadow-md">
            <div className="flex items-center gap-1 rounded bg-accent px-2 py-1">
              <Check className="size-3" aria-hidden />
              Light
            </div>
            <div className="px-2 py-1">Dark</div>
            <div className="px-2 py-1">System</div>
          </div>
        ),
      },
      {
        name: "Slider",
        propsKey: "Slider",
        preview: (
          <div className="w-36">
            <div className="relative h-1.5 rounded-full bg-muted">
              <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-primary" />
              <div className="-translate-y-1/2 absolute top-1/2 left-1/2 size-3.5 rounded-full border-2 border-primary bg-background shadow" />
            </div>
          </div>
        ),
      },
      {
        name: "Switch",
        propsKey: "Switch",
        preview: (
          <div className="flex h-5 w-9 items-center rounded-full bg-primary px-0.5">
            <div className="size-4 translate-x-4 rounded-full bg-background shadow" />
          </div>
        ),
      },
      {
        name: "Textarea",
        propsKey: "Textarea",
        preview: (
          <div className="w-36 space-y-1.5 rounded-md border border-border p-2">
            <Bar w="100%" />
            <Bar w="90%" />
            <Bar w="60%" />
          </div>
        ),
      },
      {
        name: "Toggle",
        propsKey: "Toggle",
        preview: (
          <div className="flex size-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Bold className="size-4" aria-hidden />
          </div>
        ),
      },
      {
        name: "ToggleGroup",
        propsKey: "ToggleGroup",
        preview: (
          <div className="flex overflow-hidden rounded-md border border-border">
            <div className="px-2.5 py-1.5">
              <AlignLeft className="size-4 text-muted-foreground" aria-hidden />
            </div>
            <div className="bg-accent px-2.5 py-1.5 text-accent-foreground">
              <AlignCenter className="size-4" aria-hidden />
            </div>
            <div className="px-2.5 py-1.5">
              <AlignRight className="size-4 text-muted-foreground" aria-hidden />
            </div>
          </div>
        ),
      },
    ],
  },
  {
    name: "Buttons & Actions",
    blurb: "Grouped triggers and command surfaces.",
    items: [
      {
        name: "ButtonGroup",
        propsKey: "ButtonGroup",
        preview: (
          <div className="flex text-xs">
            <div className="rounded-l-md border border-border px-3 py-1.5">Prev</div>
            <div className="border-border border-y px-3 py-1.5">1</div>
            <div className="rounded-r-md border border-border px-3 py-1.5">Next</div>
          </div>
        ),
      },
      {
        name: "Command",
        propsKey: "Command",
        preview: (
          <div className="w-44 overflow-hidden rounded-lg border border-border bg-popover shadow-md">
            <div className="flex items-center gap-2 border-border border-b px-2 py-1.5">
              <Search className="size-3.5 text-muted-foreground" aria-hidden />
              <span className="text-muted-foreground text-xs">Type a command…</span>
            </div>
            <div className="space-y-0.5 p-1 text-xs">
              <div className="flex items-center gap-2 rounded bg-accent px-2 py-1">
                <CalendarIcon className="size-3" aria-hidden />
                Calendar
              </div>
              <div className="flex items-center gap-2 px-2 py-1">
                <Smile className="size-3" aria-hidden />
                Search Emoji
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    name: "Overlays",
    blurb: "Layers that float above the page — dialogs, menus, popovers.",
    items: [
      {
        name: "AlertDialog",
        propsKey: "AlertDialog",
        preview: (
          <div className="w-44 space-y-2 rounded-lg border border-border bg-popover p-3 shadow-md">
            <Bar w="70%" tone="strong" />
            <Bar w="100%" />
            <Bar w="80%" />
            <div className="flex justify-end gap-1.5 pt-1">
              <div className="rounded-md border border-border px-2 py-1 text-[10px]">Cancel</div>
              <div className="rounded-md bg-primary px-2 py-1 text-[10px] text-primary-foreground">
                Continue
              </div>
            </div>
          </div>
        ),
      },
      {
        name: "ContextMenu",
        propsKey: "ContextMenu",
        preview: (
          <div className="w-32 space-y-0.5 rounded-md border border-border bg-popover p-1 text-xs shadow-md">
            <div className="rounded px-2 py-1">Back</div>
            <div className="rounded bg-accent px-2 py-1">Forward</div>
            <div className="my-1 h-px bg-border" />
            <div className="rounded px-2 py-1">Reload</div>
          </div>
        ),
      },
      {
        name: "Dialog",
        propsKey: "Dialog",
        preview: (
          <div className="relative w-44 space-y-2 rounded-lg border border-border bg-popover p-3 shadow-md">
            <X className="absolute top-2 right-2 size-3 text-muted-foreground" aria-hidden />
            <Bar w="55%" tone="strong" />
            <Bar w="100%" />
            <Bar w="85%" />
          </div>
        ),
      },
      {
        name: "Drawer",
        propsKey: "Drawer",
        preview: (
          <div className="w-44 space-y-2 rounded-t-xl border border-border border-b-0 bg-popover p-3 shadow-md">
            <div className="mx-auto h-1 w-8 rounded-full bg-muted" />
            <Bar w="45%" tone="strong" />
            <Bar w="100%" />
            <Bar w="70%" />
          </div>
        ),
      },
      {
        name: "DropdownMenu",
        propsKey: "DropdownMenu",
        preview: (
          <div className="w-32 space-y-0.5 rounded-md border border-border bg-popover p-1 text-xs shadow-md">
            <div className="px-2 py-1 text-[10px] text-muted-foreground uppercase tracking-wide">
              My Account
            </div>
            <div className="rounded bg-accent px-2 py-1">Profile</div>
            <div className="rounded px-2 py-1">Settings</div>
          </div>
        ),
      },
      {
        name: "HoverCard",
        propsKey: "HoverCard",
        preview: (
          <div className="flex w-44 gap-2 rounded-lg border border-border bg-popover p-3 shadow-md">
            <div className="size-8 shrink-0 rounded-full bg-muted" />
            <div className="flex-1 space-y-1">
              <Bar w="60%" tone="strong" />
              <Bar w="100%" />
              <Bar w="80%" />
            </div>
          </div>
        ),
      },
      {
        name: "Menubar",
        propsKey: "Menubar",
        preview: (
          <div className="flex gap-0.5 rounded-md border border-border bg-popover p-1 text-xs">
            <span className="rounded bg-accent px-2 py-0.5">File</span>
            <span className="px-2 py-0.5">Edit</span>
            <span className="px-2 py-0.5">View</span>
          </div>
        ),
      },
      {
        name: "Popover",
        propsKey: "Popover",
        preview: (
          <div className="flex flex-col items-center">
            <div className="w-36 space-y-1.5 rounded-md border border-border bg-popover p-2.5 shadow-md">
              <Bar w="50%" tone="strong" />
              <Bar w="100%" />
              <Bar w="70%" />
            </div>
            <div className="-mt-1 size-2 rotate-45 border-border border-r border-b bg-popover" />
          </div>
        ),
      },
      {
        name: "Sheet",
        propsKey: "Sheet",
        preview: (
          <div className="flex h-20 w-44 overflow-hidden rounded-md border border-border">
            <div className="flex-1 bg-muted/40" />
            <div className="w-20 space-y-1.5 border-border border-l bg-popover p-2 shadow-md">
              <Bar w="60%" tone="strong" />
              <Bar w="100%" />
              <Bar w="80%" />
            </div>
          </div>
        ),
      },
      {
        name: "Tooltip",
        propsKey: "Tooltip",
        preview: (
          <div className="flex flex-col items-center">
            <div className="rounded-md bg-primary px-2 py-1 text-[10px] text-primary-foreground">
              Add to library
            </div>
            <div className="-mt-1 size-2 rotate-45 bg-primary" />
          </div>
        ),
      },
    ],
  },
  {
    name: "Navigation",
    blurb: "Move through the app — tabs, breadcrumbs, sidebars, pagination.",
    items: [
      {
        name: "Breadcrumb",
        propsKey: "Breadcrumb",
        preview: (
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <span>Home</span>
            <ChevronRight className="size-3" aria-hidden />
            <span>Docs</span>
            <ChevronRight className="size-3" aria-hidden />
            <span className="text-foreground">Components</span>
          </div>
        ),
      },
      {
        name: "NavigationMenu",
        propsKey: "NavigationMenu",
        preview: (
          <div className="flex items-center gap-0.5 rounded-md border border-border bg-popover p-1 text-xs">
            <span className="flex items-center gap-0.5 rounded bg-accent px-2 py-1">
              Products
              <ChevronDown className="size-3" aria-hidden />
            </span>
            <span className="px-2 py-1">Pricing</span>
          </div>
        ),
      },
      {
        name: "Pagination",
        propsKey: "Pagination",
        preview: (
          <div className="flex items-center gap-1 text-xs">
            <div className="rounded-md border border-border px-1.5 py-1">
              <ChevronLeft className="size-3" aria-hidden />
            </div>
            <div className="rounded-md border border-border px-2.5 py-1">1</div>
            <div className="rounded-md bg-primary px-2.5 py-1 text-primary-foreground">2</div>
            <div className="rounded-md border border-border px-2.5 py-1">3</div>
            <div className="rounded-md border border-border px-1.5 py-1">
              <ChevronRight className="size-3" aria-hidden />
            </div>
          </div>
        ),
      },
      {
        name: "Sidebar",
        propsKey: "Sidebar",
        preview: (
          <div className="flex h-20 w-44 overflow-hidden rounded-md border border-border">
            <div className="w-16 space-y-1.5 border-sidebar-border border-r bg-sidebar p-2">
              <div className="h-1.5 w-9 rounded bg-sidebar-foreground/30" />
              <div className="h-4 rounded bg-sidebar-primary" />
              <div className="h-1.5 w-7 rounded bg-sidebar-foreground/30" />
              <div className="h-1.5 w-8 rounded bg-sidebar-foreground/30" />
            </div>
            <div className="flex-1 space-y-1.5 bg-background p-2">
              <Bar w="80%" />
              <Bar w="60%" />
            </div>
          </div>
        ),
      },
      {
        name: "Tabs",
        propsKey: "Tabs",
        preview: (
          <div className="w-44 space-y-2">
            <div className="flex gap-1 rounded-md bg-muted p-1 text-xs">
              <span className="flex-1 rounded bg-background py-1 text-center shadow-sm">Account</span>
              <span className="flex-1 py-1 text-center text-muted-foreground">Password</span>
            </div>
            <div className="space-y-1.5">
              <Bar w="100%" />
              <Bar w="70%" />
            </div>
          </div>
        ),
      },
    ],
  },
  {
    name: "Data Display",
    blurb: "Present content — tables, cards, charts, avatars, calendars.",
    items: [
      {
        name: "Avatar",
        propsKey: "Avatar",
        preview: (
          <div className="-space-x-2 flex">
            <div className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-muted font-medium text-xs">
              SR
            </div>
            <div className="size-9 rounded-full border-2 border-background bg-primary/20" />
            <div className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-secondary text-secondary-foreground text-xs">
              +3
            </div>
          </div>
        ),
      },
      {
        name: "Badge",
        propsKey: "Badge",
        preview: (
          <div className="flex flex-wrap justify-center gap-1.5">
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
              Badge
            </span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground">
              New
            </span>
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px]">Outline</span>
          </div>
        ),
      },
      {
        name: "Calendar",
        propsKey: "Calendar",
        preview: (
          <div className="w-36 space-y-1">
            <div className="flex items-center justify-between px-1 font-medium text-[10px]">
              <ChevronLeft className="size-3" aria-hidden />
              May 2026
              <ChevronRight className="size-3" aria-hidden />
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-[9px] text-muted-foreground">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed weekday labels
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-[9px]">
              {Array.from({ length: 21 }, (_, i) => i + 1).map((day) => (
                <span
                  key={day}
                  className={cn(
                    "rounded-full py-0.5",
                    day === 12 && "bg-primary text-primary-foreground",
                  )}
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        ),
      },
      {
        name: "Card",
        propsKey: "Card",
        preview: (
          <div className="w-40 space-y-2 rounded-lg border border-border bg-card p-3 shadow-sm">
            <Bar w="55%" tone="strong" />
            <Bar w="35%" />
            <div className="space-y-1.5 pt-1">
              <Bar w="100%" />
              <Bar w="85%" />
            </div>
          </div>
        ),
      },
      {
        name: "Chart",
        propsKey: "ChartContainer",
        preview: (
          <div className="flex h-16 items-end gap-1.5">
            {[45, 70, 40, 90, 60, 78].map((h, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static bar heights
                key={i}
                className={cn("w-3 rounded-t", i % 2 === 0 ? "bg-primary" : "bg-primary/40")}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        ),
      },
      {
        name: "Data Table",
        propsKey: "DataTable",
        preview: (
          <div className="w-44 overflow-hidden rounded-md border border-border text-[10px]">
            <div className="flex bg-muted px-2 py-1 font-medium">
              <span className="flex-1">Name</span>
              <span className="w-10 text-right">Amount</span>
            </div>
            {[
              ["68%", "$250"],
              ["52%", "$150"],
              ["74%", "$350"],
            ].map(([w, amt]) => (
              <div key={amt} className="flex items-center border-border border-t px-2 py-1">
                <span className="flex-1">
                  <Bar w={w} />
                </span>
                <span className="w-10 text-right text-muted-foreground">{amt}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        name: "Empty",
        propsKey: "Empty",
        preview: (
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="flex size-9 items-center justify-center rounded-full bg-muted">
              <Inbox className="size-4 text-muted-foreground" aria-hidden />
            </div>
            <span className="font-medium text-xs">No results</span>
            <Bar w="5rem" />
          </div>
        ),
      },
      {
        name: "Item",
        propsKey: "Item",
        preview: (
          <div className="flex w-44 items-center gap-2 rounded-md border border-border p-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-muted">
              <FileIcon className="size-3.5 text-muted-foreground" aria-hidden />
            </div>
            <div className="flex-1 space-y-1">
              <Bar w="55%" tone="strong" />
              <Bar w="90%" />
            </div>
            <ChevronRight className="size-3.5 text-muted-foreground" aria-hidden />
          </div>
        ),
      },
      {
        name: "Kbd",
        propsKey: "Kbd",
        preview: (
          <div className="flex items-center gap-1">
            <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-medium text-[11px] shadow-sm">
              ⌘
            </kbd>
            <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-medium text-[11px] shadow-sm">
              K
            </kbd>
          </div>
        ),
      },
      {
        name: "Table",
        propsKey: "Table",
        preview: (
          <div className="w-44 text-[10px]">
            <div className="flex border-border border-b pb-1 font-medium text-muted-foreground">
              <span className="flex-1">Invoice</span>
              <span className="w-14 text-right">Status</span>
            </div>
            {["INV-001", "INV-002", "INV-003"].map((inv) => (
              <div key={inv} className="flex border-border border-b py-1 last:border-0">
                <span className="flex-1">{inv}</span>
                <span className="w-14 text-right text-muted-foreground">Paid</span>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    name: "Feedback",
    blurb: "Communicate status — alerts, progress, loading, toasts.",
    items: [
      {
        name: "Alert",
        propsKey: "Alert",
        preview: (
          <div className="flex w-44 gap-2 rounded-md border border-border p-2.5">
            <Info className="size-4 shrink-0 text-foreground" aria-hidden />
            <div className="flex-1 space-y-1">
              <Bar w="50%" tone="strong" />
              <Bar w="100%" />
              <Bar w="75%" />
            </div>
          </div>
        ),
      },
      {
        name: "Progress",
        propsKey: "Progress",
        preview: (
          <div className="h-2 w-36 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
        ),
      },
      {
        name: "Skeleton",
        propsKey: "Skeleton",
        preview: (
          <div className="flex w-44 items-center gap-2">
            <div className="size-9 animate-pulse rounded-full bg-muted" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-full animate-pulse rounded bg-muted" />
              <div className="h-2.5 w-2/3 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ),
      },
      {
        name: "Sonner",
        propsKey: "Toaster",
        preview: (
          <div className="flex w-44 items-center gap-2 rounded-lg border border-border bg-popover p-2.5 shadow-md">
            <div className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="size-3" aria-hidden />
            </div>
            <div className="flex-1 space-y-1">
              <Bar w="65%" tone="strong" />
              <Bar w="100%" />
            </div>
          </div>
        ),
      },
      {
        name: "Spinner",
        propsKey: "Spinner",
        preview: (
          <div className="size-7 animate-spin rounded-full border-2 border-muted border-t-primary" />
        ),
      },
    ],
  },
  {
    name: "Layout",
    blurb: "Structure and arrange — accordions, panels, scroll regions.",
    items: [
      {
        name: "Accordion",
        propsKey: "Accordion",
        preview: (
          <div className="w-44 divide-y divide-border rounded-md border border-border">
            <div className="flex items-center justify-between px-2.5 py-2">
              <Bar w="50%" tone="strong" />
              <ChevronDown className="size-3 rotate-180 text-muted-foreground" aria-hidden />
            </div>
            <div className="space-y-1.5 px-2.5 py-2">
              <Bar w="100%" />
              <Bar w="80%" />
            </div>
            <div className="flex items-center justify-between px-2.5 py-2">
              <Bar w="40%" tone="strong" />
              <ChevronDown className="size-3 text-muted-foreground" aria-hidden />
            </div>
          </div>
        ),
      },
      {
        name: "AspectRatio",
        propsKey: "AspectRatio",
        preview: (
          <div className="w-40">
            <div className="flex aspect-video items-center justify-center rounded-md bg-muted text-[10px] text-muted-foreground">
              16 / 9
            </div>
          </div>
        ),
      },
      {
        name: "Carousel",
        propsKey: "Carousel",
        preview: (
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full border border-border">
              <ChevronLeft className="size-3" aria-hidden />
            </div>
            <div className="flex h-16 w-20 items-center justify-center rounded-md bg-muted font-medium text-sm">
              1
            </div>
            <div className="flex size-6 items-center justify-center rounded-full border border-border">
              <ChevronRight className="size-3" aria-hidden />
            </div>
          </div>
        ),
      },
      {
        name: "Collapsible",
        propsKey: "Collapsible",
        preview: (
          <div className="w-44 space-y-1.5">
            <div className="flex items-center justify-between rounded-md border border-border px-2.5 py-1.5">
              <Bar w="50%" tone="strong" />
              <ChevronsUpDown className="size-3 text-muted-foreground" aria-hidden />
            </div>
            <div className="rounded-md border border-border px-2.5 py-1.5">
              <Bar w="80%" />
            </div>
            <div className="rounded-md border border-border px-2.5 py-1.5">
              <Bar w="60%" />
            </div>
          </div>
        ),
      },
      {
        name: "Resizable",
        propsKey: "ResizablePanelGroup",
        preview: (
          <div className="flex h-16 w-44 overflow-hidden rounded-md border border-border">
            <div className="flex-1 bg-muted/40" />
            <div className="flex w-1.5 items-center justify-center bg-border">
              <div className="h-5 w-0.5 rounded-full bg-muted-foreground/40" />
            </div>
            <div className="flex-1 bg-muted/20" />
          </div>
        ),
      },
      {
        name: "ScrollArea",
        propsKey: "ScrollArea",
        preview: (
          <div className="relative h-20 w-32 overflow-hidden rounded-md border border-border p-2">
            <div className="space-y-1.5 pr-3">
              <Bar w="90%" />
              <Bar w="100%" />
              <Bar w="80%" />
              <Bar w="95%" />
              <Bar w="70%" />
            </div>
            <div className="absolute top-1 right-1 h-10 w-1.5 rounded-full bg-muted-foreground/30" />
          </div>
        ),
      },
      {
        name: "Separator",
        propsKey: "Separator",
        preview: (
          <div className="w-36 space-y-2 text-center text-xs">
            <span>Section A</span>
            <div className="h-px w-full bg-border" />
            <span className="text-muted-foreground">Section B</span>
          </div>
        ),
      },
    ],
  },
  {
    name: "Utilities",
    blurb: "Low-level helpers that wrap or augment other controls.",
    items: [
      {
        name: "Direction",
        propsKey: "DirectionProvider",
        preview: (
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 rounded-md border border-border px-2 py-1.5">
              <span>LTR</span>
              <ArrowRight className="size-3" aria-hidden />
            </div>
            <div className="flex items-center gap-1 rounded-md border border-border px-2 py-1.5">
              <ArrowLeft className="size-3" aria-hidden />
              <span>RTL</span>
            </div>
          </div>
        ),
      },
      {
        name: "InputGroup",
        propsKey: "InputGroup",
        preview: (
          <div className="flex w-44 items-center overflow-hidden rounded-md border border-border">
            <div className="flex items-center px-2 text-muted-foreground">
              <Search className="size-3.5" aria-hidden />
            </div>
            <div className="flex-1 py-1.5 text-muted-foreground text-xs">Search…</div>
            <div className="border-border border-l bg-muted px-2.5 py-1.5 text-[10px]">Go</div>
          </div>
        ),
      },
    ],
  },
];

const TOTAL_COMPONENTS = CATEGORIES.reduce((n, c) => n + c.items.length, 0);

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

function PropCount({ propsKey }: { propsKey: string }) {
  const count = COMPONENT_PROP_COUNTS[propsKey];
  const label = count === undefined ? "—" : `${count} ${count === 1 ? "prop" : "props"}`;
  return (
    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground tabular-nums">
      {label}
    </span>
  );
}

function PreviewCard({ entry }: { entry: Entry }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex h-36 items-center justify-center overflow-hidden border-border border-b bg-background p-4">
        {entry.preview}
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <span className="truncate font-medium text-card-foreground text-sm">{entry.name}</span>
        <PropCount propsKey={entry.propsKey} />
      </div>
    </div>
  );
}

function CategorySection({ category }: { category: Category }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4 border-border border-b pb-2">
        <div className="space-y-0.5">
          <h3 className="font-semibold text-foreground text-lg">{category.name}</h3>
          <p className="text-muted-foreground text-sm">{category.blurb}</p>
        </div>
        <span className="shrink-0 text-muted-foreground text-sm tabular-nums">
          {category.items.length} components
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {category.items.map((entry) => (
          <PreviewCard key={entry.name} entry={entry} />
        ))}
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className="font-bold text-2xl text-foreground tabular-nums">{value}</div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
  );
}

function Overview() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 p-6">
      <header className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-bold text-3xl text-foreground tracking-tight">Component library</h2>
          <p className="max-w-2xl text-muted-foreground">
            Mind UI vendors the complete shadcn registry as pristine, token-driven primitives.
            Browse the catalog below, or pick a component from the sidebar to see its full set of
            examples, variants, and live controls.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Stat value={TOTAL_COMPONENTS} label="Components" />
          <Stat value={CATEGORIES.length} label="Categories" />
          <Stat
            value={Object.keys(COMPONENT_PROP_COUNTS).length}
            label="Documented exports"
          />
        </div>
      </header>
      {CATEGORIES.map((category) => (
        <CategorySection key={category.name} category={category} />
      ))}
    </div>
  );
}

function IntroductionDocs() {
  return (
    <>
      <Title />
      <Description />
      <Overview />
    </>
  );
}

const meta = {
  title: "Components/Introduction",
  parameters: {
    layout: "fullscreen",
    docs: {
      page: IntroductionDocs,
      description: {
        component: `An at-a-glance map of every component, grouped by category. Each card shows the
component name, its number of meaningful props (generated from the typed source), and a simplified
visual. There are ${TOTAL_COMPONENTS} components across ${CATEGORIES.length} categories.`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Catalog: Story = {
  render: () => <Overview />,
};
