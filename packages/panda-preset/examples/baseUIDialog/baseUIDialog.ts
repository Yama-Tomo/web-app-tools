import type { SlotRecipeConfig } from '@pandacss/dev'

import { presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'

const slots = ['backdrop', 'popup', 'header', 'title', 'body', 'closeTrigger'] as const
type Slots = (typeof slots)[number]

const baseRecipe = presetValues.slotRecipes.dialog
const iconButtonRecipe = presetValues.recipes.iconButton

const variants = {
  motionPreset: {
    none: {},
    scale: {
      popup: baseRecipe.variants.motionPreset.scale.content,
    },
  },
  placement: {
    bottom: {
      popup: { '--start-pos': '90%' },
    },
    center: {
      popup: { '--start-pos': '50%' },
    },
    top: {
      popup: { '--start-pos': '10%' },
    },
  },
  // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
  size: {
    xs: {
      popup: baseRecipe.variants.size.xs.content,
    },
    sm: {
      popup: baseRecipe.variants.size.sm.content,
    },
    md: {
      popup: baseRecipe.variants.size.md.content,
    },
    lg: {
      popup: baseRecipe.variants.size.lg.content,
    },
    cover: {
      popup: { '--start-pos': '0%', inset: '0', m: '10', transform: 'none', w: 'auto' },
    },
    full: {
      backdrop: { bg: 'none' },
      popup: { '--start-pos': '0%', borderRadius: '0', inset: '0', transform: 'none', w: 'auto' },
    },
  },
  // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
  stacking: {
    none: {},
    sm: {
      popup: {
        '--transform-scale': 'calc(1 - 0.05 * min(var(--nested-dialogs), 10))',
        '--translate': '0 calc(0px + 0.5rem * var(--nested-dialogs))',
      },
    },
    md: {
      popup: {
        '--transform-scale': 'calc(1 - 0.08 * min(var(--nested-dialogs), 10))',
        '--translate': '0 calc(0px + 1rem * var(--nested-dialogs))',
      },
    },
  },
} as const satisfies SlotVariants<Slots>

export const baseUIDialog = {
  base: {
    backdrop: utils.omit(baseRecipe.base.backdrop, ['zIndex']),
    body: utils.omit(baseRecipe.base.body, ['flex']),
    closeTrigger: {
      ...iconButtonRecipe.base,
      ...iconButtonRecipe.variants.size.sm,
      ...iconButtonRecipe.variants.variant.ghost,
      ...baseRecipe.base.closeTrigger,
    },
    header: baseRecipe.base.header,
    popup: {
      ...utils.omit(baseRecipe.base.content, ['display', 'flexDirection', 'zIndex']),
      _baseuiNestedDialogBackdrop: { bg: baseRecipe.base.backdrop.bg },
      insetInlineStart: '50%',
      position: 'fixed',
      top: 'var(--start-pos)',
      touchAction: 'none',
      transform: 'translate(-50%, calc(var(--start-pos) * -1)) scale(var(--transform-scale, 1))',
      translate: 'var(--translate)',
      w: 'full',
    },
    title: baseRecipe.base.title,
  },
  className: utils.className('baseui-dialog'),
  defaultVariants: { motionPreset: 'scale', placement: 'center', size: 'md', stacking: 'none' },
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
