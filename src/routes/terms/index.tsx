import { createFileRoute } from '@tanstack/react-router'
import { TermsPage, termsPageHead } from '#/features/legal/components/TermsPage'

export const Route = createFileRoute('/terms/')({
  head: termsPageHead,
  component: TermsPage,
})
