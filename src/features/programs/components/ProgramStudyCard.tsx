import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { CollegeLogo } from '#/features/colleges/components/CollegeLogo'
import { CollegeHelper } from '#/features/colleges/helpers/college-helper'
import { m } from '#/paraglide/messages.js'
import type { Program } from '#/features/programs/types'

/** College logos shown in the overlapping row. */
const LOGO_PREVIEW = 6

/** "Where to study": how many colleges teach the program, with their logos. */
export function ProgramStudyCard({ program }: { program: Program }) {
  const colleges = CollegeHelper.forProgram(program.code)
  if (colleges.length === 0) return null
  const constituent = colleges.filter((c) => c.type === 'constituent').length
  // Constituent campuses share the TU emblem; show each distinct logo once.
  const distinctLogos = colleges.filter(
    (college, index) =>
      colleges.findIndex(
        (other) =>
          (CollegeHelper.logo(other) ?? other.slug) ===
          (CollegeHelper.logo(college) ?? college.slug),
      ) === index,
  )

  return (
    <Link
      to="/colleges"
      search={{ program: program.code }}
      className="group rounded-3xl border border-line bg-surface p-6 text-ink shadow-card transition duration-300 ease-snappy hover:-translate-y-0.5 hover:border-line-strong hover:no-underline"
    >
      <h3 className="text-lg font-semibold">
        {m.program_study_title({ code: program.code })}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        {constituent > 0
          ? m.program_study_desc({
              count: colleges.length,
              code: program.code,
              constituent,
            })
          : m.program_study_desc_affiliated({
              count: colleges.length,
              code: program.code,
            })}
      </p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex pl-2">
          {distinctLogos.slice(0, LOGO_PREVIEW).map((college) => (
            <span
              key={college.slug}
              className="-ml-2 rounded-xl ring-2 ring-surface transition-all duration-300 ease-snappy group-hover:ml-0.5"
            >
              <CollegeLogo college={college} size="sm" />
            </span>
          ))}
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-link">
          {m.program_study_cta()}
          <ArrowRightIcon className="size-4 transition-transform duration-300 ease-snappy group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
