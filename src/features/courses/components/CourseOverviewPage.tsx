import { getRouteApi } from '@tanstack/react-router'
import { FilePdfIcon, WarningIcon } from '@phosphor-icons/react'
import { ButtonLink } from '#/components/ui/ButtonLink'
import { Container } from '#/components/ui/Container'
import { StatPill } from '#/components/ui/StatPill'
import { OfferedInCard } from '#/features/courses/components/OfferedInCard'
import { UnitTimeline } from '#/features/courses/components/UnitTimeline'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { m } from '#/paraglide/messages.js'

const route = getRouteApi('/courses/$slug')

/** Course overview tab: facts, objective, unit timeline and sidebar. */
export function CourseOverviewPage() {
  const { course, offerings } = route.useLoaderData()
  const details = CourseHelper.details(course.slug)
  const oldQuestionCount = CourseHelper.oldQuestions(course.slug).length

  return (
    <Container
      as="section"
      className="grid grid-cols-1 items-start gap-10 pt-10 pb-20 lg:grid-cols-3"
    >
      <div className="min-w-0 lg:col-span-2">
        {details.credits != null || details.marks != null ? (
          <div className="mb-8 flex flex-wrap gap-3">
            {details.credits != null ? (
              <StatPill
                value={details.credits}
                label={m.table_credits().toLowerCase()}
                className="bg-pastel-gold text-pastel-gold-ink"
              />
            ) : null}
            {details.marks != null ? (
              <StatPill
                value={details.marks}
                label={m.course_total_marks().toLowerCase()}
                className="bg-pastel-sky text-pastel-sky-ink"
              />
            ) : null}
          </div>
        ) : null}
        <h2 className="mb-3 text-2xl font-semibold tracking-tight">
          {m.course_objective()}
        </h2>
        {course.objective ? (
          <p className="mb-4 text-lg leading-relaxed text-body">
            {course.objective}
          </p>
        ) : (
          <p className="mb-4 text-muted">{m.course_no_objective()}</p>
        )}
        {course.units.length > 0 ? (
          <>
            <h2 className="mt-10 mb-5 text-2xl font-semibold tracking-tight">
              {m.course_syllabus_units()}
            </h2>
            <UnitTimeline units={course.units} />
          </>
        ) : null}
        <ButtonLink
          to="/courses/$slug/syllabus"
          params={{ slug: course.slug }}
          arrow
          className="mt-10"
        >
          {m.course_read_syllabus()}
        </ButtonLink>
      </div>
      <aside className="flex flex-col gap-4 lg:sticky lg:top-32">
        {oldQuestionCount > 0 ? (
          <div className="rounded-3xl bg-pastel-mint p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-surface text-danger shadow-card">
                <FilePdfIcon weight="duotone" className="size-6" />
              </span>
              <span className="text-sm font-semibold text-pastel-mint-ink">
                {FormatHelper.oldQuestionCount(oldQuestionCount)}
              </span>
            </div>
            <ButtonLink
              to="/courses/$slug/old-questions"
              params={{ slug: course.slug }}
              arrow
              className="w-full"
            >
              {m.course_oldq_cta()}
            </ButtonLink>
          </div>
        ) : null}
        <OfferedInCard offerings={offerings} />
        <div className="flex gap-3 rounded-2xl border border-accent-line bg-accent-tint p-4">
          <WarningIcon
            weight="duotone"
            className="size-5 shrink-0 text-accent-deep"
          />
          <div>
            <div className="text-sm font-semibold text-accent-deep">
              {m.course_disclaimer_title()}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-accent-deep">
              {m.course_disclaimer_body()}
            </p>
          </div>
        </div>
      </aside>
    </Container>
  )
}
