import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../src/components/tabs";

const meta = {
  title: "🧩 Components/Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="text-muted-foreground text-sm">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="text-muted-foreground text-sm">
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
};
