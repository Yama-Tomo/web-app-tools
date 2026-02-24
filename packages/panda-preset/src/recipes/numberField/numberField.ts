import { defineSlotRecipe, type SlotRecipeConfig } from '@pandacss/dev'

import { indicatorConfig } from '#recipes/indicator'
import { textFieldConfig } from '#recipes/textField'
import { className, type SlotVariants } from '#utils'

export const numberFieldConfig = () => {
  const { base, variants: baseVariants, defaultVariants } = textFieldConfig()
  const { size, variant } = baseVariants
  const outlineInput = variant.outline.input

  const slots = [
    'root',
    'group',
    'input',
    'triggerGroup',
    'incrementTrigger',
    'decrementTrigger',
    'indicator',
  ] as const
  type Slots = (typeof slots)[number]

  const variants = {
    // biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
    size: {
      xs: {
        input: size.xs.input,
        root: { '--end-width': 'token(sizes.4)' },
        triggerGroup: { fontSize: 'xs' },
      },
      sm: {
        input: size.sm.input,
        root: { '--end-width': 'token(sizes.5)' },
        triggerGroup: { fontSize: 'sm' },
      },

      md: {
        input: size.md.input,
        root: { '--end-width': 'token(sizes.6)' },
        triggerGroup: { fontSize: 'md' },
      },
      lg: {
        input: size.lg.input,
        root: { '--end-width': 'token(sizes.6)' },
        triggerGroup: { fontSize: 'md' },
      },
    },
    variant: {
      flushed: variant.flushed,
      outline: {
        decrementTrigger: {
          borderColor: 'token(colors.border)',
          borderEndEndRadius: outlineInput.borderRadius,
          borderInlineStartWidth: 'thin',
          borderTopWidth: 'thin',
        },
        incrementTrigger: {
          borderColor: 'token(colors.border)',
          borderInlineStartWidth: 'thin',
          borderStartEndRadius: outlineInput.borderRadius,
        },
        input: outlineInput,
      },
    },
  } as const satisfies SlotVariants<Slots>

  const trigger = (() => {
    const styles = {
      _disabled: base.input._disabled,
      _hoverEnabled: { bg: 'token(colors.bg.muted)' },
      alignItems: 'center',
      cursor: 'pointer',
      display: 'inline-flex',
      flex: '1',
      justifyContent: 'center',
      w: 'full',
    } as const

    return {
      decrement: styles,
      increment: styles,
    } as const
  })()

  return {
    base: {
      decrementTrigger: trigger.decrement,
      group: {
        position: 'relative',
      },
      incrementTrigger: trigger.increment,
      indicator: { ...indicatorConfig().base, color: 'token(colors.fg.muted)' },
      input: base.input,
      root: base.root,
      triggerGroup: {
        ...base.end,
        flexDirection: 'column',
        m: '1px',
      },
    },
    className: className('number-field'),
    defaultVariants,
    description: 'Number Field',
    slots,
    variants,
  } as const satisfies SlotRecipeConfig<Slots, typeof variants>
}

export const numberField = defineSlotRecipe(numberFieldConfig())
