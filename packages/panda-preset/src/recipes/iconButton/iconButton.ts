import { defineRecipe, type RecipeConfig } from '@pandacss/dev'

import { buttonConfig } from '#recipes/button'
import { type AllKeys, className, type Variants } from '#utils'

export const iconButtonConfig = () => {
  const buttonRecipe = buttonConfig()

  const variants = {
    ...buttonRecipe.variants,
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      '2xs': { ...buttonRecipe.variants.size['2xs'], px: '0' },
      xs: { ...buttonRecipe.variants.size.xs, px: '0' },
      sm: { ...buttonRecipe.variants.size.sm, px: '0' },
      md: { ...buttonRecipe.variants.size.md, px: '0' },
      lg: { ...buttonRecipe.variants.size.lg, px: '0' },
      xl: { ...buttonRecipe.variants.size.xl, px: '0' },
      '2xl': { ...buttonRecipe.variants.size['2xl'], px: '0' },
    } satisfies AllKeys<typeof buttonRecipe.variants.size>,
  } as const satisfies Variants

  return {
    base: buttonRecipe.base,
    className: className('icon-button'),
    defaultVariants: buttonRecipe.defaultVariants,
    variants,
  } as const satisfies RecipeConfig<typeof variants>
}

export const iconButton = defineRecipe(iconButtonConfig())
