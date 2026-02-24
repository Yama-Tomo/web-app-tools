import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { inputConfig } from '#recipes/input'
import { type AllKeys, className, type SlotVariants } from '#utils'

export const attachedTextFieldConfig = () => {
  const { base, variants: baseVariants, defaultVariants } = inputConfig()
  const { size, variant } = baseVariants

  const slots = ['root', 'start', 'end', 'input'] as const
  type Slots = (typeof slots)[number]

  const variants = {
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      '2xs': {
        input: size['2xs'],
      },
      xs: {
        input: size.xs,
      },
      sm: {
        input: size.sm,
      },
      md: {
        input: size.md,
      },
      lg: {
        input: size.lg,
      },
      xl: {
        input: size.xl,
      },
      '2xl': {
        input: size['2xl'],
      },
    } satisfies AllKeys<typeof size>,
    variant: {
      flushed: {
        input: variant.flushed,
      },
      outline: {
        end: {
          borderEndRadius: base.borderRadius,
          borderStartWidth: '0',
          borderWidth: variant.outline.borderWidth,
        },
        input: {
          ...variant.outline,
          _hasNextSibling: { borderEndRadius: '0' },
          _hasPreviousSibling: { borderStartRadius: '0' },
        },
        start: {
          borderEndWidth: '0',
          borderStartRadius: base.borderRadius,
          borderWidth: variant.outline.borderWidth,
        },
      },
      subtle: {
        input: {
          ...variant.subtle,
          _hasNextSibling: { borderEndRadius: '0' },
          _hasPreviousSibling: { borderStartRadius: '0' },
        },
      },
    } satisfies AllKeys<typeof variant>,
  } as const satisfies SlotVariants<Slots>

  const sideSlot = (() => {
    const styles = {
      alignItems: 'center',
      borderColor: 'border',
      display: 'flex',
      flexShrink: '0',
      justifyContent: 'center',
    } as const

    return {
      end: styles,
      start: styles,
    } as const
  })()

  return {
    base: {
      end: sideSlot.end,
      input: {
        ...base,
        _disabled: { ...base._disabled, zIndex: '1' },
        flex: '1',
      },
      root: { display: 'inline-flex', isolation: 'isolate', position: 'relative' },
      start: sideSlot.start,
    },
    className: className('attached-text-field'),
    defaultVariants,
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const attachedTextField = defineSlotRecipe(attachedTextFieldConfig())
