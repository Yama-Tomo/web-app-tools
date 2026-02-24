import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { inputConfig } from '#recipes/input'
import { type AllKeys, className, omit, type SlotVariants } from '#utils'

export const textFieldConfig = () => {
  const { base, variants: baseVariants, defaultVariants } = inputConfig()
  const { size, variant } = baseVariants

  const slots = ['root', 'start', 'end', 'input'] as const
  type Slots = (typeof slots)[number]

  const variants = {
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      '2xs': {
        input: omit(size['2xs'], ['px']),
      },
      xs: {
        input: omit(size.xs, ['px']),
      },
      sm: {
        input: omit(size.sm, ['px']),
      },
      md: {
        input: omit(size.md, ['px']),
      },
      lg: {
        input: omit(size.lg, ['px']),
      },
      xl: {
        input: omit(size.xl, ['px']),
      },
      '2xl': {
        input: omit(size['2xl'], ['px']),
      },
    } satisfies AllKeys<typeof size>,
    variant: {
      flushed: {
        input: omit(variant.flushed, ['px']),
      },
      outline: {
        input: variant.outline,
      },
      subtle: {
        input: variant.subtle,
      },
    } satisfies AllKeys<typeof variant>,
  } as const satisfies SlotVariants<Slots>

  const sideSlot = (() => {
    const styles = {
      alignItems: 'center',
      bottom: '0',
      display: 'flex',
      flexShrink: '0',
      justifyContent: 'center',
      my: '1px',
      position: 'absolute',
      top: '0',
    } as const

    return {
      end: { ...styles, insetInlineEnd: '0', w: 'var(--end-width)' },
      start: { ...styles, insetInlineStart: '0', w: 'var(--start-width)' },
    } as const
  })()

  return {
    base: {
      end: sideSlot.end,
      input: {
        ...base,
        _disabled: { ...base._disabled, zIndex: '1' },
        flex: '1',
        paddingInlineEnd: `var(--end-width, 0)`,
        paddingInlineStart: `var(--start-width, 0)`,
      },
      root: { display: 'inline-flex', isolation: 'isolate', position: 'relative' },
      start: { ...sideSlot.start, zIndex: '1' },
    },
    className: className('text-field'),
    defaultVariants,
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const textField = defineSlotRecipe(textFieldConfig())
