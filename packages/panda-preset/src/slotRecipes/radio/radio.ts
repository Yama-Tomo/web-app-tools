import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { radioGroupSlotRecipe } from '#chakraPreset/slotRecipes'
import { type AllKeys, className, type SlotVariants } from '#utils'

export const radioConfig = () => {
  const slots = ['label', 'control', 'indicator'] as const
  type Slots = (typeof slots)[number]

  const { outline, subtle, solid } = radioGroupSlotRecipe.variants.variant
  const { xs, sm, md, lg } = radioGroupSlotRecipe.variants.size
  const variants = {
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      xs: { control: xs.itemControl, label: xs.item },
      sm: { control: sm.itemControl, label: sm.item },
      md: { control: md.itemControl, label: md.item },
      lg: { control: lg.itemControl, label: lg.item },
    } satisfies AllKeys<typeof radioGroupSlotRecipe.variants.size>,
    variant: {
      outline: {
        control: {
          ...outline.itemControl,
          _invalid: radioGroupSlotRecipe.base.itemControl._invalid,
        },
      },
      solid: {
        control: { ...solid.itemControl, _invalid: radioGroupSlotRecipe.base.itemControl._invalid },
      },
      subtle: {
        control: {
          ...subtle.itemControl,
          _invalid: radioGroupSlotRecipe.base.itemControl._invalid,
        },
      },
    } satisfies AllKeys<typeof radioGroupSlotRecipe.variants.variant>,
  } as const satisfies SlotVariants<Slots>

  return {
    base: {
      control: radioGroupSlotRecipe.base.itemControl,
      indicator: radioGroupSlotRecipe.base.itemControl['& .dot'],
      label: { ...radioGroupSlotRecipe.base.label, ...radioGroupSlotRecipe.base.item },
    },
    className: className('radio'),
    defaultVariants: radioGroupSlotRecipe.defaultVariants,
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const radio = defineSlotRecipe(radioConfig())
