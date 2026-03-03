import type { SlotRecipeConfig } from '@pandacss/dev'

import { presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'

const slots = [
  'viewport',
  'root',
  'indicator',
  'title',
  'description',
  'actionTrigger',
  'closeTrigger',
] as const
type Slots = (typeof slots)[number]

const baseRecipe = presetValues.slotRecipes.toast

const top = {
  root: { '--toast-direction-y': '1', top: '0', transformOrigin: 'top center' },
  viewport: { bottom: 'auto', top: '1rem' },
} as const

const bottom = {
  root: { '--toast-direction-y': '-1', bottom: '0', transformOrigin: 'bottom center' },
  viewport: { bottom: '1rem', top: 'auto' },
} as const

const start = {
  viewport: { md: { insetEndStart: 'auto' } },
} as const

const center = {
  viewport: { md: { insetInlineStart: '50%', transform: 'translateX(-50%)' } },
} as const

const end = {
  viewport: { md: { insetInlineStart: 'auto' } },
} as const

const defaultStackTranslateY = `calc(
  (
    var(--toast-gap) * var(--toast-index) + var(--toast-offset-y)
  ) * var(--toast-direction-y)
)`

const variants = {
  placement: {
    'bottom-center': { root: bottom.root, viewport: { ...bottom.viewport, ...center.viewport } },
    'bottom-end': { root: bottom.root, viewport: { ...bottom.viewport, ...end.viewport } },
    'bottom-start': { root: bottom.root, viewport: { ...bottom.viewport, ...start.viewport } },
    'top-center': { root: top.root, viewport: { ...top.viewport, ...center.viewport } },
    'top-end': { root: top.root, viewport: { ...top.viewport, ...end.viewport } },
    'top-start': { root: top.root, viewport: { ...top.viewport, ...start.viewport } },
  },
  stacking: {
    none: {
      root: { '--toast-translate-stack-y': defaultStackTranslateY },
    },
    sm: {
      root: {
        _expanded: { '--scale': '1', '--toast-translate-stack-y': defaultStackTranslateY },
        '--scale': 'calc(max(0, 1 - var(--toast-index) * 0.1))',
        '--shrink': 'calc(1 - var(--scale))',
        '--toast-translate-stack-y': `calc(
          (
            var(--toast-index) * 0.5rem + var(--shrink) * var(--toast-frontmost-height, var(--toast-height, 0px))
          ) * var(--toast-direction-y)
        )`,
      },
    },
  },
} as const satisfies SlotVariants<Slots>

export const baseUIToast = {
  base: {
    actionTrigger: baseRecipe.base.actionTrigger,
    closeTrigger: baseRecipe.base.closeTrigger,
    description: baseRecipe.base.description,
    indicator: baseRecipe.base.indicator,
    root: {
      ...baseRecipe.base.root,
      _after: {
        content: `""`,
        height: 'calc(var(--toast-gap) + 1px)',
        insetInlineStart: '0',
        position: 'absolute',
        top: '100%',
        width: 'full',
      },
      _ending: {
        // When swiping horizontally, keep the toast locked to its stacked Y position
        // by zeroing out the state Y offset, and animate the exit only along the X axis.
        _swipeLeft: {
          '--toast-translate-state-x': 'calc(var(--toast-swipe-movement-x, 0px) - 150%)',
          '--toast-translate-state-y': '0px',
        },
        _swipeRight: {
          '--toast-translate-state-x': 'calc(var(--toast-swipe-movement-x, 0px) + 150%)',
          '--toast-translate-state-y': '0px',
        },
        '--toast-translate-state-y':
          'calc(-100% * var(--toast-direction-y) + var(--toast-swipe-movement-y, 0px))',
        opacity: '0',
        transition: `${baseRecipe.base.root._closed.transition}, transform 400ms`,
        transitionTimingFunction: baseRecipe.base.root._closed.transitionTimingFunction,
      },
      _limited: { opacity: '0' },
      _peerEnding: { transitionDelay: '250ms' },
      _starting: {
        '--toast-translate-state-y': 'calc(-150% * var(--toast-direction-y))',
        opacity: '0',
      },
      // NOTE: toast transform variables
      // - --toast-direction-y: 1 (top) or -1 (bottom), used to flip vertical direction
      // - --toast-gap: base gap between toasts (defaults to --gap or token(spacing.4))
      // - --toast-translate-stack-y: base translateY for stacking (index * gap * direction)
      // - --toast-translate-state-x: additional X offset for state (ending + swipe)
      // - --toast-translate-state-y: additional Y offset for state (starting / ending / swipe)
      '--toast-gap': 'var(--gap, token(spacing.4))',
      '--toast-translate-state-x': '0px',
      '--toast-translate-state-y': '0px',
      bottom: 'auto',
      position: 'absolute',
      top: 'auto',
      transform:
        'translateX(var(--toast-translate-state-x)) translateY(calc(var(--toast-translate-stack-y) + var(--toast-translate-state-y)))',
      transition: `${baseRecipe.base.root.transition}, transform 400ms`,
      willChange: 'translate, opacity, scale, transform',
      zIndex: 'calc(1000 - var(--toast-index))',
    },
    title: baseRecipe.base.title,
    viewport: {
      insetInlineEnd: '1rem',
      insetInlineStart: '1rem',
      md: { w: 'sm' },
      position: 'fixed',
      zIndex: '1',
    },
  },
  className: utils.className('baseui-toast'),
  defaultVariants: { placement: 'bottom-end', stacking: 'none' },
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
