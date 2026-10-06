import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { m } from '#/paraglide/messages.js'
import type { CourseOffering } from '#/features/courses/helpers/course-helper'

/** Sidebar card listing every program placement of a course. */
export function OfferedInCard({
  offerings,
}: {
  offerings: Array<CourseOffering>
}) {
  return (
    <div className="rounded-3xl border border-line bg-surface p-2 shadow-card">
      <div className="px-3 pt-3 pb-2 text-sm font-semibold text-ink">
        {m.offered_in()}
      </div>
      {offerings.length === 0 ? (
        <p className="px-3 pb-3 text-sm text-muted">{m.offered_none()}</p>
      ) : (
        offerings.map((offering) => (
          <Link
            key={`${offering.programCode}-${offering.year}-${offering.part}-${offering.elective}`}
            to="/programs/$code"
            params={{ code: offering.programCode }}
            className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-ink transition-colors duration-200 hover:bg-wash hover:no-underline"
          >
            <span className="min-w-12 rounded-md bg-wash px-2 py-1 text-center font-mono text-xs font-semibold text-primary group-hover:bg-surface">
              {offering.programCode}
            </span>
            <span className="flex-1 text-sm text-muted">
              {offering.elective
                ? m.table_elective()
                : `${FormatHelper.yearLabel(offering.year)}, ${FormatHelper.semesterLabel(offering.part)}`}
            </span>
            <ArrowRightIcon className="size-4 text-faint opacity-0 transition duration-300 ease-snappy group-hover:translate-x-0.5 group-hover:opacity-100" />
          </Link>
        ))
      )}
    </div>
  )
}
