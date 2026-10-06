import { Link } from '@tanstack/react-router'
import { ArrowRightIcon, MapPinIcon } from '@phosphor-icons/react'
import { CollegeLogo } from '#/features/colleges/components/CollegeLogo'
import { CollegeHelper } from '#/features/colleges/helpers/college-helper'
import { m } from '#/paraglide/messages.js'
import type { College } from '#/features/colleges/types'
import type { Program } from '#/features/programs/types'

/** Affiliated colleges listed before linking to the full filtered list. */
const AFFILIATED_PREVIEW = 6

interface ProgramCollegesCardProps {
  program: Program
  /** Campus names from the program profile, used until colleges load. */
  fallbackCampuses?: Array<string>
}

/** "Where it's taught": colleges offering the program, linked to each. */
export function ProgramCollegesCard({
  program,
  fallbackCampuses = [],
}: ProgramCollegesCardProps) {
  const colleges = CollegeHelper.forProgram(program.code)
  const constituent = colleges.filter((c) => c.type === 'constituent')
  const affiliated = colleges.filter((c) => c.type === 'affiliated')

  if (colleges.length === 0 && fallbackCampuses.length === 0) return null

  return (
    <div className="rounded-3xl bg-pastel-sky p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-2xl bg-surface text-pastel-sky-ink shadow-card">
          <MapPinIcon weight="duotone" className="size-5" />
        </span>
        <h3 className="font-black text-pastel-sky-ink">
          {m.program_profile_campuses()}
        </h3>
      </div>

      {colleges.length === 0 ? (
        <ul className="flex flex-col gap-2">
          {fallbackCampuses.map((campus) => (
            <li
              key={campus}
              className="rounded-xl bg-surface/70 px-3.5 py-2.5 text-sm font-medium text-ink"
            >
              {campus}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-5">
          {constituent.length > 0 ? (
            <CollegeGroup
              title={m.program_colleges_constituent()}
              colleges={constituent}
            />
          ) : null}
          {affiliated.length > 0 ? (
            <CollegeGroup
              title={m.program_colleges_affiliated()}
              colleges={affiliated.slice(0, AFFILIATED_PREVIEW)}
            />
          ) : null}
          <Link
            to="/colleges"
            search={{ program: program.code }}
            className="group inline-flex items-center gap-1.5 self-start text-sm font-semibold text-pastel-sky-ink hover:no-underline"
          >
            {m.program_colleges_all({ count: colleges.length })}
            <ArrowRightIcon className="size-4 transition-transform duration-300 ease-snappy group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}
    </div>
  )
}

function CollegeGroup({
  title,
  colleges,
}: {
  title: string
  colleges: Array<College>
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold text-pastel-sky-ink">
        {title}
      </div>
      <ul className="flex flex-col gap-1.5">
        {colleges.map((college) => (
          <li key={college.slug}>
            <Link
              to="/colleges/$slug"
              params={{ slug: college.slug }}
              className="group flex items-center justify-between gap-3 rounded-xl bg-surface/70 px-2.5 py-2 text-sm font-medium text-ink transition-colors duration-200 hover:bg-surface hover:no-underline"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <CollegeLogo college={college} size="sm" />
                <span className="truncate">{college.name}</span>
              </span>
              <span className="shrink-0 text-xs text-faint">
                {college.location.city.split(',').at(-1)?.trim()}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
