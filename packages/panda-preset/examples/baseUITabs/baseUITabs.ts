import type { SlotRecipeConfig } from '@pandacss/dev'

import { presetValues, utils } from '#yamatomo/panda-preset'

const baseRecipe = presetValues.slotRecipes.tabs

export const baseUITabs = {
  base: {
    ...baseRecipe.base,
    indicator: {
      ...baseRecipe.base.indicator,
      height: 'var(--active-tab-height)',
      insetInlineStart: 0,
      position: 'absolute',
      top: 'var(--active-tab-top)',
      transitionDuration: 'fast',
      transitionProperty: 'translate, top',
      transitionTimingFunction: 'ease-in-out',
      translate: 'var(--active-tab-left)',
      width: 'var(--active-tab-width)',
    },
  },
  className: utils.className('baseui-tabs'),
  defaultVariants: baseRecipe.defaultVariants,
  slots: baseRecipe.slots,
  variants: baseRecipe.variants,
} as const satisfies SlotRecipeConfig<(typeof baseRecipe.slots)[number], typeof baseRecipe.variants>
