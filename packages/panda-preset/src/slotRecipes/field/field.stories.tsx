import { Field } from '@base-ui/react/field'

import { css, cx } from '#panda/css'
import { field, input } from '#panda/recipes'
import preview from '#sb/preview.tsx'

type Args = Partial<ReturnType<typeof field>> & Field.Root.Props

const meta = preview.meta({
  args: { ...field(), disabled: false, invalid: false },
  argTypes: {
    col: { table: { disable: true } },
    errorText: { table: { disable: true } },
    helperText: { table: { disable: true } },
    requiredIndicator: { table: { disable: true } },
  },
  component: ({
    root,
    label,
    helperText,
    errorText,
    requiredIndicator,
    ...fieldRootProps
  }: Args) => (
    <Field.Root {...fieldRootProps} className={root}>
      <Field.Label className={label}>
        Email<span className={requiredIndicator}>*</span>
      </Field.Label>
      <Field.Control
        render={(controlProps) => (
          <input {...controlProps} placeholder="hoge@examle.com" className={input()} />
        )}
      />
      <Field.Error className={errorText} match={!!fieldRootProps.invalid}>
        invalid input
      </Field.Error>
      <Field.Description className={helperText}>This is a helper text</Field.Description>
    </Field.Root>
  ),
})

export const Basic = meta.story()

export const Horizontal = meta.story({
  args: { ...field({ orientation: 'horizontal' }), disabled: false, invalid: false },
  render({ root, label, col, helperText, errorText, requiredIndicator, ...fieldRootProps }) {
    return (
      <Field.Root {...fieldRootProps} className={cx(root, css({ '--field-label-width': '100px' }))}>
        <Field.Label className={label}>
          Email<span className={requiredIndicator}>*</span>
        </Field.Label>
        <div className={col}>
          <Field.Control
            render={(controlProps) => (
              <input {...controlProps} placeholder="hoge@examle.com" className={input()} />
            )}
          />
          <Field.Error className={errorText} match={!!fieldRootProps.invalid}>
            invalid input
          </Field.Error>
          <Field.Description className={helperText}>This is a helper text</Field.Description>
        </div>
      </Field.Root>
    )
  },
})
