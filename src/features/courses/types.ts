/** Metadata for a course, mirrored from its MDX frontmatter. */
export interface CourseMeta {
  slug: string
  /** Official course code (2080 curriculum), when verified. */
  code: string | null
  title: string
  objective: string
  /**
   * Per-tab SEO overrides authored in the MDX frontmatter. Any omitted field
   * falls back to the auto-generated value. Keep titles/descriptions within
   * the limits in `#/lib/constants/seo` (checked at build time).
   */
  seoTitle?: string
  seoDescription?: string
  seoSyllabusTitle?: string
  seoSyllabusDescription?: string
  seoOldqTitle?: string
  seoOldqDescription?: string
}
