import { SITE } from '#/data/site'
import {
  SEO_DESCRIPTION_MAX,
  SEO_TITLE_BRAND,
  SEO_TITLE_MAX,
} from '#/lib/constants/seo'
import { FormatHelper } from '#/lib/helpers/format-helper'
import { m } from '#/paraglide/messages.js'
import type { CourseMeta } from '#/features/courses/types'
import type { CourseOffering } from '#/features/courses/helpers/course-helper'
import type { Program } from '#/features/programs/types'
import type { College } from '#/features/colleges/types'

/** Input for building a page's meta tag set. */
export interface SeoInput {
  /** Page title without the site suffix. Omit for the site root. */
  title?: string
  description?: string
  /** Path beginning with `/`, used for canonical and og:url. */
  path: string
  type?: 'website' | 'article'
}

type MetaTag = Record<string, string>
type LinkTag = Record<string, string>
type ScriptTag = { type: string; children: string }

/** Builds SEO meta tags and schema.org JSON-LD from route data. */
export class SeoHelper {
  /** Absolute URL for a site path. */
  static url(path: string): string {
    return `${SITE.url}${path === '/' ? '' : path}`
  }

  /** Full document title with the short brand suffix. */
  static title(title?: string): string {
    return title
      ? `${title} | ${SEO_TITLE_BRAND}`
      : `${SITE.name} — ${m.seo_site_title_suffix()}`
  }

  /**
   * First candidate whose rendered `<title>` fits `SEO_TITLE_MAX`, so long
   * course names degrade to shorter variants instead of being truncated in
   * the results. Falls back to the last (shortest) candidate.
   */
  static fitTitle(candidates: Array<string>): string {
    return (
      candidates.find(
        (candidate) => SeoHelper.title(candidate).length <= SEO_TITLE_MAX,
      ) ?? candidates[candidates.length - 1]
    )
  }

  /** Cuts a description to a word boundary within `SEO_DESCRIPTION_MAX`. */
  static clip(text: string): string {
    if (text.length <= SEO_DESCRIPTION_MAX) return text
    const cut = text.slice(0, SEO_DESCRIPTION_MAX - 1)
    const lastSpace = cut.lastIndexOf(' ')
    const body = (
      lastSpace > SEO_DESCRIPTION_MAX * 0.6 ? cut.slice(0, lastSpace) : cut
    ).replace(/[\s,;:.\-–—]+$/, '')
    return `${body}…`
  }

  /** Standard, Open Graph and Twitter meta tags for a page. */
  static meta(input: SeoInput): Array<MetaTag> {
    const title = SeoHelper.title(input.title)
    const description = input.description ?? SITE.description
    return [
      { title },
      { name: 'description', content: description },
      { name: 'author', content: SITE.author.name },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:type', content: input.type ?? 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: SeoHelper.url(input.path) },
      { property: 'og:locale', content: SITE.locale },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ]
  }

  /** Canonical link tag for a page. */
  static canonical(path: string): Array<LinkTag> {
    return [{ rel: 'canonical', href: SeoHelper.url(path) }]
  }

  /** Serializes a schema.org object into a head script tag. */
  static jsonLd(schema: Record<string, unknown>): ScriptTag {
    return {
      type: 'application/ld+json',
      children: JSON.stringify({ '@context': 'https://schema.org', ...schema }),
    }
  }

  /** WebSite schema with search action, for the site root. */
  static websiteJsonLd(): ScriptTag {
    return SeoHelper.jsonLd({
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      author: {
        '@type': 'Person',
        name: SITE.author.name,
        url: SITE.author.url,
      },
    })
  }

  /** Course schema for a course detail page. */
  static courseJsonLd(
    course: CourseMeta,
    offerings: Array<CourseOffering>,
  ): ScriptTag {
    return SeoHelper.jsonLd({
      '@type': 'Course',
      name: course.title,
      courseCode: course.code ?? undefined,
      description: course.objective || undefined,
      url: SeoHelper.url(`/courses/${course.slug}`),
      provider: {
        '@type': 'CollegeOrUniversity',
        name: SITE.organization.name,
        url: SITE.organization.url,
      },
      isPartOf: offerings.map((offering) => ({
        '@type': 'EducationalOccupationalProgram',
        name: offering.programName,
        identifier: offering.programCode,
        url: SeoHelper.url(`/programs/${offering.programCode}`),
      })),
    })
  }

  /** EducationalOccupationalProgram schema for a program detail page. */
  static programJsonLd(program: Program): ScriptTag {
    return SeoHelper.jsonLd({
      '@type': 'EducationalOccupationalProgram',
      name: program.fullName,
      identifier: program.code,
      description: program.description,
      url: SeoHelper.url(`/programs/${program.code}`),
      timeToComplete: `P${program.durationYears}Y`,
      provider: {
        '@type': 'CollegeOrUniversity',
        name: SITE.organization.name,
        url: SITE.organization.url,
      },
    })
  }

  /** CollegeOrUniversity schema for a college detail page. */
  static collegeJsonLd(college: College): ScriptTag {
    return SeoHelper.jsonLd({
      '@type': 'CollegeOrUniversity',
      name: college.name,
      ...(college.shortName ? { alternateName: college.shortName } : {}),
      url: SeoHelper.url(`/colleges/${college.slug}`),
      ...(college.website ? { sameAs: college.website } : {}),
      ...(college.established
        ? { foundingDate: String(college.established) }
        : {}),
      address: {
        '@type': 'PostalAddress',
        addressLocality: college.location.city,
        addressRegion: college.location.province,
        addressCountry: 'NP',
      },
      parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: SITE.organization.name,
        url: SITE.organization.url,
      },
    })
  }

  /** BreadcrumbList schema from (label, path) pairs. */
  static breadcrumbJsonLd(
    crumbs: Array<{ label: string; path: string }>,
  ): ScriptTag {
    return SeoHelper.jsonLd({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: SeoHelper.url(crumb.path),
      })),
    })
  }

  /** Descriptive meta description for a course page. */
  static courseDescription(
    course: CourseMeta,
    offerings: Array<CourseOffering>,
  ): string {
    const placement = offerings
      .filter((offering) => !offering.elective)
      .map((offering) =>
        FormatHelper.placementLabel(
          offering.programCode,
          offering.year,
          offering.part,
        ),
      )
      .join(', ')
    const intro = m.seo_course_intro({
      title: `${course.title}${course.code ? ` (${course.code})` : ''}`,
    })
    return SeoHelper.clip(
      placement
        ? m.seo_course_offered({ intro, placement })
        : m.seo_course_plain({ intro }),
    )
  }

  /** Overview title, aimed at "<course> ioe syllabus / old questions" searches. */
  static courseOverviewTitle(course: CourseMeta): string {
    return SeoHelper.fitTitle([
      m.seo_course_overview_title_full({ title: course.title }),
      m.seo_course_overview_title_short({ title: course.title }),
      ...(course.code ? [`${course.title} (${course.code})`] : []),
      course.title,
    ])
  }

  /**
   * Old-questions title. Keeps the established "<Title> (<CODE>) — Old
   * Questions" wording, dropping the code and then the dash for long names.
   */
  static courseOldqTitle(course: CourseMeta): string {
    return SeoHelper.fitTitle([
      ...(course.code
        ? [
            m.seo_course_oldq_title({
              title: `${course.title} (${course.code})`,
            }),
          ]
        : []),
      m.seo_course_oldq_title({ title: course.title }),
      m.seo_course_oldq_title_short({ title: course.title }),
    ])
  }

  /** Syllabus-tab title: leads with "<course> Syllabus", code when it fits. */
  static courseSyllabusTitle(course: CourseMeta): string {
    const title = course.title
    return SeoHelper.fitTitle([
      ...(course.code
        ? [
            m.seo_course_syllabus_title_full({ title, code: course.code }),
            m.seo_course_syllabus_title_code({ title, code: course.code }),
          ]
        : []),
      m.seo_course_syllabus_title({ title }),
    ])
  }

  /** Syllabus-tab description listing the unit headings when known. */
  static courseSyllabusDescription(course: CourseMeta): string {
    if (course.units.length === 0) {
      return m.seo_course_syllabus_desc({ title: course.title })
    }
    return SeoHelper.clip(
      m.seo_course_syllabus_units_desc({
        title: course.title,
        count: course.units.length,
        units: course.units.join(', '),
      }),
    )
  }

  /** Old-questions description, naming the exam-year span when known. */
  static courseOldqDescription(
    course: CourseMeta,
    years: { from: number; to: number } | undefined,
    count: number,
  ): string {
    if (count === 0) return m.seo_course_oldq_desc({ title: course.title })
    return SeoHelper.clip(
      years
        ? m.seo_course_oldq_years_desc({
            title: course.title,
            years:
              years.from === years.to
                ? String(years.from)
                : `${years.from}–${years.to}`,
          })
        : m.seo_course_oldq_sources_desc({ title: course.title }),
    )
  }
}
