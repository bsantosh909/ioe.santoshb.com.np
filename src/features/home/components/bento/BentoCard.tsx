import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'

interface BentoCardProps {
  to: LinkProps['to']
  params?: LinkProps['params']
  /** Accessible name when the tile has no readable text of its own. */
  label?: string
  className?: string
  children: React.ReactNode
}

/** Rounded pastel tile in the Animata-style home bento; the whole tile links. */
export function BentoCard({
  to,
  params,
  label,
  className = '',
  children,
}: BentoCardProps) {
  return (
    <Link
      to={to}
      params={params}
      aria-label={label}
      className={`group/bento relative flex min-h-44 overflow-hidden rounded-3xl p-5 text-ink transition duration-300 ease-snappy hover:-translate-y-1 hover:shadow-card-lg hover:no-underline active:scale-99 ${className}`}
    >
      {children}
    </Link>
  )
}
