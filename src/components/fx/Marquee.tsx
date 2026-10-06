interface MarqueeProps {
  /** Scroll right-to-left by default; `reverse` flips it. */
  reverse?: boolean
  className?: string
  children: React.ReactNode
}

/**
 * Seamless infinite strip: the content is rendered twice and the track
 * translates by half its width. Pauses on hover; static under reduced motion.
 */
export function Marquee({
  reverse = false,
  className = '',
  children,
}: MarqueeProps) {
  return (
    <div className={`group fx-fade-x flex overflow-hidden ${className}`}>
      <div
        className={`flex w-max shrink-0 gap-3 pr-3 group-hover:animation-paused motion-safe:animate-marquee ${
          reverse ? 'marquee-reverse' : ''
        }`}
      >
        {children}
        <div aria-hidden="true" className="flex gap-3">
          {children}
        </div>
      </div>
    </div>
  )
}
