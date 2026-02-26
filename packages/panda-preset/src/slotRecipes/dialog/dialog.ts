import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { dialogSlotRecipe } from '#chakraPreset/slotRecipes'
import { iconButtonConfig } from '#recipes/iconButton'
import { className, omit, type SlotVariants } from '#utils'

export const dialogConfig = () => {
  const iconButton = iconButtonConfig()

  const slots = ['backdrop', 'popup', 'header', 'title', 'body', 'closeTrigger'] as const
  type Slots = (typeof slots)[number]

  const variants = {
    motionPreset: {
      none: {},
      scale: {
        popup: dialogSlotRecipe.variants.motionPreset.scale.content,
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
        popup: dialogSlotRecipe.variants.size.xs.content,
      },
      sm: {
        popup: dialogSlotRecipe.variants.size.sm.content,
      },
      md: {
        popup: dialogSlotRecipe.variants.size.md.content,
      },
      lg: {
        popup: dialogSlotRecipe.variants.size.lg.content,
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

  return {
    base: {
      backdrop: omit(dialogSlotRecipe.base.backdrop, ['zIndex']),
      body: omit(dialogSlotRecipe.base.body, ['flex']),
      closeTrigger: {
        ...iconButton.base,
        ...iconButton.variants.size.sm,
        ...iconButton.variants.variant.ghost,
        ...dialogSlotRecipe.base.closeTrigger,
      },
      header: dialogSlotRecipe.base.header,
      popup: {
        ...omit(dialogSlotRecipe.base.content, ['display', 'flexDirection', 'zIndex']),
        _baseuiNestedDialogBackdrop: { bg: dialogSlotRecipe.base.backdrop.bg },
        insetInlineStart: '50%',
        position: 'fixed',
        top: 'var(--start-pos)',
        touchAction: 'none',
        transform: 'translate(-50%, calc(var(--start-pos) * -1)) scale(var(--transform-scale, 1))',
        translate: 'var(--translate)',
        w: 'full',
      },
      title: dialogSlotRecipe.base.title,
    },
    className: className('dialog'),
    defaultVariants: { motionPreset: 'scale', placement: 'center', size: 'md', stacking: 'none' },
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const dialog = defineSlotRecipe(dialogConfig())
