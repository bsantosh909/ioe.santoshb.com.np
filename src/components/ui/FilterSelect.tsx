import { useEffect, useId, useRef, useState } from 'react'
import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'

export interface FilterOption {
  value: string
  label: string
  /** Secondary text shown beside the label in the menu, e.g. a full name. */
  hint?: string
}

interface FilterSelectProps {
  label: string
  value: string
  options: Array<FilterOption>
  onChange: (value: string) => void
  /** Which edge the menu lines up with; use `right` near the right edge. */
  align?: 'left' | 'right'
}

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Compact filter dropdown: a pill button showing `Label: Value` that opens
 * an animated listbox. Arrow keys move, Enter picks, Escape closes.
 */
export function FilterSelect({
  label,
  value,
  options,
  onChange,
  align = 'left',
}: FilterSelectProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const id = useId()
  const selected = options.find((option) => option.value === value)

  // Close on outside click.
  useEffect(() => {
    if (!open) return
    const onDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  // Start on the selected option and move focus into the list.
  useEffect(() => {
    if (!open) return
    setActive(
      Math.max(
        0,
        options.findIndex((option) => option.value === value),
      ),
    )
    listRef.current?.focus()
  }, [open, options, value])

  const pick = (option: FilterOption | undefined) => {
    if (!option) return
    onChange(option.value)
    setOpen(false)
  }

  const onListKey = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => Math.min(index + 1, options.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      pick(options[active])
    } else if (event.key === 'Escape' || event.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
        className={`flex h-10 cursor-pointer items-center gap-2 rounded-xl border bg-surface px-3.5 text-sm transition duration-200 ease-snappy active:scale-98 ${
          open
            ? 'border-primary/40 ring-4 ring-primary/5'
            : 'border-line hover:border-line-strong'
        }`}
      >
        <span className="text-faint">{label}</span>
        <span className="font-semibold text-ink">{selected?.label}</span>
        <CaretDownIcon
          className={`size-3.5 text-faint transition-transform duration-300 ease-snappy ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.ul
            ref={listRef}
            id={id}
            role="listbox"
            tabIndex={-1}
            aria-label={label}
            aria-activedescendant={`${id}-${active}`}
            onKeyDown={onListKey}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE }}
            className={`absolute top-12 z-30 max-h-80 w-72 overflow-y-auto ${align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'} rounded-2xl border border-line bg-surface p-1.5 shadow-pop outline-none`}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${id}-${index}`}
                role="option"
                aria-selected={option.value === value}
                onMouseMove={() => setActive(index)}
                onClick={() => pick(option)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                  index === active ? 'bg-wash' : ''
                }`}
              >
                <span className="font-semibold text-ink">{option.label}</span>
                {option.hint ? (
                  <span className="min-w-0 flex-1 truncate text-xs text-faint">
                    {option.hint}
                  </span>
                ) : (
                  <span className="flex-1" />
                )}
                {option.value === value ? (
                  <CheckIcon weight="bold" className="size-4 text-primary" />
                ) : null}
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
