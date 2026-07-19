import { Outlet, getRouteApi, notFound } from '@tanstack/react-router'
import { TabBar } from '#/components/ui/TabBar'
import { CourseHero } from '#/features/courses/components/CourseHero'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'
import type { CourseMeta } from '#/features/courses/types'
import type { CourseOffering } from '#/features/courses/helpers/course-helper'

interface CourseLoaderData {
  course: CourseMeta
  offerings: Array<CourseOffering>
}

/** Loader for the course detail layout route. */
export function courseLayoutLoader({
  params,
}: {
  params: { slug: string }
}): CourseLoaderData {
  const course = CourseHelper.bySlug(params.slug)
  if (!course) throw notFound()
  return { course, offerings: CourseHelper.offerings(params.slug) }
}

type CourseTab = 'overview' | 'syllabus' | 'old-questions'

/** Full document title base (with code) shared by every tab. */
function courseTitleBase(course: CourseMeta): string {
  return course.code ? `${course.title} (${course.code})` : course.title
}

/**
 * Per-tab head for a course page. Each tab gets its own title, description and
 * self-referential canonical so the syllabus and old-questions views are not
 * indexed as duplicates of the overview.
 */
function courseTabHead(slug: string, tab: CourseTab) {
  const course = CourseHelper.bySlug(slug)
  if (!course) return {}
  const offerings = CourseHelper.offerings(slug)
  const base = `/courses/${course.slug}`
  const titleBase = courseTitleBase(course)
  const crumbs = [
    { label: m.nav_home(), path: '/' },
    { label: m.label_courses(), path: '/courses' },
    { label: course.title, path: base },
  ]

  if (tab === 'overview') {
    return {
      meta: SeoHelper.meta({
        title: course.seoTitle ?? titleBase,
        description:
          course.seoDescription ??
          SeoHelper.courseDescription(course, offerings),
        path: base,
        type: 'article' as const,
      }),
      links: SeoHelper.canonical(base),
      scripts: [
        SeoHelper.courseJsonLd(course, offerings),
        SeoHelper.breadcrumbJsonLd(crumbs),
      ],
    }
  }

  const config =
    tab === 'syllabus'
      ? {
          path: `${base}/syllabus`,
          title:
            course.seoSyllabusTitle ??
            m.seo_course_syllabus_title({ title: titleBase }),
          description:
            course.seoSyllabusDescription ??
            m.seo_course_syllabus_desc({ title: course.title }),
          crumb: m.tab_syllabus(),
        }
      : {
          path: `${base}/old-questions`,
          title:
            course.seoOldqTitle ??
            m.seo_course_oldq_title({ title: titleBase }),
          description:
            course.seoOldqDescription ??
            m.seo_course_oldq_desc({ title: course.title }),
          crumb: m.tab_old_questions(),
        }

  return {
    meta: SeoHelper.meta({
      title: config.title,
      description: config.description,
      path: config.path,
      type: 'article' as const,
    }),
    links: SeoHelper.canonical(config.path),
    scripts: [
      SeoHelper.breadcrumbJsonLd([
        ...crumbs,
        { label: config.crumb, path: config.path },
      ]),
    ],
  }
}

/** Head for the course overview tab. */
export const courseOverviewHead = ({ params }: { params: { slug: string } }) =>
  courseTabHead(params.slug, 'overview')

/** Head for the course syllabus tab. */
export const courseSyllabusHead = ({ params }: { params: { slug: string } }) =>
  courseTabHead(params.slug, 'syllabus')

/** Head for the course old-questions tab. */
export const courseOldQuestionsHead = ({
  params,
}: {
  params: { slug: string }
}) => courseTabHead(params.slug, 'old-questions')

const COURSE_TABS = [
  { to: '/courses/$slug' as const, label: () => m.tab_overview(), exact: true },
  { to: '/courses/$slug/syllabus' as const, label: () => m.tab_syllabus() },
  {
    to: '/courses/$slug/old-questions' as const,
    label: () => m.tab_old_questions(),
  },
]

const route = getRouteApi('/courses/$slug')

/** Layout for course detail pages: navy hero with tab navigation. */
export function CourseLayout() {
  const { course } = route.useLoaderData()

  return (
    <>
      <CourseHero course={course} />
      <TabBar items={COURSE_TABS} params={{ slug: course.slug }} />
      <Outlet />
    </>
  )
}
