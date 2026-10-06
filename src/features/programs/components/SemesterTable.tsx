import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { m } from '#/paraglide/messages.js'
import type {
  CurriculumPart,
  CurriculumSubject,
} from '#/features/programs/types'

interface SubjectRow {
  subject: CurriculumSubject
  code: string | null | undefined
  key: string
}

function toRow(subject: CurriculumSubject): SubjectRow {
  const course = subject.slug ? CourseHelper.bySlug(subject.slug) : undefined
  return {
    subject,
    code: subject.code ?? course?.code,
    key: subject.code ?? subject.title,
  }
}

const ROW =
  'grid grid-cols-subjects items-center gap-4 border-b border-line-soft px-5 py-3.5 last:border-b-0'

/** Status shown in place of the arrow when a subject has no course page. */
function SubjectStatus({ subject }: { subject: CurriculumSubject }) {
  return (
    <span className="justify-self-end text-xs text-faint">
      {subject.electiveGroup ? m.table_elective() : m.table_no_syllabus()}
    </span>
  )
}

/** One subject row: a full-row link when it maps to a course page. */
function SubjectRowView({ row }: { row: SubjectRow }) {
  const { subject, code } = row
  const cells = (
    <>
      <span className="font-mono text-sm font-semibold text-primary">
        {code ?? '-'}
      </span>
      <span
        className={`text-sm ${subject.slug ? 'font-semibold transition-colors duration-200 group-hover:text-link' : 'text-muted'} ${subject.electiveGroup ? 'italic' : ''}`}
      >
        {subject.title}
      </span>
      <span className="text-sm text-muted">{subject.credits ?? '-'}</span>
      <span className="text-sm text-muted">{subject.marks ?? '-'}</span>
      {subject.slug ? (
        <ArrowRightIcon className="size-4 justify-self-end text-faint opacity-0 transition duration-300 ease-snappy group-hover:translate-x-0.5 group-hover:text-link group-hover:opacity-100" />
      ) : (
        <SubjectStatus subject={subject} />
      )}
    </>
  )

  return subject.slug ? (
    <Link
      to="/courses/$slug"
      params={{ slug: subject.slug }}
      className={`group ${ROW} text-ink transition-colors duration-200 hover:bg-raised hover:no-underline`}
    >
      {cells}
    </Link>
  ) : (
    <div className={ROW}>{cells}</div>
  )
}

/** Subject table for one semester of a program curriculum. */
export function SemesterTable({ part }: { part: CurriculumPart }) {
  const rows = part.subjects.map(toRow)

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-ink">
          {FormatHelper.semesterLabel(part.part)}
        </h3>
        <span className="text-sm text-faint">
          {FormatHelper.subjectCount(part.subjects.length)}
        </span>
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface shadow-card sm:block">
        <div className="grid grid-cols-subjects gap-4 border-b border-line bg-raised px-5 py-3 text-xs font-semibold text-faint">
          <span>{m.table_code()}</span>
          <span>{m.table_subject()}</span>
          <span>{m.table_credits()}</span>
          <span>{m.table_marks()}</span>
          <span />
        </div>
        {rows.map((row) => (
          <SubjectRowView key={row.key} row={row} />
        ))}
      </div>

      {/* Mobile: cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        {rows.map(({ subject, code, key }) => {
          const body = (
            <>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="font-mono text-sm font-semibold text-primary">
                  {code ?? '-'}
                </span>
                {subject.slug ? (
                  <ArrowRightIcon className="size-4 text-faint" />
                ) : (
                  <SubjectStatus subject={subject} />
                )}
              </div>
              <div className="text-sm font-semibold">{subject.title}</div>
              <div className="mt-2 flex gap-5 text-xs text-muted">
                <span>
                  {m.table_credits()}: {subject.credits ?? '-'}
                </span>
                <span>
                  {m.table_marks()}: {subject.marks ?? '-'}
                </span>
              </div>
            </>
          )
          return subject.slug ? (
            <Link
              key={key}
              to="/courses/$slug"
              params={{ slug: subject.slug }}
              className="rounded-2xl border border-line bg-surface p-4 text-ink hover:no-underline active:scale-99"
            >
              {body}
            </Link>
          ) : (
            <div
              key={key}
              className="rounded-2xl border border-line bg-surface p-4"
            >
              {body}
            </div>
          )
        })}
      </div>
    </div>
  )
}
