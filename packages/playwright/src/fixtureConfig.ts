import type { ChildProcess } from 'node:child_process'

interface AppEnv extends Record<never, unknown> {}
interface MswParams {
  port: number | string
}

type Store = {
  startApp?: (baseUrlPort: number) => Promise<[ChildProcess, AppEnv]>
  resolveMswParams?: (env: AppEnv) => MswParams
  isFixtureConfigured?: boolean
}

export const store: Store = {}

/** @deprecated Use `defineConfig` instead. */
export const fixtureConfig = (params: Omit<Store, 'isFixtureConfigured'>) => {
  store.startApp = params.startApp
  store.resolveMswParams = params.resolveMswParams
  store.isFixtureConfigured = true
}

export type { AppEnv, MswParams }
