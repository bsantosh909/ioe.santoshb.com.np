import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { ToneHelper } from '#/lib/helpers/tone-helper'
import type { LinkGroup } from '#/features/links/data/link-groups'

/** Pastel card with a titled stack of curated external links. */
export function LinkGroupCard({ group }: { group: LinkGroup }) {
  const GroupIcon = group.icon
  const pastel = ToneHelper.pastel(group.tone)

  return (
    <div className={`rounded-3xl p-6 ${pastel.fill}`}>
      <div className="mb-5 flex items-center gap-3">
        <span
          className={`grid size-11 place-items-center rounded-2xl bg-surface shadow-card ${pastel.ink}`}
        >
          <GroupIcon weight="duotone" className="size-6" />
        </span>
        <h2 className={`text-xl font-black ${pastel.ink}`}>{group.title()}</h2>
      </div>
      <div className="flex flex-col gap-2">
        {group.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 rounded-2xl bg-surface/70 px-4 py-3 text-ink transition duration-300 ease-snappy hover:bg-surface hover:shadow-card hover:no-underline active:scale-99"
          >
            <span className="flex min-w-0 flex-col leading-snug">
              <span className="truncate text-sm font-semibold">
                {link.label}
              </span>
              <span className="truncate font-mono text-xs text-faint">
                {FormatHelper.hostname(link.href)}
              </span>
            </span>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface transition duration-500 ease-snappy group-hover:rotate-45 group-hover:bg-primary group-hover:text-surface">
              <ArrowUpRightIcon className="size-4" />
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
