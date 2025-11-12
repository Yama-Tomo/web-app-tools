import { spawn } from 'node:child_process'

import { type AppEnv, defineConfig, devices, getPort } from '@yamatomo/playwright'

declare module '@yamatomo/playwright' {
  interface AppEnv {
    BACKEND_API_HOST: string
    USE_PLAYWRIGHT_MSW_FIXTURE: 'true'
    PORT: string
  }

  interface MswParams {
    api: (path: string) => string
  }
}

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
  startApp: async (baseUrlPort) => {
    const env = {
      ...process.env,
      BACKEND_API_HOST: `http://playwright-tests-mock.localhost:${await getPort()}`,
      USE_PLAYWRIGHT_MSW_FIXTURE: 'true',
      PORT: String(baseUrlPort),
    } satisfies AppEnv

    return [spawn('pnpm', [process.env.TEST_TARGET || 'start'], { env }), env]
  },
  resolveMswParams: (appEnv) => ({
    port: new URL(appEnv.BACKEND_API_HOST).port,
    api: (path) => new URL(path, appEnv.BACKEND_API_HOST).toString(),
  }),
})
