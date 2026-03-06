import { Toast } from '@base-ui/react/toast'
import { type ReactNode, useState } from 'react'

import { vstack } from '#panda/patterns'
import { baseUIToast } from '#panda/recipes'
import preview from '#sb/preview.tsx'
import { utils } from '#yamatomo/panda-preset'
import { baseUIToast as config } from './baseUIToast'

const placements = utils.keys(config.variants.placement)
const stackingTypes = utils.keys(config.variants.stacking)
const types = ['success', 'error', 'info', 'warning'] as const

type Args = Partial<{
  timeout: number
  limit: number
  title: ReactNode
  action: ReactNode
  type: (typeof types)[number]
  placement: (typeof placements)[number]
  stacking: (typeof stackingTypes)[number]
}>

const ToastContent = (args: Args) => {
  const { viewport, root, indicator, title, description, actionTrigger, closeTrigger } =
    baseUIToast({ placement: args.placement, stacking: args.stacking })

  const toastManager = Toast.useToastManager()
  const [count, setCount] = useState(0)
  const createToast = () => {
    setCount((prev) => prev + 1)
    toastManager.add({
      actionProps: { children: args.action },
      description: `Toast ${count + 1} created.`,
      title: args.title,
      type: args.type,
    })
  }

  return (
    <>
      <button type="button" className={''} onClick={createToast}>
        Create toast
      </button>
      <Toast.Portal>
        <Toast.Viewport className={viewport}>
          {toastManager.toasts.map((toast) => (
            <Toast.Root
              key={toast.id}
              toast={toast}
              className={root}
              swipeDirection={['left', 'right', 'down', 'up']}
            >
              <svg viewBox="0 0 24 24" className={indicator} fill="currentColor">
                <title>indicator</title>
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path>
              </svg>
              <div className={vstack({ alignItems: 'flex-start', flex: '1', gap: '1' })}>
                <Toast.Title className={title} />
                <Toast.Description className={description} />
              </div>
              <Toast.Action className={actionTrigger} />
              <Toast.Close className={closeTrigger} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <title>close</title>
                  <path d="M18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711Z" />
                </svg>
              </Toast.Close>
            </Toast.Root>
          ))}
        </Toast.Viewport>
      </Toast.Portal>
    </>
  )
}

const Component = ({ limit, timeout, ...rest }: Args) => (
  <Toast.Provider timeout={timeout} limit={limit}>
    <ToastContent {...rest} />
  </Toast.Provider>
)

const meta = preview.meta({
  args: { limit: 3, timeout: 5000 },
  argTypes: {
    placement: { control: { type: 'radio' }, options: placements },
    stacking: { control: { type: 'radio' }, options: stackingTypes },
    type: { control: { type: 'radio' }, options: types },
  },
  component: Component,
  parameters: { layout: 'centered' },
})

export const Basic = meta.story()

export const WithAction = meta.story({
  args: { action: 'Action', title: 'Toast title' },
})
