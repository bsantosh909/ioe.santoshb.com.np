import { ArrowRightIcon, GitPullRequestIcon } from '@phosphor-icons/react'
import { BentoCard } from '#/features/home/components/bento/BentoCard'
import { m } from '#/paraglide/messages.js'

/** White wide tile closing the grid: invitation to contribute material. */
export function ContributeTile() {
  return (
    <BentoCard
      to="/contribute"
      className="flex-col border border-line bg-surface sm:col-span-2"
    >
      <GitPullRequestIcon weight="duotone" className="size-9 text-primary" />
      <div className="mt-auto pt-6">
        <div className="text-lg font-black">{m.home_contribute_title()}</div>
        <p className="mt-1 text-sm text-muted">{m.home_contribute_desc()}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-link">
          {m.label_contribute()}
          <ArrowRightIcon className="size-4 transition-transform duration-300 ease-snappy group-hover/bento:translate-x-1" />
        </span>
      </div>
    </BentoCard>
  )
}
