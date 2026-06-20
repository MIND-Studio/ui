/*
 * ─────────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER assets — swap CDN_BASE / arrays for the curated Mind CDN set when
 * provided.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * This module is the SINGLE SOURCE OF TRUTH for the Foundations/Imagery and
 * Foundations/Avatars reference galleries. NO binary assets ship in the package
 * — every entry below references a CDN URL only.
 *
 * The images here are deliberately free, clearly-licensed PLACEHOLDERS so the
 * gallery pages are functional today. They are NOT Mind's brand imagery. When
 * the curated, licensed Mind-CDN set is supplied, the swap is intended to be a
 * single edit per source: change the `CDN_BASE` constant (and, if the path
 * shape differs, the per-entry `url`s) — nothing else in the MDX pages needs to
 * change.
 *
 * Placeholder sources:
 *   • Imagery → Lorem Picsum (https://picsum.photos) — free for any use.
 *     Deterministic `/id/<id>/<w>/<h>` URLs keep the gallery stable.
 *   • Avatars → pravatar.cc (https://i.pravatar.cc) — free placeholder FACES.
 *     These are stand-in faces pending Mind's own licensed avatar set; they are
 *     reference-only, for mocking.
 *
 * The `_` filename prefix keeps Storybook from treating this as a story.
 */

/** Imagery placeholder CDN. Swap for the Mind imagery CDN when provided. */
export const CDN_BASE_IMAGERY = "https://picsum.photos";

/** Avatar placeholder CDN. Swap for the Mind avatar CDN when provided. */
export const CDN_BASE_AVATARS = "https://i.pravatar.cc";

export type ImageryItem = {
  /** Fully-qualified CDN URL. Deterministic so the gallery is stable. */
  url: string;
  /** Meaningful alt text — required so the a11y (axe) addon passes. */
  alt: string;
  /** Human-readable attribution for the placeholder source. */
  credit: string;
  /** License under which the placeholder may be used. */
  license: string;
};

export type AvatarItem = {
  /** Fully-qualified CDN URL. Stable `?img=<n>` selector. */
  url: string;
  /** Meaningful alt text — required so the a11y (axe) addon passes. */
  alt: string;
  /** Display label, e.g. the presented gender for mock-up variety. */
  label: string;
  /** License under which the placeholder may be used. */
  license: string;
};

const PICSUM_LICENSE = "Lorem Picsum — free for any use (placeholder)";
const PRAVATAR_LICENSE = "pravatar.cc — free placeholder face (reference-only)";

/**
 * Deterministic Lorem Picsum images (`/id/<id>/800/600`). The fixed `id` keeps
 * each tile stable across reloads. PLACEHOLDER — replace with curated Mind
 * imagery when supplied.
 */
export const IMAGERY: ImageryItem[] = [
  {
    url: `${CDN_BASE_IMAGERY}/id/1015/800/600`,
    alt: "A person standing on a rock overlooking a wide river valley at dusk.",
    credit: "Lorem Picsum (Unsplash photographers)",
    license: PICSUM_LICENSE,
  },
  {
    url: `${CDN_BASE_IMAGERY}/id/1025/800/600`,
    alt: "A pug wrapped in a blanket resting on a wooden floor.",
    credit: "Lorem Picsum (Unsplash photographers)",
    license: PICSUM_LICENSE,
  },
  {
    url: `${CDN_BASE_IMAGERY}/id/1039/800/600`,
    alt: "A tall waterfall cascading down a forested mountainside.",
    credit: "Lorem Picsum (Unsplash photographers)",
    license: PICSUM_LICENSE,
  },
  {
    url: `${CDN_BASE_IMAGERY}/id/1043/800/600`,
    alt: "Snow-dusted evergreen treetops seen from above in soft morning light.",
    credit: "Lorem Picsum (Unsplash photographers)",
    license: PICSUM_LICENSE,
  },
  {
    url: `${CDN_BASE_IMAGERY}/id/1059/800/600`,
    alt: "A calm lake mirroring a forested shoreline under an overcast sky.",
    credit: "Lorem Picsum (Unsplash photographers)",
    license: PICSUM_LICENSE,
  },
  {
    url: `${CDN_BASE_IMAGERY}/id/1074/800/600`,
    alt: "A lion resting in dry grassland, facing the camera.",
    credit: "Lorem Picsum (Unsplash photographers)",
    license: PICSUM_LICENSE,
  },
];

/**
 * Stable pravatar.cc faces (`?img=<n>`). Five labeled male, five labeled female
 * for mock-up variety. PLACEHOLDER — replace with Mind's licensed avatar set
 * when supplied.
 */
export const AVATARS: AvatarItem[] = [
  {
    url: `${CDN_BASE_AVATARS}/300?img=11`,
    alt: "Placeholder portrait photo of a person, presented male, smiling.",
    label: "Male",
    license: PRAVATAR_LICENSE,
  },
  {
    url: `${CDN_BASE_AVATARS}/300?img=12`,
    alt: "Placeholder portrait photo of a person, presented male, looking aside.",
    label: "Male",
    license: PRAVATAR_LICENSE,
  },
  {
    url: `${CDN_BASE_AVATARS}/300?img=13`,
    alt: "Placeholder portrait photo of a person, presented male, neutral expression.",
    label: "Male",
    license: PRAVATAR_LICENSE,
  },
  {
    url: `${CDN_BASE_AVATARS}/300?img=14`,
    alt: "Placeholder portrait photo of a person, presented male, wearing glasses.",
    label: "Male",
    license: PRAVATAR_LICENSE,
  },
  {
    url: `${CDN_BASE_AVATARS}/300?img=15`,
    alt: "Placeholder portrait photo of a person, presented male, outdoors.",
    label: "Male",
    license: PRAVATAR_LICENSE,
  },
  {
    url: `${CDN_BASE_AVATARS}/300?img=1`,
    alt: "Placeholder portrait photo of a person, presented female, smiling.",
    label: "Female",
    license: PRAVATAR_LICENSE,
  },
  {
    url: `${CDN_BASE_AVATARS}/300?img=5`,
    alt: "Placeholder portrait photo of a person, presented female, looking aside.",
    label: "Female",
    license: PRAVATAR_LICENSE,
  },
  {
    url: `${CDN_BASE_AVATARS}/300?img=9`,
    alt: "Placeholder portrait photo of a person, presented female, neutral expression.",
    label: "Female",
    license: PRAVATAR_LICENSE,
  },
  {
    url: `${CDN_BASE_AVATARS}/300?img=10`,
    alt: "Placeholder portrait photo of a person, presented female, indoors.",
    label: "Female",
    license: PRAVATAR_LICENSE,
  },
  {
    url: `${CDN_BASE_AVATARS}/300?img=16`,
    alt: "Placeholder portrait photo of a person, presented female, outdoors.",
    label: "Female",
    license: PRAVATAR_LICENSE,
  },
];
