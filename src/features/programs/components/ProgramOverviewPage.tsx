import { getRouteApi } from '@tanstack/react-router'
import { ButtonLink } from '#/components/ui/ButtonLink'
import { Container } from '#/components/ui/Container'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { m } from '#/paraglide/messages.js'

const route = getRouteApi('/programs/$code')

/** Program overview tab: description, quick facts and subjects CTA. */
export function ProgramOverviewPage() {
  const { program } = route.useLoaderData()
  const ready = ProgramHelper.isReady(program)
  const electiveGroups = program.curriculum?.electiveGroups

  return (
    <Container as="section" className="pt-8 pb-15">
      <div className="max-w-3xl">
        <h2 className="mb-2.5 font-serif text-2xl font-semibold">
          {m.program_overview_heading()}
        </h2>
        <p className="mb-5 leading-relaxed text-body">{program.description}</p>
        <div className="mb-6 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-tint px-2 py-1 text-xs text-muted">
            {m.program_duration({
              years: program.durationYears,
              semesters: program.durationYears * 2,
            })}
          </span>
          {ready ? (
            <span className="rounded-md bg-tint px-2 py-1 text-xs text-muted">
              {FormatHelper.subjectCount(ProgramHelper.subjectCount(program))}
            </span>
          ) : null}
          {electiveGroups?.length ? (
            <span className="rounded-md bg-tint px-2 py-1 text-xs text-muted">
              {m.program_fact_electives({ count: electiveGroups.length })}
            </span>
          ) : null}
          <span className="rounded-md bg-tint px-2 py-1 text-xs text-muted">
            {program.degree}
          </span>
        </div>
        {ready ? (
          <ButtonLink
            to="/programs/$code/subjects"
            params={{ code: program.code }}
          >
            {m.program_overview_cta()}
          </ButtonLink>
        ) : (
          <ButtonLink
            to="/programs/$code"
            params={{ code: 'BCT' }}
            variant="outline"
          >
            {m.program_empty_action()}
          </ButtonLink>
        )}
      </div>
    </Container>
  )
}
