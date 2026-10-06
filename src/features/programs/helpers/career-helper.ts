import type { CareerKind } from '#/features/programs/types'

/** Career illustrations cut from the generated icon sheet, keyed by path. */
const CAREER_IMAGES = import.meta.glob<string>(
  '../../../assets/careers/*.webp',
  {
    eager: true,
    import: 'default',
  },
)

/** Lookups for career-category illustrations. */
export class CareerHelper {
  /** Image URL for a career category, if its illustration exists. */
  static image(kind: CareerKind): string | undefined {
    return CAREER_IMAGES[`../../../assets/careers/${kind}.webp`]
  }
}
