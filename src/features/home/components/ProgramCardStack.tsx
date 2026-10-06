import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { m } from '#/paraglide/messages.js'

/** Milliseconds each program stays at the front. */
const INTERVAL = 3500
/** Cards visible in the stack (front plus peeking ones behind). */
const VISIBLE = 3

/**
 * Aceternity-style card stack of the illustrated programs: the front card
 * cycles to the back every few seconds; hover pauses, dots jump.
 */
export function ProgramCardStack() {
  const programs = ProgramHelper.all().filter((program) =>
    ProgramHelper.image(program),
  )
  const [front, setFront] = useState(0)
  const paused = useRef(false)
  const reduce = useReducedMotion()
  const count = programs.length

  useEffect(() => {
    if (reduce || count < 2) return
    const timer = setInterval(() => {
      if (!paused.current) setFront((current) => (current + 1) % count)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [reduce, count])

  if (count === 0) return null

  return (
    <div
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={m.home_stack_label()}
        className="relative pt-10"
      >
        {/* Invisible card-shaped spacer that gives the stack its height. */}
        <div aria-hidden="true" className="invisible">
          <div className="aspect-video" />
          <div className="h-18" />
        </div>
        {programs.map((program, index) => {
          const position = (index - front + count) % count
          const visible = position < VISIBLE
          const isFront = position === 0
          return (
            <motion.div
              key={program.code}
              aria-hidden={!isFront}
              className={`absolute inset-x-0 bottom-0 origin-top ${isFront ? '' : 'pointer-events-none'}`}
              initial={false}
              animate={{
                y: -position * 20,
                scale: 1 - position * 0.06,
                opacity: visible ? 1 - position * 0.12 : 0,
                zIndex: count - position,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            >
              <Link
                to="/programs/$code"
                params={{ code: program.code }}
                tabIndex={isFront ? 0 : -1}
                className="group block overflow-hidden rounded-3xl border border-line bg-surface text-ink shadow-pop hover:no-underline"
              >
                <img
                  src={ProgramHelper.image(program)}
                  alt=""
                  width={1600}
                  height={900}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="aspect-video w-full object-cover transition-transform duration-700 ease-snappy group-hover:scale-105"
                />
                <div className="flex items-center gap-3 border-t border-line px-5 py-4">
                  <span className="rounded-lg bg-primary px-2.5 py-1.5 font-mono text-sm font-semibold text-surface">
                    {program.code}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col leading-snug">
                    <span className="truncate font-semibold">
                      {program.name}
                    </span>
                    <span className="text-xs text-faint">
                      {FormatHelper.subjectCount(
                        ProgramHelper.subjectCount(program),
                      )}
                    </span>
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition duration-500 ease-snappy group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-surface">
                    <ArrowUpRightIcon className="size-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
      <div className="mt-5 flex justify-center gap-1.5">
        {programs.map((program, index) => (
          <button
            key={program.code}
            type="button"
            aria-label={m.home_stack_show({ name: program.name })}
            aria-current={index === front}
            onClick={() => setFront(index)}
            className="relative h-1.5 w-1.5 cursor-pointer rounded-full bg-line-strong transition-all duration-300 ease-snappy hover:bg-faint"
          >
            {index === front ? (
              <motion.span
                layoutId="program-stack-dot"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className="absolute -inset-x-1.5 inset-y-0 rounded-full bg-primary"
              />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  )
}
