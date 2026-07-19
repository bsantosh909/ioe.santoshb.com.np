interface EmptyStateProps {
  icon: string
  title: string
  description: string
  action?: React.ReactNode
}

/** Dashed placeholder card for sections without content yet. */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-12 text-center">
      <div className="mb-2 text-3xl">{icon}</div>
      <div className="mb-1.5 font-semibold">{title}</div>
      <p className="mx-auto mb-4 max-w-sm text-sm text-muted">{description}</p>
      {action}
    </div>
  )
}
