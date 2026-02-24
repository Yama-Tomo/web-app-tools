import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { checkboxSlotRecipe } from '#chakraPreset/slotRecipes'
import { type AllKeys, className, omit, type SlotVariants } from '#utils'

export const checkboxConfig = () => {
  const slots = ['label', 'text', 'control'] as const
  type Slots = (typeof slots)[number]

  const { outline, subtle, solid } = checkboxSlotRecipe.variants.variant
  const variants = {
    ...checkboxSlotRecipe.variants,
    variant: {
      outline: {
        control: {
          ...omit(outline.control, ['&:is([data-state=checked], [data-state=indeterminate])']),
          _checked: outline.control['&:is([data-state=checked], [data-state=indeterminate])'],
          _invalid: checkboxSlotRecipe.base.control._invalid,
        },
      },
      solid: {
        control: {
          ...omit(solid.control, ['&:is([data-state=checked], [data-state=indeterminate])']),
          _checked: solid.control['&:is([data-state=checked], [data-state=indeterminate])'],
          _invalid: checkboxSlotRecipe.base.control._invalid,
        },
      },
      subtle: {
        control: {
          ...omit(subtle.control, ['&:is([data-state=checked], [data-state=indeterminate])']),
          _checked: subtle.control['&:is([data-state=checked], [data-state=indeterminate])'],
          _invalid: checkboxSlotRecipe.base.control._invalid,
        },
      },
    } satisfies AllKeys<typeof checkboxSlotRecipe.variants.variant>,
  } as const satisfies SlotVariants<Slots>

  return {
    base: {
      control: checkboxSlotRecipe.base.control,
      label: checkboxSlotRecipe.base.root,
      text: checkboxSlotRecipe.base.label,
    },
    className: className('checkbox'),
    defaultVariants: checkboxSlotRecipe.defaultVariants,
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const checkbox = defineSlotRecipe(checkboxConfig())
