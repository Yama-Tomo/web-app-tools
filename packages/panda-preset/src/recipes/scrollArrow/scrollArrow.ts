import { defineRecipe, type RecipeConfig } from '@pandacss/dev'

import { indicatorConfig } from '~/recipes/indicator'
import { className, type Variants } from '~/utils'

export const scrollArrowConfig = () => {
  const indicator = indicatorConfig()
  const variants = {
    variant: {
      bottom: { bottom: 0 },
      top: { top: 0 },
    },
  } as const satisfies Variants

  return {
    base: {
      alignItems: 'center',
      color: indicator.base.color,
      display: 'flex',
      fontSize: indicator.base.fontSize,
      h: indicator.base.h,
      insetInlineEnd: '0',
      insetInlineStart: '0',
      justifyContent: 'center',
    },
    className: className('scroll-arrow'),
    description: 'Scroll Arrow',
    variants,
  } as const satisfies RecipeConfig<typeof variants>
}

export const scrollArrow = defineRecipe(scrollArrowConfig())
