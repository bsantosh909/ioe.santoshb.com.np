import { createFileRoute } from '@tanstack/react-router'
import { LinksPage, linksPageHead } from '#/features/links/components/LinksPage'

export const Route = createFileRoute('/links/')({
  head: linksPageHead,
  component: LinksPage,
})
