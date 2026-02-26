import type { ComponentProps } from 'react'

import { css } from '#panda/css'
import { input } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { keys } from '#utils'
import { inputConfig } from './input.ts'

const variants = keys(inputConfig().variants.variant)
const sizes = keys(inputConfig().variants.size)

type Args = ComponentProps<'input'>

const meta = preview.meta({
  args: { 'aria-invalid': false, className: input(), disabled: false },
  component: (props: Args) => <input {...props} />,
})

export const Basic = meta.story()

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [
        {
          items: variants.map((variant) => ({ className: input({ variant }) })),
        },
      ],
    },
  },
})

export const Sizes = meta.story({
  parameters: {
    tableDecorator: {
      cols: sizes,
      rows: [{ items: sizes.map((size) => ({ className: input({ size }) })) }],
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
