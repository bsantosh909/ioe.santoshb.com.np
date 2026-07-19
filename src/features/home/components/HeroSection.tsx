import { Container } from '#/components/ui/Container'
import { HeroSearch } from '#/features/home/components/HeroSearch'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { m } from '#/paraglide/messages.js'

/** Navy hero with headline, live search and catalogue stats. */
export function HeroSection() {
  const programCount = ProgramHelper.all().length
  const courseCount = CourseHelper.all().length

  return (
    <section className="relative overflow-hidden bg-primary text-surface">
      <div className="hero-glow absolute inset-0" />
      <Container className="relative pt-16 pb-14">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-surface/10 bg-surface/5 px-3 py-1.5 text-xs text-accent-soft">
            <span className="size-1.5 rounded-full bg-accent" />
            {m.home_badge()}
          </div>
          <h1 className="mb-4 font-serif text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
            {m.home_title()}
          </h1>
          <p className="mb-7 max-w-xl text-lg leading-relaxed text-on-primary-soft">
            {m.home_subtitle()}
          </p>
          <HeroSearch />
          <div className="mt-5 flex gap-6 text-sm text-on-primary-faint">
            <span>
              <b className="text-surface">{programCount}</b>{' '}
              {m.home_stat_programs()}
            </span>
            <span>
              <b className="text-surface">{courseCount}</b>{' '}
              {m.home_stat_courses()}
            </span>
            <span>
              <b className="text-surface">{m.home_stat_free()}</b>{' '}
              {m.home_stat_free_rest()}
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
