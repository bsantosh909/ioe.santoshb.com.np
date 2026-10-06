import { ArrowUpRightIcon } from '@phosphor-icons/react'
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

/** External anchor styled as a button, opened in a new tab, with a ↗ icon. */
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
      className={`group ${ButtonStyleHelper.classes(variant, size)} ${className}`}
    >
      {children}
      <ArrowUpRightIcon className="size-4 transition-transform duration-300 ease-snappy group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}
