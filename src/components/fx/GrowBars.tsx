import { motion, useReducedMotion } from 'motion/react'

export interface GrowBar {
  label: string
  /** Bar height as a share of the tallest bar, 0 to 1. */
  ratio: number
}

interface GrowBarsProps {
  bars: Array<GrowBar>
  barClassName?: string
  labelClassName?: string
}

/** Mini bar chart whose bars rise from the baseline when scrolled into view. */
export function GrowBars({
  bars,
  barClassName = '',
  labelClassName = '',
}: GrowBarsProps) {
  const reduce = useReducedMotion()

  return (
    <div className="flex h-28 items-end gap-1.5">
      {bars.map((bar, index) => (
        <div
          key={bar.label}
          className="flex h-full flex-1 flex-col items-center justify-end gap-1"
        >
          <motion.div
            className={`w-full origin-bottom rounded-lg ${barClassName}`}
            style={{ height: `${Math.max(bar.ratio, 0.08) * 100}%` }}
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 18,
              delay: index * 0.06,
            }}
          />
          <span className={`text-xs ${labelClassName}`}>{bar.label}</span>
        </div>
      ))}
    </div>
  )
}
