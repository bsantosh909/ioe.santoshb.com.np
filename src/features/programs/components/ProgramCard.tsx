import { ButtonLink } from '#/components/ui/ButtonLink'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { m } from '#/paraglide/messages.js'
import type { Program } from '#/features/programs/types'

/** Card for a single program in the programs grid. */
export function ProgramCard({ program }: { program: Program }) {
  const ready = ProgramHelper.isReady(program)

  return (
    <div className="flex flex-col gap-3.5 rounded-2xl border border-line bg-surface p-5 transition hover:border-line-strong hover:shadow-card">
      <div className="flex items-center justify-between">
        <span className="rounded-lg bg-primary px-2.5 py-1.5 font-mono text-sm font-semibold text-surface">
          {program.code}
        </span>
        <span className="text-xs text-faint">
          {ready
            ? FormatHelper.subjectCount(ProgramHelper.subjectCount(program))
            : m.program_status_pending()}
        </span>
      </div>
      <div>
        <div className="text-lg leading-snug font-semibold">{program.name}</div>
        <div className="mt-1 text-sm leading-snug text-muted">
          {program.fullName}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-md bg-tint px-2 py-1 text-xs text-muted">
          {m.program_duration({
            years: program.durationYears,
            semesters: program.durationYears * 2,
          })}
        </span>
        <span
          className={`rounded-md px-2 py-1 text-xs ${
            ready ? 'bg-success-tint text-success' : 'bg-tint text-faint'
          }`}
        >
          {ready ? m.program_status_full() : m.program_status_soon()}
        </span>
      </div>
      <ButtonLink
        to="/programs/$code"
        params={{ code: program.code }}
        variant="outline"
        className="mt-auto w-full"
      >
        {m.common_view_program()}
      </ButtonLink>
    </div>
  )
}
