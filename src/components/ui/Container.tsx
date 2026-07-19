interface ContainerProps {
  /** Element to render, defaults to a plain div. */
  as?: 'div' | 'section' | 'nav' | 'article'
  className?: string
  children: React.ReactNode
}

/**
 * The single page-width container used by the header, breadcrumbs, footer
 * and every page body, so all horizontal edges stay aligned. Narrower
 * reading content should be constrained inside it (e.g. `max-w-3xl`),
 * never by swapping the container width.
 */
export function Container({
  as: Tag = 'div',
  className = '',
  children,
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-9xl px-4 sm:px-6 ${className}`}>
      {children}
    </Tag>
  )
}
