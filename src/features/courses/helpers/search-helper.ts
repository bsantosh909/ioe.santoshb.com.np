import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { m } from '#/paraglide/messages.js'
import type { CourseMeta } from '#/features/courses/types'

/** A course search hit with a human-readable placement line. */
export interface CourseSearchResult {
  course: CourseMeta
  placement: string
}

/** Client-side search over the course catalogue. */
export class SearchHelper {
  /** Case-insensitive match on course code, title or slug. */
  static courses(query: string, limit = Infinity): Array<CourseMeta> {
    const needle = query.trim().toLowerCase()
    if (!needle) return []
    return CourseHelper.all()
      .filter(
        (course) =>
          course.title.toLowerCase().includes(needle) ||
          course.slug.includes(needle) ||
          (course.code ?? '').toLowerCase().includes(needle),
      )
      .slice(0, limit)
  }

  /** Search hits decorated with their first program placement. */
  static coursesWithPlacement(
    query: string,
    limit = 6,
  ): Array<CourseSearchResult> {
    return SearchHelper.courses(query, limit).map((course) => {
      const offerings = CourseHelper.offerings(course.slug)
      const first = offerings.at(0)
      const extra = offerings.length - 1
      const placement = first
        ? FormatHelper.placementLabel(
            first.programCode,
            first.year,
            first.part,
          ) + (extra > 0 ? ` · ${m.placement_more({ count: extra })}` : '')
        : m.courses_placement_fallback()
      return { course, placement }
    })
  }
}
