import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { XIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { m } from '#/paraglide/messages.js'

interface ImageLightboxProps {
  open: boolean
  onClose: () => void
  src: string
  /** Accessible name for the dialog and image. */
  alt: string
  caption?: string
}

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Modal image preview. Closes on the ✕ button, a backdrop click or Escape;
 * locks page scroll and returns focus to the trigger when closed.
 */
export function ImageLightbox({
  open,
  onClose,
  src,
  alt,
  caption,
}: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  // Latest onClose without re-running the open/close effect on every render
  // (which would re-capture the focus target as the close button).
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const trigger = document.activeElement as HTMLElement | null
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      trigger?.focus()
    }
  }, [open])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-primary-deep/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.figure
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="relative flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl border border-line bg-surface p-8 shadow-pop"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={m.common_close()}
              className="absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-wash hover:text-ink"
            >
              <XIcon className="size-5" />
            </button>
            <img
              src={src}
              alt={alt}
              width={256}
              height={256}
              className="size-64 object-contain"
            />
            {caption ? (
              <figcaption className="text-center font-semibold text-ink">
                {caption}
              </figcaption>
            ) : null}
          </motion.figure>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
