import type { defineTextStyles } from '@pandacss/dev'

// biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
export const textStyles = {
  '2xs': { value: { fontSize: '2xs', lineHeight: '[0.75rem]' } },
  xs: { value: { fontSize: 'xs', lineHeight: '[1rem]' } },
  sm: { value: { fontSize: 'sm', lineHeight: '[1.25rem]' } },
  md: { value: { fontSize: 'md', lineHeight: '[1.5rem]' } },
  lg: { value: { fontSize: 'lg', lineHeight: '[1.75rem]' } },
  xl: { value: { fontSize: 'xl', lineHeight: '[1.875rem]' } },
  '2xl': { value: { fontSize: '2xl', lineHeight: '[2rem]' } },
  '3xl': { value: { fontSize: '3xl', lineHeight: '[2.375rem]' } },
  '4xl': { value: { fontSize: '4xl', letterSpacing: '[-0.025em]', lineHeight: '[2.75rem]' } },
  '5xl': { value: { fontSize: '5xl', letterSpacing: '[-0.025em]', lineHeight: '[3.75rem]' } },
  '6xl': { value: { fontSize: '6xl', letterSpacing: '[-0.025em]', lineHeight: '[4.5rem]' } },
  '7xl': { value: { fontSize: '7xl', letterSpacing: '[-0.025em]', lineHeight: '[5.75rem]' } },
  none: { value: {} },
  label: { value: { fontSize: 'sm', fontWeight: 'medium', lineHeight: '[1.25rem]' } },
} as const satisfies Parameters<typeof defineTextStyles>[0]
