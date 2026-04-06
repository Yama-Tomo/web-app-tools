import type { SlotRecipeConfig } from '@pandacss/dev'

import { type AllKeys, presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'

const slots = ['label', 'control', 'thumb', 'indicator', 'text'] as const
type Slots = (typeof slots)[number]

const baseRecipe = presetValues.slotRecipes.switchSlotRecipe
const { xs, sm, md, lg } = baseRecipe.variants.size

const variants = {
  // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
  size: {
    xs: { label: xs.root },
    sm: { label: sm.root },
    md: { label: md.root },
    lg: { label: lg.root },
  } satisfies AllKeys<typeof baseRecipe.variants.size>,
  variant: {
    raised: baseRecipe.variants.variant.raised,
    solid: baseRecipe.variants.variant.solid,
  } satisfies AllKeys<typeof baseRecipe.variants.variant>,
} as const satisfies SlotVariants<Slots>

export const baseUISwitch = {
  base: {
    control: baseRecipe.base.control,
    indicator: {
      ...baseRecipe.base.indicator,
      _icon: { boxSize: '1em' },
    },
    label: baseRecipe.base.root,
    text: baseRecipe.base.label,
    thumb: baseRecipe.base.thumb,
  },
  className: utils.className('baseui-switch'),
  defaultVariants: baseRecipe.defaultVariants,
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
