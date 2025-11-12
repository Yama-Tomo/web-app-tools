import type { setupServer } from 'msw/node'

import type { Middlewares } from '~/types'

type Msw = {
  handlers: () => Promise<Parameters<typeof setupServer>> | Parameters<typeof setupServer>
  env: () => Record<string, string>
}

export type Store = {
  middlewares?: Middlewares
  mswServer?: ReturnType<typeof setupServer>
  msw?: Msw
}

const globalVar: { [key: string]: unknown; __yamatomoReactRouterHono?: Store } = globalThis
// biome-ignore lint/suspicious: noAssignInExpressions
export const store = (globalVar.__yamatomoReactRouterHono ||= {})
