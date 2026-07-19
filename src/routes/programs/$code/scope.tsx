import { createFileRoute } from '@tanstack/react-router'
import { ProgramScopePage } from '#/features/programs/components/ProgramScopePage'
import { programScopeHead } from '#/features/programs/components/ProgramLayout'

export const Route = createFileRoute('/programs/$code/scope')({
  head: programScopeHead,
  component: ProgramScopePage,
})
