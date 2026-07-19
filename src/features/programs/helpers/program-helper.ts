import { PROGRAMS } from '#/features/programs/data/programs'
import type {
  Curriculum,
  CurriculumSubject,
  ElectiveGroup,
  Program,
} from '#/features/programs/types'

/** Read-side queries over the program catalogue. */
export class ProgramHelper {
  /** All programs in display order. */
  static all(): Array<Program> {
    return PROGRAMS
  }

  /** Finds a program by its code (case-insensitive). */
  static byCode(code: string): Program | undefined {
    return PROGRAMS.find(
      (program) => program.code.toLowerCase() === code.toLowerCase(),
    )
  }

  /** The program's curriculum, when published. */
  static curriculum(program: Program): Curriculum | undefined {
    return program.curriculum
  }

  /** Whether the program has a browsable curriculum. */
  static isReady(program: Program): boolean {
    return Boolean(program.curriculum)
  }

  /** Total subjects across the curriculum. */
  static subjectCount(program: Program): number {
    if (!program.curriculum) return 0
    return program.curriculum.years
      .flatMap((year) => year.parts)
      .reduce((total, part) => total + part.subjects.length, 0)
  }

  /** Resolves the elective group referenced by a curriculum subject. */
  static electiveGroup(
    curriculum: Curriculum,
    subject: CurriculumSubject,
  ): ElectiveGroup | undefined {
    if (!subject.electiveGroup) return undefined
    return curriculum.electiveGroups?.find(
      (group) => group.id === subject.electiveGroup,
    )
  }
}
