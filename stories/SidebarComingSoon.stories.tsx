import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  BarChart3,
  Bot,
  FileText,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../src/components/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../src/components/tooltip";
import { cn } from "../src/lib/cn";

/**
 * Authored demo (not a vendored block): a "coming soon" affordance for sidebar
 * nav items. Instead of a text label, an item gets a small dot pinned to the
 * right edge; hovering or focusing the dot reveals a "Coming soon" tooltip.
 *
 * The dot is a sibling of `SidebarMenuButton` — not a child — so its tooltip
 * trigger (a real <button> for keyboard + screen-reader access) never nests
 * inside the row's own interactive element. `SidebarMenuBadge` isn't reused
 * because it's `pointer-events-none`, which would swallow the hover.
 */
function ComingSoonDot() {
  return (
    <Tooltip>
      <TooltipTrigger
        aria-label="Coming soon"
        className={cn(
          "absolute top-1/2 right-2 size-2.5 -translate-y-1/2 rounded-full outline-hidden",
          "bg-sidebar-primary/70 ring-2 ring-sidebar-primary/15",
          "transition-colors hover:bg-sidebar-primary focus-visible:ring-sidebar-ring",
          // Hide alongside other badges when the sidebar collapses to icons.
          "group-data-[collapsible=icon]:hidden",
        )}
      />
      <TooltipContent side="right">Coming soon</TooltipContent>
    </Tooltip>
  );
}

const nav = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "Documents", icon: FileText },
  { title: "Team", icon: Users },
  { title: "Analytics", icon: BarChart3, soon: true },
  { title: "AI Assistant", icon: Bot, soon: true },
  { title: "Settings", icon: Settings },
] satisfies {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  soon?: boolean;
}[];

function DemoSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Sparkles className="size-5 text-sidebar-primary" />
          <span className="font-semibold group-data-[collapsible=icon]:hidden">
            Mind
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {nav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  aria-disabled={item.soon || undefined}
                  className={cn(item.soon && "opacity-60")}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
                {item.soon ? <ComingSoonDot /> : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const meta = {
  title: "🎛️ Patterns/Sidebar/Coming Soon",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <DemoSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">
            Hover the dot beside “Analytics” or “AI Assistant”.
          </span>
        </header>
      </SidebarInset>
    </SidebarProvider>
  ),
};
