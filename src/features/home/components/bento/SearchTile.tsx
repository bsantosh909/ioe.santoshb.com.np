import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { TypingText } from '#/components/fx/TypingText'
import { BentoCard } from '#/features/home/components/bento/BentoCard'
import { HomeHelper } from '#/features/home/helpers/home-helper'
import { m } from '#/paraglide/messages.js'

/** Peach tile: a subject code resolving to its title, typed out live. */
export function SearchTile() {
  const example = HomeHelper.searchExample()

  return (
    <BentoCard to="/courses" className="flex-col bg-pastel-teal">
      <MagnifyingGlassIcon
        weight="duotone"
        className="size-10 text-pastel-teal-ink transition-transform duration-500 ease-snappy group-hover/bento:-rotate-12"
      />
      <strong className="mt-1 text-sm text-pastel-teal-ink">
        {m.bento_search_title()}
      </strong>
      {example ? (
        <div className="mt-auto pt-6">
          <div className="font-mono text-sm font-medium text-pastel-teal-ink">
            {example.code}
          </div>
          <TypingText
            text={example.title}
            className="font-semibold leading-snug"
          />
        </div>
      ) : null}
    </BentoCard>
  )
}
