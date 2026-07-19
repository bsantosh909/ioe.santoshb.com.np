import { createFileRoute } from '@tanstack/react-router'
import { CourseSyllabusPage } from '#/features/courses/components/CourseSyllabusPage'
import { courseSyllabusHead } from '#/features/courses/components/CourseLayout'

export const Route = createFileRoute('/courses/$slug/syllabus')({
  head: courseSyllabusHead,
  component: CourseSyllabusPage,
})
