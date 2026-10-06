import { Link } from '@tanstack/react-router'
import { ArrowUpRightIcon, MapPinIcon } from '@phosphor-icons/react'
import { SpotlightCard } from '#/components/fx/SpotlightCard'
import { CollegeLogo } from '#/features/colleges/components/CollegeLogo'
import { CollegeTypeBadge } from '#/features/colleges/components/CollegeTypeBadge'
import { m } from '#/paraglide/messages.js'
import type { College } from '#/features/colleges/types'

/** Program chips shown before collapsing the rest into `+X`. */
const VISIBLE_PROGRAMS = 5

interface CollegeCardProps {
  college: College
  /** Program being filtered on; its chip leads and is highlighted. */
  highlight?: string
}

/** Spotlight card for one college; the whole card links to its page. */
export function CollegeCard({ college, highlight }: CollegeCardProps) {
  const codes = college.programs.map((program) => program.code)
  const ordered = highlight
    ? [
        ...codes.filter((code) => code === highlight),
        ...codes.filter((code) => code !== highlight),
      ]
    : codes
  const shown = ordered.slice(0, VISIBLE_PROGRAMS)
  const hidden = ordered.slice(VISIBLE_PROGRAMS)

  return (
    <SpotlightCard className="group rounded-3xl border border-line bg-surface transition duration-300 ease-snappy hover:-translate-y-1 hover:border-line-strong hover:shadow-card-lg">
      <Link
        to="/colleges/$slug"
        params={{ slug: college.slug }}
        className="relative flex h-full flex-col gap-4 p-6 text-ink hover:no-underline"
      >
        <div className="flex items-start justify-between gap-3">
          <CollegeLogo college={college} />
          <CollegeTypeBadge type={college.type} />
        </div>
        <div>
          <div className="text-lg leading-snug font-semibold">
            {college.name}
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
            <MapPinIcon className="size-4 shrink-0 text-faint" />
            {college.location.city}
          </div>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {shown.map((code) => (
              <span
                key={code}
                className={`rounded-md px-2 py-0.5 font-mono text-xs font-semibold ${
                  code === highlight
                    ? 'bg-primary text-surface'
                    : 'bg-wash text-primary'
                }`}
              >
                {code}
              </span>
            ))}
            {hidden.length > 0 ? (
              <span
                title={hidden.join(', ')}
                className="rounded-md bg-surface px-2 py-0.5 text-xs font-semibold text-muted ring-1 ring-line"
              >
                {m.courses_more_programs({ count: hidden.length })}
              </span>
            ) : null}
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface transition duration-500 ease-snappy group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-surface">
            <ArrowUpRightIcon className="size-4" />
          </span>
        </div>
      </Link>
    </SpotlightCard>
  )
}
