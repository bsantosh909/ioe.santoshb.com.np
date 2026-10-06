import { SITE } from '#/data/site'
import { m } from '#/paraglide/messages.js'
import {
  CalendarDotsIcon,
  DownloadSimpleIcon,
  GraduationCapIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import type { Tone } from '#/lib/helpers/tone-helper'

/** A single outbound link on the Important Links page. */
export interface ExternalLink {
  label: string
  href: string
}

/** A titled group of curated external links. */
export interface LinkGroup {
  id: string
  icon: Icon
  title: () => string
  tone: Tone
  links: Array<ExternalLink>
}

/**
 * Curated official shortcuts. Time-sensitive information must always be
 * verified on the official source; the page shows a disclaimer for this.
 */
export const LINK_GROUPS: Array<LinkGroup> = [
  {
    id: 'ioe-official',
    icon: DownloadSimpleIcon,
    title: () => m.links_group_official(),
    tone: 'primary',
    links: [
      { label: 'Institute of Engineering', href: 'https://ioe.tu.edu.np' },
      {
        label: 'IOE Notices & Downloads',
        href: 'https://ioe.tu.edu.np/notices',
      },
      {
        label: 'Entrance Examination Board',
        href: 'https://entrance.ioe.edu.np',
      },
      { label: 'Pulchowk Campus', href: 'https://pcampus.edu.np' },
    ],
  },
  {
    id: 'examinations',
    icon: CalendarDotsIcon,
    title: () => m.links_group_exams(),
    tone: 'danger',
    links: [
      {
        label: 'IOE Examination Control Division',
        href: 'https://exam.ioe.tu.edu.np',
      },
      {
        label: 'Exam Notices & Routines',
        href: 'https://exam.ioe.tu.edu.np/notices',
      },
    ],
  },
  {
    id: 'academic',
    icon: GraduationCapIcon,
    title: () => m.links_group_academic(),
    tone: 'success',
    links: [
      { label: 'Tribhuvan University', href: 'https://tu.edu.np' },
      { label: 'TU Central Library', href: 'https://tucl.tu.edu.np' },
      {
        label: 'Curriculum (IOE Downloads)',
        href: 'https://ioe.tu.edu.np/downloads',
      },
    ],
  },
  {
    id: 'community',
    icon: UsersThreeIcon,
    title: () => m.links_group_community(),
    tone: 'accent',
    links: [
      {
        label: 'Report an issue / feedback',
        href: `${SITE.repository}/issues`,
      },
      { label: 'Source on GitHub', href: SITE.repository },
    ],
  },
]
