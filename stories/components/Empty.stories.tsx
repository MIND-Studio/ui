import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FolderOpen, Plus, Search } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "../../src/components/empty";
import { Button } from "../../src/components/button";

const meta = {
  title: "🧩 Components/Data Display/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderOpen />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            Create your first project to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>
            <Plus />
            New project
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  ),
};

export const NoResults: Story = {
  render: () => (
    <div className="p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Search />
          </EmptyMedia>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            We couldn&apos;t find anything matching your search. Try a
            different term.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">Clear search</Button>
        </EmptyContent>
      </Empty>
    </div>
  ),
};
