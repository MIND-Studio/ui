/*
 * Shared rendering atoms for the Foundations token pages (Colors, Typography,
 * Shapes). Each chip resolves a live CSS variable, so switching brand/mode in
 * the toolbar re-paints every page that uses these atoms with that brand's
 * tokens. The `_` filename prefix keeps Storybook from treating this as a story.
 */

/** A single color, painted from one CSS variable. */
export function Swatch({ varName, sub }: { varName: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 w-full rounded-md border border-border"
        style={{ background: `var(${varName})` }}
      />
      <code className="text-foreground text-xs">{varName}</code>
      {sub ? <span className="text-muted-foreground text-xs">{sub}</span> : null}
    </div>
  );
}

/** A background/foreground pair, previewing real text on the surface. */
export function Pair({ bg, fg }: { bg: string; fg: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="flex h-20 w-full items-center justify-center rounded-md border border-border"
        style={{ background: `var(--${bg})`, color: `var(--${fg})` }}
      >
        <span className="font-semibold text-xl">Aa</span>
      </div>
      <div className="leading-relaxed">
        <code className="block text-foreground text-xs">--{bg}</code>
        <code className="block text-muted-foreground text-xs">--{fg}</code>
      </div>
    </div>
  );
}

export function Group({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h3 className="font-medium text-foreground text-sm">{title}</h3>
        {hint ? <p className="max-w-2xl text-muted-foreground text-xs">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}

export const swatchGrid = "grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6";
