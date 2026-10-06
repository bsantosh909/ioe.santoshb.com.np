import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { GithubLogoIcon, ListIcon, XIcon } from '@phosphor-icons/react'
import { SITE } from '#/data/site'
import { m } from '#/paraglide/messages.js'
import type { LinkProps } from '@tanstack/react-router'

export interface MobileNavItem {
  to: LinkProps['to']
  label: () => string
  exact?: boolean
}

/** Hamburger trigger and right-side navigation drawer shown on mobile. */
export function MobileNav({ items }: { items: Array<MobileNavItem> }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label={m.nav_open_menu()}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-lg p-2 text-on-primary-soft hover:text-surface"
      >
        <ListIcon className="size-6" />
      </button>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-primary-deep/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-4/5 max-w-xs flex-col bg-primary text-surface shadow-xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-surface/10 px-5 py-4">
          <span className="text-sm font-bold tracking-wide">
            {m.nav_menu()}
          </span>
          <button
            type="button"
            aria-label={m.nav_close_menu()}
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-lg p-1.5 text-on-primary-soft hover:text-surface"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact ?? false }}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-on-primary-muted hover:bg-surface/10 hover:text-surface hover:no-underline"
              activeProps={{
                className: 'bg-surface/10 font-semibold text-surface',
              }}
            >
              {item.label()}
            </Link>
          ))}
        </nav>

        <div className="border-t border-surface/10 px-5 py-4">
          <a
            href={SITE.repository}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 text-sm text-on-primary-soft hover:text-surface hover:no-underline"
          >
            <GithubLogoIcon className="size-5" />
            {m.nav_github()}
          </a>
        </div>
      </div>
    </div>
  )
}
