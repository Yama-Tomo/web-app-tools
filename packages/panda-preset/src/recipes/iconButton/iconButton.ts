import { defineRecipe, type RecipeConfig } from '@pandacss/dev'

import { buttonConfig } from '#recipes/button'
import { indicatorConfig } from '#recipes/indicator'
import { className, type Variants } from '#utils'

export const iconButtonConfig = () => {
  const { base, variants: baseVariants } = buttonConfig()
  const { solid, outline, ghost } = baseVariants.variant

  const variants = {
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      xs: { fontSize: 'md', h: '8', w: '8' },
      sm: { fontSize: 'md', h: '9', w: '9' },
      md: { fontSize: 'xl', h: '10', w: '10' },
      lg: { fontSize: 'xl', h: '11', w: '11' },
      xl: { fontSize: '2xl', h: '12', w: '12' },
    },
    variant: {
      ghost: { '--color': ghost.color, ...ghost },
      outline: { '--color': outline.color, ...outline },
      solid: { '--color': solid.color, ...solid },
    },
  } as const satisfies Variants

  return {
    base: {
      _icon: { ...indicatorConfig().base, color: 'var(--color)' },
      ...base,
    },
    className: className('icon-button'),
    defaultVariants: {
      size: 'md',
      variant: 'solid',
    },
    description: 'Icon Button',
    variants,
  } as const satisfies RecipeConfig<typeof variants>
}

export const iconButton = defineRecipe(iconButtonConfig())
