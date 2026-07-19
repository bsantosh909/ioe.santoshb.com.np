interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/** Themed multi-line text input. */
export function Textarea({ className = '', ...rest }: TextareaProps) {
  return (
    <textarea
      className={`min-h-32 resize-y rounded-lg border border-line bg-surface px-3 py-2.5 text-base font-normal text-ink outline-none placeholder:text-faint focus:border-line-strong ${className}`}
      {...rest}
    />
  )
}
