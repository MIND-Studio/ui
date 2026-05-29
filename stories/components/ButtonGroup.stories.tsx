import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic } from "lucide-react";
import {
  ButtonGroup,
  ButtonGroupText,
  ButtonGroupSeparator,
} from "../../src/components/button-group";
import { Button } from "../../src/components/button";

const meta = {
  title: "Components/Buttons & Actions/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <ButtonGroup>
        <Button variant="outline">Day</Button>
        <Button variant="outline">Week</Button>
        <Button variant="outline">Month</Button>
      </ButtonGroup>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="p-6">
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Align left">
          <AlignLeft />
        </Button>
        <Button variant="outline" size="icon" aria-label="Align center">
          <AlignCenter />
        </Button>
        <Button variant="outline" size="icon" aria-label="Align right">
          <AlignRight />
        </Button>
        <ButtonGroupSeparator />
        <Button variant="outline" size="icon" aria-label="Bold">
          <Bold />
        </Button>
        <Button variant="outline" size="icon" aria-label="Italic">
          <Italic />
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="p-6">
      <ButtonGroup>
        <ButtonGroupText>Quantity</ButtonGroupText>
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
      </ButtonGroup>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="p-6">
      <ButtonGroup orientation="vertical">
        <Button variant="outline">Top</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Bottom</Button>
      </ButtonGroup>
    </div>
  ),
};
