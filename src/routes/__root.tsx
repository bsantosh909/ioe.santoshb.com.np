import { createRootRoute } from '@tanstack/react-router'
import {
  RootDocument,
  rootDocumentHead,
} from '#/components/layout/RootDocument'
import { RootLayout } from '#/components/layout/RootLayout'
import { NotFoundPage } from '#/components/layout/NotFoundPage'

export const Route = createRootRoute({
  head: rootDocumentHead,
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})
