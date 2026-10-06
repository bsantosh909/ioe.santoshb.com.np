import { FilePdfIcon } from '@phosphor-icons/react'
import { SpotlightCard } from '#/components/fx/SpotlightCard'
import { ExternalButtonLink } from '#/components/ui/ExternalButtonLink'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { m } from '#/paraglide/messages.js'
import type { OldQuestionSet } from '#/features/courses/types'

interface OldQuestionSetCardProps {
  courseTitle: string
  set: OldQuestionSet
}

/** One compiled past-paper PDF: curriculum, placement, year span and link. */
export function OldQuestionSetCard({
  courseTitle,
  set,
}: OldQuestionSetCardProps) {
  const isNew = set.curriculum === 'new'
  const details = [
    set.year != null && set.part != null
      ? `${FormatHelper.yearLabel(set.year)}, ${FormatHelper.semesterLabel(set.part)}`
      : m.table_elective(),
    set.programs,
    set.pages != null ? m.oldq_pages({ count: set.pages }) : undefined,
  ].filter((detail): detail is string => Boolean(detail))
  const years = FormatHelper.examYears(set.years)

  return (
    <SpotlightCard className="rounded-3xl border border-line bg-surface shadow-card transition duration-300 ease-snappy hover:border-line-strong">
      <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-pastel-rose text-pastel-rose-ink">
          <FilePdfIcon weight="duotone" className="size-7" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isNew
                  ? 'bg-pastel-mint text-pastel-mint-ink'
                  : 'bg-tint text-muted'
              }`}
            >
              {isNew ? m.oldq_curriculum_new() : m.oldq_curriculum_old()}
            </span>
            {years ? (
              <span className="font-mono text-sm font-semibold text-primary">
                {years}
              </span>
            ) : null}
          </div>
          <h3 className="text-lg font-semibold text-ink">
            {m.oldq_set_title({ course: courseTitle })}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {details.map((detail) => (
              <span
                key={detail}
                className="rounded-md bg-raised px-2 py-0.5 text-xs text-muted ring-1 ring-line"
              >
                {detail}
              </span>
            ))}
          </div>
        </div>
        <ExternalButtonLink
          href={set.url}
          variant="accent"
          className="shrink-0"
        >
          {m.oldq_open()}
        </ExternalButtonLink>
      </div>
    </SpotlightCard>
  )
}
