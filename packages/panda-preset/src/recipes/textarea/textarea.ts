import { defineRecipe, type RecipeConfig } from '@pandacss/dev'

import { textareaRecipe } from '#chakraPreset/recipes'
import { type AllKeys, className, type Variants } from '#utils'

export const textAreaConfig = () => {
  const { flushed, outline, subtle } = textareaRecipe.variants.variant
  const variants = {
    ...textareaRecipe.variants,
    resizeBehavior: {
      autosize: {
        fieldSizing: 'content',
        resize: 'none',
      },
      default: {},
    },
    variant: {
      flushed: {
        ...flushed,
        _focusVisible: {
          ...flushed._focusVisible,
          _invalid: {
            borderColor: 'var(--error-color)',
            boxShadow: '0px 1px 0px 0px var(--error-color)',
          },
        },
        _invalid: textareaRecipe.base._invalid,
      },
      outline: { ...outline, _invalid: textareaRecipe.base._invalid },
      subtle: { ...subtle, _invalid: textareaRecipe.base._invalid },
    } satisfies AllKeys<typeof textareaRecipe.variants.variant>,
  } as const satisfies Variants

  return {
    base: textareaRecipe.base,
    className: className('textarea'),
    defaultVariants: { ...textareaRecipe.defaultVariants, resizeBehavior: 'default' },
    description: 'Textarea',
    variants,
  } as const satisfies RecipeConfig<typeof variants>
}

export const textarea = defineRecipe(textAreaConfig())
