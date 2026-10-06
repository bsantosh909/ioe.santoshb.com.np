import { WarningIcon } from '@phosphor-icons/react'
import { Container } from '#/components/ui/Container'
import { PageHeader } from '#/components/ui/PageHeader'
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

/** Curated official links grouped into pastel cards. */
export function LinksPage() {
  return (
    <>
      <PageHeader
        pattern="rings"
        title={m.links_title()}
        subtitle={m.links_subtitle()}
      >
        <div className="inline-flex items-start gap-2 rounded-xl border border-accent-line bg-accent-tint px-3.5 py-2.5 text-sm text-accent-deep">
          <WarningIcon weight="duotone" className="mt-0.5 size-4 shrink-0" />
          {m.links_disclaimer()}
        </div>
      </PageHeader>
      <Container as="section" className="pt-10 pb-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {LINK_GROUPS.map((group) => (
            <LinkGroupCard key={group.id} group={group} />
          ))}
        </div>
      </Container>
    </>
  )
}
