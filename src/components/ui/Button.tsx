import { ButtonStyleHelper } from '#/lib/helpers/button-style-helper'
import type {
  ButtonSize,
  ButtonVariant,
} from '#/lib/helpers/button-style-helper'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

/** Themed button element. */
export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${ButtonStyleHelper.classes(variant, size)} ${className}`}
      {...rest}
    />
  )
}
