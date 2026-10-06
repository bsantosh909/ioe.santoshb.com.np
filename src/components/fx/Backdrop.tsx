/**
 * Decorative engineering texture behind light headers:
 * `contours` (survey map), `blueprint` (graph paper), `circuit` (PCB traces),
 * `rings` (signal rings), `iso` (isometric lattice).
 */
export type BackdropPattern =
  'contours' | 'blueprint' | 'circuit' | 'rings' | 'iso'

const PATTERN_CLASS: Record<BackdropPattern, string> = {
  contours: 'fx-contours',
  blueprint: 'fx-blueprint',
  circuit: 'fx-circuit',
  rings: 'fx-rings',
  iso: 'fx-iso',
}

/** Absolutely positioned pattern layer; parent must be `relative`. */
export function Backdrop({ pattern }: { pattern: BackdropPattern }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${PATTERN_CLASS[pattern]}`}
    />
  )
}
