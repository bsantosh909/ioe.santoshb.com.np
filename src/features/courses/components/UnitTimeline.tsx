import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Vertical timeline of syllabus units (after Aceternity's Timeline): a rail
 * with numbered nodes, each unit easing in as it scrolls into view.
 */
export function UnitTimeline({ units }: { units: Array<string> }) {
  const reduce = useReducedMotion()

  return (
    <ol className="relative ml-4 border-l-2 border-line">
      {units.map((unit, index) => (
        <motion.li
          key={unit}
          className="relative pb-5 pl-8 last:pb-0"
          initial={reduce ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: index * 0.04, ease: EASE }}
        >
          <span className="absolute top-0 -left-4 grid size-8 place-items-center rounded-full border-2 border-surface bg-wash font-mono text-xs font-bold text-primary ring-1 ring-line">
            {index + 1}
          </span>
          <span className="block pt-1 font-medium text-ink">{unit}</span>
        </motion.li>
      ))}
    </ol>
  )
}
