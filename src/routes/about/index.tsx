import { createFileRoute } from '@tanstack/react-router'
import { AboutPage, aboutPageHead } from '#/features/about/components/AboutPage'

export const Route = createFileRoute('/about/')({
  head: aboutPageHead,
  component: AboutPage,
})
