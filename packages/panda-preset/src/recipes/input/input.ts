import { defineRecipe, type RecipeConfig } from '@pandacss/dev'

import { inputRecipe } from '#chakraPreset/recipes'
import { type AllKeys, className, type Variants } from '#utils'

export const inputConfig = () => {
  const variants = {
    ...inputRecipe.variants,
    variant: {
      flushed: { ...inputRecipe.variants.variant.flushed, _invalid: inputRecipe.base._invalid },
      outline: { ...inputRecipe.variants.variant.outline, _invalid: inputRecipe.base._invalid },
      subtle: { ...inputRecipe.variants.variant.subtle, _invalid: inputRecipe.base._invalid },
    } satisfies AllKeys<typeof inputRecipe.variants.variant>,
  } as const satisfies Variants

  return {
    base: inputRecipe.base,
    className: className('input'),
    defaultVariants: inputRecipe.defaultVariants,
    variants,
  } as const satisfies RecipeConfig<typeof variants>
}

export const input = defineRecipe(inputConfig())
