import { Dialog } from '@base-ui/react/dialog'
import type { PropsWithChildren } from 'react'

import { cx } from '#panda/css'
import { button, dialog } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { keys } from '#utils'
import { dialogConfig } from './dialog.ts'

const { defaultVariants, variants } = dialogConfig()
const sizes = keys(variants.size)
const placements = keys(variants.placement)
const stacking = keys(variants.stacking)
const motionPresets = keys(variants.motionPreset)

type Args = PropsWithChildren<{
  size?: (typeof sizes)[number]
  placement?: (typeof placements)[number]
  stacking?: (typeof stacking)[number]
  motionPreset?: (typeof motionPresets)[number]
}>

const Component = ({ size, placement, stacking, motionPreset, children }: Args) => {
  const { backdrop, body, popup, header, title, closeTrigger } = dialog({
    motionPreset,
    placement,
    size,
    stacking,
  })

  return (
    <Dialog.Root>
      <Dialog.Trigger className={button()}>open dialog</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={cx(backdrop)} />
        <Dialog.Popup className={popup}>
          <div className={header}>
            <Dialog.Title className={title}>Dialog Title</Dialog.Title>
          </div>
          <div className={body}>
            {children ?? (
              <>
                <p>
                  あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
                </p>
                <p>
                  またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。
                </p>
                <p>
                  では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう
                </p>
              </>
            )}
            <Component {...{ placement, size, stacking }}>
              <p>nested dialog</p>
            </Component>
          </div>
          <Dialog.Close className={closeTrigger}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <title>close</title>
              <path d="M18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711Z"></path>
            </svg>
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const meta = preview.meta({
  args: defaultVariants,
  argTypes: {
    motionPreset: { control: { type: 'radio' }, options: motionPresets },
    placement: { control: { type: 'radio' }, options: placements },
    size: { control: { type: 'radio' }, options: sizes },
    stacking: { control: { type: 'radio' }, options: stacking },
  },
  component: Component,
})

export const Basic = meta.story()
