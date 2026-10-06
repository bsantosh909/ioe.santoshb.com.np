import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { GithubLogoIcon } from '@phosphor-icons/react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { CommandPalette } from '#/features/search/components/CommandPalette'
import { MobileNav } from '#/components/layout/MobileNav'
import { NavLinks } from '#/components/layout/NavLinks'
import { BrandLogo } from '#/components/ui/BrandLogo'
import { Container } from '#/components/ui/Container'
import { SITE } from '#/data/site'
import { m } from '#/paraglide/messages.js'
import type { MobileNavItem } from '#/components/layout/MobileNav'

const NAV_ITEMS: Array<MobileNavItem> = [
  { to: '/', label: () => m.nav_home(), exact: true },
  { to: '/programs', label: () => m.nav_programs() },
  { to: '/courses', label: () => m.nav_courses() },
  { to: '/colleges', label: () => m.nav_colleges() },
  { to: '/links', label: () => m.nav_links() },
]

/** Scroll distance (px) after which the bar gains its raised shadow. */
const RAISE_AFTER = 8

/**
 * Solid sticky navy app bar. It stays full-width so sticky tab strips can
 * dock flush beneath it; once the page scrolls it lifts with a shadow and a
 * frosted fill. Hosts the nav and mobile drawer, plus the keyboard-only
 * command palette (⌘K / Ctrl K / `/`).
 */
export function AppHeader() {
  const [raised, setRaised] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest > RAISE_AFTER
    if (next !== raised) setRaised(next)
  })

  return (
    <header
      className={`transition-surface sticky top-0 z-40 border-b text-surface backdrop-blur-md ${
        raised
          ? 'border-surface/10 bg-primary/90 shadow-card-lg'
          : 'border-transparent bg-primary'
      }`}
    >
      <Container className="flex h-16 items-center gap-3 sm:gap-5">
        <Link to="/" className="flex shrink-0 items-center gap-3">
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
        <NavLinks items={NAV_ITEMS} />
        <div className="flex items-center gap-2">
          <a
            href={SITE.repository}
            target="_blank"
            rel="noreferrer"
            aria-label={m.nav_github()}
            className="hidden size-9 place-items-center rounded-lg text-on-primary-muted transition-colors duration-200 hover:bg-surface/10 hover:text-surface lg:grid"
          >
            <GithubLogoIcon className="size-5" />
          </a>
          <MobileNav items={NAV_ITEMS} />
        </div>
      </Container>
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
