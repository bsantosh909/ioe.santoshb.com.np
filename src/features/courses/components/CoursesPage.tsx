import { useMemo, useState } from 'react'
import { Container } from '#/components/ui/Container'
import { EmptyState } from '#/components/ui/EmptyState'
import { SearchInput } from '#/components/ui/SearchInput'
import { CourseTable } from '#/features/courses/components/CourseTable'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { SearchHelper } from '#/features/courses/helpers/search-helper'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'

/** Head for the courses list route. */
export function coursesPageHead() {
  return {
    meta: SeoHelper.meta({
      title: m.courses_title(),
      description: m.seo_courses_desc(),
      path: '/courses',
    }),
    links: SeoHelper.canonical('/courses'),
  }
}

/** Searchable catalogue of every course. */
export function CoursesPage() {
  const [query, setQuery] = useState('')
  const courses = useMemo(
    () => (query.trim() ? SearchHelper.courses(query) : CourseHelper.all()),
    [query],
  )

  return (
    <Container as="section" className="pt-10 pb-15">
      <h1 className="mb-1.5 font-serif text-3xl font-semibold">
        {m.courses_title()}
      </h1>
      <p className="mb-5 max-w-2xl text-muted">{m.courses_subtitle()}</p>
      <div className="mb-6 max-w-lg">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={m.courses_search_placeholder()}
        />
      </div>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-lg font-semibold">{m.courses_all()}</h2>
        <span className="text-sm text-faint">
          {FormatHelper.courseCount(courses.length)}
        </span>
      </div>
      {courses.length === 0 ? (
        <EmptyState
          icon="🔍"
          title={m.courses_empty_title({ query })}
          description={m.courses_empty_desc()}
        />
      ) : (
        <CourseTable courses={courses} />
      )}
    </Container>
  )
}
