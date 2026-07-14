import { Tabs } from '@base-ui/react/tabs'

import { css, cx } from '#panda/css'
import { baseUITabs } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { utils } from '#yamatomo/panda-preset'
import { baseUITabs as config } from './baseUITabs.ts'

const sizes = utils.keys(config.variants.size)
const variants = utils.keys(config.variants.variant)

type Args = Partial<ReturnType<typeof baseUITabs>> &
  Tabs.Root.Props & { withCustomIndicator?: boolean }

const meta = preview.meta({
  args: { ...baseUITabs(), orientation: 'horizontal', withCustomIndicator: false },
  argTypes: {
    content: { table: { disable: true } },
    contentGroup: { table: { disable: true } },
    list: { table: { disable: true } },
    orientation: { control: { type: 'radio' }, options: ['horizontal', 'vertical'] },
  },
  component({ root, list, trigger, indicator, content, withCustomIndicator, ...rootProps }: Args) {
    return (
      <Tabs.Root {...rootProps} className={root} defaultValue="overview">
        <Tabs.List className={list}>
          <Tabs.Tab className={trigger} value="overview">
            Overview
          </Tabs.Tab>
          <Tabs.Tab className={trigger} value="projects">
            Projects
          </Tabs.Tab>
          <Tabs.Tab className={trigger} value="account">
            Account
          </Tabs.Tab>
          {withCustomIndicator && (
            <Tabs.Indicator
              className={cx(indicator, css({ bg: { _dark: 'blue.800', base: 'blue.200' } }))}
            />
          )}
        </Tabs.List>
        <Tabs.Panel className={content} value="overview">
          Workspace stats and activity.
        </Tabs.Panel>
        <Tabs.Panel className={content} value="projects">
          Milestones and deadlines.
        </Tabs.Panel>
        <Tabs.Panel className={content} value="account">
          Profile and preferences.
        </Tabs.Panel>
      </Tabs.Root>
    )
  },
})

export const Basic = meta.story()

export const Variants = meta.story({
  parameters: {
    tableDecorator: {
      cols: variants,
      rows: [{ items: variants.map((variant) => baseUITabs({ variant })) }],
    },
  },
})

export const Sizes = meta.story({
  parameters: {
    tableDecorator: {
      cols: sizes,
      rows: variants.map((variant) => ({
        items: sizes.map((size) => baseUITabs({ size, variant })),
        name: variant,
      })),
    },
  },
})
