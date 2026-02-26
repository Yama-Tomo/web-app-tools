import { Checkbox } from '@base-ui/react/checkbox'
import { Field } from '@base-ui/react/field'

import { css } from '#panda/css'
import { checkbox } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { keys } from '#utils'
import { checkboxConfig } from './checkbox.ts'

const variants = keys(checkboxConfig().variants.variant)
const sizes = keys(checkboxConfig().variants.size)

type Args = Partial<ReturnType<typeof checkbox>> & Field.Root.Props

const meta = preview.meta({
  args: { ...checkbox({}), disabled: false, invalid: false },
  argTypes: {
    text: { table: { disable: true } },
  },
  component: ({ label, control, text, ...fieldRootProps }: Args) => (
    <Field.Root {...fieldRootProps}>
      <Field.Label className={label}>
        <Checkbox.Root className={control}>
          <Checkbox.Indicator>
            <svg fill="currentcolor" viewBox="0 0 10 10">
              <title>check</title>
              <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
            </svg>
          </Checkbox.Indicator>
        </Checkbox.Root>
        <span className={text}>Enable</span>
      </Field.Label>
    </Field.Root>
  ),
})

export const Basic = meta.story()

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [{ items: variants.map((variant) => checkbox({ variant })) }],
    },
  },
})

export const Sizes = meta.story({
  parameters: {
    tableDecorator: {
      cols: sizes,
      rows: variants.map((variant) => ({
        items: sizes.map((size) => checkbox({ size, variant })),
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
