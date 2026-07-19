import { Skeleton } from '#/components/ui/Skeleton'
import { m } from '#/paraglide/messages.js'

/**
 * Placeholder shaped like an MDX prose document — a title, paragraphs and
 * list blocks — shown while a lazily-loaded body streams in. The bar sizes
 * and spacing echo the `.mdx-content` typography so the swap is seamless.
 */
export function MdxSkeleton() {
  return (
    <div role="status" aria-label={m.common_loading()}>
      {/* Title (h1) */}
      <Skeleton className="mb-6 h-8 w-2/3" />

      {/* Intro paragraph */}
      <div className="mb-8 space-y-2.5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Section heading (h2) */}
      <Skeleton className="mb-4 h-6 w-1/2" />

      {/* List */}
      <div className="mb-8 space-y-2.5 pl-6">
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-3/5" />
      </div>

      {/* Section heading (h2) */}
      <Skeleton className="mb-4 h-6 w-2/5" />

      {/* Paragraph */}
      <div className="space-y-2.5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}
