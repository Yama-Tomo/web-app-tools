import { Field } from '@base-ui/react/field'
import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'

import { css } from '#panda/css'
import { radio } from '#panda/recipes'
import preview from '#sb/preview.tsx'

type Args = Partial<ReturnType<typeof radio>> &
  RadioGroup.Props &
  Pick<Field.Root.Props, 'disabled' | 'invalid'>

const meta = preview.meta({
  args: { ...radio(), defaultValue: '', disabled: false, invalid: false },
  component: ({
    label,
    control,
    indicator,
    defaultValue,
    disabled,
    invalid,
    ...radioGroupProps
  }: Args) => (
    <Field.Root
      {...{ disabled, invalid }}
      render={(props) => <RadioGroup {...props} {...radioGroupProps} defaultValue={defaultValue} />}
    >
      <Field.Item>
        <Field.Label className={label}>
          <Radio.Root value="choice1" className={control}>
            <Radio.Indicator className={indicator} />
          </Radio.Root>
          Choice 1
        </Field.Label>
      </Field.Item>
      <Field.Item>
        <Field.Label className={label}>
          <Radio.Root value="choice2" className={control}>
            <Radio.Indicator className={indicator} />
          </Radio.Root>
          Choice 2
        </Field.Label>
      </Field.Item>
    </Field.Root>
  ),
})

const variants = ['solid', 'outline'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

export const Basic = meta.story()

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [
        {
          items: [
            radio({ variant: variants[0] }),
            radio({ variant: variants[1] }),
          ] satisfies Args[],
        },
      ],
    },
  },
})

const sizeItems = (variant: (typeof variants)[number]) => {
  const variantValue = variant === variants[0] ? variants[0] : variants[1]
  return [
    radio({ size: sizes[0], variant: variantValue }),
    radio({ size: sizes[1], variant: variantValue }),
    radio({ size: sizes[2], variant: variantValue }),
    radio({ size: sizes[3], variant: variantValue }),
  ] as const satisfies Args[]
}

export const Sizes = meta.story({
  parameters: {
    tableDecorator: {
      cols: sizes,
      rows: [
        { items: sizeItems(variants[0]), name: variants[0] },
        { items: sizeItems(variants[1]), name: variants[1] },
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
