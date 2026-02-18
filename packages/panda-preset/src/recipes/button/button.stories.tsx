import type { ComponentProps } from 'react'

import { css } from '#panda/css'
import { button } from '#panda/recipes'
import preview from '#sb/preview.tsx'

type Args = ComponentProps<'button'>

const meta = preview.meta({
  args: { children: 'Button', className: button(), disabled: false, type: 'button' },
  component: (props: Args) => <button {...props} />,
})

const variants = ['solid', 'outline', 'ghost'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

export const Basic = meta.story()

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [
        {
          items: [
            { className: button({ variant: variants[0] }) },
            { className: button({ variant: variants[1] }) },
            { className: button({ variant: variants[2] }) },
          ] satisfies Args[],
        },
      ],
    },
  },
})

export const Sizes = meta.story({
  parameters: {
    tableDecorator: {
      cols: sizes,
      rows: [
        {
          items: [
            { className: button({ size: sizes[0] }) },
            { className: button({ size: sizes[1] }) },
            { className: button({ size: sizes[2] }) },
            { className: button({ size: sizes[3] }) },
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
