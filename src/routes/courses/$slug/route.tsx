import { createFileRoute } from '@tanstack/react-router'
import {
  CourseLayout,
  courseLayoutLoader,
} from '#/features/courses/components/CourseLayout'

export const Route = createFileRoute('/courses/$slug')({
  loader: courseLayoutLoader,
  component: CourseLayout,
})
