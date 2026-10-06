import { Backdrop } from '#/components/fx/Backdrop'
import { Container } from '#/components/ui/Container'
import { StatPill } from '#/components/ui/StatPill'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { m } from '#/paraglide/messages.js'
import type { Program } from '#/features/programs/types'

/** Light program header: code, status, name and pastel fact pills. */
export function ProgramHero({ program }: { program: Program }) {
  const ready = ProgramHelper.isReady(program)
  const image = ProgramHelper.image(program)

  return (
    <section className="hero-glow relative overflow-hidden bg-surface">
      <Backdrop pattern="blueprint" />
      <Container className="relative grid grid-cols-1 items-center gap-10 pt-10 pb-10 sm:pt-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-4 flex items-center gap-3 motion-safe:animate-rise">
            <span className="rounded-lg bg-primary px-3 py-1.5 font-mono text-base font-semibold text-surface">
              {program.code}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                ready
                  ? 'bg-pastel-mint text-pastel-mint-ink'
                  : 'bg-tint text-muted'
              }`}
            >
              {ready ? m.program_status_full() : m.program_status_soon()}
            </span>
          </div>
          <h1 className="bg-linear-to-b from-ink to-primary bg-clip-text pb-1 text-4xl leading-tight font-semibold tracking-tight text-transparent sm:text-5xl motion-safe:animate-rise motion-safe:rise-delay-1">
            {program.name}
          </h1>
          <p className="mt-2 max-w-xl text-lg text-muted motion-safe:animate-rise motion-safe:rise-delay-1">
            {program.fullName}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 motion-safe:animate-rise motion-safe:rise-delay-2">
            <StatPill
              value={program.durationYears}
              label={m.program_stat_years({
                semesters: program.durationYears * 2,
              })}
              className="bg-pastel-gold text-pastel-gold-ink"
            />
            {ready ? (
              <StatPill
                value={ProgramHelper.subjectCount(program)}
                label={m.program_stat_subjects_unit()}
                className="bg-pastel-sky text-pastel-sky-ink"
              />
            ) : null}
            <StatPill
              value={program.degree}
              label={m.program_stat_degree_unit()}
              className="bg-pastel-lilac text-pastel-lilac-ink"
            />
          </div>
        </div>
        {image ? (
          <div className="hidden overflow-hidden rounded-3xl bg-surface shadow-card-lg ring-1 ring-line lg:col-span-5 lg:block motion-safe:animate-rise motion-safe:rise-delay-2">
            <img
              src={image}
              alt=""
              width={1600}
              height={900}
              className="aspect-video w-full object-cover"
            />
          </div>
        ) : null}
      </Container>
    </section>
  )
}
