import { getRouteApi } from '@tanstack/react-router'
import { ButtonLink } from '#/components/ui/ButtonLink'
import { Container } from '#/components/ui/Container'
import { OfferedInCard } from '#/features/courses/components/OfferedInCard'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { m } from '#/paraglide/messages.js'

const route = getRouteApi('/courses/$slug')

/** Course overview tab: objective, placements and disclaimer. */
export function CourseOverviewPage() {
  const { course, offerings } = route.useLoaderData()
  const details = CourseHelper.details(course.slug)

  return (
    <Container
      as="section"
      className="grid grid-cols-1 items-start gap-8 pt-8 pb-15 lg:grid-cols-3"
    >
      <div className="min-w-0 lg:col-span-2">
        {details.credits != null || details.marks != null ? (
          <div className="mb-6 flex flex-wrap gap-8">
            {details.credits != null ? (
              <CourseFact
                label={m.table_credits()}
                value={String(details.credits)}
              />
            ) : null}
            {details.marks != null ? (
              <CourseFact
                label={m.course_total_marks()}
                value={String(details.marks)}
              />
            ) : null}
          </div>
        ) : null}
        <h2 className="mb-2.5 font-serif text-2xl font-semibold">
          {m.course_objective()}
        </h2>
        {course.objective ? (
          <p className="mb-4 leading-relaxed text-body">{course.objective}</p>
        ) : (
          <p className="mb-4 text-muted">{m.course_no_objective()}</p>
        )}
        <ButtonLink to="/courses/$slug/syllabus" params={{ slug: course.slug }}>
          {m.course_read_syllabus()}
        </ButtonLink>
      </div>
      <aside className="flex flex-col gap-4">
        <OfferedInCard offerings={offerings} />
        <div className="rounded-xl border border-accent-line bg-accent-tint p-4">
          <div className="text-xs font-semibold text-accent-deep">
            {m.course_disclaimer_title()}
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-accent-deep">
            {m.course_disclaimer_body()}
          </p>
        </div>
      </aside>
    </Container>
  )
}

function CourseFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs tracking-wide text-faint uppercase">{label}</div>
      <div className="mt-0.5 text-lg font-semibold text-ink">{value}</div>
    </div>
  )
}
