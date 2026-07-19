import { Outlet } from '@tanstack/react-router'
import { AppFooter } from '#/components/layout/AppFooter'
import { AppHeader } from '#/components/layout/AppHeader'
import { Breadcrumbs } from '#/components/layout/Breadcrumbs'
import { ToastProvider } from '#/components/providers/ToastProvider'

/** App shell: header, breadcrumbs, routed page and footer. */
export function RootLayout() {
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
