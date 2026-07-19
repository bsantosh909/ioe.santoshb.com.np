import { Container } from '#/components/ui/Container'
import { MdxContent } from '#/components/mdx/MdxContent'
import { SITE } from '#/data/site'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'
import PrivacyContent from '#/content/pages/privacy.mdx'

/** Head for the privacy route. */
export function privacyPageHead() {
  return {
    meta: SeoHelper.meta({
      title: m.label_privacy(),
      description: m.seo_privacy_desc({ site: SITE.name }),
      path: '/privacy',
    }),
    links: SeoHelper.canonical('/privacy'),
  }
}

/** Privacy policy rendered from MDX. */
export function PrivacyPage() {
  return (
    <Container as="section" className="pt-11 pb-15">
      <div className="max-w-3xl">
        <MdxContent component={PrivacyContent} />
      </div>
    </Container>
  )
}
