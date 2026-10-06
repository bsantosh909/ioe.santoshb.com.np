import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

interface FlipWordsProps {
  words: Array<string>
  /** Milliseconds each word stays on screen. */
  interval?: number
  className?: string
}

/** Cycles through words with a blur-and-lift letter transition. */
export function FlipWords({
  words,
  interval = 2600,
  className = '',
}: FlipWordsProps) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      interval,
    )
    return () => clearInterval(timer)
  }, [reduce, interval, words.length])

  const word = words[index]

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={word}
        className={`inline-block ${className}`}
        exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {word.split('').map((letter, position) => (
          <motion.span
            key={`${word}-${position}`}
            className="inline-block whitespace-pre"
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              delay: position * 0.035,
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  )
}
