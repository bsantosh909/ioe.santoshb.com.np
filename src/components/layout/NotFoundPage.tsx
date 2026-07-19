import { ButtonLink } from '#/components/ui/ButtonLink'
import { Container } from '#/components/ui/Container'
import { m } from '#/paraglide/messages.js'

/**
 * Friendly 404, wired as the root route's `notFoundComponent` so it renders
 * inside the app shell for both unknown URLs and missing courses/programs.
 */
export function NotFoundPage() {
  return (
    <Container
      as="section"
      className="flex flex-1 flex-col items-center justify-center py-20 text-center sm:py-28"
    >
      <span
        aria-hidden="true"
        className="text-8xl leading-none font-extrabold tracking-tight text-primary/12 select-none sm:text-9xl"
      >
        404
      </span>
      <h1 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
        {m.notfound_title()}
      </h1>
      <p className="mt-3 max-w-md text-muted">{m.notfound_desc()}</p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink to="/">{m.notfound_home()}</ButtonLink>
        <ButtonLink to="/programs" variant="outline">
          {m.nav_programs()}
        </ButtonLink>
        <ButtonLink to="/courses" variant="outline">
          {m.nav_courses()}
        </ButtonLink>
      </div>
    </Container>
  )
}
