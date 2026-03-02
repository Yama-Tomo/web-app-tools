import type { SlotRecipeConfig } from '@pandacss/dev'

import { type AllKeys, presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'

const slots = ['label', 'control', 'indicator'] as const
type Slots = (typeof slots)[number]

const baseRecipe = presetValues.slotRecipes.radioGroup
const { outline, subtle, solid } = baseRecipe.variants.variant
const { xs, sm, md, lg } = baseRecipe.variants.size

const variants = {
  // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
  size: {
    xs: { control: xs.itemControl, label: xs.item },
    sm: { control: sm.itemControl, label: sm.item },
    md: { control: md.itemControl, label: md.item },
    lg: { control: lg.itemControl, label: lg.item },
  } satisfies AllKeys<typeof baseRecipe.variants.size>,
  variant: {
    outline: {
      control: {
        ...outline.itemControl,
        _invalid: baseRecipe.base.itemControl._invalid,
      },
    },
    solid: {
      control: { ...solid.itemControl, _invalid: baseRecipe.base.itemControl._invalid },
    },
    subtle: {
      control: {
        ...subtle.itemControl,
        _invalid: baseRecipe.base.itemControl._invalid,
      },
    },
  } satisfies AllKeys<typeof baseRecipe.variants.variant>,
} as const satisfies SlotVariants<Slots>

export const baseUIRadio = {
  base: {
    control: baseRecipe.base.itemControl,
    indicator: baseRecipe.base.itemControl['& .dot'],
    label: { ...baseRecipe.base.label, ...baseRecipe.base.item },
  },
  className: utils.className('baseui-radio'),
  defaultVariants: baseRecipe.defaultVariants,
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
