import { Field } from '@base-ui/react/field'
import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'

import { css } from '#panda/css'
import { vstack } from '#panda/patterns'
import { baseUIRadio } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { utils } from '#yamatomo/panda-preset'
import { baseUIRadio as config } from './baseUIRadio.ts'

const sizes = utils.keys(config.variants.size)
const variants = utils.keys(config.variants.variant)

type Args = Partial<ReturnType<typeof baseUIRadio>> &
  RadioGroup.Props &
  Pick<Field.Root.Props, 'disabled' | 'invalid'>

const meta = preview.meta({
  args: { ...baseUIRadio(), defaultValue: '', disabled: false, invalid: false },
  argTypes: {
    text: { table: { disable: true } },
  },
  component: ({
    label,
    control,
    text,
    indicator,
    defaultValue,
    disabled,
    invalid,
    ...radioGroupProps
  }: Args) => (
    <Field.Root
      {...{ disabled, invalid }}
      render={(props) => (
        <RadioGroup
          className={vstack({ alignItems: 'flex-start', gap: '4' })}
          {...props}
          {...radioGroupProps}
          defaultValue={defaultValue}
        />
      )}
    >
      {[
        { name: 'Choice 1', value: 'choice1' },
        { name: 'Choice 2', value: 'choice2' },
      ].map(({ value, name }) => (
        <Field.Item className={css({ display: 'flex' })} key={value}>
          <Field.Label
            render={(innerProps) => (
              // biome-ignore lint/a11y/noLabelWithoutControl: `Radio.Root` is an input element
              <label {...innerProps} className={label}>
                <Radio.Root value={value} className={control}>
                  <Radio.Indicator className={indicator} />
                </Radio.Root>
                <span {...innerProps} className={text}>
                  {name}
                </span>
              </label>
            )}
          ></Field.Label>
        </Field.Item>
      ))}
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
          items: variants.map((variant) => baseUIRadio({ variant })),
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
        items: sizes.map((size) => baseUIRadio({ size, variant })),
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
