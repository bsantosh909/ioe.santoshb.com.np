import { motion, useReducedMotion } from 'motion/react'
import { m } from '#/paraglide/messages.js'

const EASE = [0.16, 1, 0.3, 1] as const

/** Three connected steps that ease in left to right as they scroll in. */
export function ContributeSteps() {
  const reduce = useReducedMotion()
  const steps = [
    {
      title: m.contribute_step_prepare_title(),
      description: m.contribute_step_prepare_desc(),
    },
    {
      title: m.contribute_step_send_title(),
      description: m.contribute_step_send_desc(),
    },
    {
      title: m.contribute_step_publish_title(),
      description: m.contribute_step_publish_desc(),
    },
  ]

  return (
    <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
      <span
        aria-hidden="true"
        className="absolute top-5 right-1/6 left-1/6 hidden h-px bg-line-strong md:block"
      />
      {steps.map((step, index) => (
        <motion.li
          key={step.title}
          className="relative flex flex-col items-start md:items-center md:text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: index * 0.12, ease: EASE }}
        >
          <span className="mb-4 grid size-10 place-items-center rounded-full bg-primary font-mono text-sm font-bold text-surface ring-4 ring-canvas">
            {index + 1}
          </span>
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted">
            {step.description}
          </p>
        </motion.li>
      ))}
    </ol>
  )
}
