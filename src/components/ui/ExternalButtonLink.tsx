import { ButtonStyleHelper } from '#/lib/helpers/button-style-helper'
import type {
  ButtonSize,
  ButtonVariant,
} from '#/lib/helpers/button-style-helper'

interface ExternalButtonLinkProps {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

/** External anchor styled as a button, opened in a new tab. */
export function ExternalButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: ExternalButtonLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${ButtonStyleHelper.classes(variant, size)} ${className}`}
    >
      {children}
    </a>
  )
}
