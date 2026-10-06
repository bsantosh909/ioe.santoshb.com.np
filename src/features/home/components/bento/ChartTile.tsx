import { GrowBars } from '#/components/fx/GrowBars'
import { BentoCard } from '#/features/home/components/bento/BentoCard'
import { HomeHelper } from '#/features/home/helpers/home-helper'
import { m } from '#/paraglide/messages.js'

/** Sky tile: subjects per semester of one program, rising into view. */
export function ChartTile() {
  const code = HomeHelper.chartProgram()

  return (
    <BentoCard
      to="/programs/$code/subjects"
      params={{ code }}
      className="flex-col bg-pastel-sky"
    >
      <GrowBars
        bars={HomeHelper.semesterBars()}
        barClassName="bg-pastel-sky-ink/70 group-hover/bento:bg-pastel-sky-ink"
        labelClassName="text-pastel-sky-ink"
      />
      <div className="mt-3 text-center font-bold text-pastel-sky-ink">
        {m.bento_chart_title({ code })}
      </div>
    </BentoCard>
  )
}
