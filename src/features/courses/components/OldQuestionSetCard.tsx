import { ExternalButtonLink } from '#/components/ui/ExternalButtonLink'
import { Tag } from '#/components/ui/Tag'
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
  const details = [
    set.year != null && set.part != null
      ? `${FormatHelper.yearLabel(set.year)} · ${FormatHelper.semesterLabel(set.part)}`
      : m.table_elective(),
    set.programs,
    FormatHelper.examYears(set.years),
    set.pages != null ? m.oldq_pages({ count: set.pages }) : undefined,
  ].filter(Boolean)

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="mb-2">
          <Tag tone={set.curriculum === 'new' ? 'success' : 'neutral'}>
            {set.curriculum === 'new'
              ? m.oldq_curriculum_new()
              : m.oldq_curriculum_old()}
          </Tag>
        </div>
        <h3 className="font-serif text-lg font-semibold text-ink">
          {m.oldq_set_title({ course: courseTitle })}
        </h3>
        <p className="mt-1 text-sm text-muted">{details.join(' · ')}</p>
      </div>
      <ExternalButtonLink href={set.url} variant="outline" size="sm">
        {m.oldq_open()}
      </ExternalButtonLink>
    </div>
  )
}
