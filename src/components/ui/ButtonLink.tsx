import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { ButtonStyleHelper } from '#/lib/helpers/button-style-helper'
import type { LinkProps } from '@tanstack/react-router'
import type {
  ButtonSize,
  ButtonVariant,
} from '#/lib/helpers/button-style-helper'

interface ButtonLinkProps {
  to: LinkProps['to']
  params?: LinkProps['params']
  variant?: ButtonVariant
  size?: ButtonSize
  /** Trailing arrow that nudges right on hover. */
  arrow?: boolean
  className?: string
  children: React.ReactNode
}

/** Internal router link styled as a button. */
export function ButtonLink({
  to,
  params,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className = '',
  children,
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      params={params}
      className={`group ${ButtonStyleHelper.classes(variant, size)} ${className}`}
    >
      {children}
      {arrow ? (
        <ArrowRightIcon className="size-4 transition-transform duration-300 ease-snappy group-hover:translate-x-0.5" />
      ) : null}
    </Link>
  )
}
