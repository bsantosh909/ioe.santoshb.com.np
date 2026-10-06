import { PROGRAM_PROFILES } from '#/features/programs/data/program-profiles'
import { PROGRAMS } from '#/features/programs/data/programs'
import type { GrowBar } from '#/components/fx/GrowBars'
import type {
  Curriculum,
  CurriculumSubject,
  ElectiveGroup,
  Program,
  ProgramProfile,
} from '#/features/programs/types'

/** Generated program illustrations, keyed by path (`<code>.webp`). */
const PROGRAM_IMAGES = import.meta.glob<string>(
  '../../../assets/programs/*.webp',
  { eager: true, import: 'default' },
)

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

  /** Illustration URL for the program, if one has been generated. */
  static image(program: Program): string | undefined {
    return PROGRAM_IMAGES[
      `../../../assets/programs/${program.code.toLowerCase()}.webp`
    ]
  }

  /** Researched profile (overview, careers, campuses), when available. */
  static profile(program: Program): ProgramProfile | undefined {
    return PROGRAM_PROFILES[program.code]
  }

  /** Whether the program has a browsable curriculum. */
  static isReady(program: Program): boolean {
    return Boolean(program.curriculum)
  }

  /** Subjects per semester (1-8), scaled 0-1 against the busiest one. */
  static semesterBars(program: Program): Array<GrowBar> {
    const counts =
      program.curriculum?.years.flatMap((year) =>
        year.parts.map((part) => part.subjects.length),
      ) ?? []
    const max = Math.max(1, ...counts)
    return counts.map((count, index) => ({
      label: String(index + 1),
      ratio: count / max,
    }))
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
