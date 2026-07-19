import { Suspense } from 'react'
import { MdxSkeleton } from '#/components/mdx/MdxSkeleton'
import type { ComponentType } from 'react'

interface MdxContentProps {
  component: ComponentType
}

/** Renders a lazily-loaded MDX body with the shared typography styles. */
export function MdxContent({ component: Component }: MdxContentProps) {
  return (
    <div className="mdx-content">
      <Suspense fallback={<MdxSkeleton />}>
        <Component />
      </Suspense>
    </div>
  )
}
