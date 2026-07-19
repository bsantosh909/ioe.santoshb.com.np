/**
 * One-time (re-runnable) seeding of per-page SEO into course MDX frontmatter.
 * Derives a concise, within-limit `seoTitle` and an objective-based
 * `seoDescription` for every course from its existing title, code and
 * objective, then writes them back into the frontmatter. Existing frontmatter
 * lines are preserved verbatim — only the two managed keys are (re)written, so
 * the script is safe to run repeatedly and after editing objectives.
 *
 * Overview only: syllabus/old-questions keep their auto-generated templates
 * unless you add the seoSyllabus / seoOldq fields by hand.
 *
 * Usage: node scripts/seed-course-seo.mjs
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import matter from 'gray-matter'

const ROOT = new URL('..', import.meta.url).pathname
const COURSES = join(ROOT, 'src/content/courses')

const { SEO_TITLE_MAX, SEO_DESCRIPTION_MAX, SEO_TITLE_BRAND } = await import(
  join(ROOT, 'src/lib/constants/seo.ts')
)

// Title budget = the ` | {brand}` suffix eats into the rendered <title>.
const TITLE_BUDGET = SEO_TITLE_MAX - ` | ${SEO_TITLE_BRAND}`.length

/** Cut to a word boundary within `max` chars, adding an ellipsis when cut. */
function wordTrim(text, max) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  const body = (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut)
    .trimEnd()
    .replace(/[,;:.\-–—]+$/, '')
  return `${body}…`
}

/**
 * <title> base. The full course name is never altered: use "Title (CODE)" when
 * it fits, else drop the code to "Title". A handful of very long names still
 * exceed the budget on their own — we keep them intact and let the search
 * engine truncate the display rather than abbreviate the name.
 */
function buildTitle(title, code) {
  const withCode = code ? `${title} (${code})` : title
  return withCode.length <= TITLE_BUDGET ? withCode : title
}

/** Strip "This course aims to…" boilerplate so the objective reads mid-sentence. */
function cleanObjective(objective) {
  let s = String(objective).trim()
  s = s.replace(
    /^(the\s+)?(main\s+|primary\s+|basic\s+|general\s+|overall\s+)?(objectives?|aims?|goals?|purpose)\s+(of\s+this\s+(course|subject)\s+)?(is|are)\s+to\s+/i,
    '',
  )
  s = s.replace(/^(this|the)\s+(course|subject)\s+/i, '')
  s = s.replace(
    /^(aims?\s+to\s+|is\s+(designed|intended|meant)\s+to\s+|intends?\s+to\s+|seeks?\s+to\s+|will\s+|provides?\s+(an?\s+|the\s+)?|gives?\s+(an?\s+|the\s+)?(overview\s+of\s+|introduction\s+to\s+)?|introduces?\s+(the\s+|students?\s+to\s+)?|deals?\s+with\s+|covers?\s+|focuses?\s+on\s+|enables?\s+(the\s+)?(students?|learners?)\s+to\s+|equips?\s+(the\s+)?(students?|learners?)\s+with\s+|helps?\s+(the\s+)?(students?|learners?)\s+(to\s+)?)/i,
    '',
  )
  s = s.replace(/^to\s+/i, '')
  return s.trim()
}

/** Objective-based meta description, within the description limit. */
function buildDescription(title, code, objective) {
  const label = code ? `${title} (${code})` : title
  const clean = cleanObjective(objective)
  const full = clean
    ? `${label}: ${clean}`
    : `${label} — IOE syllabus and notes.`
  return wordTrim(full, SEO_DESCRIPTION_MAX)
}

/** YAML single-quoted scalar (single quotes escaped by doubling). */
const yaml = (value) => `'${String(value).replace(/'/g, "''")}'`

let written = 0
for (const file of readdirSync(COURSES).sort()) {
  if (!file.endsWith('.mdx')) continue
  const path = join(COURSES, file)
  const raw = readFileSync(path, 'utf8')
  const block = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n)/)
  if (!block) {
    console.warn(`⚠ ${file}: no frontmatter block — skipped`)
    continue
  }

  const { data } = matter(raw)
  const title = data.title ?? basename(file, '.mdx')
  const code = data.code ?? null
  const seoTitle = buildTitle(title, code)
  const seoDescription = buildDescription(title, code, data.objective ?? '')

  const kept = block[1]
    .split('\n')
    .filter((line) => !/^seo(Title|Description):/.test(line))
    .join('\n')
    .replace(/\s+$/, '')
  const newBlock =
    `---\n${kept}\n` +
    `seoTitle: ${yaml(seoTitle)}\n` +
    `seoDescription: ${yaml(seoDescription)}\n` +
    `---${block[2]}`
  writeFileSync(path, newBlock + raw.slice(block[0].length))
  written += 1
}

console.log(`Seeded SEO into ${written} course MDX files.`)
