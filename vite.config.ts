import { join } from 'node:path'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { writeSitemaps } from './src/lib/sitemap-generator'
import { auditSeo } from './src/lib/seo-audit'
import type { Plugin } from 'vite'

/**
 * Generates the sitemaps and audits SEO field lengths as part of the build, so
 * the sitemap files are always produced by `vite build` itself — on Vercel or
 * anywhere — with no separate script step and no dependency on the runtime
 * resolving `.ts` imports (esbuild bundles this config).
 */
function seoBuildPlugin(): Plugin {
  let publicDir = ''
  let root = ''
  let hasRun = false

  return {
    name: 'ioe-seo-build',
    apply: 'build',
    // `configResolved` fires once per build environment (client/server); the
    // values we need are identical across them.
    configResolved(resolved) {
      if (resolved.publicDir) publicDir = resolved.publicDir
      root = resolved.root
    },
    // Runs once, at the start of the first environment build — before the
    // client build copies `publicDir` into the served output.
    buildStart() {
      if (hasRun || !publicDir) return
      hasRun = true
      const coursesDir = join(root, 'src/content/courses')

      const { warnings, courseCount } = auditSeo({ coursesDir })
      for (const warning of warnings) this.warn(warning)
      this.info(
        warnings.length
          ? `SEO check: ${warnings.length} warning(s) across ${courseCount} courses.`
          : `SEO check: authored titles/descriptions within limits (${courseCount} courses).`,
      )

      const { total } = writeSitemaps({
        publicDir,
        coursesDir,
        programsSource: join(root, 'src/features/programs/data/programs.ts'),
        now: new Date(),
      })
      this.info(`Sitemaps generated with ${total} URLs.`)
    },
  }
}

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      strategy: ['baseLocale'],
    }),
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      }),
    },
    tailwindcss(),
    tanstackStart(),
    viteReact({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    seoBuildPlugin(),
  ],
})

export default config
