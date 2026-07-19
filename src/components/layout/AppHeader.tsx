import { Link } from '@tanstack/react-router'
import { MobileNav } from '#/components/layout/MobileNav'
import { BrandLogo } from '#/components/ui/BrandLogo'
import { Container } from '#/components/ui/Container'
import { m } from '#/paraglide/messages.js'
import type { MobileNavItem } from '#/components/layout/MobileNav'

const NAV_ITEMS: Array<MobileNavItem> = [
  { to: '/', label: () => m.nav_home(), exact: true },
  { to: '/programs', label: () => m.nav_programs() },
  { to: '/courses', label: () => m.nav_courses() },
  { to: '/links', label: () => m.nav_links() },
]

/** Sticky navy app bar with the brand mark and primary navigation. */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface/10 bg-primary text-surface">
      <Container className="flex h-14 items-center gap-3 sm:h-16 sm:gap-5">
        <Link to="/" className="flex items-center gap-3">
          <BrandLogo variant="white" className="h-6 w-auto" />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wide">
              {m.brand_name()}
            </span>
            <span className="text-xs tracking-wide text-on-primary-muted">
              {m.brand_org()}
            </span>
          </span>
        </Link>
        <div className="flex-1" />
        <MobileNav items={NAV_ITEMS} />
        <nav className="hidden gap-5 sm:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact ?? false }}
              className="relative px-1 py-2 text-sm font-medium text-on-primary-muted transition-colors hover:text-surface hover:no-underline after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-surface after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100"
              activeProps={{
                className: 'font-semibold text-surface after:scale-x-100',
              }}
            >
              {item.label()}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  )
}
