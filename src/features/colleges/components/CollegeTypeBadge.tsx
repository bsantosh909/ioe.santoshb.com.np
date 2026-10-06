import { m } from '#/paraglide/messages.js'
import type { CollegeType } from '#/features/colleges/types'

/** Navy pill for constituent campuses, slate pill for affiliated colleges. */
export function CollegeTypeBadge({ type }: { type: CollegeType }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        type === 'constituent'
          ? 'bg-primary text-surface'
          : 'bg-pastel-slate text-ink'
      }`}
    >
      {type === 'constituent'
        ? m.colleges_type_constituent()
        : m.colleges_type_affiliated()}
    </span>
  )
}
