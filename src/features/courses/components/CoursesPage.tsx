import { useMemo, useState } from 'react'
import { CheckIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import { Container } from '#/components/ui/Container'
import { EmptyState } from '#/components/ui/EmptyState'
import { FilterSelect } from '#/components/ui/FilterSelect'
import { PageHeader } from '#/components/ui/PageHeader'
import { SearchInput } from '#/components/ui/SearchInput'
import { CourseTable } from '#/features/courses/components/CourseTable'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { SearchHelper } from '#/features/courses/helpers/search-helper'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'

/** Filter value meaning "no restriction". */
const ANY = 'any'

/** Head for the courses list route. */
export function coursesPageHead() {
  return {
    meta: SeoHelper.meta({
      title: m.courses_title(),
      description: m.seo_courses_desc(),
      path: '/courses',
    }),
    links: SeoHelper.canonical('/courses'),
  }
}

/** Searchable catalogue of every course with program/year/paper filters. */
export function CoursesPage() {
  const [query, setQuery] = useState('')
  const [program, setProgram] = useState(ANY)
  const [year, setYear] = useState(ANY)
  const [papersOnly, setPapersOnly] = useState(false)

  const programOptions = useMemo(
    () => [
      { value: ANY, label: m.courses_filter_all_programs() },
      ...ProgramHelper.all().map((entry) => ({
        value: entry.code,
        label: entry.code,
        hint: entry.name,
      })),
    ],
    [],
  )
  const yearOptions = useMemo(() => {
    const maxYears = Math.max(
      ...ProgramHelper.all().map((entry) => entry.durationYears),
    )
    return [
      { value: ANY, label: m.courses_filter_all_years() },
      ...Array.from({ length: maxYears }, (_, index) => ({
        value: String(index + 1),
        label: FormatHelper.yearLabel(index + 1),
      })),
    ]
  }, [])

  const courses = useMemo(() => {
    const filter = {
      program: program === ANY ? undefined : program,
      year: year === ANY ? undefined : Number(year),
    }
    const filtered = filter.program != null || filter.year != null
    return (
      query.trim() ? SearchHelper.courses(query) : CourseHelper.all()
    ).filter(
      (course) =>
        (!filtered || CourseHelper.offeredWhere(course.slug, filter)) &&
        (!papersOnly || CourseHelper.oldQuestions(course.slug).length > 0),
    )
  }, [query, program, year, papersOnly])

  const hasFilters = program !== ANY || year !== ANY || papersOnly
  const clearFilters = () => {
    setProgram(ANY)
    setYear(ANY)
    setPapersOnly(false)
  }

  return (
    <>
      <PageHeader
        pattern="circuit"
        title={m.courses_title()}
        subtitle={m.courses_subtitle()}
      >
        <div className="max-w-xl">
          <SearchInput
            glow
            value={query}
            onChange={setQuery}
            placeholder={m.courses_search_placeholder()}
          />
        </div>
      </PageHeader>
      <Container as="section" className="pt-8 pb-20">
        <div className="mb-5 flex flex-wrap items-center gap-2.5">
          <FilterSelect
            label={m.courses_filter_program()}
            value={program}
            options={programOptions}
            onChange={setProgram}
          />
          <FilterSelect
            label={m.courses_filter_year()}
            value={year}
            options={yearOptions}
            onChange={setYear}
          />
          <button
            type="button"
            aria-pressed={papersOnly}
            onClick={() => setPapersOnly((current) => !current)}
            className={`flex h-10 cursor-pointer items-center gap-2 rounded-xl border px-3.5 text-sm font-medium transition duration-200 ease-snappy active:scale-98 ${
              papersOnly
                ? 'border-pastel-mint-ink/30 bg-pastel-mint text-pastel-mint-ink'
                : 'border-line bg-surface text-muted hover:border-line-strong hover:text-ink'
            }`}
          >
            <span
              className={`grid size-4 place-items-center rounded border transition-colors ${
                papersOnly
                  ? 'border-pastel-mint-ink bg-pastel-mint-ink text-surface'
                  : 'border-line-strong'
              }`}
            >
              {papersOnly ? (
                <CheckIcon weight="bold" className="size-3" />
              ) : null}
            </span>
            {m.courses_filter_papers()}
          </button>
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
            {FormatHelper.courseCount(courses.length)}
          </span>
        </div>
        {courses.length === 0 ? (
          <EmptyState
            icon={MagnifyingGlassIcon}
            title={m.courses_empty_title({ query })}
            description={m.courses_empty_desc()}
          />
        ) : (
          <CourseTable
            courses={courses}
            selectedProgram={program === ANY ? undefined : program}
          />
        )}
      </Container>
    </>
  )
}
