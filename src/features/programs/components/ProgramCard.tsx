import { Link } from '@tanstack/react-router'
import {
  ArrowUpRightIcon,
  BooksIcon,
  CalendarBlankIcon,
} from '@phosphor-icons/react'
import { SpotlightCard } from '#/components/fx/SpotlightCard'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { m } from '#/paraglide/messages.js'
import type { Program } from '#/features/programs/types'

/** Spotlight card for one program; the whole card links to its page. */
export function ProgramCard({ program }: { program: Program }) {
  const ready = ProgramHelper.isReady(program)
  const image = ProgramHelper.image(program)

  return (
    <SpotlightCard className="group overflow-hidden rounded-3xl border border-line bg-surface transition duration-300 ease-snappy hover:-translate-y-1 hover:border-line-strong hover:shadow-card-lg">
      <Link
        to="/programs/$code"
        params={{ code: program.code }}
        className="relative flex h-full flex-col gap-5 p-4 pb-6 text-ink hover:no-underline"
      >
        {image ? (
          <div className="overflow-hidden rounded-2xl bg-raised">
            <img
              src={image}
              alt=""
              loading="lazy"
              width={1600}
              height={900}
              className="aspect-video w-full object-cover transition-transform duration-700 ease-snappy group-hover:scale-105"
            />
          </div>
        ) : null}
        <div className="flex items-center justify-between px-2">
          <span className="rounded-lg bg-primary px-2.5 py-1.5 font-mono text-sm font-semibold text-surface">
            {program.code}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              ready
                ? 'bg-pastel-mint text-pastel-mint-ink'
                : 'bg-tint text-faint'
            }`}
          >
            {ready ? m.program_status_full() : m.program_status_soon()}
          </span>
        </div>
        <div className="px-2">
          <div className="text-xl leading-snug font-semibold">
            {program.name}
          </div>
          <div className="mt-1 text-sm leading-snug text-muted">
            {program.fullName}
          </div>
        </div>
        <div className="mt-auto flex items-center gap-4 px-2 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <CalendarBlankIcon className="size-4 text-faint" />
            {m.program_duration({
              years: program.durationYears,
              semesters: program.durationYears * 2,
            })}
          </span>
          {ready ? (
            <span className="flex items-center gap-1.5">
              <BooksIcon className="size-4 text-faint" />
              {FormatHelper.subjectCount(ProgramHelper.subjectCount(program))}
            </span>
          ) : null}
          <span className="ml-auto grid size-9 place-items-center rounded-full border border-line bg-surface transition duration-500 ease-snappy group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-surface">
            <ArrowUpRightIcon className="size-4" />
          </span>
        </div>
      </Link>
    </SpotlightCard>
  )
}
