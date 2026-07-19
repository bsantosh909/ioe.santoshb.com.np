import { createFileRoute } from '@tanstack/react-router'
import { ProgramSubjectsPage } from '#/features/programs/components/ProgramSubjectsPage'
import { programSubjectsHead } from '#/features/programs/components/ProgramLayout'

export const Route = createFileRoute('/programs/$code/subjects')({
  head: programSubjectsHead,
  component: ProgramSubjectsPage,
})
