import { spawn } from 'node:child_process'

import { defineConfig, devices } from '@playwright/test'
import { type AppEnv, fixtureConfig, getPort } from '@yamatomo/playwright'

declare module '@yamatomo/playwright' {
  interface AppEnv {
    BACKEND_API_HOST: string
  }

  interface MswParams {
    api: (path: string) => string
  }
}

fixtureConfig({
  startApp: async (appPort) => {
    const appEnv: AppEnv = {
      BACKEND_API_HOST: `http://backend-api.localhost:${await getPort()}`,
    }

    return [
      spawn('pnpm', ['dev', `--port=${appPort}`], { env: { ...process.env, ...appEnv } }),
      appEnv,
    ]
  },
  resolveMswParams: (appEnv) => ({
    port: new URL(appEnv.BACKEND_API_HOST).port,
    api: (path) => new URL(path, appEnv.BACKEND_API_HOST).toString(),
  }),
})

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:${await getPort()}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
