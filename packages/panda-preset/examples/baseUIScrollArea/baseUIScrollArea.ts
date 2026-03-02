import type { SlotRecipeConfig } from '@pandacss/dev'

import { type AllKeys, presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'

const slots = ['root', 'viewport', 'scrollbar', 'thumb'] as const
type Slots = (typeof slots)[number]

const baseRecipe = presetValues.slotRecipes.scrollArea

const defaultShadowHeight = '20px'
const shadow = {
  '--scroll-area-overflow-y-end': 'inherit',
  '--scroll-area-overflow-y-start': 'inherit',
  content: '""',
  insetInline: '0',
  pointerEvents: 'none',
  position: 'absolute',
  transition: 'height',
  transitionDuration: 'fast',
  transitionTimingFunction: 'out',
  width: 'full',
} as const

const { always, hover } = baseRecipe.variants.variant
const variants = {
  ...baseRecipe.variants,
  hasShadow: {
    false: {},
    true: {
      viewport: {
        _after: {
          ...shadow,
          background: 'linear-gradient(to top, var(--shadow-color, token(colors.bg)), transparent)',
          bottom: '0',
          height: `min(var(--shadow-size, ${defaultShadowHeight}), var(--scroll-area-overflow-y-end, ${defaultShadowHeight}))`,
        },
        _before: {
          ...shadow,
          background:
            'linear-gradient(to bottom, var(--shadow-color, token(colors.bg)), transparent)',
          height: `min(var(--shadow-size, ${defaultShadowHeight}), var(--scroll-area-overflow-y-start, ${defaultShadowHeight}))`,
          top: '0',
        },
      },
    },
  },
  variant: {
    always,
    hover: {
      scrollbar: {
        ...utils.omit(hover.scrollbar, ['&[data-hover], &[data-scrolling]']),
        _hover: hover.scrollbar['&[data-hover], &[data-scrolling]'],
      },
    },
  } satisfies AllKeys<typeof baseRecipe.variants.variant>,
} as const satisfies SlotVariants<Slots>

export const baseUIScrollArea = {
  base: {
    root: baseRecipe.base.root,
    scrollbar: {
      ...utils.omit(baseRecipe.base.scrollbar, ['&:not([data-overflow-x], [data-overflow-y])']),
      _fits: {
        display: baseRecipe.base.scrollbar['&:not([data-overflow-x], [data-overflow-y])'],
      },
    },
    thumb: baseRecipe.base.thumb,
    viewport: {
      ...baseRecipe.base.viewport,
      _webkitScrollbar: { display: 'none' },
    },
  },
  className: utils.className('baseui-scroll-area'),
  defaultVariants: { ...baseRecipe.defaultVariants, hasShadow: false },
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
