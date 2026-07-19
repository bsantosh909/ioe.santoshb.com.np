import { getRouteApi } from '@tanstack/react-router'
import { Container } from '#/components/ui/Container'
import { EmptyState } from '#/components/ui/EmptyState'
import { m } from '#/paraglide/messages.js'

const route = getRouteApi('/programs/$code')

/** Program future-possibilities tab: careers and further study. */
export function ProgramScopePage() {
  const { program } = route.useLoaderData()

  return (
    <Container as="section" className="pt-8 pb-15">
      <div className="max-w-3xl">
        <h2 className="mb-2.5 font-serif text-2xl font-semibold">
          {m.program_scope_heading()}
        </h2>
        {program.scope ? (
          <p className="leading-relaxed text-body">{program.scope}</p>
        ) : (
          <EmptyState
            icon="🔭"
            title={m.program_scope_empty_title()}
            description={m.program_scope_empty_desc()}
          />
        )}
      </div>
    </Container>
  )
}
