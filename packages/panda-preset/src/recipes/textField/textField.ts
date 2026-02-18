import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { inputConfig } from '~/recipes/input'
import { className, type SlotVariants } from '~/utils'

export const textFieldConfig = () => {
  const { base, variants: baseVariants } = inputConfig()
  const { size, variant } = baseVariants

  const slots = ['root', 'start', 'end', 'input'] as const
  type Slots = (typeof slots)[number]

  const variants = {
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
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
    },
    variant: {
      flushed: {
        input: {
          ...variant.flushed,
          paddingInlineEnd: `var(--end-width, ${variant.flushed.px})`,
          paddingInlineStart: `var(--start-width, ${variant.flushed.px})`,
        },
      },
      outline: {
        input: {
          ...variant.outline,
          paddingInlineEnd: `var(--end-width, ${variant.outline.px})`,
          paddingInlineStart: `var(--start-width, ${variant.outline.px})`,
        },
      },
    },
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
        _disabled: {
          ...base._disabled,
          zIndex: '1',
        },
        flex: '1',
      },
      root: {
        display: 'inline-flex',
        isolation: 'isolate',
        position: 'relative',
      },
      start: sideSlot.start,
    },
    className: className('text-field'),
    defaultVariants: {
      size: 'md',
      variant: 'outline',
    },
    description: 'Text Field',
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const textField = defineSlotRecipe(textFieldConfig())
