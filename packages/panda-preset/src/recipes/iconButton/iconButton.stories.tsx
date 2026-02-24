import type { ComponentProps } from 'react'

import { css } from '#panda/css'
import { iconButton } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { keys } from '#utils'
import { iconButtonConfig } from './iconButton.ts'

const variants = keys(iconButtonConfig().variants.variant)
const sizes = keys(iconButtonConfig().variants.size)

type Args = ComponentProps<'button'>

const meta = preview.meta({
  args: { className: iconButton(), disabled: false, type: 'button' },
  component: (props: Args) => (
    <button {...props}>
      <svg
        stroke="currentcolor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>call</title>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    </button>
  ),
})

export const Basic = meta.story()

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [{ items: variants.map((variant) => ({ className: iconButton({ variant }) })) }],
    },
  },
})

export const Sizes = meta.story({
  parameters: {
    tableDecorator: {
      cols: sizes,
      rows: [{ items: sizes.map((size) => ({ className: iconButton({ size }) })) }],
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
