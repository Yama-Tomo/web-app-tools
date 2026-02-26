import type { SlotRecipeConfig } from '@pandacss/dev'

import { type AllKeys, presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'

const slots = ['popup', 'groupLabel', 'item', 'itemIndicator', 'separator'] as const
type Slots = (typeof slots)[number]

const baseRecipe = presetValues.slotRecipes.menu
const { sm, md } = baseRecipe.variants.size
const variants = {
  // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
  size: {
    sm: {
      item: {
        ...sm.item,
        _menuItemCheckbox: baseRecipe.base.item['&[data-type]'],
        _menuItemRadio: baseRecipe.base.item['&[data-type]'],
      },
      popup: sm.content,
    },
    md: {
      item: {
        ...md.item,
        _menuItemCheckbox: baseRecipe.base.item['&[data-type]'],
        _menuItemRadio: baseRecipe.base.item['&[data-type]'],
      },
      popup: md.content,
    },
  } satisfies AllKeys<typeof baseRecipe.variants.size>,
} as const satisfies SlotVariants<Slots>

export const baseUIMenu = {
  base: {
    groupLabel: baseRecipe.base.itemGroupLabel,
    item: {
      ...baseRecipe.base.item,
      _highlighted: baseRecipe.variants.variant.subtle.item._highlighted,
    },
    itemIndicator: {
      ...baseRecipe.base.itemIndicator,
      _icon: { boxSize: '4' },
    },
    popup: utils.omit(baseRecipe.base.content, ['zIndex']),
    separator: baseRecipe.base.separator,
  },
  className: utils.className('baseui-menu'),
  defaultVariants: { size: baseRecipe.defaultVariants.size },
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
