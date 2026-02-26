import type { ComponentProps } from 'react'

import { css, cx } from '#panda/css'
import { attachedTextField } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { keys } from '#utils'
import { attachedTextFieldConfig } from './attachedTextField.ts'

const variants = keys(attachedTextFieldConfig().variants.variant)

type Args = Partial<ReturnType<typeof attachedTextField>> & ComponentProps<'input'>

const meta = preview.meta({
  args: { ...attachedTextField(), 'aria-invalid': false, disabled: false },
  argTypes: {
    end: { table: { disable: true } },
    start: { table: { disable: true } },
  },
  component: ({ root, start, end, input, ...inputProps }: Args) => (
    <div className={cx(root)}>
      <div className={cx(start, css({ w: '6' }))}>$</div>
      <input {...inputProps} className={input} />
      <div className={cx(end, css({ w: '12' }))}>USD</div>
    </div>
  ),
})

export const Basic = meta.story()

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [{ items: variants.map((variant) => attachedTextField({ variant })) }],
    },
  },
})
