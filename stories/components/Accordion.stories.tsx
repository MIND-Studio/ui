import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../src/components/accordion";

const meta = {
  title: "Components/Layout/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Yes. It comes with default styles that match the other components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Yes. It is animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/** `type="multiple"` lets several items stay open at once. */
export const Multiple: Story = {
  render: () => (
    <Accordion
      type="multiple"
      defaultValue={["item-1", "item-2"]}
      className="w-96"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          This section starts open.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          So does this one.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third section</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          This one is closed until you expand it.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
