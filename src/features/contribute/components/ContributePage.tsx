import {
  BuildingsIcon,
  CheckCircleIcon,
  FilePdfIcon,
  GithubLogoIcon,
  NotebookIcon,
  PencilSimpleLineIcon,
} from '@phosphor-icons/react'
import { Container } from '#/components/ui/Container'
import { ExternalButtonLink } from '#/components/ui/ExternalButtonLink'
import { PageHeader } from '#/components/ui/PageHeader'
import { ContributeSteps } from '#/features/contribute/components/ContributeSteps'
import { SITE } from '#/data/site'
import { SeoHelper } from '#/lib/helpers/seo-helper'
import { m } from '#/paraglide/messages.js'
import type { Icon } from '@phosphor-icons/react'

/** Head for the contribute route. */
export function contributePageHead() {
  return {
    meta: SeoHelper.meta({
      title: m.label_contribute(),
      description: m.seo_contribute_desc(),
      path: '/contribute',
    }),
    links: SeoHelper.canonical('/contribute'),
  }
}

interface ShareKind {
  icon: Icon
  title: string
  description: string
  /** Pastel fill and ink pair. */
  tone: string
}

/** Contribution page: what to share, how it works, guidelines, GitHub. */
export function ContributePage() {
  const kinds: Array<ShareKind> = [
    {
      icon: FilePdfIcon,
      title: m.contribute_share_papers_title(),
      description: m.contribute_share_papers_desc(),
      tone: 'bg-pastel-rose text-pastel-rose-ink',
    },
    {
      icon: NotebookIcon,
      title: m.contribute_share_notes_title(),
      description: m.contribute_share_notes_desc(),
      tone: 'bg-pastel-sky text-pastel-sky-ink',
    },
    {
      icon: PencilSimpleLineIcon,
      title: m.contribute_share_fixes_title(),
      description: m.contribute_share_fixes_desc(),
      tone: 'bg-pastel-gold text-pastel-gold-ink',
    },
    {
      icon: BuildingsIcon,
      title: m.contribute_share_colleges_title(),
      description: m.contribute_share_colleges_desc(),
      tone: 'bg-pastel-teal text-pastel-teal-ink',
    },
  ]
  const guidelines = [
    m.contribute_guideline_1(),
    m.contribute_guideline_2(),
    m.contribute_guideline_3(),
    m.contribute_guideline_4(),
  ]

  return (
    <>
      <PageHeader
        pattern="contours"
        title={m.contribute_title()}
        subtitle={m.contribute_intro()}
      >
        <div className="flex flex-wrap gap-3">
          <ExternalButtonLink href={`${SITE.repository}/issues/new`}>
            {m.contribute_issue()}
          </ExternalButtonLink>
          <ExternalButtonLink
            href={`${SITE.repository}/pulls`}
            variant="outline"
          >
            {m.contribute_pr()}
          </ExternalButtonLink>
        </div>
      </PageHeader>

      <Container as="section" className="pt-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
          {m.contribute_share_title()}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {kinds.map(({ icon: KindIcon, title, description, tone }) => (
            <div
              key={title}
              className={`group flex flex-col gap-4 rounded-3xl p-6 transition duration-300 ease-snappy hover:-translate-y-0.5 ${tone}`}
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-surface shadow-card transition-transform duration-500 ease-snappy group-hover:-rotate-6">
                <KindIcon weight="duotone" className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed opacity-80">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container as="section" className="pt-20">
        <h2 className="mb-10 text-2xl font-semibold tracking-tight sm:text-3xl">
          {m.contribute_steps_title()}
        </h2>
        <ContributeSteps />
      </Container>

      <Container
        as="section"
        className="grid grid-cols-1 items-start gap-4 pt-20 pb-20 lg:grid-cols-2"
      >
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-card">
          <h2 className="mb-4 text-lg font-semibold">
            {m.contribute_guidelines_title()}
          </h2>
          <ul className="flex flex-col gap-3">
            {guidelines.map((guideline) => (
              <li key={guideline} className="flex gap-3 text-sm text-body">
                <CheckCircleIcon
                  weight="duotone"
                  className="mt-0.5 size-5 shrink-0 text-success"
                />
                {guideline}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-pastel-sky p-6 text-pastel-sky-ink">
          <GithubLogoIcon
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -bottom-8 size-48 text-pastel-sky-ink/10"
          />
          <h2 className="relative text-lg font-black">
            {m.contribute_repo_title()}
          </h2>
          <p className="relative mt-2 text-sm leading-relaxed">
            {m.contribute_how_body()}
          </p>
          <a
            href={SITE.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-5 inline-flex items-center gap-2 rounded-xl bg-surface px-3.5 py-2 font-mono text-sm text-ink shadow-card transition-colors duration-200 hover:bg-wash hover:no-underline"
          >
            <GithubLogoIcon className="size-4" />
            {SITE.repository.replace(/^https?:\/\/(www\.)?/, '')}
          </a>
        </div>
      </Container>
    </>
  )
}
