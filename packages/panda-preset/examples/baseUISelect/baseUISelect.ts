import type { SlotRecipeConfig } from '@pandacss/dev'

import { type AllKeys, presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'
import { scrollArrow } from '../scrollArrow'

const slots = [
  'root',
  'trigger',
  'triggerIndicator',
  'value',
  'positioner',
  'popup',
  'list',
  'group',
  'groupLabel',
  'item',
  'itemText',
  'separator',
  'scrollUpIndicator',
  'scrollDownIndicator',
] as const
type Slots = (typeof slots)[number]

const baseRecipe = presetValues.slotRecipes.select
const { ghost, subtle, outline } = baseRecipe.variants.variant
const { xs, sm, md, lg } = baseRecipe.variants.size

const variants = {
  // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
  size: {
    xs: {
      groupLabel: xs.itemGroupLabel,
      item: xs.item,
      popup: xs.content,
      trigger: { ...xs.root, ...xs.trigger },
      triggerIndicator: xs.indicator,
    },
    sm: {
      group: sm.itemGroup,
      groupLabel: sm.itemGroupLabel,
      item: sm.item,
      popup: sm.content,
      trigger: { ...sm.root, ...sm.trigger },
      triggerIndicator: sm.indicator,
    },
    md: {
      group: md.itemGroup,
      groupLabel: md.itemGroupLabel,
      item: md.item,
      popup: { ...md.content },
      trigger: { ...md.root, ...md.trigger },
      triggerIndicator: md.indicator,
    },
    lg: {
      group: lg.itemGroup,
      groupLabel: lg.itemGroupLabel,
      item: lg.item,
      popup: lg.content,
      trigger: { ...lg.root, ...lg.trigger },
      triggerIndicator: lg.indicator,
    },
  } satisfies AllKeys<typeof baseRecipe.variants.size>,
  variant: {
    ghost,
    outline: {
      trigger: { ...outline.trigger, _invalid: baseRecipe.base.trigger._invalid },
    } satisfies AllKeys<typeof outline>,
    subtle: {
      trigger: { ...subtle.trigger, _invalid: baseRecipe.base.trigger._invalid },
    } satisfies AllKeys<typeof subtle>,
  } satisfies AllKeys<typeof baseRecipe.variants.variant>,
} as const satisfies SlotVariants<Slots>

const scrollIndicator = (() => {
  const { base, variants } = scrollArrow

  const styles = { ...base, bg: 'inherit', mx: '1', zIndex: '1' } as const

  return {
    down: { ...styles, ...variants.variant.bottom },
    up: { ...styles, ...variants.variant.top },
  } as const
})()

export const baseUISelect = {
  base: {
    group: baseRecipe.base.itemGroup,
    groupLabel: baseRecipe.base.itemGroupLabel,
    item: baseRecipe.base.item,
    itemText: baseRecipe.base.itemText,
    list: { overflowY: 'auto', scrollPaddingBlock: '1.5rem' },
    popup: {
      ...utils.omit(baseRecipe.base.content, ['zIndex']),
      position: 'relative',
      w: 'var(--anchor-width)',
    },
    positioner: { boxSizing: 'border-box', outline: 'none', userSelect: 'none' },
    scrollDownIndicator: scrollIndicator.down,
    scrollUpIndicator: scrollIndicator.up,
    separator: presetValues.slotRecipes.menu.base.separator,
    trigger: baseRecipe.base.trigger,
    triggerIndicator: baseRecipe.base.indicator,
    value: {
      ...baseRecipe.base.valueText,
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '1',
      display: '-webkit-box',
      overflow: 'hidden',
      wordWrap: 'break-word',
    },
  },
  className: utils.className('baseui-select'),
  defaultVariants: baseRecipe.defaultVariants,
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
