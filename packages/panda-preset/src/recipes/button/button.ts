import { defineRecipe, type RecipeConfig } from '@pandacss/dev'

import { className, type Variants } from '#utils'

export const buttonConfig = () => {
  const variants = {
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      xs: { fontSize: 'xs', h: '8', px: '2' },
      sm: { fontSize: 'sm', h: '9', px: '3' },
      md: { fontSize: 'sm', h: '10', px: '4' },
      lg: { fontSize: 'md', h: '11', px: '5' },
      xl: { fontSize: 'md', h: '12', px: '5' },
    },
    variant: {
      ghost: {
        _hoverEnabled: {
          bg: 'token(colors.colorPalette.subtle, colors.gray.subtle)',
        },
        bg: 'transparent',
        color: 'token(colors.colorPalette.fg, colors.gray.fg)',
      },
      outline: {
        _hoverEnabled: {
          bg: 'token(colors.colorPalette.subtle, colors.gray.subtle)',
        },
        borderColor: 'token(colors.colorPalette.border, colors.gray.border)',
        color: 'token(colors.colorPalette.fg, colors.gray.fg)',
      },
      solid: {
        _hoverEnabled: {
          bg: 'color-mix(in srgb, token(colors.colorPalette.solid, colors.gray.solid) 90%, transparent)',
        },
        bg: 'token(colors.colorPalette.solid, colors.gray.solid)',
        color: 'token(colors.colorPalette.contrast, colors.gray.contrast)',
      },
    },
  } as const satisfies Variants

  return {
    base: {
      _disabled: { layerStyle: 'disabled' },
      _focusVisible: {
        outlineColor: 'token(colors.colorPalette.focusRing, colors.gray.focusRing)',
        outlineOffset: '2px',
        outlineStyle: 'solid',
        outlineWidth: '2px',
      },
      alignItems: 'center',
      appearance: 'none',
      borderColor: 'transparent',
      borderRadius: 'sm',
      borderWidth: 'thin',
      cursor: 'pointer',
      display: 'inline-flex',
      fontWeight: '500',
      justifyContent: 'center',
      userSelect: 'none',
    },
    className: className('button'),
    defaultVariants: {
      size: 'md',
      variant: 'solid',
    },
    description: 'Button',
    variants,
  } as const satisfies RecipeConfig<typeof variants>
}

export const button = defineRecipe(buttonConfig())
