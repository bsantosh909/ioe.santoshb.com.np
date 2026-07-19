import { SITE } from '#/data/site'
import { m } from '#/paraglide/messages.js'
import type { Tone } from '#/lib/helpers/tone-helper'

/** A single outbound link on the Important Links page. */
export interface ExternalLink {
  label: string
  href: string
}

/** A titled group of curated external links. */
export interface LinkGroup {
  id: string
  icon: string
  title: () => string
  tone: Tone
  links: Array<ExternalLink>
}

/**
 * Curated official shortcuts. Time-sensitive information must always be
 * verified on the official source — the page shows a disclaimer for this.
 */
export const LINK_GROUPS: Array<LinkGroup> = [
  {
    id: 'ioe-official',
    icon: '📥',
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
    icon: '📅',
    title: () => m.links_group_exams(),
    tone: 'danger',
    links: [
      {
        label: 'IOE Examination Control Division',
        href: 'http://exam.ioe.edu.np',
      },
      {
        label: 'Exam Notices & Routines',
        href: 'http://exam.ioe.edu.np/notices',
      },
      { label: 'IOE Results', href: 'http://exam.ioe.edu.np/results' },
    ],
  },
  {
    id: 'academic',
    icon: '🎓',
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
    icon: '👥',
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
