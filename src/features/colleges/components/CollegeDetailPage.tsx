import { Link, getRouteApi, notFound } from '@tanstack/react-router'
import {
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
  GlobeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@phosphor-icons/react'
import { Backdrop } from '#/components/fx/Backdrop'
import { Container } from '#/components/ui/Container'
import { StatPill } from '#/components/ui/StatPill'
import { CollegeLogo } from '#/features/colleges/components/CollegeLogo'
import { CollegeMapCard } from '#/features/colleges/components/CollegeMapCard'
import { CollegeTypeBadge } from '#/features/colleges/components/CollegeTypeBadge'
import { CollegeHelper } from '#/features/colleges/helpers/college-helper'
import { ProgramSources } from '#/features/programs/components/ProgramSources'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'

/** Loader for a college detail route. */
export function collegeDetailLoader({ params }: { params: { slug: string } }) {
  const college = CollegeHelper.bySlug(params.slug)
  if (!college) throw notFound()
  return { college }
}

/** Head for a college detail route. */
export function collegeDetailHead({ params }: { params: { slug: string } }) {
  const college = CollegeHelper.bySlug(params.slug)
  if (!college) return {}
  const path = `/colleges/${college.slug}`
  return {
    meta: SeoHelper.meta({
      title: m.seo_college_title({ name: college.shortName ?? college.name }),
      description: m.seo_college_desc({
        name: college.name,
        city: college.location.city,
        type:
          college.type === 'constituent'
            ? m.colleges_type_constituent()
            : m.colleges_type_affiliated(),
        programs: college.programs.map((program) => program.code).join(', '),
      }),
      path,
    }),
    links: SeoHelper.canonical(path),
    scripts: [
      SeoHelper.collegeJsonLd(college),
      SeoHelper.breadcrumbJsonLd([
        { label: m.nav_home(), path: '/' },
        { label: m.label_colleges(), path: '/colleges' },
        { label: college.name, path },
      ]),
    ],
  }
}

const route = getRouteApi('/colleges/$slug/')

/** College detail: header, programs offered with seats, about and sources. */
export function CollegeDetailPage() {
  const { college } = route.useLoaderData()
  const totalSeats = college.programs.reduce(
    (sum, program) => sum + (program.seats ?? 0),
    0,
  )

  return (
    <>
      <section className="hero-glow relative overflow-hidden border-b border-line bg-surface">
        <Backdrop pattern="iso" />
        <Container className="relative pt-10 pb-10 sm:pt-12">
          <div className="mb-5 flex items-center gap-4 motion-safe:animate-rise">
            <CollegeLogo college={college} size="lg" previewable />
            <div className="flex flex-col items-start gap-1.5">
              <CollegeTypeBadge type={college.type} />
              {college.established ? (
                <span className="pl-1 text-sm text-muted">
                  {m.college_established({ year: college.established })}
                </span>
              ) : null}
            </div>
          </div>
          <h1 className="max-w-4xl bg-linear-to-b from-ink to-primary bg-clip-text pb-1 text-4xl leading-tight font-semibold tracking-tight text-transparent sm:text-5xl motion-safe:animate-rise motion-safe:rise-delay-1">
            {college.name}
          </h1>
          {college.formerName ? (
            <p className="mt-1 text-sm text-faint motion-safe:animate-rise motion-safe:rise-delay-1">
              {m.college_former_name({ name: college.formerName })}
            </p>
          ) : null}
          <p className="mt-3 flex items-center gap-1.5 text-lg text-muted motion-safe:animate-rise motion-safe:rise-delay-1">
            <MapPinIcon weight="duotone" className="size-5 text-faint" />
            {CollegeHelper.address(college)}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 motion-safe:animate-rise motion-safe:rise-delay-2">
            <StatPill
              value={college.programs.length}
              label={
                college.programs.length === 1
                  ? m.college_programs_count_one()
                  : m.college_programs_count()
              }
              className="bg-pastel-sky text-pastel-sky-ink"
            />
            {totalSeats > 0 ? (
              <StatPill
                value={totalSeats}
                label={m.college_seats_total()}
                className="bg-pastel-gold text-pastel-gold-ink"
              />
            ) : null}
          </div>
          {college.website ||
          college.contact?.email?.length ||
          college.contact?.phone?.length ? (
            <div className="mt-4 flex flex-wrap gap-2 motion-safe:animate-rise motion-safe:rise-delay-2">
              {college.website ? (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-sm font-medium text-surface transition-colors duration-200 hover:bg-primary-deep hover:no-underline"
                >
                  <GlobeIcon weight="duotone" className="size-4" />
                  {FormatHelper.hostname(college.website)}
                  <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 ease-snappy group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}
              {college.contact?.email?.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 rounded-xl bg-surface px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-line transition-colors duration-200 hover:bg-wash hover:no-underline"
                >
                  <EnvelopeSimpleIcon
                    weight="duotone"
                    className="size-4 text-primary"
                  />
                  {email}
                </a>
              ))}
              {college.contact?.phone?.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-2 rounded-xl bg-surface px-3.5 py-2 text-sm font-medium text-ink tabular-nums ring-1 ring-line transition-colors duration-200 hover:bg-wash hover:no-underline"
                >
                  <PhoneIcon weight="duotone" className="size-4 text-primary" />
                  {phone}
                </a>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <Container as="section" className="pt-10 pb-20">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">
          <div className="min-w-0 lg:col-span-2">
            {college.about ? (
              <div className="mb-10 max-w-3xl">
                <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                  {m.college_about()}
                </h2>
                <p className="text-lg leading-relaxed text-body">
                  {college.about}
                </p>
              </div>
            ) : null}
            <h2 className="mb-5 text-2xl font-semibold tracking-tight">
              {m.college_programs()}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {college.programs.map((entry) => {
                const program = ProgramHelper.byCode(entry.code)
                return (
                  <Link
                    key={entry.code}
                    to="/programs/$code"
                    params={{ code: entry.code }}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 text-ink shadow-card transition duration-300 ease-snappy hover:-translate-y-0.5 hover:border-line-strong hover:no-underline"
                  >
                    <span className="grid h-12 min-w-16 place-items-center rounded-xl bg-primary px-2 font-mono text-sm font-bold text-surface">
                      {entry.code}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col leading-snug">
                      <span className="font-semibold">
                        {program?.name ?? entry.code}
                      </span>
                      {entry.seats != null ? (
                        <span className="text-sm text-muted">
                          {m.college_seats({ count: entry.seats })}
                        </span>
                      ) : null}
                      {entry.regular != null && entry.fullFee != null ? (
                        <span className="mt-1 flex gap-1.5">
                          <span className="rounded-md bg-pastel-mint px-1.5 py-0.5 text-xs font-medium text-pastel-mint-ink">
                            {m.college_seats_regular({ count: entry.regular })}
                          </span>
                          <span className="rounded-md bg-pastel-teal px-1.5 py-0.5 text-xs font-medium text-pastel-teal-ink">
                            {m.college_seats_full_fee({ count: entry.fullFee })}
                          </span>
                        </span>
                      ) : null}
                    </span>
                    <ArrowUpRightIcon className="size-4 text-faint transition duration-300 ease-snappy group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-link" />
                  </Link>
                )
              })}
            </div>
            {totalSeats > 0 && college.seatsIntake ? (
              <p className="mt-4 text-xs text-faint">
                {m.college_seats_note({ intake: college.seatsIntake })}
              </p>
            ) : null}
          </div>
          <aside className="lg:sticky lg:top-24">
            <CollegeMapCard
              college={college}
              address={CollegeHelper.address(college)}
            />
          </aside>
        </div>
        <ProgramSources sources={college.sources} />
      </Container>
    </>
  )
}
