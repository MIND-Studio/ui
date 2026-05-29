import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// next-themes touches matchMedia on mount; happy-dom doesn't implement it.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// Radix primitives (Select, Dialog) call DOM methods happy-dom doesn't implement.
const proto = window.HTMLElement.prototype as unknown as Record<string, unknown>;
proto.scrollIntoView ??= vi.fn();
proto.hasPointerCapture ??= vi.fn(() => false);
proto.setPointerCapture ??= vi.fn();
proto.releasePointerCapture ??= vi.fn();

afterEach(() => {
  cleanup();
});
