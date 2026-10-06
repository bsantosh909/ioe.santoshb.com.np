import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from '@tanstack/react-router'
import {
  ArrowElbowDownLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { CommandHelper } from '#/features/search/helpers/command-helper'
import { m } from '#/paraglide/messages.js'
import type { CommandItem } from '#/features/search/helpers/command-helper'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Command palette (cmdk-style): search over programs and courses with
 * keyboard navigation. Opens on ⌘K (Apple) / Ctrl+K (others) or `/`.
 */
export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const items = useMemo(() => CommandHelper.items(query), [query])

  useEffect(() => setMounted(true), [])

  // Global shortcuts: ⌘K (Apple) / Ctrl+K (others) toggles, `/` opens outside text fields.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing =
        target?.isContentEditable ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA'
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpenChange(!open)
      } else if (event.key === '/' && !typing && !open) {
        event.preventDefault()
        onOpenChange(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  // Reset on open and lock page scroll while the dialog is up.
  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  // Keep the highlighted row scrolled into view.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const select = (item: CommandItem | undefined) => {
    if (!item) return
    onOpenChange(false)
    void router.navigate({ to: item.to, params: item.params } as never)
  }

  const onInputKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => Math.min(index + 1, items.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      select(items[active])
    } else if (event.key === 'Escape') {
      onOpenChange(false)
    }
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-primary-deep/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={m.cmd_label()}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-pop"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <MagnifyingGlassIcon className="size-5 shrink-0 text-faint" />
              <input
                autoFocus
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={
                  items[active] ? `${listId}-${active}` : undefined
                }
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKey}
                placeholder={m.cmd_placeholder()}
                className="h-14 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-faint"
              />
              <kbd className="rounded-md border border-line bg-raised px-1.5 py-0.5 font-mono text-xs text-faint">
                esc
              </kbd>
            </div>
            <div
              ref={listRef}
              id={listId}
              role="listbox"
              className="max-h-96 overflow-y-auto p-2"
            >
              {items.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-muted">
                  {m.cmd_empty({ query })}
                </p>
              ) : (
                items.map((item, index) => (
                  <div key={item.id}>
                    {index === 0 || items[index - 1].group !== item.group ? (
                      <div className="px-3 pt-3 pb-1.5 text-xs font-semibold text-faint">
                        {CommandHelper.groupLabel(item.group)}
                      </div>
                    ) : null}
                    <div
                      id={`${listId}-${index}`}
                      role="option"
                      aria-selected={index === active}
                      data-index={index}
                      onMouseMove={() => setActive(index)}
                      onClick={() => select(item)}
                      className={`relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${
                        index === active ? 'text-ink' : 'text-body'
                      }`}
                    >
                      {index === active ? (
                        <motion.span
                          layoutId={`${listId}-active`}
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 40,
                          }}
                          className="absolute inset-0 rounded-xl bg-wash"
                        />
                      ) : null}
                      {item.badge ? (
                        <span className="relative min-w-18 shrink-0 rounded-md bg-surface px-2 py-1 text-center font-mono text-xs font-semibold text-primary ring-1 ring-line">
                          {item.badge}
                        </span>
                      ) : (
                        <ArrowRightIcon className="relative size-4 text-faint" />
                      )}
                      <span className="relative flex min-w-0 flex-1 flex-col leading-snug">
                        <span className="truncate text-sm font-medium">
                          {item.title}
                        </span>
                        {item.subtitle ? (
                          <span className="truncate text-xs text-faint">
                            {item.subtitle}
                          </span>
                        ) : null}
                      </span>
                      {index === active ? (
                        <ArrowElbowDownLeftIcon className="relative size-4 text-faint" />
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center gap-4 border-t border-line bg-raised px-4 py-2.5 text-xs text-faint">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-line bg-surface px-1 font-mono">
                  ↑↓
                </kbd>
                {m.cmd_hint_navigate()}
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-line bg-surface px-1 font-mono">
                  ↵
                </kbd>
                {m.cmd_hint_open()}
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-line bg-surface px-1 font-mono">
                  esc
                </kbd>
                {m.cmd_hint_close()}
              </span>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
