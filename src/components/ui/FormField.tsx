interface FormFieldProps {
  label: string
  className?: string
  children: React.ReactNode
}

/** Labeled wrapper for form controls. */
export function FormField({ label, className = '', children }: FormFieldProps) {
  return (
    <label
      className={`flex flex-col gap-1.5 text-sm font-semibold text-body ${className}`}
    >
      {label}
      {children}
    </label>
  )
}
