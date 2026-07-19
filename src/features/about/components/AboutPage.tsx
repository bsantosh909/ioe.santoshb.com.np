import { ButtonLink } from '#/components/ui/ButtonLink'
import { Container } from '#/components/ui/Container'
import { SITE } from '#/data/site'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'

/** Head for the about route. */
export function aboutPageHead() {
  return {
    meta: SeoHelper.meta({
      title: m.label_about(),
      description: m.seo_about_desc({ site: SITE.name }),
      path: '/about',
    }),
    links: SeoHelper.canonical('/about'),
  }
}

/** About page: mission, data sources and disclaimer. */
export function AboutPage() {
  return (
    <Container as="section" className="pt-11 pb-15">
      <div className="max-w-3xl">
        <h1 className="mb-2.5 font-serif text-3xl font-semibold sm:text-4xl">
          {m.about_title({ site: SITE.name })}
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-muted">
          {m.about_intro()}
        </p>

        <div className="mb-8">
          <h2 className="mb-2.5 font-serif text-2xl font-semibold">
            {m.about_mission_title()}
          </h2>
          <p className="leading-relaxed text-body">{m.about_mission_body()}</p>
        </div>

        <div className="mb-8">
          <h2 className="mb-2.5 font-serif text-2xl font-semibold">
            {m.about_sources_title()}
          </h2>
          <p className="mb-3 leading-relaxed text-body">
            {m.about_sources_body()}
          </p>
          <ul className="list-disc pl-5 leading-loose text-body">
            <li>{m.about_source_1()}</li>
            <li>{m.about_source_2()}</li>
            <li>{m.about_source_3()}</li>
          </ul>
        </div>

        <div className="mb-8 flex flex-wrap gap-3.5">
          <ButtonLink to="/contribute">{m.about_cta_contribute()}</ButtonLink>
          <ButtonLink to="/contact" variant="outline">
            {m.about_cta_contact()}
          </ButtonLink>
        </div>

        <div className="rounded-xl border border-accent-line bg-accent-tint px-5 py-4.5">
          <div className="mb-1 text-sm font-semibold text-accent-deep">
            {m.about_disclaimer_title()}
          </div>
          <p className="text-sm leading-relaxed text-accent-deep">
            {m.about_disclaimer_body()}
          </p>
        </div>
      </div>
    </Container>
  )
}
