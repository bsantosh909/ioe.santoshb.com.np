import { Link } from '@tanstack/react-router'
import { ToneHelper } from '#/lib/helpers/tone-helper'
import type { QuickAction } from '#/features/home/data/quick-actions'

/** One tile in the home page quick-actions grid. */
export function QuickActionCard({ action }: { action: QuickAction }) {
  return (
    <Link
      to={action.to}
      className="flex flex-col gap-3 rounded-2xl border border-line bg-surface px-5 py-5 text-ink transition hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-lg hover:no-underline"
    >
      <span
        className={`grid size-10 place-items-center rounded-xl text-xl ${ToneHelper.badge(action.tone)}`}
      >
        {action.icon}
      </span>
      <span className="font-semibold">{action.title()}</span>
      <span className="text-sm leading-snug text-muted">
        {action.description()}
      </span>
    </Link>
  )
}
