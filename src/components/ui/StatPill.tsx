import { NumberTicker } from '#/components/fx/NumberTicker'

interface StatPillProps {
  /** Numbers count up into view; strings render as-is. */
  value: number | string
  label: string
  /** Pastel fill and ink, e.g. `bg-pastel-gold text-pastel-gold-ink`. */
  className: string
}

/** Pastel figure + label chip used in page headers. */
export function StatPill({ value, label, className }: StatPillProps) {
  return (
    <div
      className={`flex items-baseline gap-2 rounded-2xl px-4 py-2.5 ${className}`}
    >
      {typeof value === 'number' ? (
        <NumberTicker value={value} className="text-2xl font-black" />
      ) : (
        <span className="text-2xl font-black">{value}</span>
      )}
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}
