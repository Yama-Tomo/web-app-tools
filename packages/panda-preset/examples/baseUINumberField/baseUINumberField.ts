import type { SlotRecipeConfig } from '@pandacss/dev'

import { type AllKeys, presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'

const slots = ['root', 'input', 'control', 'incrementTrigger', 'decrementTrigger'] as const
type Slots = (typeof slots)[number]

const baseRecipe = presetValues.slotRecipes.numberInput
const { lg, xs, sm, md } = baseRecipe.variants.size
const { flushed, outline, subtle } = baseRecipe.variants.variant

const variants = {
  ...baseRecipe.variants,
  // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
  size: {
    xs: {
      control: xs.control,
      input: { ...utils.omit(xs.input, ['px']), paddingInlineStart: xs.input.px },
      root: { '--stepper-width': xs.control['--stepper-width'] },
    },
    sm: {
      control: sm.control,
      input: { ...utils.omit(sm.input, ['px']), paddingInlineStart: sm.input.px },
      root: { '--stepper-width': sm.control['--stepper-width'] },
    },
    md: {
      control: md.control,
      input: { ...utils.omit(md.input, ['px']), paddingInlineStart: md.input.px },
      root: { '--stepper-width': md.control['--stepper-width'] },
    },
    lg: {
      control: lg.control,
      input: { ...utils.omit(lg.input, ['px']), paddingInlineStart: lg.input.px },
      root: { '--stepper-width': lg.control['--stepper-width'] },
    },
  } satisfies AllKeys<typeof baseRecipe.variants.size>,
  variant: {
    flushed: {
      control: { borderStartWidth: '0', divideY: '0' },
      decrementTrigger: { '--stepper-radius': '0' },
      incrementTrigger: { '--stepper-radius': '0' },
      input: {
        ...flushed.input,
        _invalid: baseRecipe.base.input._invalid,
      },
    },
    outline: {
      input: {
        ...outline.input,
        _invalid: baseRecipe.base.input._invalid,
      },
    },
    subtle: {
      input: {
        ...subtle.input,
        _invalid: baseRecipe.base.input._invalid,
      },
    },
  } satisfies AllKeys<typeof baseRecipe.variants.variant>,
} as const satisfies SlotVariants<Slots>

export const baseUINumberField = {
  base: {
    control: baseRecipe.base.control,
    decrementTrigger: {
      ...utils.omit(baseRecipe.base.decrementTrigger, ['_hover', 'borderBottomEndRadius']),
      _disabled: { layerStyle: 'disabled' },
      _hoverEnabled: baseRecipe.base.decrementTrigger._hover,
      borderEndEndRadius: baseRecipe.base.decrementTrigger.borderBottomEndRadius,
    },
    incrementTrigger: {
      ...utils.omit(baseRecipe.base.incrementTrigger, ['_hover', 'borderTopEndRadius']),
      _disabled: { layerStyle: 'disabled' },
      _hoverEnabled: baseRecipe.base.decrementTrigger._hover,
      borderStartEndRadius: baseRecipe.base.incrementTrigger.borderTopEndRadius,
    },
    input: baseRecipe.base.input,
    root: baseRecipe.base.root,
  },
  className: utils.className('baseui-number-field'),
  defaultVariants: baseRecipe.defaultVariants,
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
