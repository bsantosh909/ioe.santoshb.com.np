import { getRouteApi } from '@tanstack/react-router'
import {
  BinocularsIcon,
  BriefcaseIcon,
  BuildingsIcon,
  GraduationCapIcon,
} from '@phosphor-icons/react'
import { Container } from '#/components/ui/Container'
import { EmptyState } from '#/components/ui/EmptyState'
import { ProgramStudyCard } from '#/features/programs/components/ProgramStudyCard'
import { ProgramSources } from '#/features/programs/components/ProgramSources'
import { CareerHelper } from '#/features/programs/helpers/career-helper'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { m } from '#/paraglide/messages.js'

/** Pastel fills cycled across the career cards. */
const CAREER_FILLS = [
  'bg-pastel-gold text-pastel-gold-ink',
  'bg-pastel-sky text-pastel-sky-ink',
  'bg-pastel-mint text-pastel-mint-ink',
  'bg-pastel-lilac text-pastel-lilac-ink',
  'bg-pastel-teal text-pastel-teal-ink',
  'bg-pastel-rose text-pastel-rose-ink',
]

const route = getRouteApi('/programs/$code')

/** Program future-possibilities tab: careers, sectors and further study. */
export function ProgramScopePage() {
  const { program } = route.useLoaderData()
  const profile = ProgramHelper.profile(program)

  if (!profile) {
    return (
      <Container as="section" className="pt-10 pb-20">
        <div className="max-w-3xl">
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            {m.program_scope_heading()}
          </h2>
          {program.scope ? (
            <p className="text-lg leading-relaxed text-body">{program.scope}</p>
          ) : (
            <EmptyState
              icon={BinocularsIcon}
              title={m.program_scope_empty_title()}
              description={m.program_scope_empty_desc()}
            />
          )}
        </div>
      </Container>
    )
  }

  return (
    <Container as="section" className="pt-10 pb-20">
      <div className="mb-5 flex items-center gap-3">
        <BriefcaseIcon weight="duotone" className="size-6 text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight">
          {m.program_profile_careers()}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {profile.careers.map((career, index) => {
          const image = CareerHelper.image(career.kind)
          return (
            <div
              key={career.title}
              className={`group flex flex-col gap-4 rounded-3xl p-5 transition duration-300 ease-snappy hover:-translate-y-0.5 ${CAREER_FILLS[index % CAREER_FILLS.length]}`}
            >
              {image ? (
                <span className="self-start overflow-hidden rounded-2xl bg-surface p-1 shadow-card transition-transform duration-500 ease-snappy group-hover:-translate-y-1 group-hover:-rotate-3">
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    width={256}
                    height={256}
                    className="size-14"
                  />
                </span>
              ) : null}
              <div>
                <h3 className="text-base leading-snug font-bold">
                  {career.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed opacity-80">
                  {career.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-card">
          <div className="mb-4 flex items-center gap-3">
            <BuildingsIcon weight="duotone" className="size-6 text-primary" />
            <h3 className="text-lg font-semibold">
              {m.program_profile_sectors()}
            </h3>
          </div>
          <ul className="flex flex-col gap-2">
            {profile.sectors.map((sector) => (
              <li
                key={sector}
                className="rounded-xl bg-raised px-3.5 py-2.5 text-sm text-ink ring-1 ring-line-soft"
              >
                {sector}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          {profile.higherStudies ? (
            <div className="rounded-3xl bg-pastel-lilac p-6">
              <div className="mb-4 flex items-center gap-3">
                <GraduationCapIcon
                  weight="duotone"
                  className="size-6 text-pastel-lilac-ink"
                />
                <h3 className="text-lg font-black text-pastel-lilac-ink">
                  {m.program_profile_higher()}
                </h3>
              </div>
              <p className="leading-relaxed text-pastel-lilac-ink">
                {profile.higherStudies}
              </p>
            </div>
          ) : null}
          <ProgramStudyCard program={program} />
        </div>
      </div>
      <ProgramSources sources={profile.sources} />
    </Container>
  )
}
