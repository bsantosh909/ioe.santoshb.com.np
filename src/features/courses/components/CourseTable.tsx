import { Link } from '@tanstack/react-router'
import { ArrowRightIcon, FilePdfIcon } from '@phosphor-icons/react'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { m } from '#/paraglide/messages.js'
import type { CourseMeta } from '#/features/courses/types'

/** Program chips shown before collapsing the rest into `+X`. */
const VISIBLE_PROGRAMS = 3

interface CourseRow {
  course: CourseMeta
  /** Program codes, the selected program first. */
  programCodes: Array<string>
  isElective: boolean
  /** Line under the title: placement in the selected program, else units. */
  detail?: string
  credits?: number
  marks?: number
  papers: number
}

function toRow(course: CourseMeta, selectedProgram?: string): CourseRow {
  const offerings = CourseHelper.offerings(course.slug)
  const codes = [
    ...new Set(
      offerings
        .filter((entry) => !entry.elective)
        .map((entry) => entry.programCode),
    ),
  ]
  const programCodes = selectedProgram
    ? [
        ...codes.filter((code) => code === selectedProgram),
        ...codes.filter((code) => code !== selectedProgram),
      ]
    : codes
  const placement = selectedProgram
    ? offerings.find((entry) => entry.programCode === selectedProgram)
    : undefined
  const details = CourseHelper.details(course.slug)

  return {
    course,
    programCodes,
    isElective: codes.length === 0 && offerings.length > 0,
    detail: placement
      ? placement.elective
        ? m.table_elective()
        : `${FormatHelper.yearLabel(placement.year)}, ${FormatHelper.semesterLabel(placement.part)}`
      : course.units.length > 0
        ? m.courses_unit_count({ count: course.units.length })
        : undefined,
    credits: details.credits,
    marks: details.marks,
    papers: CourseHelper.oldQuestions(course.slug).length,
  }
}

/** Program chips: selected first (highlighted), two more, then `+X`. */
function OfferedIn({
  row,
  selectedProgram,
}: {
  row: CourseRow
  selectedProgram?: string
}) {
  if (row.programCodes.length === 0) {
    return (
      <span className="text-sm text-muted">
        {row.isElective ? m.table_elective() : m.table_na()}
      </span>
    )
  }
  const shown = row.programCodes.slice(0, VISIBLE_PROGRAMS)
  const hidden = row.programCodes.slice(VISIBLE_PROGRAMS)

  return (
    <span className="flex flex-wrap items-center gap-1.5">
      {shown.map((code) => (
        <span
          key={code}
          className={`rounded-md px-2 py-0.5 font-mono text-xs font-semibold ${
            code === selectedProgram
              ? 'bg-primary text-surface'
              : 'bg-wash text-primary'
          }`}
        >
          {code}
        </span>
      ))}
      {hidden.length > 0 ? (
        <span
          title={hidden.join(', ')}
          aria-label={hidden.join(', ')}
          className="rounded-md bg-surface px-2 py-0.5 text-xs font-semibold text-muted ring-1 ring-line"
        >
          {m.courses_more_programs({ count: hidden.length })}
        </span>
      ) : null}
    </span>
  )
}

/** Past-paper count as a small rose chip, or a dash when none exist. */
function Papers({ count }: { count: number }) {
  if (count === 0) return <span className="text-sm text-faint">-</span>
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-pastel-rose px-1.5 py-0.5 text-xs font-semibold text-pastel-rose-ink">
      <FilePdfIcon weight="duotone" className="size-3.5" />
      {count}
    </span>
  )
}

interface CourseTableProps {
  courses: Array<CourseMeta>
  /** Program the list is filtered to; its chip leads and is highlighted. */
  selectedProgram?: string
}

/** Catalogue table listing courses; each row links to the course. */
export function CourseTable({ courses, selectedProgram }: CourseTableProps) {
  const rows = courses.map((course) => toRow(course, selectedProgram))

  return (
    <>
      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface shadow-card md:block">
        <div className="grid grid-cols-catalogue gap-4 border-b border-line bg-raised px-5 py-3 text-xs font-semibold text-faint">
          <span>{m.table_code()}</span>
          <span>{m.table_course()}</span>
          <span>{m.table_offered_in()}</span>
          <span>{m.table_credits()}</span>
          <span>{m.table_marks()}</span>
          <span>{m.table_papers()}</span>
          <span />
        </div>
        {rows.map((row) => (
          <Link
            key={row.course.slug}
            to="/courses/$slug"
            params={{ slug: row.course.slug }}
            className="group grid grid-cols-catalogue items-center gap-4 border-b border-line-soft px-5 py-3 text-ink transition-colors duration-200 last:border-b-0 hover:bg-raised hover:no-underline"
          >
            <span className="font-mono text-sm font-semibold text-primary">
              {row.course.code ?? '-'}
            </span>
            <span className="flex min-w-0 flex-col leading-snug">
              <span className="text-sm font-semibold transition-colors duration-200 group-hover:text-link">
                {row.course.title}
              </span>
              {row.detail ? (
                <span className="text-xs text-faint">{row.detail}</span>
              ) : null}
            </span>
            <OfferedIn row={row} selectedProgram={selectedProgram} />
            <span className="text-sm text-muted tabular-nums">
              {row.credits ?? '-'}
            </span>
            <span className="text-sm text-muted tabular-nums">
              {row.marks ?? '-'}
            </span>
            <Papers count={row.papers} />
            <ArrowRightIcon className="size-4 justify-self-end text-faint opacity-0 transition duration-300 ease-snappy group-hover:translate-x-0.5 group-hover:text-link group-hover:opacity-100" />
          </Link>
        ))}
      </div>

      {/* Mobile: cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((row) => (
          <Link
            key={row.course.slug}
            to="/courses/$slug"
            params={{ slug: row.course.slug }}
            className="rounded-2xl border border-line bg-surface p-4 text-ink hover:no-underline active:scale-99"
          >
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="font-mono text-sm font-semibold text-primary">
                {row.course.code ?? '-'}
              </span>
              <Papers count={row.papers} />
            </div>
            <div className="text-sm font-semibold">{row.course.title}</div>
            {row.detail ? (
              <div className="text-xs text-faint">{row.detail}</div>
            ) : null}
            <div className="mt-3 flex items-center justify-between gap-3">
              <OfferedIn row={row} selectedProgram={selectedProgram} />
              {row.credits != null ? (
                <span className="shrink-0 text-xs text-muted">
                  {row.credits} {m.table_credits().toLowerCase()}
                </span>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
