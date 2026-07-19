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
}
