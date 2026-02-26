import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { scrollAreaSlotRecipe } from '#chakraPreset/slotRecipes'
import { type AllKeys, className, omit, type SlotVariants } from '#utils'

export const scrollAreaConfig = () => {
  const slots = ['root', 'viewport', 'scrollbar', 'thumb'] as const
  type Slots = (typeof slots)[number]

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

  const { always, hover } = scrollAreaSlotRecipe.variants.variant
  const variants = {
    ...scrollAreaSlotRecipe.variants,
    hasShadow: {
      false: {},
      true: {
        viewport: {
          _after: {
            ...shadow,
            background:
              'linear-gradient(to top, var(--shadow-color, token(colors.bg)), transparent)',
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
          ...omit(hover.scrollbar, ['&[data-hover], &[data-scrolling]']),
          _hover: hover.scrollbar['&[data-hover], &[data-scrolling]'],
        },
      },
    } satisfies AllKeys<typeof scrollAreaSlotRecipe.variants.variant>,
  } as const satisfies SlotVariants<Slots>

  return {
    base: {
      root: scrollAreaSlotRecipe.base.root,
      scrollbar: {
        ...omit(scrollAreaSlotRecipe.base.scrollbar, [
          '&:not([data-overflow-x], [data-overflow-y])',
        ]),
        _fits: {
          display:
            scrollAreaSlotRecipe.base.scrollbar['&:not([data-overflow-x], [data-overflow-y])'],
        },
      },
      thumb: scrollAreaSlotRecipe.base.thumb,
      viewport: {
        ...scrollAreaSlotRecipe.base.viewport,
        _webkitScrollbar: { display: 'none' },
      },
    },
    className: className('scroll-area'),
    defaultVariants: { ...scrollAreaSlotRecipe.defaultVariants, hasShadow: false },
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const scrollArea = defineSlotRecipe(scrollAreaConfig())
