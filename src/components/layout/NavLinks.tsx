import { useId, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import type { MobileNavItem } from '#/components/layout/MobileNav'

const SPRING = { type: 'spring', stiffness: 420, damping: 34 } as const

/**
 * Desktop nav: a translucent pill glides between items on hover and a gold
 * bar slides under the active route (both shared-layout animations).
 */
export function NavLinks({ items }: { items: Array<MobileNavItem> }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const id = useId()

  return (
    <nav
      className="hidden items-center sm:flex"
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          activeOptions={{ exact: item.exact ?? false }}
          onMouseEnter={() => setHovered(item.to ?? null)}
          className="relative px-3.5 py-2 text-sm font-medium text-on-primary-muted transition-colors duration-200 hover:text-surface hover:no-underline"
          activeProps={{ className: 'text-surface' }}
        >
          {({ isActive }) => (
            <>
              {hovered === item.to ? (
                <motion.span
                  layoutId={`${id}-hover`}
                  transition={SPRING}
                  className="absolute inset-0 rounded-lg bg-surface/10"
                />
              ) : null}
              {isActive ? (
                <motion.span
                  layoutId={`${id}-active`}
                  transition={SPRING}
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent"
                />
              ) : null}
              <span className="relative">{item.label()}</span>
            </>
          )}
        </Link>
      ))}
    </nav>
  )
}
