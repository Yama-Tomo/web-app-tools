import { Combobox } from '@base-ui/react/combobox'
import { Field } from '@base-ui/react/field'
import type { ReactNode } from 'react'

import { css, cx } from '#panda/css'
import { baseUICombobox } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { utils } from '#yamatomo/panda-preset'
import { baseUICombobox as config } from './baseUICombobox.ts'

const sizes = utils.keys(config.variants.size)
const variants = utils.keys(config.variants.variant)

type Args = { styles: ReturnType<typeof baseUICombobox> } & Partial<
  {
    // biome-ignore lint/suspicious/noExplicitAny: necessary for generic children function
    children: (...args: any[]) => ReactNode
    items: Combobox.Root.Props<unknown>['items']
  } & Pick<Field.Root.Props, 'disabled' | 'invalid'>
>

const defaultItems = Array.from({ length: 20 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: i + 1,
}))

const Component = (args: Args) => {
  const { styles, items = defaultItems, children, disabled, invalid } = args

  return (
    <Combobox.Root items={items}>
      <Field.Root {...{ disabled, invalid }} className={cx(styles.root, css({ minW: '64' }))}>
        <Combobox.Input placeholder="e.g. item 1" className={styles.input} />
        <div className={styles.triggerGroup}>
          <Combobox.Clear className={styles.clearTrigger} data-part="clear-trigger">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <title>clear</title>
              <path d="M18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711Z"></path>
            </svg>
          </Combobox.Clear>
          <Combobox.Trigger className={styles.trigger} aria-label="Open popup" data-part="trigger">
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
          </Combobox.Trigger>
        </div>
      </Field.Root>
      <Combobox.Portal>
        <Combobox.Positioner sideOffset={4}>
          <Combobox.Popup className={styles.popup}>
            <Combobox.Empty className={styles.empty}>No item found.</Combobox.Empty>
            <Combobox.List className={styles.list}>
              {(item: (typeof items)[number], idx) =>
                children?.(item, idx) ?? (
                  <Combobox.Item key={item.value} value={item} className={styles.item}>
                    <div>{item.label}</div>
                    <Combobox.ItemIndicator>
                      <svg fill="currentcolor" viewBox="0 0 10 10">
                        <title>selected</title>
                        <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
                      </svg>
                    </Combobox.ItemIndicator>
                  </Combobox.Item>
                )
              }
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  )
}

const meta = preview.meta({
  args: { disabled: false, invalid: false, styles: baseUICombobox() },
  argTypes: {
    styles: { table: { disable: true } },
  },
  component: Component,
})

export const Basic = meta.story()

export const Group = meta.story({
  render(args) {
    const styles = args.styles

    const items = [
      { items: defaultItems, name: 'Group 1' },
      {
        items: defaultItems.map(({ value }) => ({
          label: `Item ${value + defaultItems.length}`,
          value: value + defaultItems.length,
        })),
        name: 'Group 2',
      },
    ]

    return (
      <Component {...args} items={items}>
        {(group: (typeof items)[number]) => (
          <Combobox.Group key={group.name} items={group.items} className={styles.group}>
            <Combobox.GroupLabel className={styles.groupLabel}>{group.name}</Combobox.GroupLabel>
            <Combobox.Collection>
              {(item: (typeof items)[number]['items'][number]) => (
                <Combobox.Item key={item.value} className={styles.item} value={item}>
                  <div>{item.label}</div>
                  <Combobox.ItemIndicator>
                    <svg fill="currentcolor" viewBox="0 0 10 10">
                      <title>selected</title>
                      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
                    </svg>
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </Combobox.Collection>
          </Combobox.Group>
        )}
      </Component>
    )
  },
})

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [{ items: variants.map((variant) => ({ styles: baseUICombobox({ variant }) })) }],
    },
  },
})

export const Size = meta.story({
  parameters: {
    tableDecorator: {
      cols: sizes,
      rows: [{ items: sizes.map((size) => ({ styles: baseUICombobox({ size }) })) }],
    },
  },
})
