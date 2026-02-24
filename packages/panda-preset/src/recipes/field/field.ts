import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { inputConfig } from '#recipes/input'
import { className, type SlotVariants } from '#utils'

export const fieldConfig = () => {
  const input = inputConfig()

  const slots = ['root', 'label', 'col', 'requiredIndicator', 'helperText', 'errorText'] as const
  type Slots = (typeof slots)[number]

  const variants = {
    orientation: {
      horizontal: {
        root: {
          alignItems: 'baseline',
          flexDirection: 'row',
        },
      },
      vertical: {},
    },
  } as const satisfies SlotVariants<Slots>

  return {
    base: {
      col: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        gap: '1.5',
      },
      errorText: {
        _disabled: { opacity: input.base._disabled.opacity },
        color: 'token(colors.fg.error)',
        fontSize: 'xs',
        lineHeight: '1rem',
      },
      helperText: {
        _disabled: { opacity: input.base._disabled.opacity },
        color: 'token(colors.fg.muted)',
        fontSize: 'xs',
        lineHeight: '1rem',
      },
      label: {
        _disabled: { opacity: input.base._disabled.opacity },
        display: 'flex',
        fontWeight: 'medium',
        gap: '1',
        textAlign: 'start',
        textStyle: 'sm',
        userSelect: 'none',
        w: 'var(--label-width, auto)',
      },
      requiredIndicator: {
        color: 'token(colors.fg.error)',
        lineHeight: 'none',
      },
      root: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5',
        w: 'full',
      },
    },
    className: className('field'),
    defaultVariants: {
      orientation: 'vertical',
    },
    description: 'Field',
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const field = defineSlotRecipe(fieldConfig())
