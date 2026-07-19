import { createFileRoute } from '@tanstack/react-router'
import { NotFoundPage } from '#/components/layout/NotFoundPage'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'

/**
 * Static hosts serve /404.html for unknown paths — this route exists only so
 * the prerenderer can emit that file (see `pages` in vite.config.ts). Unknown
 * routes inside the running SPA are still handled by the root
 * `notFoundComponent`.
 */
export const Route = createFileRoute('/404')({
  head: () => ({
    meta: [
      { title: SeoHelper.title(m.notfound_title()) },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: NotFoundPage,
})
