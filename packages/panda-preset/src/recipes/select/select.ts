import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { indicatorConfig } from '~/recipes/indicator'
import { inputConfig } from '~/recipes/input'
import { scrollArrowConfig } from '~/recipes/scrollArrow'
import { className, type SlotVariants } from '~/utils'

const selectConfig = () => {
  const slots = [
    'trigger',
    'triggerIndicator',
    'value',
    'positioner',
    'popup',
    'list',
    'item',
    'itemText',
    'itemIndicator',
    'scrollTopIndicator',
    'scrollDownIndicator',
  ] as const
  type Slots = (typeof slots)[number]

  const variants = {
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      xs: {
        item: { px: '2', py: '1' },
        popup: { boxShadow: 'xs', fontSize: 'xs' },
        trigger: { fontSize: 'xs', minH: '8', px: '2' },
        triggerIndicator: { marginInline: '2' },
      },
      sm: {
        item: { px: '2', py: '2' },
        popup: { boxShadow: 'sm', fontSize: 'sm' },
        trigger: { fontSize: 'sm', minH: '9', px: '2' },
        triggerIndicator: { marginInline: '2' },
      },
      md: {
        item: { px: '2', py: '2' },
        popup: { boxShadow: 'md', fontSize: 'md' },
        trigger: { fontSize: 'md', minH: '10', px: '3' },
        triggerIndicator: { marginInline: '3' },
      },
      lg: {
        item: { px: '3', py: '2' },
        popup: { boxShadow: 'md', fontSize: 'md' },
        trigger: { fontSize: 'md', minH: '11', px: '4' },
        triggerIndicator: { marginInline: '4' },
      },
    },
  } as const satisfies SlotVariants<Slots>

  const scrollIndicator = (() => {
    const { base, variants } = scrollArrowConfig()

    const styles = {
      ...base,
      bg: 'inherit',
      mx: '1',
      zIndex: '1',
    } as const

    return {
      down: { ...styles, ...variants.variant.bottom },
      top: { ...styles, ...variants.variant.top },
    } as const
  })()

  return {
    base: {
      item: {
        _highlighted: {
          bg: 'color-mix(in srgb, token(colors.bg.emphasized) 60%, transparent)',
        },
        alignItems: 'center',
        borderRadius: 'xs',
        display: 'flex',
        lineHeight: '1rem',
        outline: 'none',
      },
      itemIndicator: indicatorConfig().base,
      itemText: {
        flex: '1',
      },
      list: {
        boxSizing: 'border-box',
        maxHeight: 'var(--available-height)',
        overflowY: 'auto',
        p: '1',
        paddingBlock: '1',
        position: 'relative',
        scrollPaddingBlock: '1.5rem',
      },
      popup: {
        bg: 'token(colors.bg.panel)',
        borderColor: 'token(colors.border.muted)',
        borderRadius: 'sm',
        borderWidth: 'thin',
        isolation: 'isolate',
        m: '0',
        minW: 'var(--anchor-width)',
        outline: 'none',
        transformOrigin: 'var(--transform-origin)',
      },
      positioner: {
        boxSizing: 'border-box',
        outline: 'none',
        userSelect: 'none',
      },
      scrollDownIndicator: scrollIndicator.down,
      scrollTopIndicator: scrollIndicator.top,
      trigger: {
        _disabled: inputConfig().base._disabled,
        _expanded: {
          borderColor: 'token(colors.colorPalette.emphasized, colors.border.emphasized)',
        },
        _focusVisible: {
          '--ring-color':
            'var(--invalid-ring-color, token(colors.colorPalette.focusRing, colors.gray.focusRing))',
          borderColor: 'var(--ring-color)',
          outlineColor: 'var(--ring-color)',
          outlineOffset: '0',
          outlineStyle: 'solid',
          outlineWidth: '1px',
        },
        _invalid: {
          '--invalid-ring-color': 'token(colors.border.error)',
          '--invalid-text-color': 'token(colors.fg.error)',
        },
        _placeholderShown: {
          color: 'color-mix(in srgb, token(colors.fg.muted) 80%, transparent)',
        },
        alignItems: 'center',
        borderColor: 'var(--invalid-ring-color, token(colors.colorPalette.border, colors.border))',
        borderRadius: 'sm',
        borderWidth: 'thin',
        display: 'flex',
        outline: 'none',
        position: 'relative',
        textAlign: 'start',
        userSelect: 'none',
        width: 'full',
      },
      triggerIndicator: {
        ...indicatorConfig().base,
        alignItems: 'center',
        bottom: '0',
        color: 'var(--invalid-text-color, token(colors.fg.muted))',
        display: 'flex',
        insetInlineEnd: '0',
        marginBlock: 'auto',
        pointerEvents: 'none',
        position: 'absolute',
        top: '0',
      },
      value: {
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '1',
        display: '-webkit-box',
        maxW: '4/5',
        overflow: 'hidden',
        wordWrap: 'break-word',
      },
    },
    className: className('select'),
    defaultVariants: {
      size: 'md',
    },
    description: 'Select',
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const select = defineSlotRecipe(selectConfig())
