import { Container } from '#/components/ui/Container'
import { PageHeader } from '#/components/ui/PageHeader'
import { StatPill } from '#/components/ui/StatPill'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
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
    <>
      <PageHeader title={m.programs_title()} subtitle={m.programs_subtitle()}>
        <div className="flex flex-wrap gap-3">
          <StatPill
            value={ProgramHelper.all().length}
            label={m.programs_stat_programs()}
            className="bg-pastel-gold text-pastel-gold-ink"
          />
          <StatPill
            value={CourseHelper.all().length}
            label={m.programs_stat_syllabi()}
            className="bg-pastel-lilac text-pastel-lilac-ink"
          />
        </div>
      </PageHeader>
      <Container as="section" className="pt-10 pb-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ProgramHelper.all().map((program) => (
            <ProgramCard key={program.code} program={program} />
          ))}
        </div>
      </Container>
    </>
  )
}
