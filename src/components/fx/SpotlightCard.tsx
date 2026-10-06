import { useRef } from 'react'

interface SpotlightCardProps {
  className?: string
  children: React.ReactNode
}

/**
 * Card whose fill and border light up around the cursor. Pointer position
 * is written straight to CSS variables, so moving never re-renders React.
 */
export function SpotlightCard({
  className = '',
  children,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--fx-x', `${event.clientX - rect.left}px`)
    node.style.setProperty('--fx-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`fx-spotlight-card relative ${className}`}
    >
      {children}
    </div>
  )
}
