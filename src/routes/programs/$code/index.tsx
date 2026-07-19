import { createFileRoute } from '@tanstack/react-router'
import { ProgramOverviewPage } from '#/features/programs/components/ProgramOverviewPage'
import { programOverviewHead } from '#/features/programs/components/ProgramLayout'

export const Route = createFileRoute('/programs/$code/')({
  head: programOverviewHead,
  component: ProgramOverviewPage,
})
