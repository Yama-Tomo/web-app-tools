import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { fieldSlotRecipe, fieldsetSlotRecipe } from '#chakraPreset/slotRecipes'
import { className, type SlotVariants } from '#utils'

export const fieldConfig = () => {
  const slots = ['root', 'label', 'col', 'requiredIndicator', 'helperText', 'errorText'] as const
  type Slots = (typeof slots)[number]

  const variants = {
    orientation: {
      horizontal: {
        label: fieldSlotRecipe.variants.orientation.horizontal.label,
        root: {
          alignItems: 'baseline',
          flexDirection: 'row',
        },
      },
      vertical: fieldSlotRecipe.variants.orientation.vertical,
    },
  } as const satisfies SlotVariants<Slots>

  return {
    base: {
      col: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        gap: fieldSlotRecipe.base.root.gap,
      },
      errorText: fieldsetSlotRecipe.base.errorText,
      helperText: fieldsetSlotRecipe.base.helperText,
      label: fieldSlotRecipe.base.label,
      requiredIndicator: fieldSlotRecipe.base.requiredIndicator,
      root: fieldSlotRecipe.base.root,
    },
    className: className('field'),
    defaultVariants: fieldSlotRecipe.defaultVariants,
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const field = defineSlotRecipe(fieldConfig())
