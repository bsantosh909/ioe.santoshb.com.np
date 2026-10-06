import { Container } from '#/components/ui/Container'
import { Backdrop } from '#/components/fx/Backdrop'
import { FlipWords } from '#/components/fx/FlipWords'
import { GlowBorder } from '#/components/fx/GlowBorder'
import { Spotlight } from '#/components/fx/Spotlight'
import { ProgramCardStack } from '#/features/home/components/ProgramCardStack'
import { HeroSearch } from '#/features/home/components/HeroSearch'
import { m } from '#/paraglide/messages.js'

/**
 * Light split hero: spotlight, flipping headline, glowing search and the
 * illustrated program card stack.
 * `z-10` lifts the whole hero (and its search dropdown) above later sections.
 */
export function HeroSection() {
  const words = [
    m.home_flip_syllabus(),
    m.home_flip_subject(),
    m.home_flip_past_paper(),
    m.home_flip_program(),
  ]

  return (
    <section className="hero-glow relative z-10 overflow-x-clip border-b border-line">
      <Backdrop pattern="contours" />
      <Spotlight />
      <Container className="relative grid grid-cols-1 gap-12 pt-16 pb-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-24 lg:pb-24">
        <div className="lg:col-span-7">
          <div className="mb-6 inline-flex rounded-full border border-accent-line bg-accent-tint px-3 py-1.5 text-xs font-medium text-accent-deep motion-safe:animate-rise">
            {m.home_badge()}
          </div>
          <h1 className="mb-6 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl xl:text-6xl motion-safe:animate-rise motion-safe:rise-delay-1">
            <span className="sr-only">{m.home_title()}</span>
            <span aria-hidden="true">
              <span className="bg-linear-to-b from-ink to-primary bg-clip-text text-transparent">
                {m.home_title_lead()}
              </span>{' '}
              <span className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 h-3 rounded-full bg-accent/30 sm:h-4"
                />
                <FlipWords words={words} className="relative text-link" />
              </span>
              <br />
              <span className="bg-linear-to-b from-ink to-primary bg-clip-text text-transparent">
                {m.home_title_tail()}
              </span>
            </span>
          </h1>
          <p className="mb-9 max-w-lg text-lg leading-relaxed text-muted motion-safe:animate-rise motion-safe:rise-delay-2">
            {m.home_subtitle()}
          </p>
          <div className="relative z-20 max-w-xl motion-safe:animate-rise motion-safe:rise-delay-3">
            <GlowBorder>
              <HeroSearch />
            </GlowBorder>
          </div>
        </div>
        <div className="lg:col-span-5 motion-safe:animate-rise motion-safe:rise-delay-4">
          <ProgramCardStack />
        </div>
      </Container>
    </section>
  )
}
