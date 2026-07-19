import { createFileRoute } from '@tanstack/react-router'
import {
  PrivacyPage,
  privacyPageHead,
} from '#/features/legal/components/PrivacyPage'

export const Route = createFileRoute('/privacy/')({
  head: privacyPageHead,
  component: PrivacyPage,
})
