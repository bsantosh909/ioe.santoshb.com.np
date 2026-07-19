import { getRouteApi } from '@tanstack/react-router'
import { ButtonLink } from '#/components/ui/ButtonLink'
import { Container } from '#/components/ui/Container'
import { EmptyState } from '#/components/ui/EmptyState'
import { m } from '#/paraglide/messages.js'

const route = getRouteApi('/courses/$slug')

/** Course old-questions tab: empty state until data exists. */
export function CourseOldQuestionsPage() {
  const { course } = route.useLoaderData()
  const courseLabel = course.code ?? course.title

  return (
    <Container as="section" className="pt-8 pb-15">
      <h2 className="mb-4 font-serif text-2xl font-semibold">
        {m.oldq_title({ course: courseLabel })}
      </h2>
      <EmptyState
        icon="🗃️"
        title={m.oldq_empty_title({ course: courseLabel })}
        description={m.oldq_empty_desc()}
        action={
          <ButtonLink to="/contribute">{m.oldq_empty_action()}</ButtonLink>
        }
      />
    </Container>
  )
}
