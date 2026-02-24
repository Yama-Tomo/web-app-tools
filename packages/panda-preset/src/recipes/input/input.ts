import { defineRecipe, type RecipeConfig } from '@pandacss/dev'

import { className, type Variants } from '#utils'

export const inputConfig = () => {
  const outlineColor =
    'var(--invalid-ring-color, token(colors.colorPalette.focusRing, colors.gray.focusRing))'

  const variants = {
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      xs: { '--outline-px': 'token(spacing.2)', fontSize: 'xs', minH: '8' },
      sm: { '--outline-px': 'token(spacing.2.5)', fontSize: 'sm', minH: '9' },
      md: { '--outline-px': 'token(spacing.3)', fontSize: 'sm', minH: '10' },
      lg: { '--outline-px': 'token(spacing.4)', fontSize: 'md', minH: '11' },
    },
    variant: {
      flushed: {
        _focusWithin: {
          borderColor: outlineColor,
          boxShadow: `0px 1px 0px 0px ${outlineColor}`,
        },
        '--flushed-px': '0',
        borderBottomWidth: 'thin',
        px: 'var(--flushed-px)',
      },
      outline: {
        _focusWithin: {
          borderColor: outlineColor,
          outlineColor,
          outlineOffset: '0',
          outlineStyle: 'solid',
          outlineWidth: '1px',
        },
        borderRadius: 'sm',
        borderWidth: 'thin',
        px: 'var(--outline-px)',
      },
    },
  } as const satisfies Variants

  return {
    base: {
      _disabled: { layerStyle: 'disabled' },
      _invalid: {
        '--invalid-ring-color': 'token(colors.border.error)',
      },
      appearance: 'none',
      borderColor: 'var(--invalid-ring-color, token(colors.colorPalette.border, colors.border))',
      fontSize: 'sm',
      lineHeight: 'normal',
      outline: 0,
      textAlign: 'start',
      w: 'full',
    },
    className: className('input'),
    defaultVariants: {
      size: 'md',
      variant: 'outline',
    },
    description: 'Input',
    variants,
  } as const satisfies RecipeConfig<typeof variants>
}

export const input = defineRecipe(inputConfig())
