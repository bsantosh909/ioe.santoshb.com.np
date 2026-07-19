/** A single pulsing placeholder bar; size and shape come from the caller. */
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-wash ${className}`}
      aria-hidden="true"
    />
  )
}
