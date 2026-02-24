import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { className, type SlotVariants } from '#utils'

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

  const variants = {
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
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      xs: {
        scrollbar: { '--size': 'token(sizes.1)' },
      },
      sm: {
        scrollbar: { '--size': 'token(sizes.1.5)' },
      },
      md: {
        scrollbar: { '--size': 'token(sizes.2)' },
      },
      lg: {
        scrollbar: { '--size': 'token(sizes.3)' },
      },
    },
    variant: {
      always: {
        scrollbar: { '--opacity': '1' },
      },
      hover: {
        scrollbar: { '--opacity': '0' },
      },
    },
  } as const satisfies SlotVariants<Slots>

  const hoverScrollbar = {
    opacity: '1',
    pointerEvents: 'auto',
    transitionDelay: '0ms',
    transitionDuration: 'fast',
  } as const

  return {
    base: {
      root: { boxSizing: 'border-box', h: 'full', overflow: 'hidden', w: 'full' },
      scrollbar: {
        _horizontal: {
          _before: { insetInlineEnd: '0', insetInlineStart: '0' },
          h: 'var(--size)',
        },
        _hover: hoverScrollbar,
        _scrolling: hoverScrollbar,
        _vertical: {
          _before: { insetInlineEnd: '1/2', transform: 'translateX(-50%)' },
          width: 'var(--size)',
        },
        '--bg-color':
          'color-mix(in srgb, token(colors.colorPalette.solid, colors.gray.solid) 10%, transparent)',
        bg: 'var(--bg-color)',
        borderRadius: 'full',
        display: 'flex',
        margin: '0.5',
        opacity: 'var(--opacity)',
        pointerEvents: 'none',
        position: 'relative',
        transition: 'opacity',
        transitionDelay: 'slow',
        transitionDuration: 'fast',
      },
      thumb: {
        _active: { '--bg-opacity': '70%' },
        _hover: { '--bg-opacity': '70%' },
        bg: 'color-mix(in srgb, token(colors.colorPalette.solid, colors.gray.solid) var(--bg-opacity, 50%), transparent)',
        borderRadius: 'inherit',
        h: 'var(--scroll-area-thumb-height, 100%)',
        transition: 'background',
        w: 'var(--scroll-area-thumb-width, 100%)',
      },
      viewport: {
        _focusVisible: { outlineWidth: '1px' },
        _webkitScrollbar: { display: 'none' },
        h: 'full',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        w: 'full',
      },
    },
    className: className('scroll-area'),
    defaultVariants: { hasShadow: false, size: 'md', variant: 'hover' },
    description: 'Scroll Area',
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const scrollArea = defineSlotRecipe(scrollAreaConfig())
