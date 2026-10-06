import { SearchHelper } from '#/features/courses/helpers/search-helper'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { m } from '#/paraglide/messages.js'

export type CommandGroup = 'pages' | 'programs' | 'courses'

/** One selectable row in the command palette. */
export interface CommandItem {
  id: string
  group: CommandGroup
  title: string
  subtitle?: string
  /** Short monospace chip, e.g. a course or program code. */
  badge?: string
  to: string
  params?: Record<string, string>
}

/** Programs listed before the user types anything. */
const IDLE_PROGRAMS = 6
const PROGRAM_HITS = 4
const COURSE_HITS = 8

/** Builds grouped palette results for a query. */
export class CommandHelper {
  static items(query: string): Array<CommandItem> {
    return query.trim()
      ? [
          ...CommandHelper.programHits(query),
          ...CommandHelper.courseHits(query),
        ]
      : [...CommandHelper.pages(), ...CommandHelper.idlePrograms()]
  }

  static groupLabel(group: CommandGroup): string {
    switch (group) {
      case 'pages':
        return m.cmd_group_pages()
      case 'programs':
        return m.cmd_group_programs()
      case 'courses':
        return m.cmd_group_courses()
    }
  }

  private static pages(): Array<CommandItem> {
    return [
      { to: '/programs', title: m.label_programs() },
      { to: '/courses', title: m.label_courses() },
      { to: '/colleges', title: m.label_colleges() },
      { to: '/links', title: m.label_links() },
      { to: '/contribute', title: m.label_contribute() },
    ].map((page) => ({ ...page, id: `page:${page.to}`, group: 'pages' }))
  }

  private static idlePrograms(): Array<CommandItem> {
    return ProgramHelper.all()
      .slice(0, IDLE_PROGRAMS)
      .map((program) => CommandHelper.programItem(program.code))
  }

  private static programHits(query: string): Array<CommandItem> {
    return SearchHelper.programs(query, PROGRAM_HITS).map((program) =>
      CommandHelper.programItem(program.code),
    )
  }

  private static programItem(code: string): CommandItem {
    const program = ProgramHelper.byCode(code)
    return {
      id: `program:${code}`,
      group: 'programs',
      title: program?.name ?? code,
      subtitle:
        program && ProgramHelper.isReady(program)
          ? FormatHelper.subjectCount(ProgramHelper.subjectCount(program))
          : undefined,
      badge: code,
      to: '/programs/$code',
      params: { code },
    }
  }

  private static courseHits(query: string): Array<CommandItem> {
    return SearchHelper.coursesWithPlacement(query, COURSE_HITS).map(
      ({ course, placement }) => ({
        id: `course:${course.slug}`,
        group: 'courses',
        title: course.title,
        subtitle: placement,
        badge: course.code ?? undefined,
        to: '/courses/$slug',
        params: { slug: course.slug },
      }),
    )
  }
}
