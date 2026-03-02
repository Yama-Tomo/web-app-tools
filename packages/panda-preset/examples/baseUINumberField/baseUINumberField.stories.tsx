import { Field, NumberField } from '@base-ui/react'

import { css } from '#panda/css'
import { baseUINumberField } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { utils } from '#yamatomo/panda-preset'
import { baseUINumberField as config } from './baseUINumberField.ts'

const sizes = utils.keys(config.variants.size)
const variants = utils.keys(config.variants.variant)

type Args = Partial<ReturnType<typeof baseUINumberField>> &
  NumberField.Root.Props &
  Pick<Field.Root.Props, 'disabled' | 'invalid'>

const meta = preview.meta({
  args: { ...baseUINumberField(), defaultValue: 100, disabled: false, invalid: false },
  argTypes: {
    decrementTrigger: { table: { disable: true } },
    incrementTrigger: { table: { disable: true } },
  },
  component: ({
    root,
    input,
    control,
    incrementTrigger,
    decrementTrigger,
    disabled,
    invalid,
    ...rootProps
  }: Args) => (
    <Field.Root {...{ disabled, invalid }}>
      <NumberField.Root {...rootProps} className={root}>
        <NumberField.Group>
          <NumberField.Input className={input} />
          <div className={control}>
            <NumberField.Increment className={incrementTrigger}>
              <svg
                viewBox="0 0 24 24"
                style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}
              >
                <title>increment</title>
                <path d="m18 15-6-6-6 6"></path>
              </svg>
            </NumberField.Increment>
            <NumberField.Decrement className={decrementTrigger}>
              <svg
                viewBox="0 0 24 24"
                style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}
              >
                <title>decrement</title>
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </NumberField.Decrement>
          </div>
        </NumberField.Group>
      </NumberField.Root>
    </Field.Root>
  ),
})

export const Basic = meta.story()

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [
        {
          items: variants.map((variant) => baseUINumberField({ variant })),
        },
      ],
    },
  },
})

export const Sizes = meta.story({
  parameters: {
    tableDecorator: {
      cols: sizes,
      rows: variants.map((variant) => ({
        items: sizes.map((size) => baseUINumberField({ size, variant })),
        name: variant,
      })),
    },
  },
})

export const Color = Variants.extend({
  decorators: [
    (Story) => (
      <div className={css({ colorPalette: 'primary' })}>
        <Story />
      </div>
    ),
  ],
})
