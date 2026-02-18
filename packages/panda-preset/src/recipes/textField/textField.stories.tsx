import type { ComponentProps } from 'react'

import { css, cx } from '#panda/css'
import { textField } from '#panda/recipes'
import preview from '#sb/preview.tsx'

type Args = Partial<ReturnType<typeof textField>> & ComponentProps<'input'>

const meta = preview.meta({
  args: { ...textField(), 'aria-invalid': false, disabled: false },
  argTypes: {
    end: { table: { disable: true } },
    start: { table: { disable: true } },
  },
  component: ({ root, start, end, input, ...inputProps }: Args) => (
    <div
      className={cx(
        root,
        css({ '--end-width': 'token(spacing.12)', '--start-width': 'token(spacing.6)' }),
      )}
    >
      <div className={start}>$</div>
      <input {...inputProps} className={input} />
      <div className={end}>USD</div>
    </div>
  ),
})

const variants = ['outline', 'flushed'] as const

export const Basic = meta.story({})

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [
        {
          items: [
            textField({ variant: variants[0] }),
            textField({ variant: variants[1] }),
          ] satisfies Args[],
        },
      ],
    },
  },
})
