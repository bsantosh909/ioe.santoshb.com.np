import { useId, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Container } from '#/components/ui/Container'
import type { LinkProps } from '@tanstack/react-router'

export interface TabItem {
  to: LinkProps['to']
  label: () => string
  exact?: boolean
}

interface TabBarProps {
  items: Array<TabItem>
  /** Route params shared by every tab link. */
  params?: LinkProps['params']
}

const SPRING = { type: 'spring', stiffness: 420, damping: 34 } as const

/**
 * Sticky, frosted tab strip under a page header. A soft pill follows the
 * hovered tab and a gold underline slides to the active one.
 */
export function TabBar({ items, params }: TabBarProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const id = useId()

  return (
    <div className="sticky top-16 z-30 border-b border-line bg-surface/85 backdrop-blur-md">
      <Container>
        <nav
          className="scroll-x -mx-3 flex"
          onMouseLeave={() => setHovered(null)}
        >
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              params={params}
              activeOptions={{ exact: item.exact ?? false }}
              onMouseEnter={() => setHovered(item.to ?? null)}
              className="relative px-3 py-3.5 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-200 hover:text-ink hover:no-underline"
              activeProps={{ className: 'text-ink' }}
            >
              {({ isActive }) => (
                <>
                  {hovered === item.to ? (
                    <motion.span
                      layoutId={`${id}-hover`}
                      transition={SPRING}
                      className="absolute inset-x-0 inset-y-1.5 rounded-lg bg-wash"
                    />
                  ) : null}
                  {isActive ? (
                    <motion.span
                      layoutId={`${id}-active`}
                      transition={SPRING}
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent"
                    />
                  ) : null}
                  <span className="relative">{item.label()}</span>
                </>
              )}
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  )
}
