import type { Middlewares } from '@yamatomo/react-router-hono/types'

export const createMiddlewares: Middlewares = async () => {
  return [
    async (c, next) => {
      await next()
      c.header('X-Powered-By', 'React Router Hono(Bun)')
    },
    async (_, next) => {
      if (!globalThis.Bun) {
        throw new Error('Bun is not defined. Probably not running on Bun runtime.')
      }

      await next()
    },
  ]
}
