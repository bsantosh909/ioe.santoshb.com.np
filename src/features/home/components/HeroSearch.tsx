import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRightIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
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
    <div className="relative">
      <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-4 size-5.5 -translate-y-1/2 text-faint" />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder={m.home_search_placeholder()}
        className="h-15 w-full rounded-xl bg-surface pr-4 pl-12.5 text-base text-ink outline-none placeholder:text-faint"
      />
      {open ? (
        <div className="absolute top-16 right-0 left-0 z-10 overflow-hidden rounded-xl border border-line bg-surface p-1.5 text-ink shadow-pop motion-safe:animate-toast-in">
          {results.map(({ course, placement }) => (
            <Link
              key={course.slug}
              to="/courses/$slug"
              params={{ slug: course.slug }}
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-ink transition-colors duration-150 hover:bg-wash hover:no-underline"
            >
              <span className="min-w-18 shrink-0 rounded-md bg-wash px-2 py-1 text-center font-mono text-xs font-semibold text-primary">
                {course.code ?? '-'}
              </span>
              <span className="flex min-w-0 flex-1 flex-col leading-snug">
                <span className="text-sm font-medium">{course.title}</span>
                <span className="text-xs text-faint">{placement}</span>
              </span>
              <ArrowRightIcon className="size-4 shrink-0 text-faint opacity-0 transition duration-200 ease-snappy group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          ))}
          {results.length === 0 ? (
            <div className="px-3 py-3 text-sm text-muted">
              {m.home_search_no_match({ query })}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
