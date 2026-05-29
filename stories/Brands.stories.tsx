import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo, Pattern, Symbol } from "../src/components/brand";
import { Button } from "../src/components/button";
import { useMindTheme } from "../src/theme/provider";

/*
 * Brand summary — switch brand/mode in the toolbar to see each built-in theme's
 * logo, symbol, pattern, palette, and radius rendered from live tokens.
 */

const meta = {
  title: "Brands/Summary",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const PALETTE = ["primary", "secondary", "accent", "muted", "destructive", "border"] as const;

function Summary() {
  const { theme } = useMindTheme();
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between gap-4">
        <Logo />
        <Symbol />
      </header>

      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8">
        <Pattern />
        <div className="relative space-y-2">
          <h2 className="font-semibold text-2xl text-card-foreground">{theme.label}</h2>
          <p className="text-muted-foreground text-sm">
            radius <code>{theme.radius ?? "base"}</code> · pattern{" "}
            <code>{theme.pattern?.kind ?? "none"}</code>
          </p>
          <div className="flex gap-2 pt-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {PALETTE.map((token) => (
          <div key={token} className="flex flex-col gap-1">
            <div
              className="h-16 rounded-lg border border-border"
              style={{ background: `var(--${token})` }}
            />
            <code className="text-muted-foreground text-xs">{token}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Summary_: Story = {
  name: "Summary",
  render: () => <Summary />,
};
