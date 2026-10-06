import { Container } from '#/components/ui/Container'
import { CourseMarquee } from '#/features/home/components/CourseMarquee'
import { HeroSection } from '#/features/home/components/HeroSection'
import { HomeBento } from '#/features/home/components/bento/HomeBento'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'

/** Head for the home route. */
export function homePageHead() {
  return { links: SeoHelper.canonical('/') }
}

/** Landing page: hero, course marquee and the bento grid. */
export function HomePage() {
  return (
    <>
      <HeroSection />
      <CourseMarquee />
      <Container as="section" className="pt-20 pb-24">
        <h2 className="mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {m.bento_heading()}
        </h2>
        <p className="mb-9 max-w-xl text-muted">{m.bento_sub()}</p>
        <HomeBento />
      </Container>
    </>
  )
}
