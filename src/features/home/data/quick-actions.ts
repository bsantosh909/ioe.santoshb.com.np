import { m } from '#/paraglide/messages.js'
import type { Tone } from '#/lib/helpers/tone-helper'

/** A quick-action card on the home page. */
export interface QuickAction {
  icon: string
  title: () => string
  description: () => string
  to: string
  tone: Tone
}

/** Home page quick actions, in display order. */
export const QUICK_ACTIONS: Array<QuickAction> = [
  {
    icon: '🎓',
    title: () => m.qa_programs_title(),
    description: () => m.qa_programs_desc(),
    to: '/programs',
    tone: 'primary',
  },
  {
    icon: '📖',
    title: () => m.qa_courses_title(),
    description: () => m.qa_courses_desc(),
    to: '/courses',
    tone: 'success',
  },
  {
    icon: '📅',
    title: () => m.qa_routine_title(),
    description: () => m.qa_routine_desc(),
    to: '/links',
    tone: 'danger',
  },
  {
    icon: '🏆',
    title: () => m.qa_results_title(),
    description: () => m.qa_results_desc(),
    to: '/links',
    tone: 'violet',
  },
]
