import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { numberInputSlotRecipe } from '#chakraPreset/slotRecipes'
import { type AllKeys, className, omit, type SlotVariants } from '#utils'

export const numberFieldConfig = () => {
  const slots = ['root', 'input', 'control', 'incrementTrigger', 'decrementTrigger'] as const
  type Slots = (typeof slots)[number]

  const { lg, xs, sm, md } = numberInputSlotRecipe.variants.size
  const { flushed, outline, subtle } = numberInputSlotRecipe.variants.variant
  const variants = {
    ...numberInputSlotRecipe.variants,
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      xs: {
        control: xs.control,
        input: { ...omit(xs.input, ['px']), paddingInlineStart: xs.input.px },
        root: { '--stepper-width': xs.control['--stepper-width'] },
      },
      sm: {
        control: sm.control,
        input: { ...omit(sm.input, ['px']), paddingInlineStart: sm.input.px },
        root: { '--stepper-width': sm.control['--stepper-width'] },
      },
      md: {
        control: md.control,
        input: { ...omit(md.input, ['px']), paddingInlineStart: md.input.px },
        root: { '--stepper-width': md.control['--stepper-width'] },
      },
      lg: {
        control: lg.control,
        input: { ...omit(lg.input, ['px']), paddingInlineStart: lg.input.px },
        root: { '--stepper-width': lg.control['--stepper-width'] },
      },
    } satisfies AllKeys<typeof numberInputSlotRecipe.variants.size>,
    variant: {
      flushed: {
        control: { borderStartWidth: '0', divideY: '0' },
        decrementTrigger: { '--stepper-radius': '0' },
        incrementTrigger: { '--stepper-radius': '0' },
        input: {
          ...flushed.input,
          _invalid: numberInputSlotRecipe.base.input._invalid,
        },
      },
      outline: {
        input: {
          ...outline.input,
          _invalid: numberInputSlotRecipe.base.input._invalid,
        },
      },
      subtle: {
        input: {
          ...subtle.input,
          _invalid: numberInputSlotRecipe.base.input._invalid,
        },
      },
    } satisfies AllKeys<typeof numberInputSlotRecipe.variants.variant>,
  } as const satisfies SlotVariants<Slots>

  return {
    base: {
      control: numberInputSlotRecipe.base.control,
      decrementTrigger: {
        ...omit(numberInputSlotRecipe.base.decrementTrigger, ['_hover', 'borderBottomEndRadius']),
        _disabled: { layerStyle: 'disabled' },
        _hoverEnabled: numberInputSlotRecipe.base.decrementTrigger._hover,
        borderEndEndRadius: numberInputSlotRecipe.base.decrementTrigger.borderBottomEndRadius,
      },
      incrementTrigger: {
        ...omit(numberInputSlotRecipe.base.incrementTrigger, ['_hover', 'borderTopEndRadius']),
        _disabled: { layerStyle: 'disabled' },
        _hoverEnabled: numberInputSlotRecipe.base.decrementTrigger._hover,
        borderStartEndRadius: numberInputSlotRecipe.base.incrementTrigger.borderTopEndRadius,
      },
      input: numberInputSlotRecipe.base.input,
      root: numberInputSlotRecipe.base.root,
    },
    className: className('number-field'),
    defaultVariants: numberInputSlotRecipe.defaultVariants,
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const numberField = defineSlotRecipe(numberFieldConfig())
