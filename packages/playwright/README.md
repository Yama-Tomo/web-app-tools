# playwright

Integration with Playwright and MSW for integration testing.

## usage

Fixture configuration to `playwright.config.ts`

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

import { spawn } from 'node:child_process'
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
      spawn('/your/app/start/command', ['...options'], { env: { ...process.env, ...appEnv } }),
      appEnv,
    ]
  },
  resolveMswParams: (appEnv) => ({
    port: new URL(appEnv.BACKEND_API_HOST).port,
    api: (path) => new URL(path, appEnv.BACKEND_API_HOST).toString(),
  }),
})

export default defineConfig({
  // ...
  use: {
    baseURL: `http://localhost:${await getPort()}`, // Setting the baseURL is also required
    // ...
  },
})
```

Write tests using the `msw` fixture.
```typescript
// example.spec.ts
import { expect, test } from '@yamatomo/playwright'
import { HttpResponse, http } from 'msw'

test('integration tests', async ({ page, msw }) => {
  msw.use(
    http.get(msw.api('/message'), () => {
      return HttpResponse.json({ data: 'hello world' })
    }),
  )
  await page.goto('/')
  await expect(page.getByText('hello world')).toBeVisible()
})
```
