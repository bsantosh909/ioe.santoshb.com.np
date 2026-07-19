import { Link } from '@tanstack/react-router'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { m } from '#/paraglide/messages.js'

/** Home panel listing the first few programs with subject counts. */
export function PopularProgramsPanel() {
  const programs = ProgramHelper.all().slice(0, 4)

  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-serif text-lg font-semibold">
          {m.home_popular_programs()}
        </h3>
        <Link to="/programs" className="text-sm font-semibold">
          {m.common_view_all()}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {programs.map((program) => (
          <Link
            key={program.code}
            to="/programs/$code"
            params={{ code: program.code }}
            className="flex items-center gap-3 rounded-xl border border-line-soft p-3 text-ink hover:border-line-strong hover:bg-raised hover:no-underline"
          >
            <span className="min-w-12 rounded-lg bg-wash px-2 py-1.5 text-center font-mono text-sm font-semibold text-primary">
              {program.code}
            </span>
            <span className="flex flex-col leading-snug">
              <span className="text-sm font-semibold">{program.name}</span>
              <span className="text-xs text-faint">
                {ProgramHelper.isReady(program)
                  ? FormatHelper.subjectCount(
                      ProgramHelper.subjectCount(program),
                    )
                  : m.home_coming_soon()}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
