import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { inputConfig } from '#recipes/input'
import { className, type SlotVariants } from '#utils'

export const radioConfig = () => {
  const slots = ['label', 'control', 'indicator'] as const
  type Slots = (typeof slots)[number]

  const variants = {
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      xs: {
        control: { h: '3', w: '3' },
        label: { fontSize: 'xs', gap: '1.5' },
      },
      sm: {
        control: { h: '4', w: '4' },
        label: { fontSize: 'sm', gap: '2' },
      },
      md: {
        control: { h: '5', w: '5' },
        label: { fontSize: 'sm', gap: '2.5' },
      },
      lg: {
        control: { h: '6', w: '6' },
        label: { fontSize: 'md', gap: '3' },
      },
    },
    variant: {
      outline: {
        control: {
          _checked: {
            borderColor: 'token(colors.colorPalette.solid, colors.gray.solid)',
            color: 'token(colors.colorPalette.solid, colors.gray.solid)',
          },
        },
        indicator: {
          scale: '0.6',
        },
      },
      solid: {
        control: {
          _checked: {
            bg: 'token(colors.colorPalette.solid, colors.gray.solid)',
            borderWidth: '0',
            color: 'token(colors.colorPalette.contrast, colors.gray.contrast)',
          },
        },
        indicator: {
          scale: '0.4',
        },
      },
    },
  } as const satisfies SlotVariants<Slots>

  return {
    base: {
      control: {
        _focusVisible: {
          outlineColor:
            'var(--invalid-ring-color, token(colors.colorPalette.focusRing, colors.gray.focusRing))',
          outlineOffset: '2px',
          outlineStyle: 'solid',
          outlineWidth: '2px',
        },
        _invalid: {
          '--invalid-ring-color': 'token(colors.border.error)',
        },
        borderColor: 'var(--invalid-ring-color, token(colors.bg.emphasized))',
        borderRadius: 'full',
        borderWidth: 'thin',
      },
      indicator: {
        bg: 'currentcolor',
        borderRadius: 'full',
        display: 'block',
        h: 'full',
        scale: '0.4',
        w: 'full',
      },
      label: {
        _disabled: inputConfig().base._disabled,
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        position: 'relative',
      },
    },
    className: className('radio'),
    defaultVariants: {
      size: 'md',
      variant: 'solid',
    },
    description: 'Radio',
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const radio = defineSlotRecipe(radioConfig())
