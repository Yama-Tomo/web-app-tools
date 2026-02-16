import { defineRecipe, type RecipeConfig } from '@pandacss/dev'

import { inputConfig } from '~/recipes/input'
import { className, type Variants } from '~/utils'

export const textAreaConfig = () => {
  const outlineColor =
    'var(--invalid-ring-color, token(colors.colorPalette.focusRing, colors.gray.focusRing))'

  const variants = {
    resizeBehavior: {
      autosize: {
        fieldSizing: 'content',
        resize: 'none',
      },
      default: {},
    },
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      xs: { '--px': 'token(spacing.2)', '--py': 'token(spacing.0.5)', fontSize: 'xs', minH: '8' },
      sm: { '--px': 'token(spacing.2.5)', '--py': 'token(spacing.1)', fontSize: 'sm', minH: '9' },
      md: { '--px': 'token(spacing.3)', '--py': 'token(spacing.2.5)', fontSize: 'sm', minH: '10' },
      lg: { '--px': 'token(spacing.4)', '--py': 'token(spacing.3)', fontSize: 'md', minH: '11' },
    },
    variant: {
      flushed: {
        _focusWithin: {
          borderColor: outlineColor,
          boxShadow: `0px 1px 0px 0px ${outlineColor}`,
        },
        borderBottomWidth: 'thin',
        p: '0',
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
        px: 'var(--px)',
        py: 'var(--py)',
      },
    },
  } as const satisfies Variants

  return {
    base: {
      _disabled: inputConfig().base._disabled,
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
    className: className('textarea'),
    defaultVariants: {
      resizeBehavior: 'default',
      size: 'md',
      variant: 'outline',
    },
    description: 'Textarea',
    variants,
  } as const satisfies RecipeConfig<typeof variants>
}

export const textarea = defineRecipe(textAreaConfig())
