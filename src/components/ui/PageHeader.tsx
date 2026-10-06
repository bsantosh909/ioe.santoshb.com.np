import { Backdrop } from '#/components/fx/Backdrop'
import type { BackdropPattern } from '#/components/fx/Backdrop'
import { Container } from '#/components/ui/Container'

interface PageHeaderProps {
  title: string
  subtitle?: string
  /** Background texture; defaults to blueprint graph paper. */
  pattern?: BackdropPattern
  /** Optional row under the subtitle: stats, search, notices. */
  children?: React.ReactNode
}

/** Light page header with an engineering backdrop and a staggered entrance. */
export function PageHeader({
  title,
  subtitle,
  pattern = 'blueprint',
  children,
}: PageHeaderProps) {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-line bg-surface">
      <Backdrop pattern={pattern} />
      <Container className="relative pt-12 pb-10 sm:pt-16 sm:pb-12">
        <h1 className="max-w-3xl bg-linear-to-b from-ink to-primary bg-clip-text pb-1 text-4xl leading-tight font-semibold tracking-tight text-transparent sm:text-5xl motion-safe:animate-rise">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted motion-safe:animate-rise motion-safe:rise-delay-1">
            {subtitle}
          </p>
        ) : null}
        {children ? (
          <div className="mt-8 motion-safe:animate-rise motion-safe:rise-delay-2">
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
