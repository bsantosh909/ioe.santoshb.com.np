interface CodeChipProps {
  code: string
  /** Inverts colors for use on navy hero sections. */
  inverted?: boolean
}

/** Monospace subject-code chip, e.g. `CT702`. */
export function CodeChip({ code, inverted = false }: CodeChipProps) {
  const palette = inverted ? 'bg-surface text-primary' : 'bg-wash text-primary'
  return (
    <span
      className={`inline-block min-w-12 rounded-lg px-2 py-1 text-center font-mono text-sm font-semibold ${palette}`}
    >
      {code}
    </span>
  )
}
