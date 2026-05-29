import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChevronRight, FileText, MoreHorizontal } from "lucide-react";
import {
  Item,
  ItemGroup,
  ItemHeader,
  ItemFooter,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemSeparator,
} from "../../src/components/item";
import { Button } from "../../src/components/button";

const meta = {
  title: "Components/Data Display/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-96 p-6">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileText />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Quarterly report</ItemTitle>
          <ItemDescription>Updated 2 hours ago by Ada.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="icon" aria-label="More options">
            <MoreHorizontal />
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="w-96 p-6">
      <ItemGroup>
        <Item role="listitem">
          <ItemContent>
            <ItemTitle>Inbox</ItemTitle>
            <ItemDescription>12 unread messages.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item role="listitem">
          <ItemContent>
            <ItemTitle>Drafts</ItemTitle>
            <ItemDescription>3 saved drafts.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  ),
};

export const WithHeaderFooter: Story = {
  render: () => (
    <div className="w-96 p-6">
      <Item variant="muted">
        <ItemHeader>
          <ItemTitle>Build pipeline</ItemTitle>
          <span className="text-xs text-muted-foreground">#1024</span>
        </ItemHeader>
        <ItemContent>
          <ItemDescription>
            All checks passed on the latest commit.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span className="text-xs text-muted-foreground">2 minutes ago</span>
          <Button variant="outline" size="sm">
            View logs
          </Button>
        </ItemFooter>
      </Item>
    </div>
  ),
};
