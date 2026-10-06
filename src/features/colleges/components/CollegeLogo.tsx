import { useState } from 'react'
import { ImageLightbox } from '#/components/ui/ImageLightbox'
import { CollegeHelper } from '#/features/colleges/helpers/college-helper'
import { m } from '#/paraglide/messages.js'
import type { College } from '#/features/colleges/types'

export type CollegeLogoSize = 'sm' | 'md' | 'lg'

const SIZE_CLASS: Record<CollegeLogoSize, string> = {
  sm: 'size-8 rounded-lg text-xs',
  md: 'size-14 rounded-2xl text-sm',
  lg: 'size-20 rounded-3xl text-lg',
}

interface CollegeLogoProps {
  college: College
  size?: CollegeLogoSize
  /** Click to open a large preview (only where the logo isn't inside a link). */
  previewable?: boolean
}

/** College logo on a white tile, or an initials monogram when none exists. */
export function CollegeLogo({
  college,
  size = 'md',
  previewable = false,
}: CollegeLogoProps) {
  const logo = CollegeHelper.logo(college)
  const [open, setOpen] = useState(false)

  const tile = (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden bg-surface ring-1 ring-line ${SIZE_CLASS[size]} ${logo ? 'p-1' : ''}`}
    >
      {logo ? (
        <img
          src={logo}
          alt=""
          width={256}
          height={256}
          loading={size === 'lg' ? 'eager' : 'lazy'}
          className="size-full object-contain"
        />
      ) : (
        <span aria-hidden="true" className="font-mono font-bold text-primary">
          {CollegeHelper.initials(college)}
        </span>
      )}
    </span>
  )

  if (!previewable || !logo) return tile

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={m.college_logo_preview({ name: college.name })}
        className="cursor-zoom-in rounded-3xl transition-transform duration-300 ease-snappy hover:scale-105 active:scale-98"
      >
        {tile}
      </button>
      <ImageLightbox
        open={open}
        onClose={() => setOpen(false)}
        src={logo}
        alt={m.college_logo_alt({ name: college.name })}
        caption={college.name}
      />
    </>
  )
}
