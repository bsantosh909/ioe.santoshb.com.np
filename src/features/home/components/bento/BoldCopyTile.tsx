import { BentoCard } from '#/features/home/components/bento/BentoCard'
import { m } from '#/paraglide/messages.js'

/** Slate wide tile: ghosted wordmark whose solid copy swells on hover. */
export function BoldCopyTile() {
  const word = m.brand_initials()

  return (
    <BentoCard
      to="/about"
      label={m.label_about()}
      className="items-center justify-center bg-pastel-slate sm:col-span-2"
    >
      <span
        aria-hidden="true"
        className="text-8xl font-black text-ink/10 uppercase transition-opacity duration-500 group-hover/bento:opacity-50 md:text-9xl"
      >
        {word}
      </span>
      <span
        aria-hidden="true"
        className="absolute text-3xl font-black text-ink uppercase transition-transform duration-500 ease-snappy group-hover/bento:scale-300"
      >
        {word}
      </span>
    </BentoCard>
  )
}
