import { createFileRoute } from '@tanstack/react-router'
import {
  ContributePage,
  contributePageHead,
} from '#/features/contribute/components/ContributePage'

export const Route = createFileRoute('/contribute/')({
  head: contributePageHead,
  component: ContributePage,
})
