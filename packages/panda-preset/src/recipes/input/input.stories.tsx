import type { ComponentProps } from 'react'

import { css } from '#panda/css'
import { input } from '#panda/recipes'
import preview from '#sb/preview.tsx'

type Args = ComponentProps<'input'>

const meta = preview.meta({
  args: { 'aria-invalid': false, className: input(), disabled: false },
  component: (props: Args) => <input {...props} />,
})

const variants = ['outline', 'flushed'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

export const Basic = meta.story()

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [
        {
          items: [
            { className: input({ variant: variants[0] }) },
            { className: input({ variant: variants[1] }) },
          ] satisfies Args[],
        },
      ],
    },
  },
})

const sizeItems = (variant: (typeof variants)[number]) => {
  const variantValue = variant === variants[0] ? variants[0] : variants[1]
  return [
    { className: input({ size: sizes[0], variant: variantValue }) },
    { className: input({ size: sizes[1], variant: variantValue }) },
    { className: input({ size: sizes[2], variant: variantValue }) },
    { className: input({ size: sizes[3], variant: variantValue }) },
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
