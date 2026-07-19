import { SearchIcon } from '#/components/ui/SearchIcon'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  onFocus?: () => void
}

/** Rounded search field with a leading magnifier glyph. */
export function SearchInput({
  value,
  onChange,
  placeholder,
  onFocus,
}: SearchInputProps) {
  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-faint" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-line bg-surface pr-3.5 pl-10 text-ink outline-none placeholder:text-faint focus:border-line-strong"
      />
    </div>
  )
}
