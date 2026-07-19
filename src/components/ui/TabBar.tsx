import { Link } from '@tanstack/react-router'
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

/** White tab strip rendered below a hero section. */
export function TabBar({ items, params }: TabBarProps) {
  return (
    <div className="border-b border-line bg-surface">
      <Container>
        <nav className="flex gap-6 overflow-x-auto">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              params={params}
              activeOptions={{ exact: item.exact ?? false }}
              className="relative px-1 py-3 text-sm font-medium whitespace-nowrap text-muted transition-colors hover:text-ink hover:no-underline after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100"
              activeProps={{
                className: 'font-bold text-link-strong after:scale-x-100',
              }}
            >
              {item.label()}
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  )
}
