import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../src/components/resizable";

const meta = {
  title: "Components/Layout/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    // react-resizable-panels gives each handle role="separator" with
    // aria-valuenow/min/max derived from measured panel sizes. happy-dom has no
    // layout, so those values are absent and axe flags the required attrs.
    a11y: { disabledRules: ["aria-required-attr"] },
  },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[200px] max-w-[640px] rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Header</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
