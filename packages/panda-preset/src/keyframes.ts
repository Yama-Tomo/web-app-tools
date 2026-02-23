import type { CssKeyframes } from '@pandacss/dev'

export const keyframes = {
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeOut: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  scaleIn: {
    from: { scale: '0.95' },
    to: { scale: '1' },
  },
  scaleOut: {
    from: { scale: '1' },
    to: { scale: '0.95' },
  },
} as const satisfies CssKeyframes
