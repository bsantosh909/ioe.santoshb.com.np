import { Container } from '#/components/ui/Container'
import { ProgramCard } from '#/features/programs/components/ProgramCard'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'

/** Head for the programs list route. */
export function programsPageHead() {
  return {
    meta: SeoHelper.meta({
      title: m.programs_title(),
      description: m.seo_programs_desc(),
      path: '/programs',
    }),
    links: SeoHelper.canonical('/programs'),
  }
}

/** Grid of all programs with status badges. */
export function ProgramsPage() {
  return (
    <Container as="section" className="pt-10 pb-15">
      <h1 className="mb-1.5 font-serif text-3xl font-semibold">
        {m.programs_title()}
      </h1>
      <p className="mb-7 max-w-2xl text-muted">{m.programs_subtitle()}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ProgramHelper.all().map((program) => (
          <ProgramCard key={program.code} program={program} />
        ))}
      </div>
    </Container>
  )
}
