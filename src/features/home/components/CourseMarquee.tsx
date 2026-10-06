import { Link } from '@tanstack/react-router'
import { Marquee } from '#/components/fx/Marquee'
import { Container } from '#/components/ui/Container'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { m } from '#/paraglide/messages.js'
import type { CourseMeta } from '#/features/courses/types'

/** Marquee rows, alternating direction. */
const ROW_COUNT = 3

/** Courses per marquee row; enough to fill ultra-wide screens. */
const ROW_SIZE = 18

/** Three counter-scrolling rows of real course chips under the hero. */
export function CourseMarquee() {
  const coded = CourseHelper.all().filter((course) => course.code)
  const rows = Array.from({ length: ROW_COUNT }, (_, row) =>
    coded.slice(row * ROW_SIZE, (row + 1) * ROW_SIZE),
  )

  return (
    <section className="border-b border-line bg-surface py-10">
      <Container>
        <p className="mb-6 text-center text-sm text-faint">
          {m.home_marquee_caption()}
        </p>
      </Container>
      <div className="flex flex-col gap-3">
        {rows.map((row, index) => (
          <Marquee key={index} reverse={index % 2 === 1}>
            {row.map((course) => (
              <CourseChip key={course.slug} course={course} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  )
}

function CourseChip({ course }: { course: CourseMeta }) {
  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.slug }}
      className="flex shrink-0 items-center gap-3 rounded-xl border border-line bg-raised py-2 pr-4 pl-2 text-sm text-body transition-colors duration-200 hover:border-accent hover:bg-accent-tint hover:text-ink hover:no-underline"
    >
      <span className="rounded-lg bg-wash px-2 py-1 font-mono text-xs font-semibold text-primary">
        {course.code}
      </span>
      <span className="whitespace-nowrap">{course.title}</span>
    </Link>
  )
}
