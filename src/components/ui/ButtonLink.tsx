import { Link } from '@tanstack/react-router'
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
  className?: string
  children: React.ReactNode
}

/** Internal router link styled as a button. */
export function ButtonLink({
  to,
  params,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      params={params}
      className={`${ButtonStyleHelper.classes(variant, size)} ${className}`}
    >
      {children}
    </Link>
  )
}
