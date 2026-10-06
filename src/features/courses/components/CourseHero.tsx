import { Backdrop } from '#/components/fx/Backdrop'
import { CodeChip } from '#/components/ui/CodeChip'
import { Container } from '#/components/ui/Container'
import type { CourseMeta } from '#/features/courses/types'

/** Light course header with code chip and title. */
export function CourseHero({ course }: { course: CourseMeta }) {
  return (
    <section className="hero-glow relative overflow-hidden bg-surface">
      <Backdrop pattern="circuit" />
      <Container className="relative pt-10 pb-9 sm:pt-12">
        {course.code ? (
          <div className="mb-4 motion-safe:animate-rise">
            <CodeChip code={course.code} />
          </div>
        ) : null}
        <h1 className="max-w-4xl bg-linear-to-b from-ink to-primary bg-clip-text pb-1 text-4xl leading-tight font-semibold tracking-tight text-transparent sm:text-5xl motion-safe:animate-rise motion-safe:rise-delay-1">
          {course.title}
        </h1>
      </Container>
    </section>
  )
}
