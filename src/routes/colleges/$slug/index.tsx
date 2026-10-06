import { createFileRoute } from '@tanstack/react-router'
import {
  CollegeDetailPage,
  collegeDetailHead,
  collegeDetailLoader,
} from '#/features/colleges/components/CollegeDetailPage'

export const Route = createFileRoute('/colleges/$slug/')({
  loader: collegeDetailLoader,
  head: collegeDetailHead,
  component: CollegeDetailPage,
})
