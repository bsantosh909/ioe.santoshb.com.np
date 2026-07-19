import { Link } from '@tanstack/react-router'
import { ButtonLink } from '#/components/ui/ButtonLink'
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

/** Subject title: a link when it maps to a course, plain text otherwise. */
function SubjectTitle({ subject }: { subject: CurriculumSubject }) {
  if (subject.slug) {
    return (
      <Link
        to="/courses/$slug"
        params={{ slug: subject.slug }}
        className="text-sm font-semibold text-ink hover:text-link"
      >
        {subject.title}
      </Link>
    )
  }
  return (
    <span className={`text-sm ${subject.electiveGroup ? 'italic' : ''}`}>
      {subject.title}
    </span>
  )
}

/** View button when the subject maps to a course, else a status label. */
function SubjectAction({ subject }: { subject: CurriculumSubject }) {
  if (subject.slug) {
    return (
      <ButtonLink
        to="/courses/$slug"
        params={{ slug: subject.slug }}
        variant="outline"
        size="sm"
        className="justify-self-end"
      >
        {m.common_view()}
      </ButtonLink>
    )
  }
  return (
    <span className="justify-self-end text-sm text-faint">
      {subject.electiveGroup ? m.table_elective() : m.table_no_syllabus()}
    </span>
  )
}

/** Subject table for one semester of a program curriculum. */
export function SemesterTable({ part }: { part: CurriculumPart }) {
  const rows = part.subjects.map(toRow)

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <h3 className="text-xs font-bold tracking-wider text-faint uppercase">
          {FormatHelper.semesterLabel(part.part)}
        </h3>
        <span className="text-sm text-faint">
          {FormatHelper.subjectCount(part.subjects.length)}
        </span>
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface sm:block">
        <div className="min-w-xl">
          <div className="grid grid-cols-subjects gap-3.5 border-b border-line bg-raised px-4 py-2.5 text-xs font-bold tracking-wide text-faint uppercase">
            <span>{m.table_code()}</span>
            <span>{m.table_subject()}</span>
            <span>{m.table_credits()}</span>
            <span>{m.table_marks()}</span>
            <span className="text-right">{m.table_action()}</span>
          </div>
          {rows.map(({ subject, code, key }) => (
            <div
              key={key}
              className="grid grid-cols-subjects items-center gap-3.5 border-b border-line-soft px-4 py-3 last:border-b-0 hover:bg-raised"
            >
              <span className="font-mono text-sm font-semibold text-primary">
                {code ?? '—'}
              </span>
              <SubjectTitle subject={subject} />
              <span className="text-sm text-muted">
                {subject.credits ?? '—'}
              </span>
              <span className="text-sm text-muted">{subject.marks ?? '—'}</span>
              <SubjectAction subject={subject} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        {rows.map(({ subject, code, key }) => (
          <div
            key={key}
            className="rounded-2xl border border-line bg-surface p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="font-mono text-sm font-semibold text-primary">
                {code ?? '—'}
              </span>
              <SubjectAction subject={subject} />
            </div>
            <SubjectTitle subject={subject} />
            <div className="mt-3 flex gap-6 text-sm">
              <span className="flex items-baseline gap-1.5">
                <span className="text-xs font-bold tracking-wide text-faint uppercase">
                  {m.table_credits()}
                </span>
                <span className="text-muted">{subject.credits ?? '—'}</span>
              </span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-xs font-bold tracking-wide text-faint uppercase">
                  {m.table_marks()}
                </span>
                <span className="text-muted">{subject.marks ?? '—'}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
