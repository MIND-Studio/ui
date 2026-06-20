import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IMAGERY } from "./_assets";

/*
 * Imagery reference gallery. The visible page is Imagery.mdx, which embeds this
 * story via <Canvas of={...}> so the cards render through the brand/mode
 * decorator — every chip uses live CSS variables (var(--card), var(--border),
 * …), so the gallery follows light/dark and the active brand. Hidden from the
 * sidebar (!dev); the MDX page is the single visible entry.
 */

const meta = {
  title: "🌱 Foundations/Imagery",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  tags: ["!dev"],
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1rem",
      }}
    >
      {IMAGERY.map((item) => (
        <figure
          key={item.url}
          style={{
            margin: 0,
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            background: "var(--card)",
            color: "var(--card-foreground)",
          }}
        >
          <img
            src={item.url}
            alt={item.alt}
            loading="lazy"
            width={800}
            height={600}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              aspectRatio: "4 / 3",
              objectFit: "cover",
            }}
          />
          <figcaption style={{ padding: "0.625rem 0.75rem", fontSize: "0.75rem", lineHeight: 1.5 }}>
            <div style={{ color: "var(--muted-foreground)" }}>📷 {item.credit}</div>
            <div style={{ color: "var(--muted-foreground)" }}>📄 {item.license}</div>
            <button
              type="button"
              aria-label={`Copy image URL for: ${item.alt}`}
              onClick={() => navigator.clipboard?.writeText(item.url)}
              style={{
                marginTop: "0.5rem",
                cursor: "pointer",
                fontSize: "0.75rem",
                padding: "0.25rem 0.5rem",
                borderRadius: "calc(var(--radius) - 2px)",
                border: "1px solid var(--border)",
                background: "var(--secondary)",
                color: "var(--secondary-foreground)",
              }}
            >
              🔗 Copy URL
            </button>
          </figcaption>
        </figure>
      ))}
    </div>
  ),
};
