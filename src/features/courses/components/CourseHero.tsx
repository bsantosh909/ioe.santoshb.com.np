import { CodeChip } from '#/components/ui/CodeChip'
import { Container } from '#/components/ui/Container'
import type { CourseMeta } from '#/features/courses/types'

/** Navy header with course code and title. */
export function CourseHero({ course }: { course: CourseMeta }) {
  return (
    <section className="bg-primary text-surface">
      <Container className="pt-8 pb-7">
        {course.code ? (
          <div className="mb-3">
            <CodeChip code={course.code} inverted />
          </div>
        ) : null}
        <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          {course.title}
        </h1>
      </Container>
    </section>
  )
}
