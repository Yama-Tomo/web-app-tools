import type { defineAnimationStyles } from '@pandacss/dev'

export const animationStyles = {
  scaleFadeIn: {
    value: { animationName: '[scaleIn, fadeIn]', transformOrigin: 'var(--transform-origin)' },
  },
  scaleFadeOut: {
    value: { animationName: '[scaleOut, fadeOut]', transformOrigin: 'var(--transform-origin)' },
  },
} as const satisfies Parameters<typeof defineAnimationStyles>[0]
