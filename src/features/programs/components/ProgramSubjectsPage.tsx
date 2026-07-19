import { getRouteApi } from '@tanstack/react-router'
import { ButtonLink } from '#/components/ui/ButtonLink'
import { Container } from '#/components/ui/Container'
import { EmptyState } from '#/components/ui/EmptyState'
import { ElectiveGroupCard } from '#/features/programs/components/ElectiveGroupCard'
import { SemesterTable } from '#/features/programs/components/SemesterTable'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { m } from '#/paraglide/messages.js'

const route = getRouteApi('/programs/$code')

/** Program subjects tab: year- and semester-wise curriculum tables. */
export function ProgramSubjectsPage() {
  const { program } = route.useLoaderData()
  const curriculum = program.curriculum

  return (
    <Container as="section" className="pt-8 pb-15">
      {!curriculum ? (
        <EmptyState
          icon="🗂️"
          title={m.program_empty_title({ code: program.code })}
          description={m.program_empty_desc()}
          action={
            <ButtonLink to="/programs/$code" params={{ code: 'BCT' }}>
              {m.program_empty_action()}
            </ButtonLink>
          }
        />
      ) : (
        <div className="flex flex-col gap-8">
          {curriculum.years.map((year) => (
            <div key={year.year}>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="font-serif text-2xl font-semibold">
                  {FormatHelper.yearLabel(year.year)}
                </h2>
                <span className="h-px flex-1 bg-line" />
              </div>
              <div className="flex flex-col gap-5">
                {year.parts.map((part) => (
                  <SemesterTable key={part.part} part={part} />
                ))}
              </div>
            </div>
          ))}
          {curriculum.electiveGroups && curriculum.electiveGroups.length > 0 ? (
            <div>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="font-serif text-2xl font-semibold">
                  {m.program_electives()}
                </h2>
                <span className="h-px flex-1 bg-line" />
              </div>
              <div className="flex flex-col gap-4">
                {curriculum.electiveGroups.map((group) => (
                  <ElectiveGroupCard key={group.id} group={group} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Container>
  )
}
