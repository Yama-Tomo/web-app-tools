import type { ComponentProps } from 'react'

import { css, cx } from '#panda/css'
import { textarea } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { keys } from '#utils'
import { textAreaConfig } from './textarea.ts'

const variants = keys(textAreaConfig().variants.variant)
const sizes = keys(textAreaConfig().variants.size)

type Args = ComponentProps<'textarea'>

const meta = preview.meta({
  args: { 'aria-invalid': false, className: textarea(), disabled: false },
  component: (props: Args) => <textarea {...props} />,
})

export const Basic = meta.story()

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [{ items: variants.map((variant) => ({ className: textarea({ variant }) })) }],
    },
  },
})

export const Sizes = meta.story({
  parameters: {
    tableDecorator: {
      cols: sizes,
      rows: variants.map((variant) => ({
        items: sizes.map((size) => ({ className: textarea({ size, variant }) })),
        name: variant,
      })),
    },
  },
})

export const Autosize = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [
        {
          items: variants.map((variant) => {
            return {
              className: cx(textarea({ resizeBehavior: 'autosize', variant }), css({ minW: '48' })),
            }
          }),
        },
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
