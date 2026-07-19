interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/** Themed single-line text input. */
export function Input({ className = '', ...rest }: InputProps) {
  return (
    <input
      className={`h-11 rounded-lg border border-line bg-surface px-3 text-base font-normal text-ink outline-none placeholder:text-faint focus:border-line-strong ${className}`}
      {...rest}
    />
  )
}
