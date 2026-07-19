import { NOTE_INDEX } from '#/data/courses.generated'
import type { ComponentType } from 'react'
import type { MDXComponents } from 'mdx/types'
import type { NoteMeta } from '#/features/notes/types'

type MdxModule = { default: ComponentType<{ components?: MDXComponents }> }

const NOTE_MODULES = import.meta.glob<MdxModule>('../../../content/notes/*.mdx')

/** Read-side queries over community/lecture notes. */
export class NoteHelper {
  /** All notes across every course. */
  static all(): Array<NoteMeta> {
    return NOTE_INDEX
  }

  /** Notes attached to a course. */
  static forCourse(courseSlug: string): Array<NoteMeta> {
    return NOTE_INDEX.filter((note) => note.course === courseSlug)
  }

  /** Finds a note by course + note slug. */
  static bySlug(courseSlug: string, noteSlug: string): NoteMeta | undefined {
    return NOTE_INDEX.find(
      (note) => note.course === courseSlug && note.slug === noteSlug,
    )
  }

  /**
   * Returns a loader for the note's compiled MDX body, suitable for
   * `React.lazy`. Undefined when the note file does not exist.
   */
  static mdxLoader(
    courseSlug: string,
    noteSlug: string,
  ): (() => Promise<MdxModule>) | undefined {
    return NOTE_MODULES[`../../../content/notes/${courseSlug}--${noteSlug}.mdx`]
  }
}
