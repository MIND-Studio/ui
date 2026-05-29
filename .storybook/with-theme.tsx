import type { Decorator } from "@storybook/nextjs-vite";
import React from "react";
import { cn } from "../src/lib/cn";
import { ThemeProvider } from "../src/theme/provider";
import { themeList, themes } from "../src/themes";

/*
 * Shared ThemeProvider decorator + brand/mode globals. Imported by both
 * Storybook's preview and the stories-as-tests gate (via setProjectAnnotations),
 * so stories render under the same provider in both — without pulling in the
 * Tailwind CSS entry that vitest can't process.
 */

type BrandName = keyof typeof themes;

export const withTheme: Decorator = (Story, context) => {
  const brand = (context.globals.brand ?? "mind") as BrandName;
  const mode = (context.globals.mode ?? "light") as "light" | "dark";
  const theme = themes[brand] ?? themes.mind;
  // Fill the viewport on the Canvas; size to content inside Docs blocks.
  const isDocs = context.viewMode === "docs";

  return (
    <ThemeProvider key={`${brand}:${mode}`} theme={theme} forcedTheme={mode} enableSystem={false}>
      <div
        className={cn(
          "bg-background text-foreground w-full p-8 font-sans antialiased",
          isDocs ? "min-h-40" : "min-h-svh",
        )}
      >
        <Story />
      </div>
    </ThemeProvider>
  );
};

export const globalTypes = {
  brand: {
    description: "Active brand",
    defaultValue: "mind",
    toolbar: {
      title: "Brand",
      icon: "paintbrush",
      dynamicTitle: true,
      items: themeList.map((t) => ({ value: t.name, title: t.label })),
    },
  },
  mode: {
    description: "Color mode",
    defaultValue: "light",
    toolbar: {
      title: "Mode",
      icon: "mirror",
      dynamicTitle: true,
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
    },
  },
};
