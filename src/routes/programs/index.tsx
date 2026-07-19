import { createFileRoute } from '@tanstack/react-router'
import {
  ProgramsPage,
  programsPageHead,
} from '#/features/programs/components/ProgramsPage'

export const Route = createFileRoute('/programs/')({
  head: programsPageHead,
  component: ProgramsPage,
})
