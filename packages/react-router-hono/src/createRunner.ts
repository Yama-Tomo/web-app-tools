import { Hono } from 'hono'
import type { MiddlewareHandler } from 'hono/types'
import handle from 'hono-react-router-adapter/node'
// @ts-expect-error
import * as build from 'virtual:react-router/server-build'

import type { GetLoadContext, Middlewares } from '~/types'

export type Options = Partial<{
  port: number
  buildDirectory: string
  middlewares: Middlewares
  getLoadContext: GetLoadContext
}>

export type Runner = (options?: Options) => Promise<void>

export const createRunner = (
  serveStatic: (params: { root?: string }) => MiddlewareHandler,
  serve: (options: { fetch: Hono['fetch']; port: number }) => void,
): Runner => {
  return async (options) => {
    const {
      middlewares = async () => [],
      buildDirectory = 'build',
      port = Number(process.env.PORT || 3000),
      getLoadContext = () => ({}),
    } = options || {}

    const app = new Hono()
    ;(await middlewares()).forEach((middleware) => {
      app.use(middleware)
    })
    app.use(serveStatic({ root: `./${buildDirectory}/client` }))

    serve({ fetch: handle(build, app, { getLoadContext }).fetch, port })
  }
}
