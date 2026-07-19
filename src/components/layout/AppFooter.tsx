import { Link } from '@tanstack/react-router'
import { BrandLogo } from '#/components/ui/BrandLogo'
import { Container } from '#/components/ui/Container'
import { m } from '#/paraglide/messages.js'

const EXPLORE_LINKS = [
  { to: '/programs', label: () => m.label_programs() },
  { to: '/courses', label: () => m.label_courses() },
  { to: '/links', label: () => m.label_links() },
]

const HUB_LINKS = [
  { to: '/about', label: () => m.label_about() },
  { to: '/contact', label: () => m.label_contact() },
  { to: '/contribute', label: () => m.label_contribute() },
]

const LEGAL_LINKS = [
  {
    to: '/privacy',
    label: () => m.label_privacy(),
    short: () => m.label_privacy_short(),
  },
  {
    to: '/terms',
    label: () => m.label_terms(),
    short: () => m.label_terms_short(),
  },
]

/** Site footer with brand blurb and link columns. */
export function AppFooter() {
  return (
    <footer className="mt-auto bg-primary-deep text-on-primary-soft">
      <Container className="grid grid-cols-1 gap-8 pt-11 pb-8 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center gap-2.5">
            <BrandLogo variant="white" className="h-5 w-auto" />
            <span className="text-sm font-bold text-surface">
              {m.brand_name()}
            </span>
          </div>
          <p className="mb-3 max-w-xs text-sm leading-relaxed text-on-primary-faint">
            {m.footer_blurb()}
          </p>
        </div>
        <FooterColumn title={m.footer_explore()} links={EXPLORE_LINKS} />
        <FooterColumn title={m.footer_hub()} links={HUB_LINKS} />
        <FooterColumn title={m.footer_legal()} links={LEGAL_LINKS} />
      </Container>
      <div className="border-t border-surface/10">
        <Container className="flex flex-wrap justify-between gap-2.5 py-4 text-xs text-on-primary-dim">
          <span>{m.footer_copyright()}</span>
          <span className="flex gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-on-primary-dim hover:text-surface"
              >
                {link.short()}
              </Link>
            ))}
          </span>
        </Container>
      </div>
    </footer>
  )
}

interface FooterColumnProps {
  title: string
  links: Array<{ to: string; label: () => string }>
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <div className="mb-3 text-sm font-semibold text-surface">{title}</div>
      <div className="flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-on-primary-soft hover:text-surface hover:no-underline"
          >
            {link.label()}
          </Link>
        ))}
      </div>
    </div>
  )
}
