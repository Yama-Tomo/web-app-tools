import { defineRecipe, type RecipeConfig } from '@pandacss/dev'

import { className } from '#utils'

export const indicatorConfig = () => {
  const indicatorSize = '1em'

  return {
    base: {
      color: 'token(colors.fg.muted)',
      fontSize: indicatorSize,
      h: indicatorSize,
      w: indicatorSize,
    },
    className: className('indicator'),
    description: 'Indicator',
  } as const satisfies RecipeConfig
}

export const indicator = defineRecipe(indicatorConfig())
