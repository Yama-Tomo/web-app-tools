import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { menuSlotRecipe } from '#chakraPreset/slotRecipes'
import { type AllKeys, className, omit, type SlotVariants } from '#utils'

export const menuConfig = () => {
  const slots = ['popup', 'groupLabel', 'item', 'itemIndicator', 'separator'] as const
  type Slots = (typeof slots)[number]

  const { sm, md } = menuSlotRecipe.variants.size
  const variants = {
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      sm: {
        item: {
          ...sm.item,
          _menuItemCheckbox: menuSlotRecipe.base.item['&[data-type]'],
          _menuItemRadio: menuSlotRecipe.base.item['&[data-type]'],
        },
        popup: sm.content,
      },
      md: {
        item: {
          ...md.item,
          _menuItemCheckbox: menuSlotRecipe.base.item['&[data-type]'],
          _menuItemRadio: menuSlotRecipe.base.item['&[data-type]'],
        },
        popup: md.content,
      },
    } satisfies AllKeys<typeof menuSlotRecipe.variants.size>,
  } as const satisfies SlotVariants<Slots>

  return {
    base: {
      groupLabel: menuSlotRecipe.base.itemGroupLabel,
      item: {
        ...menuSlotRecipe.base.item,
        _highlighted: menuSlotRecipe.variants.variant.subtle.item._highlighted,
      },
      itemIndicator: {
        ...menuSlotRecipe.base.itemIndicator,
        _icon: { boxSize: '4' },
      },
      popup: omit(menuSlotRecipe.base.content, ['zIndex']),
      separator: menuSlotRecipe.base.separator,
    },
    className: className('menu'),
    defaultVariants: { size: menuSlotRecipe.defaultVariants.size },
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const menu = defineSlotRecipe(menuConfig())
