import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { indicatorConfig } from '~/recipes/indicator'
import { inputConfig } from '~/recipes/input'
import { className, type SlotVariants } from '~/utils'

export const checkboxConfig = () => {
  const slots = ['root', 'label', 'control', 'indicator'] as const
  type Slots = (typeof slots)[number]

  const variants = {
    // biome-ignore assist/source/useSortedKeys: keep the order of sizes
    size: {
      xs: {
        control: { h: '3', w: '3' },
        indicator: { h: '0.8em', w: '0.8em' },
        label: { fontSize: 'xs', gap: '1.5' },
      },
      sm: {
        control: { h: '4', w: '4' },
        indicator: { h: '0.8em', w: '0.8em' },
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
          },
        },
        indicator: {
          color: 'token(colors.colorPalette.fg, colors.gray.fg)',
        },
      },
      solid: {
        control: {
          _checked: {
            bg: 'token(colors.colorPalette.solid, colors.gray.solid)',
            borderWidth: '0',
          },
        },
        indicator: {
          color: 'token(colors.colorPalette.contrast, colors.gray.contrast)',
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
        alignItems: 'center',
        borderColor: 'var(--invalid-ring-color, token(colors.bg.emphasized))',
        borderRadius: 'xs',
        borderWidth: 'thin',
        display: 'inline-flex',
        justifyContent: 'center',
      },
      indicator: indicatorConfig().base,
      label: {
        _disabled: inputConfig().base._disabled,
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        position: 'relative',
        userSelect: 'none',
      },
      root: {
        display: 'flex',
      },
    },
    className: className('checkbox'),
    defaultVariants: {
      size: 'md',
      variant: 'solid',
    },
    description: 'Checkbox',
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const checkbox = defineSlotRecipe(checkboxConfig())
