import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AVATARS } from "./_assets";

/*
 * Avatars reference gallery. The visible page is Avatars.mdx, which embeds this
 * story via <Canvas of={...}> so the cards render through the brand/mode
 * decorator — every chip uses live CSS variables, so the gallery follows
 * light/dark and the active brand. Hidden from the sidebar (!dev); the MDX page
 * is the single visible entry.
 */

const meta = {
  title: "🌱 Foundations/Avatars",
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
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "1rem",
      }}
    >
      {AVATARS.map((item) => (
        <figure
          key={item.url}
          style={{
            margin: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.875rem",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            background: "var(--card)",
            color: "var(--card-foreground)",
            textAlign: "center",
          }}
        >
          <img
            src={item.url}
            alt={item.alt}
            loading="lazy"
            width={96}
            height={96}
            style={{ width: 96, height: 96, borderRadius: "9999px", objectFit: "cover" }}
          />
          <figcaption style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
            <div style={{ fontWeight: 600, color: "var(--foreground)" }}>{item.label}</div>
            <div style={{ color: "var(--muted-foreground)" }}>📄 {item.license}</div>
            <button
              type="button"
              aria-label={`Copy avatar URL for ${item.label} placeholder portrait`}
              onClick={() => navigator.clipboard?.writeText(item.url)}
              style={{
                marginTop: "0.375rem",
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
