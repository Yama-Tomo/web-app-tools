import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { menuSlotRecipe, selectSlotRecipe } from '#chakraPreset/slotRecipes'
import { scrollArrowConfig } from '#recipes/scrollArrow'
import { type AllKeys, className, omit, type SlotVariants } from '#utils'

export const selectConfig = () => {
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

  const { ghost, subtle, outline } = selectSlotRecipe.variants.variant
  const { xs, sm, md, lg } = selectSlotRecipe.variants.size
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
    } satisfies AllKeys<typeof selectSlotRecipe.variants.size>,
    variant: {
      ghost,
      outline: {
        trigger: { ...outline.trigger, _invalid: selectSlotRecipe.base.trigger._invalid },
      } satisfies AllKeys<typeof outline>,
      subtle: {
        trigger: { ...subtle.trigger, _invalid: selectSlotRecipe.base.trigger._invalid },
      } satisfies AllKeys<typeof subtle>,
    } satisfies AllKeys<typeof selectSlotRecipe.variants.variant>,
  } as const satisfies SlotVariants<Slots>

  const scrollIndicator = (() => {
    const { base, variants } = scrollArrowConfig()

    const styles = { ...base, bg: 'inherit', mx: '1', zIndex: '1' } as const

    return {
      down: { ...styles, ...variants.variant.bottom },
      up: { ...styles, ...variants.variant.top },
    } as const
  })()

  return {
    base: {
      group: selectSlotRecipe.base.itemGroup,
      groupLabel: selectSlotRecipe.base.itemGroupLabel,
      item: selectSlotRecipe.base.item,
      itemText: selectSlotRecipe.base.itemText,
      list: { overflowY: 'auto', scrollPaddingBlock: '1.5rem' },
      popup: {
        ...omit(selectSlotRecipe.base.content, ['zIndex']),
        position: 'relative',
        w: 'var(--anchor-width)',
      },
      positioner: { boxSizing: 'border-box', outline: 'none', userSelect: 'none' },
      scrollDownIndicator: scrollIndicator.down,
      scrollUpIndicator: scrollIndicator.up,
      separator: menuSlotRecipe.base.separator,
      trigger: selectSlotRecipe.base.trigger,
      triggerIndicator: selectSlotRecipe.base.indicator,
      value: {
        ...selectSlotRecipe.base.valueText,
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '1',
        display: '-webkit-box',
        overflow: 'hidden',
        wordWrap: 'break-word',
      },
    },
    className: className('select'),
    defaultVariants: selectSlotRecipe.defaultVariants,
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const select = defineSlotRecipe(selectConfig())
