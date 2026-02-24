import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { iconButtonConfig } from '#recipes/iconButton'
import { className, type SlotVariants } from '#utils'

export const dialogConfig = () => {
  const iconButton = iconButtonConfig()

  const slots = ['backdrop', 'popup', 'title', 'body', 'triggerClose'] as const
  type Slots = (typeof slots)[number]

  const variants = {
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
        popup: { maxW: '96' },
      },
      sm: {
        popup: { maxW: '448px' },
      },
      md: {
        popup: { maxW: '512px' },
      },
      lg: {
        popup: { maxW: '672px' },
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
      backdrop: {
        _closed: { animationDuration: 'normal', animationName: 'fadeOut' },
        _open: { animationDuration: 'slow', animationName: 'fadeIn' },
        bg: 'token(colors.backdrop)',
        h: '100vh',
        insetInlineStart: '0',
        opacity: '1',
        position: 'fixed',
        top: '0',
        touchAction: 'none',
        w: '100vw',
      },
      body: { pb: '6', pt: '2', px: '6' },
      popup: {
        _baseuiNestedDialogBackdrop: { bg: 'token(colors.backdrop)' },
        _closed: { animationDuration: 'fast', animationStyle: 'scaleFadeOut' },
        _open: { animationDuration: 'fast', animationStyle: 'scaleFadeIn' },
        bg: 'token(colors.bg.panel)',
        borderColor: 'token(colors.border.muted)',
        borderRadius: 'md',
        borderWidth: 'thin',
        boxShadow: 'lg',
        fontSize: 'sm',
        insetInlineStart: '50%',
        lineHeight: 'normal',
        outline: 'none',
        position: 'fixed',
        top: 'var(--start-pos)',
        touchAction: 'none',
        transform: 'translate(-50%, calc(var(--start-pos) * -1)) scale(var(--transform-scale, 1))',
        translate: 'var(--translate)',
        w: 'full',
      },
      title: { display: 'flex', pb: '4', pt: '6', px: '6' },
      triggerClose: {
        ...iconButton.base,
        ...iconButton.variants.size.sm,
        ...iconButton.variants.variant.ghost,
        insetInlineEnd: '2',
        position: 'absolute',
        top: '2',
      },
    },
    className: className('dialog'),
    defaultVariants: { placement: 'center', size: 'md', stacking: 'none' },
    description: 'Dialog',
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const dialog = defineSlotRecipe(dialogConfig())
