import { Container } from '#/components/ui/Container'
import { ContactForm } from '#/features/contact/components/ContactForm'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'

/** Head for the contact route. */
export function contactPageHead() {
  return {
    meta: SeoHelper.meta({
      title: m.contact_title(),
      description: m.seo_contact_desc(),
      path: '/contact',
    }),
    links: SeoHelper.canonical('/contact'),
  }
}

/** Contact page with the mailto-backed form. */
export function ContactPage() {
  return (
    <Container as="section" className="pt-11 pb-15">
      <div className="max-w-2xl">
        <h1 className="mb-2.5 font-serif text-3xl font-semibold sm:text-4xl">
          {m.contact_title()}
        </h1>
        <p className="mb-7 text-lg leading-relaxed text-muted">
          {m.contact_subtitle()}
        </p>
        <ContactForm />
      </div>
    </Container>
  )
}
