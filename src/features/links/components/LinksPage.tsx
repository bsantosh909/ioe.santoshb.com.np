import { Container } from '#/components/ui/Container'
import { LinkGroupCard } from '#/features/links/components/LinkGroupCard'
import { LINK_GROUPS } from '#/features/links/data/link-groups'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'

/** Head for the links route. */
export function linksPageHead() {
  return {
    meta: SeoHelper.meta({
      title: m.links_title(),
      description: m.seo_links_desc(),
      path: '/links',
    }),
    links: SeoHelper.canonical('/links'),
  }
}

/** Curated official links grouped by category. */
export function LinksPage() {
  return (
    <Container as="section" className="pt-10 pb-15">
      <h1 className="mb-1.5 font-serif text-3xl font-semibold">
        {m.links_title()}
      </h1>
      <p className="mb-3 max-w-2xl text-muted">{m.links_subtitle()}</p>
      <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-accent-line bg-accent-tint px-3 py-1.5 text-sm text-accent-deep">
        {m.links_disclaimer()}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {LINK_GROUPS.map((group) => (
          <LinkGroupCard key={group.id} group={group} />
        ))}
      </div>
    </Container>
  )
}
