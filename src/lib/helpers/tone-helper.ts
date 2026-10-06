/** Semantic color tone used by tags, icon tiles and link groups. */
export type Tone =
  'primary' | 'success' | 'accent' | 'danger' | 'violet' | 'neutral'

/** Maps semantic tones to theme utility classes. */
export class ToneHelper {
  /** Soft badge treatment: tinted background with strong foreground. */
  static badge(tone: Tone): string {
    switch (tone) {
      case 'primary':
        return 'bg-wash text-primary'
      case 'success':
        return 'bg-success-tint text-success'
      case 'accent':
        return 'bg-accent-tint text-accent-deep'
      case 'danger':
        return 'bg-danger-tint text-danger'
      case 'violet':
        return 'bg-violet-tint text-violet'
      case 'neutral':
        return 'bg-tint text-faint'
    }
  }

  /** Bold pastel fill with its matching ink, for bento-style cards. */
  static pastel(tone: Tone): { fill: string; ink: string } {
    switch (tone) {
      case 'primary':
        return { fill: 'bg-pastel-sky', ink: 'text-pastel-sky-ink' }
      case 'success':
        return { fill: 'bg-pastel-mint', ink: 'text-pastel-mint-ink' }
      case 'accent':
        return { fill: 'bg-pastel-gold', ink: 'text-pastel-gold-ink' }
      case 'danger':
        return { fill: 'bg-pastel-rose', ink: 'text-pastel-rose-ink' }
      case 'violet':
        return { fill: 'bg-pastel-lilac', ink: 'text-pastel-lilac-ink' }
      case 'neutral':
        return { fill: 'bg-pastel-slate', ink: 'text-ink' }
    }
  }
}
