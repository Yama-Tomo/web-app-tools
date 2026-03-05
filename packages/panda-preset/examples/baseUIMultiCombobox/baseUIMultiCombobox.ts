import type { SlotRecipeConfig } from '@pandacss/dev'

import { type AllKeys, presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'
import { baseUICombobox } from '../baseUICombobox'

const slots = [
  'root',
  'chips',
  'chip',
  'chipRemove',
  'input',
  'triggerGroup',
  'trigger',
  'clearTrigger',
  'popup',
  'list',
  'group',
  'groupLabel',
  'item',
  'empty',
] as const
type Slots = (typeof slots)[number]

const tagsInputRecipe = presetValues.slotRecipes.tagsInput
const baseRecipe = baseUICombobox
const { xs, sm, md, lg } = baseRecipe.variants.size
const { subtle, outline, flushed } = baseRecipe.variants.variant

const variants = {
  // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
  size: {
    xs: {
      ...xs,
      chip: tagsInputRecipe.variants.size.sm,
      input: { ...xs.input, minH: '6' },
      root: { ...xs.root, ...tagsInputRecipe.variants.size.xs },
    },
    sm: {
      ...sm,
      chip: tagsInputRecipe.variants.size.sm,
      input: { ...sm.input, minH: '6' },
      root: { ...sm.root, ...tagsInputRecipe.variants.size.sm },
    },
    md: {
      ...md,
      chip: tagsInputRecipe.variants.size.md,
      input: { ...md.input, minH: '7' },
      root: { ...md.root, ...tagsInputRecipe.variants.size.md },
    },
    lg: {
      ...lg,
      chip: tagsInputRecipe.variants.size.lg,
      input: { ...lg.input, minH: '8' },
      root: { ...lg.root, ...tagsInputRecipe.variants.size.lg },
    },
  } satisfies AllKeys<typeof baseRecipe.variants.size>,
  variant: {
    flushed: {
      chip: tagsInputRecipe.variants.variant.flushed.itemPreview,
      chips: {
        ...utils.omit(flushed.input, ['_focusVisible']),
        _focusWithin: { ...flushed.input._focusVisible, '--focus-ring-width': '0px' },
      },
    },
    outline: {
      chip: tagsInputRecipe.variants.variant.outline.itemPreview,
      chips: { ...outline.input, _focusWithin: { borderColor: 'var(--focus-ring-color)' } },
    },
    subtle: {
      chip: tagsInputRecipe.variants.variant.subtle.itemPreview,
      chips: { ...subtle.input, _focusWithin: { borderColor: 'var(--focus-ring-color)' } },
    },
  } satisfies AllKeys<typeof baseRecipe.variants.variant>,
} as const satisfies SlotVariants<Slots>

export const baseUIMultiCombobox = {
  base: {
    ...baseRecipe.base,
    chip: { ...tagsInputRecipe.base.itemPreview, ...tagsInputRecipe.variants.size.md.root },
    chipRemove: {
      ...utils.omit(tagsInputRecipe.base.itemDeleteTrigger, ['_hover']),
      _hoverEnabled: tagsInputRecipe.base.itemDeleteTrigger._hover,
    },
    chips: {
      ...baseRecipe.base.input,
      _focusWithin: {
        focusRingColor: 'colorPalette.focusRing',
        outlineColor: 'var(--focus-ring-color)',
        outlineOffset: '0px',
        outlineStyle: 'var(--focus-ring-style, solid)',
        outlineWidth: 'var(--focus-ring-width, 1px)',
      },
      flexWrap: 'wrap',
      gap: 'var(--tags-input-gap)',
      justifyContent: 'flex-start',
      py: 'var(--tags-input-py)',
    },
    input: {
      _disabled: { cursor: 'not-allowed' },
      _focusVisible: { outline: 'none' },
      _selected: { ps: '1.5' },
      border: '0',
      flex: '1',
      margin: '0',
      minW: '3rem',
      outline: 'none',
    },
  },
  className: utils.className('baseui-multi-combobox'),
  defaultVariants: baseRecipe.defaultVariants,
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
