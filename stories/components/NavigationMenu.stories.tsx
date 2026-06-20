import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CircleHelp } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../src/components/navigation-menu";

const meta = {
  title: "🧩 Components/Navigation/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1 p-2">
              <li>
                <NavigationMenuLink href="#introduction">
                  <div className="text-sm font-medium">Introduction</div>
                  <p className="text-sm text-muted-foreground">
                    Re-usable components built with Mind UI.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#installation">
                  <div className="text-sm font-medium">Installation</div>
                  <p className="text-sm text-muted-foreground">
                    How to install dependencies and structure your app.
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#docs">Docs</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/** A simple link bar with no dropdown content. */
export const Links: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#home">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#pricing">Pricing</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="#help"
            className="flex-row items-center gap-2"
          >
            <CircleHelp />
            Help
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
