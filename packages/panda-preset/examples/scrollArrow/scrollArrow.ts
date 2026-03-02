import type { RecipeConfig } from '@pandacss/dev'

import { utils, type Variants } from '#yamatomo/panda-preset'

const variants = {
  variant: {
    bottom: { bottom: 0 },
    top: { top: 0 },
  },
} as const satisfies Variants

export const scrollArrow = {
  base: {
    alignItems: 'center',
    color: 'fg.muted',
    display: 'flex',
    h: '1em',
    insetInlineEnd: '0',
    insetInlineStart: '0',
    justifyContent: 'center',
  },
  className: utils.className('scroll-arrow'),
  variants,
} as const satisfies RecipeConfig<typeof variants>
