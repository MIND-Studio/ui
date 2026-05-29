import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../src/components/combobox";
import { Label } from "../../src/components/label";

const meta = {
  title: "Components/Forms/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
];

/*
 * Built on `@base-ui/react`'s Combobox. The Root (`Combobox`) takes the source
 * `items` plus filtering/open state; `defaultOpen` renders the popup expanded so
 * the list is visible and testable. `ComboboxContent` portals through
 * `ComboboxPortal` + `ComboboxPositioner`. The `ComboboxInput` is labeled via a
 * `<Label htmlFor>` paired with the input's `id`.
 */
export const Default: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="framework">Framework</Label>
      <Combobox items={frameworks} defaultOpen>
        <ComboboxInput id="framework" placeholder="Pick a framework..." />
        <ComboboxContent>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};

/*
 * Closed on mount — opens by typing. `ComboboxInput`'s built-in disclosure
 * trigger is icon-only (a bare chevron with no accessible name), so it's hidden
 * here via `showTrigger={false}`; the labeled input remains the control.
 */
export const Closed: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="framework-closed">Framework</Label>
      <Combobox items={frameworks}>
        <ComboboxInput
          id="framework-closed"
          placeholder="Pick a framework..."
          showTrigger={false}
        />
        <ComboboxContent>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};
