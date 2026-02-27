import type { SlotRecipeConfig } from '@pandacss/dev'

import { presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'

const slots = ['root', 'label', 'col', 'requiredIndicator', 'helperText', 'errorText'] as const
type Slots = (typeof slots)[number]

const baseRecipe = presetValues.slotRecipes.field

const variants = {
  orientation: {
    horizontal: {
      label: baseRecipe.variants.orientation.horizontal.label,
      root: {
        alignItems: 'baseline',
        flexDirection: 'row',
      },
    },
    vertical: baseRecipe.variants.orientation.vertical,
  },
} as const satisfies SlotVariants<Slots>

export const baseUIField = {
  base: {
    col: {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      gap: baseRecipe.base.root.gap,
    },
    errorText: baseRecipe.base.errorText,
    helperText: baseRecipe.base.helperText,
    label: baseRecipe.base.label,
    requiredIndicator: baseRecipe.base.requiredIndicator,
    root: baseRecipe.base.root,
  },
  className: utils.className('baseui-field'),
  defaultVariants: baseRecipe.defaultVariants,
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
