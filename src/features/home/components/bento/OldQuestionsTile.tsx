import { FilePdfIcon } from '@phosphor-icons/react'
import { BentoCard } from '#/features/home/components/bento/BentoCard'
import { HomeHelper } from '#/features/home/helpers/home-helper'
import { m } from '#/paraglide/messages.js'

/** Offset and tilt per card, back to front; the stack straightens on hover. */
const FAN = ['top-0 -rotate-6', 'top-12 rotate-3', 'top-24 -rotate-2']

/** Mint wide tile: fanned stack of real paper year-ranges beside the count. */
export function OldQuestionsTile() {
  const totals = HomeHelper.oldQuestionTotals()
  const papers = HomeHelper.samplePaperYears(FAN.length)

  return (
    <BentoCard
      to="/courses"
      className="flex-col items-start gap-6 bg-pastel-mint sm:col-span-2 md:flex-row-reverse md:items-center"
    >
      <div className="md:flex-1">
        <div className="text-2xl font-black text-pastel-mint-ink">
          {m.bento_oldq_title()}
        </div>
        <p className="mt-1 text-sm text-pastel-mint-ink">
          {m.bento_oldq_desc(totals)}
        </p>
      </div>
      <div className="relative h-36 w-44 shrink-0">
        {papers.map((years, index) => (
          <div
            key={years}
            className={`absolute inset-x-0 flex items-center gap-2 rounded-xl bg-surface px-3 py-3 shadow-card transition duration-500 ease-snappy group-hover/bento:rotate-0 ${FAN[index]}`}
          >
            <FilePdfIcon
              weight="duotone"
              className="size-6 shrink-0 text-danger"
            />
            <span className="text-sm font-semibold whitespace-nowrap">
              {years}
            </span>
          </div>
        ))}
      </div>
    </BentoCard>
  )
}
