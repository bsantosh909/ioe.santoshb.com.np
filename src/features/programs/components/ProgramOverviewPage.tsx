import { getRouteApi } from '@tanstack/react-router'
import { CertificateIcon } from '@phosphor-icons/react'
import { ButtonLink } from '#/components/ui/ButtonLink'
import { Container } from '#/components/ui/Container'
import { ProgramCollegesCard } from '#/features/programs/components/ProgramCollegesCard'
import { ProgramSources } from '#/features/programs/components/ProgramSources'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { m } from '#/paraglide/messages.js'

const route = getRouteApi('/programs/$code')

/** Program overview tab: researched overview, study areas, campuses. */
export function ProgramOverviewPage() {
  const { program } = route.useLoaderData()
  const ready = ProgramHelper.isReady(program)
  const profile = ProgramHelper.profile(program)
  const overview = profile?.overview ?? [program.description]

  return (
    <Container as="section" className="pt-10 pb-20">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">
            {m.program_overview_heading()}
          </h2>
          <div className="flex flex-col gap-4 text-lg leading-relaxed text-body">
            {overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {profile?.focusAreas.length ? (
            <>
              <h3 className="mt-10 mb-4 text-lg font-semibold">
                {m.program_profile_study()}
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-xl bg-surface px-3.5 py-2 text-sm font-medium text-ink shadow-card ring-1 ring-line"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </>
          ) : null}
          <div className="mt-10">
            {ready ? (
              <ButtonLink
                to="/programs/$code/subjects"
                params={{ code: program.code }}
                arrow
              >
                {m.program_overview_cta()}
              </ButtonLink>
            ) : (
              <ButtonLink
                to="/programs/$code"
                params={{ code: 'BCT' }}
                variant="outline"
                arrow
              >
                {m.program_empty_action()}
              </ButtonLink>
            )}
          </div>
        </div>
        <aside className="flex flex-col gap-4 lg:col-span-2">
          <ProgramCollegesCard
            program={program}
            fallbackCampuses={profile?.campuses}
          />
          {profile?.licensing ? (
            <div className="rounded-3xl bg-pastel-gold p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-surface text-pastel-gold-ink shadow-card">
                  <CertificateIcon weight="duotone" className="size-5" />
                </span>
                <h3 className="font-black text-pastel-gold-ink">
                  {m.program_profile_licensing()}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-pastel-gold-ink">
                {profile.licensing}
              </p>
            </div>
          ) : null}
        </aside>
      </div>
      {profile ? <ProgramSources sources={profile.sources} /> : null}
    </Container>
  )
}
