import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CalendarDays } from "lucide-react";
import { Button } from "../../src/components/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../src/components/hover-card";

const meta = {
  title: "Components/Overlays/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * HoverCards open on pointer hover/focus of the trigger, so they default to closed.
 * `defaultOpen` is supported if you want it rendered eagerly.
 */
export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@mind</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">@mind</h4>
          <p className="text-sm">The shadcn-native, multi-brand design system for Mind projects.</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="size-4" />
            <span>Joined December 2025</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

/** Opened by default so the card content is visible in docs. */
export const Open: Story = {
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger asChild>
        <Button variant="link">@mind</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">@mind</h4>
          <p className="text-sm">The shadcn-native, multi-brand design system for Mind projects.</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
