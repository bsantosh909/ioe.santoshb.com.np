/**
 * Recommended maximum lengths for search snippets. Titles are measured on the
 * fully rendered `<title>` (including the ` | {brand}` suffix); descriptions on
 * the raw text. Enforced as build-time warnings by `scripts/check-seo.mjs`.
 */
export const SEO_TITLE_MAX = 60
export const SEO_DESCRIPTION_MAX = 160

/**
 * Short brand appended to page `<title>` tags (e.g. `Computer Networks | IOE`).
 * Kept short so full course names fit within `SEO_TITLE_MAX`. The full brand
 * (`SITE.name`) is still used for og:site_name, structured data and the header.
 */
export const SEO_TITLE_BRAND = 'IOE'
