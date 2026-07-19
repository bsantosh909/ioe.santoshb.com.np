import { createContext, useCallback, useContext, useRef, useState } from 'react'

interface ToastContextValue {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => undefined,
})

/** Access the toast trigger from anywhere below `ToastProvider`. */
export function useToast(): ToastContextValue {
  return useContext(ToastContext)
}

/** App-wide toast host: fixed bottom-center message with auto-dismiss. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const showToast = useCallback((next: string) => {
    setMessage(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMessage(null), 2600)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message ? (
        <div className="animate-toast-in fixed bottom-7 left-1/2 z-50 flex max-w-lg -translate-x-1/2 items-center gap-3 rounded-xl bg-primary px-5 py-3.5 text-sm text-surface shadow-toast">
          <span className="grid size-6 place-items-center rounded-full bg-success text-sm">
            ✓
          </span>
          {message}
        </div>
      ) : null}
    </ToastContext.Provider>
  )
}
