/**
 * Manual SEO length check. The build runs the same audit via the Vite plugin
 * (see `vite.config.ts`); this is for checking without a full build. Delegates
 * to the shared audit in `src/lib/seo-audit`.
 *
 * Usage: node scripts/check-seo.mjs
 */
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const { auditSeo } = await import(join(ROOT, 'src/lib/seo-audit.ts'))

const { warnings, courseCount } = auditSeo({
  coursesDir: join(ROOT, 'src/content/courses'),
})

if (warnings.length) {
  console.warn(warnings.join('\n'))
  console.warn(
    `\nSEO check: ${warnings.length} warning(s) across ${courseCount} courses.`,
  )
} else {
  console.log(
    `SEO check: authored titles/descriptions within limits (${courseCount} courses).`,
  )
}
