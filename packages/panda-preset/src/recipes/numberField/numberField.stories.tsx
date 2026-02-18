import { Field, NumberField } from '@base-ui/react'

import { css } from '#panda/css'
import { numberField } from '#panda/recipes'
import preview from '#sb/preview.tsx'

type Args = Partial<ReturnType<typeof numberField>> &
  NumberField.Root.Props &
  Pick<Field.Root.Props, 'disabled' | 'invalid'>

const meta = preview.meta({
  args: { ...numberField(), defaultValue: 100, disabled: false, invalid: false },
  argTypes: {
    decrementTrigger: { table: { disable: true } },
    incrementTrigger: { table: { disable: true } },
  },
  component: ({
    root,
    group,
    input,
    indicator,
    triggerGroup,
    incrementTrigger,
    decrementTrigger,
    disabled,
    invalid,
    ...rootProps
  }: Args) => (
    <Field.Root {...{ disabled, invalid }}>
      <NumberField.Root {...rootProps} className={root}>
        <NumberField.Group className={group}>
          <NumberField.Input className={input} />
          <div className={triggerGroup}>
            <NumberField.Increment className={incrementTrigger}>
              <div className={indicator}>
                <svg
                  viewBox="0 0 24 24"
                  style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}
                >
                  <title>increment</title>
                  <path d="m18 15-6-6-6 6"></path>
                </svg>
              </div>
            </NumberField.Increment>
            <NumberField.Decrement className={decrementTrigger}>
              <div className={indicator}>
                <svg
                  viewBox="0 0 24 24"
                  style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}
                >
                  <title>decrement</title>
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </NumberField.Decrement>
          </div>
        </NumberField.Group>
      </NumberField.Root>
    </Field.Root>
  ),
})

const variants = ['outline', 'flushed'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

export const Basic = meta.story({})

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [
        {
          items: [
            numberField({ variant: variants[0] }),
            numberField({ variant: variants[1] }),
          ] satisfies Args[],
        },
      ],
    },
  },
})

const sizeItems = (variant: (typeof variants)[number]) => {
  const variantValue = variant === variants[0] ? variants[0] : variants[1]
  return [
    numberField({ size: sizes[0], variant: variantValue }),
    numberField({ size: sizes[1], variant: variantValue }),
    numberField({ size: sizes[2], variant: variantValue }),
    numberField({ size: sizes[3], variant: variantValue }),
  ] as const satisfies Args[]
}

export const Sizes = meta.story({
  parameters: {
    tableDecorator: {
      cols: sizes,
      rows: [
        { items: sizeItems(variants[0]) satisfies Args[], name: variants[0] },
        { items: sizeItems(variants[1]) satisfies Args[], name: variants[1] },
      ],
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
