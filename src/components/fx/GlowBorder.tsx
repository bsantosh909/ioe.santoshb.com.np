interface GlowBorderProps {
  className?: string
  children: React.ReactNode
}

/**
 * One-pixel animated conic border with a soft blurred halo behind it. The
 * child must paint its own solid background so only the edge shows through.
 */
export function GlowBorder({ className = '', children }: GlowBorderProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="fx-glow-border absolute inset-0 rounded-xl opacity-50 blur-lg motion-safe:animate-glow-spin"
      />
      <div className="fx-glow-border relative rounded-xl p-px motion-safe:animate-glow-spin">
        {children}
      </div>
    </div>
  )
}
