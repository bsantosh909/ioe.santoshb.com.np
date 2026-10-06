import { ArrowUpRightIcon, MapPinIcon } from '@phosphor-icons/react'
import { CollegeHelper } from '#/features/colleges/helpers/college-helper'
import { m } from '#/paraglide/messages.js'
import type { College } from '#/features/colleges/types'

interface CollegeMapCardProps {
  college: College
  /** Deduplicated, comma-separated address shown above the map. */
  address: string
}

/**
 * Location card with an embedded Google Map. The iframe lazy-loads as it
 * nears the viewport; Google's cookies are disclosed in the privacy policy.
 */
export function CollegeMapCard({ college, address }: CollegeMapCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-pastel-sky text-pastel-sky-ink">
            <MapPinIcon weight="duotone" className="size-5" />
          </span>
          <div className="leading-snug">
            <h2 className="font-semibold text-ink">{m.college_location()}</h2>
            <p className="text-sm text-muted">{address}</p>
          </div>
        </div>
        <a
          href={CollegeHelper.mapsLink(college)}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:no-underline"
        >
          {m.college_map_open()}
          <ArrowUpRightIcon className="size-4 transition-transform duration-300 ease-snappy group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
      <div className="relative aspect-4/3 border-t border-line bg-raised">
        <iframe
          src={CollegeHelper.mapsEmbedUrl(college)}
          title={m.college_map_title({ name: college.name })}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      </div>
    </div>
  )
}
