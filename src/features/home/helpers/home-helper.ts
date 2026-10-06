import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { OLD_QUESTIONS } from '#/features/courses/data/old-questions'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { FormatHelper } from '#/lib/helpers/format-helper'
import type { CourseMeta } from '#/features/courses/types'
import type { GrowBar } from '#/components/fx/GrowBars'

/** Program whose semester breakdown is charted on the home bento. */
const CHART_PROGRAM = 'BCT'

/** Course whose code and title are typed out on the search tile. */
const SEARCH_EXAMPLE = 'data-structure-and-algorithms'

/** Real catalogue figures shown on the home page bento grid. */
export class HomeHelper {
  /** Question collections and how many courses have at least one. */
  static oldQuestionTotals(): { sets: number; courses: number } {
    const lists = Object.values(OLD_QUESTIONS)
    return {
      sets: lists.reduce((total, sets) => total + sets.length, 0),
      courses: lists.filter((sets) => sets.length > 0).length,
    }
  }

  /** Exam-year spans of the first few collections, e.g. `2071-2081 BS`. */
  static samplePaperYears(limit = 3): Array<string> {
    return Object.values(OLD_QUESTIONS)
      .flat()
      .flatMap((set) => {
        const label = FormatHelper.examYears(set.years)
        return label && set.years && set.years.from !== set.years.to
          ? [label]
          : []
      })
      .slice(0, limit)
  }

  /** Subjects per semester (1-8) of the charted program, scaled 0-1. */
  static semesterBars(): Array<GrowBar> {
    const program = ProgramHelper.byCode(CHART_PROGRAM)
    return program ? ProgramHelper.semesterBars(program) : []
  }

  /** Code of the charted program, for its subjects link. */
  static chartProgram(): string {
    return CHART_PROGRAM
  }

  /** The course demoed on the search tile. */
  static searchExample(): CourseMeta | undefined {
    return CourseHelper.bySlug(SEARCH_EXAMPLE)
  }
}
