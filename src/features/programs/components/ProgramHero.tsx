import { Container } from '#/components/ui/Container'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { m } from '#/paraglide/messages.js'
import type { Program } from '#/features/programs/types'

/** Navy header block on the program detail page. */
export function ProgramHero({ program }: { program: Program }) {
  const ready = ProgramHelper.isReady(program)

  return (
    <section className="bg-primary text-surface">
      <Container className="pt-9 pb-8">
        <div className="mb-3.5 flex items-center gap-3">
          <span className="rounded-lg bg-surface px-3 py-1.5 font-mono text-base font-semibold text-primary">
            {program.code}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-sm ${
              ready
                ? 'bg-success/20 text-success-bright'
                : 'bg-surface/10 text-on-primary-soft'
            }`}
          >
            {ready ? m.program_status_full() : m.program_status_soon()}
          </span>
        </div>
        <h1 className="mb-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          {program.name}
        </h1>
        <p className="mb-5 max-w-xl text-on-primary-soft">{program.fullName}</p>
        <div className="flex flex-wrap gap-8">
          <ProgramStat
            label={m.program_stat_duration()}
            value={m.program_duration({
              years: program.durationYears,
              semesters: program.durationYears * 2,
            })}
          />
          <ProgramStat
            label={m.program_stat_subjects()}
            value={ready ? String(ProgramHelper.subjectCount(program)) : '—'}
          />
          <ProgramStat label={m.program_stat_degree()} value={program.degree} />
        </div>
      </Container>
    </section>
  )
}

function ProgramStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs tracking-wide text-on-primary-faint uppercase">
        {label}
      </div>
      <div className="mt-0.5 text-lg font-semibold">{value}</div>
    </div>
  )
}
