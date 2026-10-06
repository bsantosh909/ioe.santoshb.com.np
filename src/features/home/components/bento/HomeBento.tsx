import { BoldCopyTile } from '#/features/home/components/bento/BoldCopyTile'
import { ChartTile } from '#/features/home/components/bento/ChartTile'
import { ContributeTile } from '#/features/home/components/bento/ContributeTile'
import { LinksTile } from '#/features/home/components/bento/LinksTile'
import { OldQuestionsTile } from '#/features/home/components/bento/OldQuestionsTile'
import { ProgramsTile } from '#/features/home/components/bento/ProgramsTile'
import { SearchTile } from '#/features/home/components/bento/SearchTile'
import { SyllabiTile } from '#/features/home/components/bento/SyllabiTile'

/**
 * Eight-cell bento after Animata's "Eight" layout: four columns by three
 * rows on desktop (1+2+1 / 2+2 / 1+1+2), two columns on tablets.
 */
export function HomeBento() {
  return (
    <div className="grid grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-3">
      <ProgramsTile />
      <SyllabiTile />
      <SearchTile />
      <OldQuestionsTile />
      <BoldCopyTile />
      <ChartTile />
      <LinksTile />
      <ContributeTile />
    </div>
  )
}
