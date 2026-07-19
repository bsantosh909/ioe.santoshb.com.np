import { useEffect } from 'react'
import { Outlet, useRouter } from '@tanstack/react-router'
import { AppFooter } from '#/components/layout/AppFooter'
import { AppHeader } from '#/components/layout/AppHeader'
import { Breadcrumbs } from '#/components/layout/Breadcrumbs'
import { ToastProvider } from '#/components/providers/ToastProvider'
import { Gtm } from '#/features/analytics/lib/gtm'

/** App shell: header, breadcrumbs, routed page and footer. */
export function RootLayout() {
  const router = useRouter()

  // SPA navigations don't reload the page — push a GTM page_view per route.
  useEffect(() => {
    return router.subscribe('onResolved', ({ toLocation }) => {
      Gtm.pageView(toLocation.pathname)
    })
  }, [router])

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <Breadcrumbs />
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </ToastProvider>
  )
}
