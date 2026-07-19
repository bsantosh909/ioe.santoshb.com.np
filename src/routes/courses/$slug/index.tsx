import { createFileRoute } from '@tanstack/react-router'
import { CourseOverviewPage } from '#/features/courses/components/CourseOverviewPage'
import { courseOverviewHead } from '#/features/courses/components/CourseLayout'

export const Route = createFileRoute('/courses/$slug/')({
  head: courseOverviewHead,
  component: CourseOverviewPage,
})
