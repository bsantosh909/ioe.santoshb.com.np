import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

interface NumberTickerProps {
  value: number
  className?: string
}

/** Counts up from zero to `value` the first time it scrolls into view. */
export function NumberTicker({ value, className = '' }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView || reduce) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toString()
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  // Server and no-JS render the final figure; the effect animates up to it.
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  )
}
