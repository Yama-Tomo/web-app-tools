import { Field } from '@base-ui/react/field'
import { Select } from '@base-ui/react/select'

import { css, cx } from '#panda/css'
import { select } from '#panda/recipes'
import preview from '#sb/preview.tsx'

type Args = Partial<ReturnType<typeof select>> &
  Select.Root.Props<string> &
  Pick<Field.Root.Props, 'disabled' | 'invalid'>

const items = Array.from({ length: 20 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: `item-${i + 1}`,
}))

const meta = preview.meta({
  args: { ...select(), disabled: false, invalid: false },
  argTypes: {
    item: { table: { disable: true } },
    itemIndicator: { table: { disable: true } },
    itemText: { table: { disable: true } },
    list: { table: { disable: true } },
    scrollDownIndicator: { table: { disable: true } },
    scrollTopIndicator: { table: { disable: true } },
    triggerIndicator: { table: { disable: true } },
  },
  component: ({
    trigger,
    triggerIndicator,
    value,
    positioner,
    popup,
    list,
    item,
    itemText,
    itemIndicator,
    scrollTopIndicator,
    scrollDownIndicator,
    disabled,
    invalid,
    ...rootProps
  }: Args) => (
    <Field.Root {...{ disabled, invalid }}>
      <Select.Root {...rootProps}>
        <Select.Trigger className={cx(trigger, css({ minW: '48' }))}>
          <Select.Value className={value} placeholder="Select items" />
          <Select.Icon className={triggerIndicator}>
            <svg
              stroke="currentcolor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              viewBox="0 0 24 24"
            >
              <title>select</title>
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className={positioner} sideOffset={8}>
            <Select.Popup className={popup}>
              <Select.ScrollUpArrow className={scrollTopIndicator} />
              <Select.List className={list}>
                {items.map(({ label, value }) => (
                  <Select.Item key={label} value={value} className={item}>
                    <Select.ItemText className={itemText}>{label}</Select.ItemText>
                    <Select.ItemIndicator className={itemIndicator}>
                      <svg fill="currentcolor" viewBox="0 0 10 10">
                        <title>selected</title>
                        <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
                      </svg>
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
              <Select.ScrollDownArrow className={scrollDownIndicator} />
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </Field.Root>
  ),
})

const sizes = ['xs', 'sm', 'md', 'lg'] as const

export const Basic = meta.story()

export const Sizes = meta.story({
  parameters: {
    tableDecorator: {
      cols: sizes,
      rows: [
        {
          items: [
            select({ size: sizes[0] }),
            select({ size: sizes[1] }),
            select({ size: sizes[2] }),
            select({ size: sizes[3] }),
          ] satisfies Args[],
        },
      ],
    },
  },
})
