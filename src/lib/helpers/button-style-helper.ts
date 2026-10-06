export type ButtonVariant = 'primary' | 'accent' | 'outline'
export type ButtonSize = 'sm' | 'md'

/** Shared class strings for buttons and button-styled links. */
export class ButtonStyleHelper {
  static classes(variant: ButtonVariant, size: ButtonSize = 'md'): string {
    const base =
      'inline-flex cursor-pointer items-center justify-center gap-2 font-semibold whitespace-nowrap transition duration-200 ease-snappy hover:no-underline active:scale-98'
    const sizing =
      size === 'sm'
        ? 'rounded-lg px-3 py-1.5 text-sm'
        : 'rounded-xl px-5 py-3 text-sm'
    return `${base} ${sizing} ${ButtonStyleHelper.palette(variant)}`
  }

  private static palette(variant: ButtonVariant): string {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-surface shadow-card hover:bg-primary-deep hover:shadow-card-lg'
      case 'accent':
        return 'bg-accent text-night shadow-accent hover:bg-accent-soft'
      case 'outline':
        return 'border border-line-strong text-link-strong hover:border-primary hover:bg-primary hover:text-surface'
    }
  }
}
