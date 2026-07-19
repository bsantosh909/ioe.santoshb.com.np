export type ButtonVariant = 'primary' | 'outline'
export type ButtonSize = 'sm' | 'md'

/** Shared class strings for buttons and button-styled links. */
export class ButtonStyleHelper {
  static classes(variant: ButtonVariant, size: ButtonSize = 'md'): string {
    const base =
      'inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition hover:no-underline'
    const sizing =
      size === 'sm'
        ? 'rounded-lg px-3 py-1.5 text-sm'
        : 'rounded-lg px-4 py-2.5 text-sm'
    const palette =
      variant === 'primary'
        ? 'bg-primary text-surface hover:bg-primary-deep'
        : 'border border-line-strong text-link-strong hover:border-primary hover:bg-primary hover:text-surface'
    return `${base} ${sizing} ${palette}`
  }
}
