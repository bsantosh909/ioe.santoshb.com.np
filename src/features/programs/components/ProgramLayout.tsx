import { Outlet, getRouteApi, notFound, redirect } from '@tanstack/react-router'
import { TabBar } from '#/components/ui/TabBar'
import { ProgramHero } from '#/features/programs/components/ProgramHero'
import { ProgramHelper } from '#/features/programs/helpers/program-helper'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'

/**
 * Loader for the program detail layout route. Codes match case-insensitively,
 * so non-canonical casing (`/programs/bct`) is 301-redirected to the canonical
 * code to avoid duplicate URLs in the index.
 */
export function programLayoutLoader({
  params,
  location,
}: {
  params: { code: string }
  location: { pathname: string }
}) {
  const program = ProgramHelper.byCode(params.code)
  if (!program) throw notFound()
  if (params.code !== program.code) {
    throw redirect({
      href: location.pathname.replace(
        `/programs/${params.code}`,
        `/programs/${program.code}`,
      ),
      statusCode: 301,
    })
  }
  return { program }
}

type ProgramTab = 'overview' | 'subjects' | 'scope'

/**
 * Per-tab head for a program page. Each tab gets its own title, description and
 * self-referential canonical so the subjects and scope views are not indexed as
 * duplicates of the overview.
 */
function programTabHead(code: string, tab: ProgramTab) {
  const program = ProgramHelper.byCode(code)
  if (!program) return {}
  const base = `/programs/${program.code}`
  const titleBase = `${program.name} (${program.code})`
  const crumbs = [
    { label: m.nav_home(), path: '/' },
    { label: m.label_programs(), path: '/programs' },
    { label: program.code, path: base },
  ]

  if (tab === 'overview') {
    return {
      meta: SeoHelper.meta({
        title: program.seoTitle ?? titleBase,
        description:
          program.seoDescription ??
          m.seo_program_desc({
            fullName: program.fullName,
            description: program.description,
          }),
        path: base,
      }),
      links: SeoHelper.canonical(base),
      scripts: [
        SeoHelper.programJsonLd(program),
        SeoHelper.breadcrumbJsonLd(crumbs),
      ],
    }
  }

  const config =
    tab === 'subjects'
      ? {
          path: `${base}/subjects`,
          title:
            program.seoSubjectsTitle ??
            m.seo_program_subjects_title({ name: titleBase }),
          description:
            program.seoSubjectsDescription ??
            m.seo_program_subjects_desc({
              fullName: program.fullName,
              code: program.code,
            }),
          crumb: m.tab_subjects(),
        }
      : {
          path: `${base}/scope`,
          title:
            program.seoScopeTitle ??
            m.seo_program_scope_title({ name: titleBase }),
          description:
            program.seoScopeDescription ??
            m.seo_program_scope_desc({
              fullName: program.fullName,
              code: program.code,
            }),
          crumb: m.tab_scope(),
        }

  return {
    meta: SeoHelper.meta({
      title: config.title,
      description: config.description,
      path: config.path,
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

/** Head for the program overview tab. */
export const programOverviewHead = ({ params }: { params: { code: string } }) =>
  programTabHead(params.code, 'overview')

/** Head for the program subjects tab. */
export const programSubjectsHead = ({ params }: { params: { code: string } }) =>
  programTabHead(params.code, 'subjects')

/** Head for the program scope tab. */
export const programScopeHead = ({ params }: { params: { code: string } }) =>
  programTabHead(params.code, 'scope')

const PROGRAM_TABS = [
  {
    to: '/programs/$code' as const,
    label: () => m.tab_overview(),
    exact: true,
  },
  { to: '/programs/$code/subjects' as const, label: () => m.tab_subjects() },
  { to: '/programs/$code/scope' as const, label: () => m.tab_scope() },
]

const route = getRouteApi('/programs/$code')

/** Layout for program detail pages: navy hero with tab navigation. */
export function ProgramLayout() {
  const { program } = route.useLoaderData()

  return (
    <>
      <ProgramHero program={program} />
      <TabBar items={PROGRAM_TABS} params={{ code: program.code }} />
      <Outlet />
    </>
  )
}
