import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../src/components/collapsible";
import { Button } from "../../src/components/button";

const meta = {
  title: "Components/Layout/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="flex w-80 flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm font-semibold">@mind starred 3 repositories</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">
        @mind/ui
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @mind/tokens
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @mind/theme
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

/** `defaultOpen` renders the collapsible expanded on mount. */
export const Open: Story = {
  render: () => (
    <Collapsible defaultOpen className="flex w-80 flex-col gap-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle details</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-md border p-4 text-sm text-muted-foreground">
        These details are visible because the collapsible starts open.
      </CollapsibleContent>
    </Collapsible>
  ),
};
