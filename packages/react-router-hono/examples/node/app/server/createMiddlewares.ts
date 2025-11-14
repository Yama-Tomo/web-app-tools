import type { Middlewares } from '@yamatomo/react-router-hono/types'

export const createMiddlewares: Middlewares = async () => {
  return [
    async (c, next) => {
      await next()
      c.header('X-Powered-By', 'React Router Hono(Node.js)')
    },
  ]
}
