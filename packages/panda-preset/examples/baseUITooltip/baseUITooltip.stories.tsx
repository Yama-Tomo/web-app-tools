import { Tooltip } from '@base-ui/react/tooltip'

import { baseUITooltip, button } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { presetValues } from '#yamatomo/panda-preset'

const placement = ['top', 'right', 'bottom', 'left'] as const

type Args = { placement?: (typeof placement)[number] }

const parseDuration = (value: string) => {
  const parsed = parseInt(value.replace(/m?s/, ''), 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

const meta = preview.meta({
  args: { placement: 'bottom' },
  argTypes: {
    placement: { control: { type: 'radio' }, options: placement },
  },
  component: ({ placement }: Args) => {
    const { popup, arrow } = baseUITooltip()
    return (
      <Tooltip.Provider delay={parseDuration(presetValues.tokens.durations.fast.value)}>
        <Tooltip.Root>
          <Tooltip.Trigger className={button({ variant: 'outline' })}>hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={10} side={placement}>
              <Tooltip.Popup className={popup}>
                <Tooltip.Arrow className={arrow} />
                This is the tooltip content
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    )
  },
  parameters: { layout: 'centered' },
})

export const Basic = meta.story()
