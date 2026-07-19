import { Container } from '#/components/ui/Container'
import { MdxContent } from '#/components/mdx/MdxContent'
import { SITE } from '#/data/site'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'
import TermsContent from '#/content/pages/terms.mdx'

/** Head for the terms route. */
export function termsPageHead() {
  return {
    meta: SeoHelper.meta({
      title: m.label_terms(),
      description: m.seo_terms_desc({ site: SITE.name }),
      path: '/terms',
    }),
    links: SeoHelper.canonical('/terms'),
  }
}

/** Terms of service rendered from MDX. */
export function TermsPage() {
  return (
    <Container as="section" className="pt-11 pb-15">
      <div className="max-w-3xl">
        <MdxContent component={TermsContent} />
      </div>
    </Container>
  )
}
