import { COLLEGES } from '#/features/colleges/data/colleges'
import type { College, CollegeType } from '#/features/colleges/types'

/**
 * Official logos, normalised to 256px WebP, keyed by path (`<slug>.webp`).
 * Constituent campuses have no logos of their own and share `tu-emblem.webp`
 * (the Tribhuvan University emblem their sites display).
 */
const COLLEGE_LOGOS = import.meta.glob<string>(
  '../../../assets/colleges/*.webp',
  { eager: true, import: 'default' },
)

/** Words skipped when deriving a college's initials. */
const MINOR_WORDS = new Set(['of', 'and', 'the'])

/** Read-side queries over the college directory. */
export class CollegeHelper {
  /** All colleges: constituent campuses first, then alphabetical. */
  static all(): Array<College> {
    return [...COLLEGES].sort(
      (a, b) =>
        CollegeHelper.typeRank(a.type) - CollegeHelper.typeRank(b.type) ||
        a.name.localeCompare(b.name),
    )
  }

  static bySlug(slug: string): College | undefined {
    return COLLEGES.find((college) => college.slug === slug)
  }

  /** Colleges offering a program, constituent campuses first. */
  static forProgram(code: string): Array<College> {
    return CollegeHelper.all().filter((college) =>
      college.programs.some((program) => program.code === code),
    )
  }

  /** Official logo URL, if one was collected. */
  static logo(college: College): string | undefined {
    const file = college.type === 'constituent' ? 'tu-emblem' : college.slug
    return COLLEGE_LOGOS[`../../../assets/colleges/${file}.webp`]
  }

  /** Short label for a logo placeholder: an acronym short name, else initials. */
  static initials(college: College): string {
    if (college.shortName && college.shortName.length <= 5) {
      return college.shortName
    }
    return college.name
      .split(/\s+/)
      .filter((word) => !MINOR_WORDS.has(word.toLowerCase()))
      .map((word) => word[0])
      .join('')
      .slice(0, 4)
      .toUpperCase()
  }

  /** `Tathali, Bhaktapur, Bagmati`: city, district, province without repeats. */
  static address(college: College): string {
    const { city, district, province } = college.location
    return [city, district, province]
      .flatMap((part) => part.split(',').map((piece) => piece.trim()))
      .filter((part, index, parts) => part && parts.indexOf(part) === index)
      .join(', ')
  }

  /** What Google Maps should look up: coordinates, else name and city. */
  static mapsTarget(college: College): string {
    const { coordinates, mapsQuery, city } = college.location
    return coordinates
      ? `${coordinates.lat},${coordinates.lng}`
      : (mapsQuery ?? `${college.name}, ${city}`)
  }

  /** Keyless Google Maps embed URL; the pin is labelled with the name. */
  static mapsEmbedUrl(college: College): string {
    const target = college.location.coordinates
      ? `${CollegeHelper.mapsTarget(college)} (${college.name})`
      : CollegeHelper.mapsTarget(college)
    const query = encodeURIComponent(target)
    return `https://maps.google.com/maps?q=${query}&z=16&output=embed`
  }

  /** Google Maps link that opens the location (or directions) in the app. */
  static mapsLink(college: College): string {
    const query = encodeURIComponent(CollegeHelper.mapsTarget(college))
    return `https://www.google.com/maps/search/?api=1&query=${query}`
  }

  /** Seats a college lists for a program, if known. */
  static seats(college: College, code: string): number | undefined {
    return college.programs.find((program) => program.code === code)?.seats
  }

  /** Distinct provinces, alphabetical. */
  static provinces(): Array<string> {
    return [...new Set(COLLEGES.map((college) => college.location.province))]
      .filter(Boolean)
      .sort()
  }

  /** Case-insensitive match on name, short name or location. */
  static search(query: string, colleges: Array<College>): Array<College> {
    const needle = query.trim().toLowerCase()
    if (!needle) return colleges
    return colleges.filter((college) =>
      [
        college.name,
        college.shortName ?? '',
        college.formerName ?? '',
        college.location.city,
        college.location.district,
      ].some((field) => field.toLowerCase().includes(needle)),
    )
  }

  private static typeRank(type: CollegeType): number {
    return type === 'constituent' ? 0 : 1
  }
}
