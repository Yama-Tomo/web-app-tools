import { defineRecipe, type RecipeConfig } from '@pandacss/dev'

import { buttonRecipe } from '#chakraPreset/recipes'
import { type AllKeys, className, omit, type Variants } from '#utils'

export const buttonConfig = () => {
  const { ghost, subtle, solid, surface, outline, plain } = buttonRecipe.variants.variant
  const variants = {
    ...buttonRecipe.variants,
    variant: {
      ghost: { ...omit(ghost, ['_hover']), _hoverEnabled: ghost._hover },
      outline: { ...omit(outline, ['_hover']), _hoverEnabled: outline._hover },
      plain,
      solid: { ...omit(solid, ['_hover']), _hoverEnabled: solid._hover },
      subtle: { ...omit(subtle, ['_hover']), _hoverEnabled: subtle._hover },
      surface: { ...omit(surface, ['_hover']), _hoverEnabled: surface._hover },
    } satisfies AllKeys<typeof buttonRecipe.variants.variant>,
  } as const satisfies Variants

  return {
    base: buttonRecipe.base,
    className: className('button'),
    defaultVariants: buttonRecipe.defaultVariants,
    variants,
  } as const satisfies RecipeConfig<typeof variants>
}

export const button = defineRecipe(buttonConfig())
