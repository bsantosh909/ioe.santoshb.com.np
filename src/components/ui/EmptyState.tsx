import type { Icon } from '@phosphor-icons/react'

interface EmptyStateProps {
  icon: Icon
  title: string
  description: string
  action?: React.ReactNode
}

/** Dashed placeholder card for sections without content yet. */
export function EmptyState({
  icon: IconGlyph,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-12 text-center">
      <div className="mx-auto mb-4 grid size-12 place-items-center rounded-xl bg-wash text-primary">
        <IconGlyph weight="duotone" className="size-6" />
      </div>
      <div className="mb-1.5 font-semibold">{title}</div>
      <p className="mx-auto mb-4 max-w-sm text-sm text-muted">{description}</p>
      {action}
    </div>
  )
}
