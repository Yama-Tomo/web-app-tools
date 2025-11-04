import type { ChildProcess } from 'node:child_process'

interface AppEnv extends Record<never, unknown> {}
interface MswParams {
  port: number | string
}

type Store = {
  startApp?: (appServerPort: number) => Promise<[ChildProcess, AppEnv]>
  resolveMswParams?: (env: AppEnv) => MswParams
  isFixtureConfigured?: boolean
}

export const store: Store = {}

export const fixtureConfig = (params: Store) => {
  store.startApp = params.startApp
  store.resolveMswParams = params.resolveMswParams
  store.isFixtureConfigured = true
}

export type { AppEnv, MswParams }
