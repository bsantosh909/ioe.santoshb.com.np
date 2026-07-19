import { Link } from '@tanstack/react-router'
import { ButtonLink } from '#/components/ui/ButtonLink'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { m } from '#/paraglide/messages.js'
import type { CourseMeta } from '#/features/courses/types'

interface CourseRow {
  course: CourseMeta
  programCodes: Array<string>
  isElective: boolean
}

function toRow(course: CourseMeta): CourseRow {
  const offerings = CourseHelper.offerings(course.slug)
  const programCodes = [
    ...new Set(
      offerings
        .filter((entry) => !entry.elective)
        .map((entry) => entry.programCode),
    ),
  ]
  return {
    course,
    programCodes,
    isElective: programCodes.length === 0 && offerings.length > 0,
  }
}

/** Program placements as chips, falling back to an elective / N-A label. */
function OfferedIn({ programCodes, isElective }: Omit<CourseRow, 'course'>) {
  if (programCodes.length === 0) {
    return (
      <span className="text-sm text-muted">
        {isElective ? m.table_elective() : m.table_na()}
      </span>
    )
  }
  return (
    <span className="flex flex-wrap gap-1.5">
      {programCodes.map((code) => (
        <span
          key={code}
          className="rounded-md bg-wash px-2 py-0.5 font-mono text-xs font-semibold text-primary"
        >
          {code}
        </span>
      ))}
    </span>
  )
}

/** Catalogue table listing courses with their program placements. */
export function CourseTable({ courses }: { courses: Array<CourseMeta> }) {
  const rows = courses.map(toRow)

  return (
    <>
      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface sm:block">
        <div className="min-w-xl">
          <div className="grid grid-cols-catalogue gap-3.5 border-b border-line bg-raised px-4 py-3 text-xs font-bold tracking-wide text-faint uppercase">
            <span>{m.table_code()}</span>
            <span>{m.table_course()}</span>
            <span>{m.table_offered_in()}</span>
            <span className="text-right">{m.table_action()}</span>
          </div>
          {rows.map(({ course, programCodes, isElective }) => (
            <div
              key={course.slug}
              className="grid grid-cols-catalogue items-center gap-3.5 border-b border-line-soft px-4 py-3.5 last:border-b-0 hover:bg-raised"
            >
              <span className="font-mono text-sm font-semibold text-primary">
                {course.code ?? '—'}
              </span>
              <Link
                to="/courses/$slug"
                params={{ slug: course.slug }}
                className="text-sm font-semibold text-ink hover:text-link"
              >
                {course.title}
              </Link>
              <OfferedIn programCodes={programCodes} isElective={isElective} />
              <ButtonLink
                to="/courses/$slug"
                params={{ slug: course.slug }}
                variant="outline"
                size="sm"
                className="justify-self-end"
              >
                {m.common_view()}
              </ButtonLink>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        {rows.map(({ course, programCodes, isElective }) => (
          <div
            key={course.slug}
            className="rounded-2xl border border-line bg-surface p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="font-mono text-sm font-semibold text-primary">
                {course.code ?? '—'}
              </span>
              <ButtonLink
                to="/courses/$slug"
                params={{ slug: course.slug }}
                variant="outline"
                size="sm"
              >
                {m.common_view()}
              </ButtonLink>
            </div>
            <Link
              to="/courses/$slug"
              params={{ slug: course.slug }}
              className="text-sm font-semibold text-ink hover:text-link"
            >
              {course.title}
            </Link>
            <div className="mt-3">
              <div className="mb-1.5 text-xs font-bold tracking-wide text-faint uppercase">
                {m.table_offered_in()}
              </div>
              <OfferedIn programCodes={programCodes} isElective={isElective} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
