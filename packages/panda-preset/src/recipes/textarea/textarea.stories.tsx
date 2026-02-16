import type { ComponentProps } from 'react'

import { css, cx } from '#panda/css'
import { textarea } from '#panda/recipes'
import preview from '#sb/preview.tsx'

type Args = ComponentProps<'textarea'>

const meta = preview.meta({
  args: { 'aria-invalid': false, className: textarea(), disabled: false },
  component: (props: Args) => <textarea {...props} />,
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
            { className: textarea({ variant: variants[0] }) },
            { className: textarea({ variant: variants[1] }) },
          ] satisfies Args[],
        },
      ],
    },
  },
})

const sizeItems = (variant: (typeof variants)[number]) => {
  const variantValue = variant === variants[0] ? variants[0] : variants[1]
  return [
    { className: textarea({ size: sizes[0], variant: variantValue }) },
    { className: textarea({ size: sizes[1], variant: variantValue }) },
    { className: textarea({ size: sizes[2], variant: variantValue }) },
    { className: textarea({ size: sizes[3], variant: variantValue }) },
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

export const Autosize = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [
        {
          items: [
            {
              className: cx(
                textarea({ resizeBehavior: 'autosize', variant: variants[0] }),
                css({ w: '48' }),
              ),
            },
            {
              className: cx(
                textarea({ resizeBehavior: 'autosize', variant: variants[1] }),
                css({ w: '48' }),
              ),
            },
          ] satisfies Args[],
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
