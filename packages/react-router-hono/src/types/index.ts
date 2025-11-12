import type { Env } from 'hono'
import type { MiddlewareHandler } from 'hono/types'
import type handler from 'hono-react-router-adapter/node'

export type GetLoadContext = NonNullable<Parameters<typeof handler>[2]>['getLoadContext']

// biome-ignore lint/suspicious:noExplicitAny
export type Middlewares<E extends Env = any> = () =>
  | Promise<MiddlewareHandler<E>[]>
  | MiddlewareHandler<E>[]
