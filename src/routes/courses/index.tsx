import { createFileRoute } from '@tanstack/react-router'
import {
  CoursesPage,
  coursesPageHead,
} from '#/features/courses/components/CoursesPage'

export const Route = createFileRoute('/courses/')({
  head: coursesPageHead,
  component: CoursesPage,
})
