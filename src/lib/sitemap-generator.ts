/**
 * Build-time sitemap generation. Emits a sitemap index (`sitemap.xml`) that
 * points at four child sitemaps, split by source so each can be reasoned about
 * and regenerated independently:
 *
 *   sitemap-static.xml    — fixed pages (no slug-derived content)
 *   sitemap-programs.xml  — /programs/$code and its subject/scope tabs
 *   sitemap-courses.xml   — /courses/$slug and its syllabus/old-questions tabs
 *   sitemap-colleges.xml  — /colleges/$slug detail pages
 *
 * Called from the Vite build plugin (see `vite.config.ts`) so it runs on every
 * build, and from `scripts/generate-sitemap.mjs` for manual regeneration. Paths
 * are passed in by the caller — this module never derives them from
 * `import.meta.url` (it is bundled into the Vite config, where that would be
 * wrong).
 *
 * `<lastmod>` uses the source file's mtime (course MDX / the programs data
 * file), falling back to the build date for static pages or a fresh CI clone
 * where mtimes are reset.
 */
import { statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { SITE } from '../data/site.ts'
import { PROGRAMS } from '../features/programs/data/programs.ts'
import { COURSE_INDEX } from '../data/courses.generated.ts'
import { COLLEGES } from '../features/colleges/data/colleges.ts'

interface SitemapEntry {
  path: string
  lastmod: Date
}

const STATIC_PATHS = [
  '/',
  '/programs',
  '/courses',
  '/colleges',
  '/links',
  '/about',
  '/contact',
  '/contribute',
  '/privacy',
  '/terms',
]

/** W3C date (YYYY-MM-DD), the form crawlers expect in <lastmod>. */
const isoDate = (date: Date) => date.toISOString().slice(0, 10)

const absoluteLoc = (path: string) => `${SITE.url}${path === '/' ? '' : path}`

const newestLastmod = (entries: Array<SitemapEntry>, fallback: Date) =>
  entries.reduce((max, e) => (e.lastmod > max ? e.lastmod : max), fallback)

function urlsetXml(entries: Array<SitemapEntry>): string {
  const urls = entries
    .map(
      (e) =>
        `  <url><loc>${absoluteLoc(e.path)}</loc><lastmod>${isoDate(e.lastmod)}</lastmod></url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function sitemapIndexXml(
  children: Array<{ file: string; lastmod: Date }>,
): string {
  const items = children
    .map(
      (c) =>
        `  <sitemap><loc>${SITE.url}/${c.file}</loc><lastmod>${isoDate(c.lastmod)}</lastmod></sitemap>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`
}

export interface SitemapPaths {
  /** Absolute path to the directory served at the site root (Vite `publicDir`). */
  publicDir: string
  /** Absolute path to the course MDX directory (for per-course lastmod). */
  coursesDir: string
  /** Absolute path to the programs data file (for programs lastmod). */
  programsSource: string
  /** Absolute path to the colleges data file (for colleges lastmod). */
  collegesSource: string
  /** Build timestamp used as the lastmod fallback. */
  now: Date
}

/** Writes the sitemap index and its four child sitemaps into `publicDir`. */
export function writeSitemaps({
  publicDir,
  coursesDir,
  programsSource,
  collegesSource,
  now,
}: SitemapPaths): { total: number } {
  const fileDate = (absPath: string) => {
    try {
      return statSync(absPath).mtime
    } catch {
      return now
    }
  }

  const staticEntries: Array<SitemapEntry> = STATIC_PATHS.map((path) => ({
    path,
    lastmod: now,
  }))

  const programsMtime = fileDate(programsSource)
  const programEntries: Array<SitemapEntry> = PROGRAMS.flatMap((program) =>
    [
      `/programs/${program.code}`,
      `/programs/${program.code}/subjects`,
      `/programs/${program.code}/scope`,
    ].map((path) => ({ path, lastmod: programsMtime })),
  )

  const courseEntries: Array<SitemapEntry> = COURSE_INDEX.flatMap((course) => {
    const lastmod = fileDate(join(coursesDir, `${course.slug}.mdx`))
    return [
      `/courses/${course.slug}`,
      `/courses/${course.slug}/syllabus`,
      `/courses/${course.slug}/old-questions`,
    ].map((path) => ({ path, lastmod }))
  })

  const collegesMtime = fileDate(collegesSource)
  const collegeEntries: Array<SitemapEntry> = COLLEGES.map((college) => ({
    path: `/colleges/${college.slug}`,
    lastmod: collegesMtime,
  }))

  const children = [
    { file: 'sitemap-static.xml', entries: staticEntries },
    { file: 'sitemap-programs.xml', entries: programEntries },
    { file: 'sitemap-courses.xml', entries: courseEntries },
    { file: 'sitemap-colleges.xml', entries: collegeEntries },
  ]

  for (const child of children) {
    writeFileSync(join(publicDir, child.file), urlsetXml(child.entries))
  }
  writeFileSync(
    join(publicDir, 'sitemap.xml'),
    sitemapIndexXml(
      children.map((c) => ({
        file: c.file,
        lastmod: newestLastmod(c.entries, now),
      })),
    ),
  )

  return {
    total: children.reduce((sum, c) => sum + c.entries.length, 0),
  }
}
