import { Link, useLocation } from '@tanstack/react-router'
import { CaretRightIcon } from '@phosphor-icons/react'
import { Container } from '#/components/ui/Container'
import { CollegeHelper } from '#/features/colleges/helpers/college-helper'
import { CourseHelper } from '#/features/courses/helpers/course-helper'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { m } from '#/paraglide/messages.js'

interface Crumb {
  label: string
  to?: string
}

const SECTION_LABELS: Record<string, (() => string) | undefined> = {
  programs: () => m.label_programs(),
  courses: () => m.label_courses(),
  colleges: () => m.label_colleges(),
  links: () => m.label_links(),
  about: () => m.label_about(),
  contact: () => m.label_contact(),
  contribute: () => m.label_contribute(),
  privacy: () => m.label_privacy(),
  terms: () => m.label_terms(),
}

const COURSE_TAB_LABELS: Record<string, (() => string) | undefined> = {
  syllabus: () => m.tab_syllabus(),
  'old-questions': () => m.tab_old_questions(),
}

const PROGRAM_TAB_LABELS: Record<string, (() => string) | undefined> = {
  subjects: () => m.tab_subjects(),
  scope: () => m.tab_scope(),
}

function buildCrumbs(pathname: string): Array<Crumb> {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return []

  const [section, ...rest] = segments
  const crumbs: Array<Crumb> = [{ label: m.nav_home(), to: '/' }]
  const sectionLabel = SECTION_LABELS[section]
  if (!sectionLabel) return []
  crumbs.push({
    label: sectionLabel(),
    to: rest.length > 0 ? `/${section}` : undefined,
  })

  if (section === 'programs' && rest.length > 0) {
    const [code, tab] = rest
    const program = ProgramHelper.byCode(code)
    crumbs.push({
      label: program?.code ?? code,
      to: tab ? `/programs/${code}` : undefined,
    })
    const tabLabel = tab ? PROGRAM_TAB_LABELS[tab] : undefined
    if (tabLabel) {
      crumbs.push({ label: tabLabel() })
    }
  }

  if (section === 'courses' && rest.length > 0) {
    const [slug, tab] = rest
    const course = CourseHelper.bySlug(slug)
    const courseLabel = course?.code ?? course?.title ?? slug
    crumbs.push({
      label: courseLabel,
      to: tab ? `/courses/${slug}` : undefined,
    })
    const tabLabel = tab ? COURSE_TAB_LABELS[tab] : undefined
    if (tabLabel) {
      crumbs.push({ label: tabLabel() })
    }
  }

  if (section === 'colleges' && rest.length > 0) {
    const college = CollegeHelper.bySlug(rest[0])
    crumbs.push({ label: college?.shortName ?? college?.name ?? rest[0] })
  }

  return crumbs
}

/** Breadcrumb bar shown under the app header on every non-home page. */
export function Breadcrumbs() {
  const { pathname } = useLocation()
  const crumbs = buildCrumbs(pathname)
  if (crumbs.length === 0) return null

  return (
    <div className="border-b border-line bg-surface">
      <Container className="flex flex-wrap items-center gap-1.5 py-2.5 text-sm">
        {crumbs.map((crumb, index) => (
          <span
            key={`${crumb.label}-${index}`}
            className="flex items-center gap-1.5"
          >
            {index > 0 ? (
              <CaretRightIcon className="size-3 text-faint" />
            ) : null}
            {crumb.to ? (
              <Link
                to={crumb.to}
                className="rounded-md px-1.5 py-0.5 text-faint transition-colors duration-200 hover:bg-wash hover:text-ink hover:no-underline"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="px-1.5 font-semibold text-ink">
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </Container>
    </div>
  )
}
