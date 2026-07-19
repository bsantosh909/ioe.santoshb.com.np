import { Container } from '#/components/ui/Container'
import { HeroSection } from '#/features/home/components/HeroSection'
import { QuickActionCard } from '#/features/home/components/QuickActionCard'
import { PopularProgramsPanel } from '#/features/home/components/PopularProgramsPanel'
import { QUICK_ACTIONS } from '#/features/home/data/quick-actions'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'

/** Head for the home route. */
export function homePageHead() {
  return { links: SeoHelper.canonical('/') }
}

/** Landing page: hero search, quick actions and popular programs. */
export function HomePage() {
  return (
    <>
      <HeroSection />
      <Container as="section" className="pt-11 pb-2">
        <h2 className="mb-1 font-serif text-2xl font-semibold">
          {m.home_quick_actions()}
        </h2>
        <p className="mb-5 text-sm text-muted">{m.home_quick_actions_sub()}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action) => (
            <QuickActionCard key={action.to + action.icon} action={action} />
          ))}
        </div>
      </Container>
      <Container as="section" className="pt-8 pb-15">
        <PopularProgramsPanel />
      </Container>
    </>
  )
}
