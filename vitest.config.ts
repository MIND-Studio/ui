import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    // The stories-as-tests suite runs axe-core per story; a complex story
    // (e.g. Icons, the block catalog) can take >5s on a slow CI runner. The
    // default 5000ms timeout would abort mid-`axe.run()`, and because axe holds
    // a global lock the next test then fails with "Axe is already running".
    // Give axe room so the suite is deterministic in CI.
    testTimeout: 30000,
    hookTimeout: 30000,
    include: [
      "src/**/*.test.{ts,tsx}",
      "tests/**/*.test.{ts,tsx}",
      "stories/**/*.test.{ts,tsx}",
    ],
  },
});
