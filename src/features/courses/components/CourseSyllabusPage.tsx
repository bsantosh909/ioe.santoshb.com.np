import { FolderOpenIcon } from '@phosphor-icons/react'
import { lazy, useMemo } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { Container } from '#/components/ui/Container'
import { EmptyState } from '#/components/ui/EmptyState'
import { MdxContent } from '#/components/mdx/MdxContent'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { m } from '#/paraglide/messages.js'

const route = getRouteApi('/courses/$slug')

/** Course syllabus tab: the MDX course body. */
export function CourseSyllabusPage() {
  const { course } = route.useLoaderData()
  const loader = CourseHelper.mdxLoader(course.slug)
  const Body = useMemo(() => (loader ? lazy(loader) : null), [loader])

  return (
    <Container as="section" className="pt-8 pb-15">
      <div className="max-w-4xl">
        {Body ? (
          <MdxContent component={Body} />
        ) : (
          <EmptyState
            icon={FolderOpenIcon}
            title={m.syllabus_empty_title()}
            description={m.syllabus_empty_desc()}
          />
        )}
      </div>
    </Container>
  )
}
