import { ToneHelper } from '#/lib/helpers/tone-helper'
import type { Tone } from '#/lib/helpers/tone-helper'

interface TagProps {
  tone: Tone
  children: React.ReactNode
}

/** Small uppercase category chip, e.g. news tags and resource types. */
export function Tag({ tone, children }: TagProps) {
  return (
    <span
      className={`rounded-md px-2 py-1 text-xs font-bold tracking-wide uppercase ${ToneHelper.badge(tone)}`}
    >
      {children}
    </span>
  )
}
