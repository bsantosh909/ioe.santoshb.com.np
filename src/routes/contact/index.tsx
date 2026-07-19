import { createFileRoute } from '@tanstack/react-router'
import {
  ContactPage,
  contactPageHead,
} from '#/features/contact/components/ContactPage'

export const Route = createFileRoute('/contact/')({
  head: contactPageHead,
  component: ContactPage,
})
