import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

function Example({ onChange }: { onChange?: (v: string) => void }) {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <Select
        value={value}
        onValueChange={(v) => {
          setValue(v);
          onChange?.(v);
        }}
      >
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
      <span data-testid="value">{value ?? "none"}</span>
    </>
  );
}

describe("Select", () => {
  it("exposes a combobox trigger with an accessible name", () => {
    render(<Example />);
    expect(screen.getByRole("combobox", { name: "Fruit" })).toBeInTheDocument();
  });

  it("opens via keyboard and selects an option with arrow keys + Enter", async () => {
    const user = userEvent.setup();
    render(<Example />);

    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    trigger.focus();

    // Open the listbox from the keyboard.
    await user.keyboard("{Enter}");
    await screen.findByRole("listbox");

    // First item is highlighted on open; one ArrowDown moves to the second.
    await user.keyboard("{ArrowDown}{Enter}");

    await waitFor(() => expect(screen.getByTestId("value")).toHaveTextContent("banana"));
  });
});
