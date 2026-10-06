import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { GlowBorder } from '#/components/fx/GlowBorder'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  onFocus?: () => void
  /** Animated gradient border instead of the plain hairline. */
  glow?: boolean
}

/** Rounded search field with a leading magnifier glyph. */
export function SearchInput({
  value,
  onChange,
  placeholder,
  onFocus,
  glow = false,
}: SearchInputProps) {
  const field = (
    <div className="relative">
      <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-faint" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className={`h-13 w-full rounded-xl bg-surface pr-4 pl-11 text-ink outline-none placeholder:text-faint ${
          glow
            ? ''
            : 'border border-line transition-colors duration-200 focus:border-primary/40 focus:ring-4 focus:ring-primary/5'
        }`}
      />
    </div>
  )

  return glow ? <GlowBorder>{field}</GlowBorder> : field
}
