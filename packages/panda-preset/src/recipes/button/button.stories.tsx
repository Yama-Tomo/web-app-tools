import type { ComponentProps } from 'react'

import { css } from '#panda/css'
import { button, indicator } from '#panda/recipes'
import preview from '#sb/preview.tsx'

type Args = ComponentProps<'button'> & { withIcon?: boolean }

const meta = preview.meta({
  args: {
    children: 'Button',
    className: button(),
    disabled: false,
    type: 'button',
    withIcon: false,
  },
  component: ({ children, withIcon, ...rest }: Args) => (
    <button {...rest}>
      {withIcon && (
        <svg fill="currentcolor" viewBox="0 0 10 10" className={indicator()}>
          <title>check</title>
          <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
        </svg>
      )}
      {children}
    </button>
  ),
})

const variants = ['solid', 'outline', 'ghost'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

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
            { className: button({ size: sizes[4] }) },
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
