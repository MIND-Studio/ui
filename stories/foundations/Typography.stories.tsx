import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/*
 * Typography — the three font-family stacks the package ships, shown two ways:
 * the raw specimens (each --font-* variable), and a small set of real-text
 * compositions (an editorial article in serif, a UI/body block in sans, a code
 * + data block in mono) so you can see how each stack actually unfolds. Every
 * specimen renders with its live var(), so switching brand in the toolbar swaps
 * the type to that brand's chosen stack.
 */

const meta = {
  title: "🌱 Foundations/Typography",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ specimens */

const FONTS = [
  { varName: "--font-serif", label: "Serif — headlines (h1–h3)" },
  { varName: "--font-sans", label: "Sans — body & UI (default)" },
  { varName: "--font-mono", label: "Mono — code & technical labels" },
] as const;

// Hidden from the sidebar (!dev): the visible page is Typography.mdx, which
// embeds these stories via <Canvas of={...}> so they render through the
// brand/mode decorator (live specimens) and stay covered by the axe gate.
export const Typography: Story = {
  tags: ["!dev"],
  render: () => (
    <section className="space-y-3">
      <div className="space-y-6">
        {FONTS.map((f) => (
          <div key={f.varName} className="space-y-2 border-border border-b pb-6 last:border-b-0">
            <div className="flex items-baseline justify-between gap-4">
              <code className="text-foreground text-xs">{f.varName}</code>
              <span className="text-muted-foreground text-xs">{f.label}</span>
            </div>
            <p className="text-3xl text-foreground" style={{ fontFamily: `var(${f.varName})` }}>
              The quick brown fox jumps over the lazy dog
            </p>
            <p
              className="text-muted-foreground text-sm"
              style={{ fontFamily: `var(${f.varName})` }}
            >
              ABCDEFGHIJKLM abcdefghijklm 0123456789 &amp; ?!#@
            </p>
          </div>
        ))}
      </div>
    </section>
  ),
};

/* ---------------------------------------------------------------------- scale */

// The scale across the steps a brand composes with. Display/Title/Heading map to
// h1–h3 and carry the serif; everything from Subheading down is sans — the same
// split the global base layer applies to real <h1>–<h6>. Switching brand in the
// toolbar re-renders the whole ladder in that brand's stacks.
const SCALE = [
  { util: "text-5xl", role: "Display", tag: "h1", face: "serif", weight: "font-semibold tracking-tight" },
  { util: "text-3xl", role: "Title", tag: "h2", face: "serif", weight: "font-semibold tracking-tight" },
  { util: "text-2xl", role: "Heading", tag: "h3", face: "serif", weight: "font-semibold" },
  { util: "text-xl", role: "Subheading", tag: "h4", face: "sans", weight: "font-medium" },
  { util: "text-base", role: "Body", tag: "p", face: "sans", weight: "font-normal" },
  { util: "text-sm", role: "Small", tag: "p", face: "sans", weight: "font-normal" },
  { util: "text-xs", role: "Caption", tag: "p", face: "sans", weight: "font-normal" },
] as const;

export const Scale: Story = {
  tags: ["!dev"],
  render: () => (
    <section className="space-y-6">
      {SCALE.map((s) => (
        <div
          key={s.util}
          className="flex flex-col gap-1 border-border border-b pb-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6"
        >
          <div className="flex w-52 shrink-0 items-baseline gap-2">
            <span className="text-foreground text-sm">{s.role}</span>
            <code className="text-muted-foreground text-xs">{s.tag}</code>
            <span className="text-muted-foreground text-xs">· {s.face}</span>
          </div>
          <p
            className={`${s.util} ${s.weight} text-foreground`}
            style={{ fontFamily: `var(--font-${s.face})` }}
          >
            Design with intention
          </p>
        </div>
      ))}
    </section>
  ),
};

/* --------------------------------------------------------------- composition */

// The three roles working together on one page: serif headlines (h1–h3) carry
// the voice, the sans body does the reading, and a mono eyebrow / inline token
// marks the technical bits. This is the system as it actually composes.
export const Composition: Story = {
  tags: ["!dev"],
  render: () => (
    <article className="max-w-prose space-y-6 text-foreground">
      <header className="space-y-3">
        <p
          className="font-medium text-muted-foreground text-xs uppercase tracking-widest"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          On craft
        </p>
        <h2
          className="text-balance font-semibold text-4xl leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          The headline wears the serif; the paragraph wears the sans
        </h2>
        <p className="text-pretty text-muted-foreground text-xl leading-relaxed">
          Before a single word is read, the shapes of the letters have already made a promise —
          of warmth or precision, of authority or ease. Mind gives that promise to the
          <strong> headlines</strong>, set in the brand serif, and lets the sans do the steady
          work of the body.
        </p>
      </header>

      <p className="text-pretty text-lg leading-relaxed">
        Set Fraunces at a generous size and give it room to breathe, and something quiet happens:
        the eye settles, the page finds a voice. Drop into running copy and the sans takes over —
        open, even, and legible at the small sizes and tight line-heights most product text lives
        at. Two faces, one rhythm.
      </p>

      <blockquote className="border-primary border-l-2 pl-5 text-pretty text-xl italic leading-relaxed">
        “Typography is what language looks like.” The reader never sees the system, only the
        feeling it produces.
      </blockquote>

      <h3
        className="font-semibold text-2xl tracking-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Three roles, one composition
      </h3>

      <p className="text-pretty text-lg leading-relaxed">
        Each face is asked to do only what it does best, and the base layer applies the split for
        you — real <code className="text-base">h1</code>–<code className="text-base">h3</code> come
        out serif, everything else stays sans:
      </p>

      <ul className="list-disc space-y-2 pl-6 text-lg leading-relaxed marker:text-muted-foreground">
        <li>
          <strong>Serif</strong> for display headings (<code className="text-base">h1</code>–
          <code className="text-base">h3</code>) — the brand voice.
        </li>
        <li>
          <strong>Sans</strong> for body copy, UI chrome, and small structural headings (
          <code className="text-base">h4</code>–<code className="text-base">h6</code>).
        </li>
        <li>
          <strong>Mono</strong> for code, keyboard keys (<kbd>⌘K</kbd>), tokens, and technical
          eyebrows — never for running prose.
        </li>
      </ul>

      <p className="text-pretty text-lg leading-relaxed">
        Reference the role, not the face — reach for{" "}
        <code className="text-base">var(--font-serif)</code> rather than a hard-coded family — and
        a brand swap re-voices the whole page at once.
      </p>
    </article>
  ),
};

/* ----------------------------------------------------------------- ui & body */

// Sans where most product text lives: an interface card with a heading, body
// copy, a definition list, and small print — the workaday reading the stack is
// optimised for.
export const Interface: Story = {
  tags: ["!dev"],
  render: () => (
    <section
      className="max-w-prose space-y-6 text-foreground"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="space-y-2">
        <h2 className="font-semibold text-2xl tracking-tight">Your workspace is ready</h2>
        <p className="text-pretty text-muted-foreground leading-relaxed">
          The sans stack is built for exactly this: dense, glanceable product text that has to
          stay legible at small sizes and tight line-heights. It reads cleanly in a button label,
          a table cell, or a paragraph like this one.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 text-card-foreground">
        <h3 className="font-medium text-sm">Plan details</h3>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Workspace</dt>
            <dd className="font-medium">Mind Studio</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Seats</dt>
            <dd className="font-medium tabular-nums">12 of 20</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Renews</dt>
            <dd className="font-medium tabular-nums">June 30, 2026</dd>
          </div>
        </dl>
      </div>

      <p className="text-muted-foreground text-xs leading-relaxed">
        Small print holds the line too — at <code className="font-mono">text-xs</code> the sans
        stack stays open and readable where a display face would close up and blur.
      </p>
    </section>
  ),
};

/* ---------------------------------------------------------------- code & data */

// Mono where alignment is the point: a code block and a data table, both leaning
// on fixed-width columns and tabular figures.
const CODE_LINES = [
  { text: "import { ThemeProvider } from \"@mind-studio/ui\";", tone: "muted" },
  { text: "", tone: "muted" },
  { text: "export function App({ children }) {", tone: "foreground" },
  { text: "  return (", tone: "foreground" },
  { text: "    <ThemeProvider theme={ember} defaultMode=\"dark\">", tone: "primary" },
  { text: "      {children}", tone: "foreground" },
  { text: "    </ThemeProvider>", tone: "primary" },
  { text: "  );", tone: "foreground" },
  { text: "}", tone: "foreground" },
] as const;

const TONE: Record<string, string> = {
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
};

const TABLE = [
  { token: "--font-serif", role: "Headlines · h1–h3", scale: "1.5–3rem" },
  { token: "--font-sans", role: "Body, UI · h4–h6", scale: "0.75–1.25rem" },
  { token: "--font-mono", role: "Code & technical labels", scale: "0.75–0.875rem" },
] as const;

export const Code: Story = {
  tags: ["!dev"],
  render: () => (
    <section className="max-w-prose space-y-6" style={{ fontFamily: "var(--font-mono)" }}>
      <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm leading-relaxed">
        <code>
          {CODE_LINES.map((line, i) => (
            // Static specimen lines, fixed order — index keys are stable here.
            // eslint-disable-next-line react/no-array-index-key
            <span key={i} className={`block ${TONE[line.tone]}`}>
              {line.text === "" ? " " : line.text}
            </span>
          ))}
        </code>
      </pre>

      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">Font stacks and their typical scale</caption>
        <thead>
          <tr className="border-border border-b text-muted-foreground">
            <th scope="col" className="py-2 pr-4 font-medium">
              token
            </th>
            <th scope="col" className="py-2 pr-4 font-medium">
              role
            </th>
            <th scope="col" className="py-2 font-medium">
              scale
            </th>
          </tr>
        </thead>
        <tbody className="text-foreground">
          {TABLE.map((row) => (
            <tr key={row.token} className="border-border border-b last:border-b-0">
              <td className="py-2 pr-4 text-primary">{row.token}</td>
              <td className="py-2 pr-4">{row.role}</td>
              <td className="py-2 tabular-nums">{row.scale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  ),
};
