import { NumberTicker } from '#/components/fx/NumberTicker'
import { BentoCard } from '#/features/home/components/bento/BentoCard'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { m } from '#/paraglide/messages.js'

/** Gold tile: program count rolling up in the corner. */
export function ProgramsTile() {
  return (
    <BentoCard to="/programs" className="flex-col bg-pastel-gold">
      <div className="font-bold text-pastel-gold-ink">{m.label_programs()}</div>
      <div className="mt-auto flex items-end justify-end gap-2">
        <NumberTicker
          value={ProgramHelper.all().length}
          className="text-7xl leading-none font-black tracking-tight text-ink/70"
        />
      </div>
      <div className="mt-1 text-right text-sm font-medium text-pastel-gold-ink">
        {m.bento_programs_caption()}
      </div>
    </BentoCard>
  )
}
