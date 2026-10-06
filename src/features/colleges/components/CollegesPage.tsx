import { useMemo, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { BuildingsIcon, XIcon } from '@phosphor-icons/react'
import { Container } from '#/components/ui/Container'
import { EmptyState } from '#/components/ui/EmptyState'
import { FilterSelect } from '#/components/ui/FilterSelect'
import { PageHeader } from '#/components/ui/PageHeader'
import { SearchInput } from '#/components/ui/SearchInput'
import { StatPill } from '#/components/ui/StatPill'
import { CollegeCard } from '#/features/colleges/components/CollegeCard'
import { CollegeHelper } from '#/features/colleges/helpers/college-helper'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'
import type { CollegeType } from '#/features/colleges/types'

/** Filter value meaning "no restriction". */
const ANY = 'any'

/** URL search params for the colleges list (`?program=BCT`). */
export interface CollegesSearch {
  program?: string
}

/** Validates the colleges list search params. */
export function collegesPageSearch(
  search: Record<string, unknown>,
): CollegesSearch {
  const program =
    typeof search.program === 'string' && ProgramHelper.byCode(search.program)
      ? ProgramHelper.byCode(search.program)?.code
      : undefined
  return program ? { program } : {}
}

/** Head for the colleges list route. */
export function collegesPageHead() {
  return {
    meta: SeoHelper.meta({
      title: m.colleges_title(),
      description: m.seo_colleges_desc(),
      path: '/colleges',
    }),
    links: SeoHelper.canonical('/colleges'),
  }
}

const route = getRouteApi('/colleges/')

/** Searchable directory of colleges with type, program and province filters. */
export function CollegesPage() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const [query, setQuery] = useState('')
  const [type, setType] = useState<string>(ANY)
  const [province, setProvince] = useState(ANY)
  const program = search.program ?? ANY

  const setProgram = (value: string) =>
    void navigate({
      search: value === ANY ? {} : { program: value },
      replace: true,
    })

  const all = CollegeHelper.all()
  const colleges = useMemo(
    () =>
      CollegeHelper.search(query, all).filter(
        (college) =>
          (type === ANY || college.type === (type as CollegeType)) &&
          (province === ANY || college.location.province === province) &&
          (program === ANY ||
            college.programs.some((entry) => entry.code === program)),
      ),
    [all, query, type, province, program],
  )

  const hasFilters = type !== ANY || province !== ANY || program !== ANY
  const clearFilters = () => {
    setType(ANY)
    setProvince(ANY)
    setProgram(ANY)
  }

  return (
    <>
      <PageHeader
        pattern="iso"
        title={m.colleges_title()}
        subtitle={m.colleges_subtitle()}
      >
        {all.length > 0 ? (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-3">
              <StatPill
                value={all.filter((c) => c.type === 'constituent').length}
                label={m.colleges_stat_constituent()}
                className="bg-pastel-sky text-pastel-sky-ink"
              />
              <StatPill
                value={all.filter((c) => c.type === 'affiliated').length}
                label={m.colleges_stat_affiliated()}
                className="bg-pastel-teal text-pastel-teal-ink"
              />
            </div>
            <div className="max-w-xl">
              <SearchInput
                glow
                value={query}
                onChange={setQuery}
                placeholder={m.colleges_search_placeholder()}
              />
            </div>
          </div>
        ) : null}
      </PageHeader>
      <Container as="section" className="pt-8 pb-20">
        {all.length === 0 ? (
          <EmptyState
            icon={BuildingsIcon}
            title={m.colleges_coming_soon_title()}
            description={m.colleges_coming_soon_desc()}
          />
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <FilterSelect
                label={m.colleges_filter_type()}
                value={type}
                onChange={setType}
                options={[
                  { value: ANY, label: m.colleges_filter_all_types() },
                  {
                    value: 'constituent',
                    label: m.colleges_type_constituent(),
                  },
                  { value: 'affiliated', label: m.colleges_type_affiliated() },
                ]}
              />
              <FilterSelect
                label={m.colleges_filter_program()}
                value={program}
                onChange={setProgram}
                options={[
                  { value: ANY, label: m.colleges_filter_all_programs() },
                  ...ProgramHelper.all().map((entry) => ({
                    value: entry.code,
                    label: entry.code,
                    hint: entry.name,
                  })),
                ]}
              />
              <FilterSelect
                label={m.colleges_filter_province()}
                value={province}
                onChange={setProvince}
                options={[
                  { value: ANY, label: m.colleges_filter_all_provinces() },
                  ...CollegeHelper.provinces().map((name) => ({
                    value: name,
                    label: name,
                  })),
                ]}
              />
              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex h-10 cursor-pointer items-center gap-1.5 rounded-xl px-3 text-sm text-muted transition-colors hover:bg-wash hover:text-ink"
                >
                  <XIcon className="size-3.5" />
                  {m.courses_filter_clear()}
                </button>
              ) : null}
              <span className="ml-auto text-sm text-faint">
                {FormatHelper.collegeCount(colleges.length)}
              </span>
            </div>
            {colleges.length === 0 ? (
              <EmptyState
                icon={BuildingsIcon}
                title={m.colleges_empty_title()}
                description={m.colleges_empty_desc()}
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {colleges.map((college) => (
                  <CollegeCard
                    key={college.slug}
                    college={college}
                    highlight={program === ANY ? undefined : program}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </>
  )
}
