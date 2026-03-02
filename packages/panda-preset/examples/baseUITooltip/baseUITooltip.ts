import type { SlotRecipeConfig } from '@pandacss/dev'

import { presetValues, utils } from '#yamatomo/panda-preset'
import { popoverArrow } from '../popoverArrow'

const slots = ['popup', 'arrow'] as const
type Slots = (typeof slots)[number]

const baseRecipe = presetValues.slotRecipes.tooltip

export const baseUITooltip = {
  base: {
    arrow: {
      ...baseRecipe.base.arrow,
      ...popoverArrow.base,
      _before: utils.omit(popoverArrow.base._before, ['borderLeftWidth', 'borderTopWidth']),
    },
    popup: baseRecipe.base.content,
  },
  className: utils.className('baseui-tooltip'),
  slots,
} as const satisfies SlotRecipeConfig<Slots>
