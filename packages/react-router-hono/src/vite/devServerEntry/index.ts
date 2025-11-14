import { Hono } from 'hono'

import { store } from '../store.ts'

const isViteDevServerRestarted = !!store.mswServer
if (isViteDevServerRestarted) {
  store.mswServer?.close()
  store.mswServer = undefined
}

const app = new Hono()

;(await (store.middlewares?.() ?? [])).forEach((middleware) => {
  app.use(middleware)
})

app.use(async (_, next) => {
  const createMswServer = async () => {
    if (!store.msw) return undefined

    const handlers = await store.msw.handlers()
    const server = (await import('msw/node')).setupServer(...handlers)
    server.listen({ onUnhandledRequest: 'bypass' })

    return server
  }

  store.mswServer ||= await createMswServer()

  await next()
})

app.get('/.well-known/appspecific/com.chrome.devtools.json', async (ctx) => {
  return ctx.text('', 404)
})

export default app
