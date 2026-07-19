/**
 * Manual sitemap regeneration. The build itself generates the sitemaps via the
 * Vite plugin (see `vite.config.ts`), so this is only for regenerating without
 * a full build. Delegates to the shared generator in `src/lib/sitemap-generator`.
 *
 * Usage: node scripts/generate-sitemap.mjs
 */
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const { writeSitemaps } = await import(
  join(ROOT, 'src/lib/sitemap-generator.ts')
)

const { total } = writeSitemaps({
  publicDir: join(ROOT, 'public'),
  coursesDir: join(ROOT, 'src/content/courses'),
  programsSource: join(ROOT, 'src/features/programs/data/programs.ts'),
  now: new Date(),
})

console.log(`Sitemaps written with ${total} URLs.`)
