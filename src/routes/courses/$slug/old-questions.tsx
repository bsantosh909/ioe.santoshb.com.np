import { createFileRoute } from '@tanstack/react-router'
import { CourseOldQuestionsPage } from '#/features/courses/components/CourseOldQuestionsPage'
import { courseOldQuestionsHead } from '#/features/courses/components/CourseLayout'

export const Route = createFileRoute('/courses/$slug/old-questions')({
  head: courseOldQuestionsHead,
  component: CourseOldQuestionsPage,
})
