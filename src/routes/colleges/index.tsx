import { createFileRoute } from '@tanstack/react-router'
import {
  CollegesPage,
  collegesPageHead,
  collegesPageSearch,
} from '#/features/colleges/components/CollegesPage'

export const Route = createFileRoute('/colleges/')({
  validateSearch: collegesPageSearch,
  head: collegesPageHead,
  component: CollegesPage,
})
