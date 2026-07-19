import { Container } from '#/components/ui/Container'
import { ExternalButtonLink } from '#/components/ui/ExternalButtonLink'
import { SITE } from '#/data/site'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'

/** Head for the contribute route. */
export function contributePageHead() {
  return {
    meta: SeoHelper.meta({
      title: m.label_contribute(),
      description: m.seo_contribute_desc(),
      path: '/contribute',
    }),
    links: SeoHelper.canonical('/contribute'),
  }
}

/** Contribution guidelines and GitHub hand-off. */
export function ContributePage() {
  return (
    <Container as="section" className="pt-11 pb-15">
      <div className="max-w-3xl">
        <h1 className="mb-2.5 font-serif text-3xl font-semibold sm:text-4xl">
          {m.contribute_title()}
        </h1>
        <p className="mb-7 text-lg leading-relaxed text-muted">
          {m.contribute_intro()}
        </p>

        <div className="mb-7">
          <h2 className="mb-2.5 font-serif text-2xl font-semibold">
            {m.contribute_guidelines_title()}
          </h2>
          <ul className="list-disc pl-5 leading-loose text-body">
            <li>{m.contribute_guideline_1()}</li>
            <li>{m.contribute_guideline_2()}</li>
            <li>{m.contribute_guideline_3()}</li>
            <li>{m.contribute_guideline_4()}</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6">
          <h2 className="mb-2 font-serif text-xl font-semibold">
            {m.contribute_how_title()}
          </h2>
          <p className="mb-4 leading-relaxed text-body">
            {m.contribute_how_body()}
          </p>
          <div className="flex flex-wrap gap-3.5">
            <ExternalButtonLink href={`${SITE.repository}/pulls`}>
              {m.contribute_pr()}
            </ExternalButtonLink>
            <ExternalButtonLink
              href={`${SITE.repository}/issues/new`}
              variant="outline"
            >
              {m.contribute_issue()}
            </ExternalButtonLink>
          </div>
        </div>
      </div>
    </Container>
  )
}
