import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../../src/components/context-menu";

const meta = {
  title: "🧩 Components/Overlays/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ContextMenu has no `defaultOpen` — it opens on right-click of the trigger area.
 * The trigger surface alone is what renders in docs.
 */
export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

/** Shows submenus, checkbox items, a radio group, and labels. */
export const WithSubmenuAndSelections: Story = {
  render: function Render() {
    const [bookmarks, setBookmarks] = React.useState(true);
    const [view, setView] = React.useState("grid");
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-40 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-52">
          <ContextMenuLabel>Page</ContextMenuLabel>
          <ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
            Show bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value={view} onValueChange={setView}>
            <ContextMenuLabel inset>View</ContextMenuLabel>
            <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
            <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Copy link</ContextMenuItem>
              <ContextMenuItem>Email</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};
