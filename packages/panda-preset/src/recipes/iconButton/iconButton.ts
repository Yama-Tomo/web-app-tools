import type { RecipeConfig } from '@pandacss/dev'

import { button } from '#recipes/button'
import { type AllKeys, className, type Variants } from '#utils'

const variants = {
  ...button.variants,
  // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
  size: {
    '2xs': { ...button.variants.size['2xs'], px: '0' },
    xs: { ...button.variants.size.xs, px: '0' },
    sm: { ...button.variants.size.sm, px: '0' },
    md: { ...button.variants.size.md, px: '0' },
    lg: { ...button.variants.size.lg, px: '0' },
    xl: { ...button.variants.size.xl, px: '0' },
    '2xl': { ...button.variants.size['2xl'], px: '0' },
  } satisfies AllKeys<typeof button.variants.size>,
} as const satisfies Variants

export const iconButton = {
  base: button.base,
  className: className('icon-button'),
  defaultVariants: button.defaultVariants,
  variants,
} as const satisfies RecipeConfig<typeof variants>
