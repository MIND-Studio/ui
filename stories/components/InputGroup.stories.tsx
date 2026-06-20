import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Search, Send, Star } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "../../src/components/input-group";
import { Label } from "../../src/components/label";

const meta = {
  title: "🧩 Components/Utilities/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-80 gap-2 p-6">
      <Label htmlFor="ig-search">Search</Label>
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput id="ig-search" placeholder="Search projects…" />
      </InputGroup>
    </div>
  ),
};

export const WithTextAddon: Story = {
  render: () => (
    <div className="grid w-80 gap-2 p-6">
      <Label htmlFor="ig-url">Website</Label>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput id="ig-url" placeholder="mind.dev" />
      </InputGroup>
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="grid w-80 gap-2 p-6">
      <Label htmlFor="ig-message">Message</Label>
      <InputGroup>
        <InputGroupInput id="ig-message" placeholder="Type a message…" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Send message">
            <Send />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const Textarea: Story = {
  render: () => (
    <div className="grid w-80 gap-2 p-6">
      <Label htmlFor="ig-comment">Comment</Label>
      <InputGroup>
        <InputGroupTextarea id="ig-comment" placeholder="Leave a comment…" />
        <InputGroupAddon align="block-end">
          <InputGroupButton size="sm" aria-label="Star comment">
            <Star />
            Star
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
