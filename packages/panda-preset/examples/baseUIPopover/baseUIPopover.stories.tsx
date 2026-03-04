import { Popover } from '@base-ui/react/popover'

import { baseUIPopover } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { utils } from '#yamatomo/panda-preset'
import { baseUIPopover as config } from './baseUIPopover.ts'

const sizes = utils.keys(config.variants.size)
const placement = ['top', 'right', 'bottom', 'left'] as const

type Args = {
  placement?: (typeof placement)[number]
  size?: (typeof sizes)[number]
}

const meta = preview.meta({
  args: { placement: 'bottom', size: sizes[2] },
  argTypes: {
    placement: { control: { type: 'radio' }, options: placement },
    size: { control: { type: 'radio' }, options: sizes },
  },
  component: ({ size, placement }: Args) => {
    const { positioner, popup, arrow, header, body } = baseUIPopover({ size })
    return (
      <Popover.Root>
        <Popover.Trigger>open</Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={16} className={positioner} side={placement}>
            <Popover.Popup className={popup}>
              <Popover.Arrow className={arrow} />
              <div className={header}>
                <Popover.Title>Title</Popover.Title>
              </div>
              <div className={body}>
                <Popover.Description>Content</Popover.Description>
              </div>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    )
  },
  parameters: { layout: 'centered' },
})

export const Basic = meta.story()
