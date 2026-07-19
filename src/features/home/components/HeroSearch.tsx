import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { SearchIcon } from '#/components/ui/SearchIcon'
import { SearchHelper } from '#/features/courses/helpers/search-helper'
import { m } from '#/paraglide/messages.js'

/** Hero search box with a live subject-result dropdown. */
export function HeroSearch() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const results = useMemo(
    () => SearchHelper.coursesWithPlacement(query, 6),
    [query],
  )
  const open = focused && query.trim().length > 0

  return (
    <div className="relative max-w-xl">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5.5 -translate-y-1/2 text-on-primary-faint" />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder={m.home_search_placeholder()}
        className="h-14 w-full rounded-xl border border-surface/20 bg-surface/10 pr-4 pl-12.5 text-base text-surface outline-none placeholder:text-on-primary-faint focus:border-surface/40"
      />
      {open ? (
        <div className="absolute top-16 right-0 left-0 z-10 overflow-hidden rounded-xl border border-line bg-surface text-ink shadow-pop">
          {results.map(({ course, placement }) => (
            <Link
              key={course.slug}
              to="/courses/$slug"
              params={{ slug: course.slug }}
              className="flex items-center gap-3 border-b border-line-soft px-4 py-3 text-ink hover:bg-raised hover:no-underline"
            >
              <span className="min-w-14 rounded-md bg-wash px-2 py-1 text-center font-mono text-xs font-semibold text-primary">
                {course.code ?? '—'}
              </span>
              <span className="flex flex-col leading-snug">
                <span className="text-sm font-medium">{course.title}</span>
                <span className="text-xs text-faint">{placement}</span>
              </span>
            </Link>
          ))}
          {results.length === 0 ? (
            <div className="px-4 py-4 text-sm text-faint">
              {m.home_search_no_match({ query })}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
