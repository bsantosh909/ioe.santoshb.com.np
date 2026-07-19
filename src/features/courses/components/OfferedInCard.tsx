import { Link } from '@tanstack/react-router'
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
    <div className="rounded-2xl border border-line bg-surface p-4.5">
      <div className="mb-3 text-xs font-bold tracking-wider text-faint uppercase">
        {m.offered_in()}
      </div>
      <div className="flex flex-col gap-2.5">
        {offerings.length === 0 ? (
          <span className="text-sm text-muted">{m.offered_none()}</span>
        ) : (
          offerings.map((offering) => (
            <Link
              key={`${offering.programCode}-${offering.year}-${offering.part}-${offering.elective}`}
              to="/programs/$code"
              params={{ code: offering.programCode }}
              className="flex items-center gap-2.5 text-ink hover:no-underline"
            >
              <span className="rounded-md bg-wash px-2 py-1 font-mono text-xs font-semibold text-primary">
                {offering.programCode}
              </span>
              <span className="text-sm text-muted">
                {offering.elective
                  ? m.table_elective()
                  : `${FormatHelper.yearLabel(offering.year)} · ${FormatHelper.semesterLabel(offering.part)}`}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
