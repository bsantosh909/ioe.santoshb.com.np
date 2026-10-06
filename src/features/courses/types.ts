/** Metadata for a course, mirrored from its MDX frontmatter. */
export interface CourseMeta {
  slug: string
  /** Official course code (2080 curriculum), when verified. */
  code: string | null
  title: string
  objective: string
  /** Top-level syllabus unit headings, extracted from the MDX body. */
  units: Array<string>
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

/** A compiled set of past board-exam papers for one course. */
export interface OldQuestionSet {
  /** Public PDF link. */
  url: string
  /** `new` = 2080 curriculum revision, `old` = the previous curriculum. */
  curriculum: 'new' | 'old'
  /** Placement the source lists the paper under; absent for electives. */
  year?: number
  part?: 1 | 2
  /** Programs the paper was set for, as listed by the source. */
  programs?: string
  /** Exam years (Bikram Sambat) covered by the papers. */
  years?: { from: number; to: number }
  pages?: number
}
