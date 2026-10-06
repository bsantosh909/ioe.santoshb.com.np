import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

interface TypingTextProps {
  text: string
  /** Milliseconds per typed character. */
  speed?: number
  /** Milliseconds to hold the full text before retyping. */
  hold?: number
  className?: string
}

/** Types `text` out with a blinking caret, then clears and repeats. */
export function TypingText({
  text,
  speed = 90,
  hold = 2200,
  className = '',
}: TypingTextProps) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(text.length)

  useEffect(() => {
    if (reduce) return
    const done = count >= text.length
    const timer = setTimeout(
      () => setCount(done ? 0 : count + 1),
      done ? hold : speed,
    )
    return () => clearTimeout(timer)
  }, [count, reduce, text.length, speed, hold])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, reduce ? text.length : count)}
        <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-current motion-safe:animate-caret" />
      </span>
    </span>
  )
}
