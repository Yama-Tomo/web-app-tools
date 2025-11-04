import { test as base } from '@playwright/test'
import { waitPort } from '@yamatomo/internal-utils'
import { createServer } from '@yamatomo/msw-server'
import { setupServer } from 'msw/node'

import { type AppEnv, type MswParams, store } from './fixtureConfig'

const startApp = async (baseURL: string) => {
  if (!store.startApp) throw new Error('startApp is not defined.')

  const appPort = Number(new URL(baseURL).port)
  const [process, env] = await store.startApp(appPort)
  await waitPort(appPort)

  return { process, env }
}

const startMswServer = async (appEnv: AppEnv) => {
  if (!store.resolveMswParams) throw new Error('resolveMswParams is not defined.')

  const { port, ...restParams } = store.resolveMswParams(appEnv)
  const server = createServer({ port: Number(port), setupMsw: setupServer })
  server.listen()
  await waitPort(server.port)

  return Object.assign(server, restParams as Omit<MswParams, 'port'>)
}

type TestFixtureType = { msw: Awaited<ReturnType<typeof startMswServer>> }
type WorkerFixtureType = { app: Awaited<ReturnType<typeof startApp>> }
const test = base.extend<TestFixtureType, WorkerFixtureType>({
  app: [
    // biome-ignore lint/correctness: noEmptyPattern
    async ({}, use, workerInfo) => {
      const baseURL = workerInfo.project.use.baseURL
      if (!baseURL) throw new Error('baseURL is not defined.')

      const app = await startApp(baseURL)

      process.on('exit', () => {
        app.process.kill('SIGINT')
      })

      await use(app)

      app.process.kill('SIGINT')
    },
    { scope: 'worker' },
  ],
  msw: [
    async ({ app }, use) => {
      const mswServer = await startMswServer(app.env)

      await use(mswServer)

      mswServer.close()
    },
    { scope: 'test' },
  ],
})

export * from '@playwright/test'
export { test }
