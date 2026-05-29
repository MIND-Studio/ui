import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CircleCheck, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../src/components/alert";

const meta = {
  title: "Components/Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "destructive"] },
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="max-w-md">
      <CircleCheck />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-md">
      <TriangleAlert />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
};
