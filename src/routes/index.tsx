import { createFileRoute } from '@tanstack/react-router'
import { HomePage, homePageHead } from '#/features/home/components/HomePage'

export const Route = createFileRoute('/')({
  head: homePageHead,
  component: HomePage,
})
