import { COURSE_INDEX } from '#/data/courses.generated'
import { PROGRAMS } from '#/features/programs/data/programs'
import type { ComponentType } from 'react'
import type { MDXComponents } from 'mdx/types'
import type { CourseMeta } from '#/features/courses/types'
import type { Curriculum } from '#/features/programs/types'

type MdxModule = { default: ComponentType<{ components?: MDXComponents }> }

const COURSE_MODULES = import.meta.glob<MdxModule>(
  '../../../content/courses/*.mdx',
)

/** Where a course appears inside a program curriculum. */
export interface CourseOffering {
  programCode: string
  programName: string
  year: number
  part: 1 | 2
  elective: boolean
}

function offeringsInCurriculum(
  curriculum: Curriculum,
  slug: string,
  programCode: string,
  programName: string,
): Array<CourseOffering> {
  const offerings: Array<CourseOffering> = []
  for (const year of curriculum.years) {
    for (const part of year.parts) {
      for (const subject of part.subjects) {
        if (subject.slug === slug) {
          offerings.push({
            programCode,
            programName,
            year: year.year,
            part: part.part,
            elective: false,
          })
        }
      }
    }
  }
  for (const group of curriculum.electiveGroups ?? []) {
    if (group.choices.some((choice) => choice.slug === slug)) {
      offerings.push({
        programCode,
        programName,
        year: 0,
        part: 1,
        elective: true,
      })
    }
  }
  return offerings
}

/** Read-side queries over the course catalogue. */
export class CourseHelper {
  /** All courses, alphabetical by slug. */
  static all(): Array<CourseMeta> {
    return COURSE_INDEX
  }

  /** Finds a course by its URL slug. */
  static bySlug(slug: string): CourseMeta | undefined {
    return COURSE_INDEX.find((course) => course.slug === slug)
  }

  /**
   * Returns a loader for the course's compiled MDX body, suitable for
   * `React.lazy`. Undefined when no syllabus file exists for the slug.
   */
  static mdxLoader(slug: string): (() => Promise<MdxModule>) | undefined {
    return COURSE_MODULES[`../../../content/courses/${slug}.mdx`]
  }

  /**
   * Credits and total marks for the course, taken from the first program
   * curriculum that lists it (values match across programs at IOE).
   */
  static details(slug: string): { credits?: number; marks?: number } {
    for (const program of PROGRAMS) {
      for (const year of program.curriculum?.years ?? []) {
        for (const part of year.parts) {
          for (const subject of part.subjects) {
            if (subject.slug === slug) {
              return { credits: subject.credits, marks: subject.marks }
            }
          }
        }
      }
    }
    return {}
  }

  /** Placements of the course across program curricula. */
  static offerings(slug: string): Array<CourseOffering> {
    const offerings: Array<CourseOffering> = []
    for (const program of PROGRAMS) {
      if (!program.curriculum) continue
      offerings.push(
        ...offeringsInCurriculum(
          program.curriculum,
          slug,
          program.code,
          program.name,
        ),
      )
    }
    return offerings
  }
}
