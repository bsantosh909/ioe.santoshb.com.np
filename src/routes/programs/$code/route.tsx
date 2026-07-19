import { createFileRoute } from '@tanstack/react-router'
import {
  ProgramLayout,
  programLayoutLoader,
} from '#/features/programs/components/ProgramLayout'

export const Route = createFileRoute('/programs/$code')({
  loader: programLayoutLoader,
  component: ProgramLayout,
})
