import type { RecipeConfig } from '@pandacss/dev'

import { className } from '#utils'
import { presetValues } from '#yamatomo/panda-preset'

export const popoverArrow = {
  base: {
    ...presetValues.slotRecipes.popover.base.arrow,
    _before: {
      ...presetValues.slotRecipes.popover.base.arrowTip,
      bg: 'var(--arrow-background)',
      content: `""`,
      h: 'full',
      position: 'absolute',
      w: 'full',
    },
    _placementBottom: {
      _before: { transform: 'rotate(45deg)' },
      bottom: 'var(--arrow-offset)',
    },
    _placementInlineEnd: {
      _before: { transform: 'rotate(-45deg)' },
      insetInlineEnd: 'var(--arrow-offset)',
    },
    _placementInlineStart: {
      _before: { transform: 'rotate(-225deg)' },
      insetInlineStart: 'var(--arrow-offset)',
    },
    _placementTop: {
      _before: { transform: 'rotate(225deg)' },
      top: 'var(--arrow-offset)',
    },
    '--arrow-offset': 'calc(100% + var(--arrow-size-half) * -1)',
    '--arrow-size-half': 'calc(var(--arrow-size) / 2)',
    h: 'var(--arrow-size)',
    w: 'var(--arrow-size)',
  },
  className: className('popover-arrow'),
} as const satisfies RecipeConfig
