import { m } from '#/paraglide/messages.js'
import logoWhite from '#/assets/brand/logo-white.svg'
import logoPrimary from '#/assets/brand/logo-primary.svg'

interface BrandLogoProps {
  /** `white` for dark/navy surfaces, `primary` for light surfaces. */
  variant: 'white' | 'primary'
  className?: string
}

/** The IOE monogram wordmark with a transparent background. */
export function BrandLogo({ variant, className = '' }: BrandLogoProps) {
  return (
    <img
      src={variant === 'white' ? logoWhite : logoPrimary}
      alt={m.brand_initials()}
      className={className}
    />
  )
}
