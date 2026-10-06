import { ArchiveIcon } from '@phosphor-icons/react'
import { getRouteApi } from '@tanstack/react-router'
import { ButtonLink } from '#/components/ui/ButtonLink'
import { Container } from '#/components/ui/Container'
import { EmptyState } from '#/components/ui/EmptyState'
import { OldQuestionSetCard } from '#/features/courses/components/OldQuestionSetCard'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { OLD_QUESTION_SOURCE } from '#/features/courses/data/old-questions'
import { m } from '#/paraglide/messages.js'

const route = getRouteApi('/courses/$slug')

/** Course old-questions tab: compiled past-paper PDFs, or an empty state. */
export function CourseOldQuestionsPage() {
  const { course } = route.useLoaderData()
  const courseLabel = course.code ?? course.title
  const sets = CourseHelper.oldQuestions(course.slug)

  return (
    <Container as="section" className="pt-10 pb-20">
      <h2 className="mb-3 text-2xl font-semibold tracking-tight">
        {m.oldq_title({ course: courseLabel })}
      </h2>
      {sets.length === 0 ? (
        <EmptyState
          icon={ArchiveIcon}
          title={m.oldq_empty_title({ course: courseLabel })}
          description={m.oldq_empty_desc()}
          action={
            <ButtonLink to="/contribute">{m.oldq_empty_action()}</ButtonLink>
          }
        />
      ) : (
        <div className="max-w-4xl">
          <p className="mb-8 text-lg leading-relaxed text-body">
            {m.oldq_intro({ course: course.title })}
          </p>
          <div className="flex flex-col gap-4">
            {sets.map((set) => (
              <OldQuestionSetCard
                key={set.url}
                courseTitle={course.title}
                set={set}
              />
            ))}
          </div>
          <p className="mt-4 text-xs text-faint">
            {m.oldq_source()}{' '}
            <a
              href={OLD_QUESTION_SOURCE.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {OLD_QUESTION_SOURCE.name}
            </a>
            {'.'}
          </p>
          <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-pastel-gold p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-lg font-black text-pastel-gold-ink">
                {m.oldq_more_title()}
              </div>
              <p className="mt-1 text-sm text-pastel-gold-ink">
                {m.oldq_more_desc()}
              </p>
            </div>
            <ButtonLink to="/contribute" arrow className="shrink-0">
              {m.oldq_empty_action()}
            </ButtonLink>
          </div>
        </div>
      )}
    </Container>
  )
}
