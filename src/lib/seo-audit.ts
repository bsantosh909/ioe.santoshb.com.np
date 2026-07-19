/**
 * Build-time audit of authored SEO fields. Warns (never throws) when a course
 * or program title/description exceeds the search-snippet limits in
 * `./constants/seo`. Titles are measured on the fully rendered `<title>`
 * (authored value + the ` | {brand}` suffix) so the reported length matches
 * what search engines see.
 *
 * Called from the Vite build plugin (see `vite.config.ts`) and from
 * `scripts/check-seo.mjs` for manual runs.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { PROGRAMS } from '../features/programs/data/programs.ts'
import {
  SEO_DESCRIPTION_MAX,
  SEO_TITLE_BRAND,
  SEO_TITLE_MAX,
} from './constants/seo.ts'

const TITLE_SUFFIX = ` | ${SEO_TITLE_BRAND}`

/** Returns length warnings for every authored SEO title/description. */
export function auditSeo({ coursesDir }: { coursesDir: string }): {
  warnings: Array<string>
  courseCount: number
} {
  const warnings: Array<string> = []

  const checkTitle = (label: string, field: string, value?: unknown) => {
    if (!value) return
    const rendered = `${value}${TITLE_SUFFIX}`.length
    if (rendered > SEO_TITLE_MAX) {
      warnings.push(
        `⚠ ${label}: ${field} renders ${rendered}>${SEO_TITLE_MAX} chars (with "${TITLE_SUFFIX}")`,
      )
    }
  }

  const checkDesc = (label: string, field: string, value?: unknown) => {
    if (!value) return
    const length = String(value).length
    if (length > SEO_DESCRIPTION_MAX) {
      warnings.push(
        `⚠ ${label}: ${field} ${length}>${SEO_DESCRIPTION_MAX} chars`,
      )
    }
  }

  // Courses — authored frontmatter overrides.
  let courseCount = 0
  for (const file of readdirSync(coursesDir).sort()) {
    if (!file.endsWith('.mdx')) continue
    const { data } = matter(readFileSync(join(coursesDir, file), 'utf8'))
    const label = data.slug ?? file.replace(/\.mdx$/, '')
    courseCount += 1
    checkTitle(label, 'seoTitle', data.seoTitle)
    checkDesc(label, 'seoDescription', data.seoDescription)
    checkTitle(label, 'seoSyllabusTitle', data.seoSyllabusTitle)
    checkDesc(label, 'seoSyllabusDescription', data.seoSyllabusDescription)
    checkTitle(label, 'seoOldqTitle', data.seoOldqTitle)
    checkDesc(label, 'seoOldqDescription', data.seoOldqDescription)
  }

  // Programs — authored data-file overrides.
  for (const program of PROGRAMS) {
    const label = program.code
    checkTitle(label, 'seoTitle', program.seoTitle)
    checkDesc(label, 'seoDescription', program.seoDescription)
    checkTitle(label, 'seoSubjectsTitle', program.seoSubjectsTitle)
    checkDesc(label, 'seoSubjectsDescription', program.seoSubjectsDescription)
    checkTitle(label, 'seoScopeTitle', program.seoScopeTitle)
    checkDesc(label, 'seoScopeDescription', program.seoScopeDescription)
  }

  return { warnings, courseCount }
}
