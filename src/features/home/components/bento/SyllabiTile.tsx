import { NumberTicker } from '#/components/fx/NumberTicker'
import { BentoCard } from '#/features/home/components/bento/BentoCard'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { m } from '#/paraglide/messages.js'

/** Program badges shown in the overlapping stack. */
const STACK_SIZE = 6

/** Lilac wide tile: syllabus count over a fanning stack of program codes. */
export function SyllabiTile() {
  const programs = ProgramHelper.all()
  const stack = programs.slice(0, STACK_SIZE)
  const rest = programs.length - stack.length

  return (
    <BentoCard to="/courses" className="flex-col bg-pastel-lilac sm:col-span-2">
      <div className="text-2xl font-semibold text-pastel-lilac-ink">
        <NumberTicker
          value={CourseHelper.all().length}
          className="font-black"
        />{' '}
        {m.bento_syllabi_title()}
      </div>
      <div className="mt-auto flex pt-6 pl-3">
        {stack.map((program) => (
          <span
            key={program.code}
            className="-ml-3 grid size-12 place-items-center rounded-full border-2 border-pastel-lilac bg-surface font-mono text-xs font-bold text-pastel-lilac-ink transition-all duration-300 ease-snappy group-hover/bento:ml-1"
          >
            {program.code}
          </span>
        ))}
        {rest > 0 ? (
          <span className="-ml-3 grid size-12 place-items-center rounded-full border-2 border-pastel-lilac bg-pastel-lilac-ink text-xs font-bold text-surface transition-all duration-300 ease-snappy group-hover/bento:ml-1">
            {m.bento_more_programs({ count: rest })}
          </span>
        ) : null}
      </div>
    </BentoCard>
  )
}
