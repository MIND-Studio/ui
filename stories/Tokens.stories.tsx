import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ALIAS_TOKENS } from "../src/tokens/aliases";
import { GRAY_STEPS } from "../src/tokens/base";

// Custom docs page: show each story once (no duplicated Primary block).
function TokensDocs() {
  return (
    <>
      <Title />
      <Description />
      <Stories includePrimary title="" />
    </>
  );
}

/*
 * Token documentation — auto-rendered from the typed token source (ALIAS_TOKENS
 * and GRAY_STEPS), so the swatches can never drift from what the package ships.
 * Every chip resolves a live CSS variable, reflecting the brand chosen in the
 * toolbar.
 */

const meta = {
  title: "Tokens/Overview",
  parameters: { layout: "fullscreen", docs: { page: TokensDocs } },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Chip({ label, varName }: { label: string; varName: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-14 w-full rounded-md border border-border"
        style={{ background: `var(${varName})` }}
      />
      <code className="text-muted-foreground text-xs">{varName}</code>
      <span className="text-foreground text-xs">{label}</span>
    </div>
  );
}

export const BaseGrayscale: Story = {
  render: () => (
    <section className="space-y-3">
      <h2 className="font-semibold text-lg">Base — grayscale ramp (`--mind-gray-*`)</h2>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
        {GRAY_STEPS.map((step) => (
          <Chip key={step} label={String(step)} varName={`--mind-gray-${step}`} />
        ))}
      </div>
    </section>
  ),
};

export const AliasTokens: Story = {
  render: () => (
    <section className="space-y-3">
      <h2 className="font-semibold text-lg">Alias — semantic tokens (shadcn names)</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {ALIAS_TOKENS.map((token) => (
          <Chip key={token} label={token} varName={`--${token}`} />
        ))}
      </div>
    </section>
  ),
};
