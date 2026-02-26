import { Menu } from '@base-ui/react/menu'

import { menu } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { keys } from '#utils'
import { menuConfig } from './menu.ts'

const sizes = keys(menuConfig().variants.size)
const placement = ['top', 'right', 'bottom', 'left'] as const

type Args = {
  placement?: (typeof placement)[number]
  size?: (typeof sizes)[number]
}

const CheckIcon = () => (
  <svg fill="currentcolor" viewBox="0 0 10 10">
    <title>check</title>
    <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
  </svg>
)

const meta = preview.meta({
  args: { placement: 'bottom', size: sizes[1] },
  argTypes: {
    placement: { control: { type: 'radio' }, options: placement },
    size: { control: { type: 'radio' }, options: sizes },
  },
  component: ({ size, placement }: Args) => {
    const { popup, groupLabel, item, itemIndicator, separator } = menu({ size })
    return (
      <Menu.Root>
        <Menu.Trigger>menu</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8} side={placement}>
            <Menu.Popup className={popup}>
              <Menu.Group>
                <Menu.GroupLabel className={groupLabel}>Group 1</Menu.GroupLabel>
                <Menu.Item className={item}>item 1</Menu.Item>
                <Menu.SubmenuRoot>
                  <Menu.SubmenuTrigger className={item}> sub menu </Menu.SubmenuTrigger>
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup className={popup}>
                        <Menu.Item className={item}>submenu item1</Menu.Item>
                        <Menu.Item className={item}>submenu item2</Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.SubmenuRoot>
              </Menu.Group>
              <Menu.Separator className={separator} />
              <Menu.Group>
                <Menu.GroupLabel className={groupLabel}>checkbox</Menu.GroupLabel>
                <Menu.CheckboxItem className={item}>
                  <Menu.CheckboxItemIndicator className={itemIndicator}>
                    <CheckIcon />
                  </Menu.CheckboxItemIndicator>
                  item1
                </Menu.CheckboxItem>
                <Menu.CheckboxItem className={item}>
                  <Menu.CheckboxItemIndicator className={itemIndicator}>
                    <CheckIcon />
                  </Menu.CheckboxItemIndicator>
                  item2
                </Menu.CheckboxItem>
              </Menu.Group>
              <Menu.Group>
                <Menu.GroupLabel className={groupLabel}>radio</Menu.GroupLabel>
                <Menu.RadioGroup>
                  <Menu.RadioItem className={item} value="item1">
                    <Menu.RadioItemIndicator className={itemIndicator}>
                      <CheckIcon />
                    </Menu.RadioItemIndicator>
                    item1
                  </Menu.RadioItem>
                  <Menu.RadioItem className={item} value="item2">
                    <Menu.RadioItemIndicator className={itemIndicator}>
                      <CheckIcon />
                    </Menu.RadioItemIndicator>
                    item2
                  </Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu.Group>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    )
  },
  parameters: { layout: 'centered' },
})

export const Basic = meta.story()
