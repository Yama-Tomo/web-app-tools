import type { SlotRecipeConfig } from '@pandacss/dev'

import { type AllKeys, presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'

const slots = ['label', 'text', 'control'] as const
type Slots = (typeof slots)[number]

const baseRecipe = presetValues.slotRecipes.checkbox
const { outline, subtle, solid } = baseRecipe.variants.variant

const variants = {
  ...baseRecipe.variants,
  variant: {
    outline: {
      control: {
        ...utils.omit(outline.control, ['&:is([data-state=checked], [data-state=indeterminate])']),
        _checked: outline.control['&:is([data-state=checked], [data-state=indeterminate])'],
        _invalid: baseRecipe.base.control._invalid,
      },
    },
    solid: {
      control: {
        ...utils.omit(solid.control, ['&:is([data-state=checked], [data-state=indeterminate])']),
        _checked: solid.control['&:is([data-state=checked], [data-state=indeterminate])'],
        _invalid: baseRecipe.base.control._invalid,
      },
    },
    subtle: {
      control: {
        ...utils.omit(subtle.control, ['&:is([data-state=checked], [data-state=indeterminate])']),
        _checked: subtle.control['&:is([data-state=checked], [data-state=indeterminate])'],
        _invalid: baseRecipe.base.control._invalid,
      },
    },
  } satisfies AllKeys<typeof baseRecipe.variants.variant>,
} as const satisfies SlotVariants<Slots>

export const baseUICheckbox = {
  base: {
    control: baseRecipe.base.control,
    label: baseRecipe.base.root,
    text: baseRecipe.base.label,
  },
  className: utils.className('baseui-checkbox'),
  defaultVariants: baseRecipe.defaultVariants,
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
