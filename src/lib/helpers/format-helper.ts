import { m } from '#/paraglide/messages.js'
import type { CourseOffering } from '#/features/courses/helpers/course-helper'

/** Small formatting utilities shared across the UI. */
export class FormatHelper {
  /** Roman numeral for an IOE semester part: 1 → I, 2 → II. */
  static partRoman(part: 1 | 2): string {
    return part === 1 ? 'I' : 'II'
  }

  /** `Year 2` style label. */
  static yearLabel(year: number): string {
    return m.format_year({ year })
  }

  /** `Semester I` style label. */
  static semesterLabel(part: 1 | 2): string {
    return m.format_semester({ part: FormatHelper.partRoman(part) })
  }

  /** `BCT · Year 2 · Semester I` style placement label. */
  static placementLabel(
    programCode: string,
    year: number,
    part: 1 | 2,
  ): string {
    return `${programCode} · ${FormatHelper.yearLabel(year)} · ${FormatHelper.semesterLabel(part)}`
  }

  /** `6 subjects` label with singular/plural handling. */
  static subjectCount(count: number): string {
    return count === 1
      ? m.count_subject_one({ count })
      : m.count_subject_other({ count })
  }

  /** Placement label for an offering, elective-aware. */
  static offeringLabel(offering: CourseOffering): string {
    return offering.elective
      ? `${offering.programCode} · ${m.table_elective()}`
      : FormatHelper.placementLabel(
          offering.programCode,
          offering.year,
          offering.part,
        )
  }

  /** `37 courses` label with singular/plural handling. */
  static courseCount(count: number): string {
    return count === 1
      ? m.count_course_one({ count })
      : m.count_course_other({ count })
  }

  /** `2071–2081 BS` style exam-year span; single year when both ends match. */
  static examYears(years?: { from: number; to: number }): string | undefined {
    if (!years) return undefined
    return years.from === years.to
      ? m.oldq_year_single({ year: years.from })
      : m.oldq_years({ from: years.from, to: years.to })
  }

  /** `3 question collections available` with singular/plural handling. */
  static oldQuestionCount(count: number): string {
    return count === 1
      ? m.course_oldq_available_one({ count })
      : m.course_oldq_available_other({ count })
  }

  /** `12 colleges` label with singular/plural handling. */
  static collegeCount(count: number): string {
    return count === 1
      ? m.colleges_count_one({ count })
      : m.colleges_count_other({ count })
  }

  /** Hostname of a URL without `www.`, e.g. `kec.edu.np`. */
  static hostname(href: string): string {
    try {
      return new URL(href).hostname.replace(/^www\./, '')
    } catch {
      return href
    }
  }
}
