import type { SlotRecipeConfig } from '@pandacss/dev'

import { type AllKeys, presetValues, type SlotVariants, utils } from '#yamatomo/panda-preset'

const slots = [
  'root',
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

const baseRecipe = presetValues.slotRecipes.combobox
const { xs, sm, md, lg } = baseRecipe.variants.size
const { subtle, outline, flushed } = baseRecipe.variants.variant

const variants = {
  // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
  size: {
    xs: {
      input: xs.input,
      list: { _empty: { p: '0' }, p: xs.content.p },
      popup: utils.omit(xs.content, ['p']),
      root: xs.root,
    },
    sm: {
      input: sm.input,
      list: { _empty: { p: '0' }, p: sm.content.p },
      popup: utils.omit(sm.content, ['p']),
      root: sm.root,
    },
    md: {
      input: md.input,
      list: { _empty: { p: '0' }, p: md.content.p },
      popup: utils.omit(md.content, ['p']),
      root: md.root,
    },
    lg: {
      input: lg.input,
      list: { _empty: { p: '0' }, p: lg.content.p },
      popup: utils.omit(lg.content, ['p']),
      root: lg.root,
    },
  } satisfies AllKeys<typeof baseRecipe.variants.size>,
  variant: {
    flushed: {
      input: {
        ...utils.omit(flushed.input, ['px']),
        _focusVisible: {
          ...flushed.input._focusVisible,
          _invalid: {
            borderColor: 'var(--error-color)',
            boxShadow: '0px 1px 0px 0px var(--error-color)',
          },
        },
        _invalid: baseRecipe.base.input._invalid,
        ps: '0',
      },
    },
    outline: {
      input: { ...outline.input, _invalid: baseRecipe.base.input._invalid },
    },
    subtle: {
      input: { ...subtle.input, _invalid: baseRecipe.base.input._invalid },
    },
  } satisfies AllKeys<typeof baseRecipe.variants.variant>,
} as const satisfies SlotVariants<Slots>

export const baseUICombobox = {
  base: {
    clearTrigger: { ...baseRecipe.base.clearTrigger, _disabled: { layerStyle: 'disabled' } },
    empty: { _hasContent: baseRecipe.base.empty },
    group: baseRecipe.base.itemGroup,
    groupLabel: baseRecipe.base.itemGroupLabel,
    input: baseRecipe.base.input,
    item: baseRecipe.base.item,
    list: {
      maxHeight: `min(token(sizes.96), var(--available-height))`,
      outline: '0',
      overflowY: 'auto',
      overscrollBehavior: 'contain',
      scrollPaddingBlock: '1.5rem',
    },
    popup: {
      ...utils.omit(baseRecipe.base.content, [
        'zIndex',
        '&[data-empty]:not(:has([data-scope=combobox][data-part=empty]))',
      ]),
      w: 'var(--anchor-width)',
    },
    root: { ...baseRecipe.base.control, ...baseRecipe.base.root },
    trigger: {
      ...baseRecipe.base.trigger,
      _disabled: { layerStyle: 'disabled' },
      color: 'fg.muted',
    },
    triggerGroup: baseRecipe.base.indicatorGroup,
  },
  className: utils.className('baseui-combobox'),
  defaultVariants: baseRecipe.defaultVariants,
  slots,
  variants,
} as const satisfies SlotRecipeConfig<Slots, typeof variants>
