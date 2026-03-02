import type { SlotRecipeConfig } from '@pandacss/dev'

import { type AllKeys, presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'
import { popoverArrow } from '../popoverArrow'

const slots = ['positioner', 'popup', 'arrow', 'header', 'body'] as const
type Slots = (typeof slots)[number]

const baseRecipe = presetValues.slotRecipes.popover
const { xs, sm, md, lg } = baseRecipe.variants.size
const variants = {
  // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
  size: {
    xs: { popup: xs.content },
    sm: { popup: sm.content },
    md: { popup: md.content },
    lg: { popup: lg.content },
  } satisfies AllKeys<typeof baseRecipe.variants.size>,
} as const satisfies SlotVariants<Slots>

export const baseUIPopover = {
  base: {
    arrow: popoverArrow.base,
    body: baseRecipe.base.body,
    header: baseRecipe.base.header,
    popup: utils.omit(baseRecipe.base.content, ['zIndex']),
    positioner: {
      h: 'var(--positioner-height)',
      maxW: 'var(--available-width)',
      w: 'var(--positioner-width)',
    },
  },
  className: utils.className('baseui-popover'),
  defaultVariants: { size: baseRecipe.defaultVariants.size },
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
