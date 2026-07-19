import { ToneHelper } from '#/lib/helpers/tone-helper'
import type { LinkGroup } from '#/features/links/data/link-groups'

/** Card with a titled list of curated external links. */
export function LinkGroupCard({ group }: { group: LinkGroup }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="mb-3.5 flex items-center gap-2.5">
        <span
          className={`grid size-8.5 place-items-center rounded-lg text-lg ${ToneHelper.badge(group.tone)}`}
        >
          {group.icon}
        </span>
        <h3 className="font-serif text-lg font-semibold">{group.title()}</h3>
      </div>
      <div className="flex flex-col">
        {group.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2.5 border-b border-line-soft py-2.5 text-sm text-ink last:border-b-0 hover:text-link hover:no-underline"
          >
            <span>{link.label}</span>
            <span className="text-sm text-faint">↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}
