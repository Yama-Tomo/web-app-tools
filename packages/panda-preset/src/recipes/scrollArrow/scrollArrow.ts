import { defineRecipe, type RecipeConfig } from '@pandacss/dev'

import { className, type Variants } from '#utils'

export const scrollArrowConfig = () => {
  const variants = {
    variant: {
      bottom: { bottom: 0 },
      top: { top: 0 },
    },
  } as const satisfies Variants

  return {
    base: {
      alignItems: 'center',
      color: 'fg.muted',
      display: 'flex',
      h: '1em',
      insetInlineEnd: '0',
      insetInlineStart: '0',
      justifyContent: 'center',
    },
    className: className('scroll-arrow'),
    variants,
  } as const satisfies RecipeConfig<typeof variants>
}

export const scrollArrow = defineRecipe(scrollArrowConfig())
