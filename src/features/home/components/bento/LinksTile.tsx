import { BentoCard } from '#/features/home/components/bento/BentoCard'
import { m } from '#/paraglide/messages.js'

/** Pill tilts; they straighten when the tile is hovered. */
const TILTS = ['-rotate-3', 'rotate-3', 'rotate-0']

/** Rose tile: tilted pills for the official exam links. */
export function LinksTile() {
  const pills = [
    m.qa_routine_title(),
    m.qa_results_title(),
    m.bento_links_notices(),
  ]

  return (
    <BentoCard
      to="/links"
      label={m.bento_links_title()}
      className="flex-col justify-center gap-2 bg-pastel-rose"
    >
      {pills.map((pill, index) => (
        <span
          key={pill}
          className={`w-full rounded-full bg-pastel-rose-ink py-2 text-center text-sm font-semibold text-surface transition-transform duration-500 ease-snappy group-hover/bento:rotate-0 ${TILTS[index]}`}
        >
          {pill}
        </span>
      ))}
    </BentoCard>
  )
}
