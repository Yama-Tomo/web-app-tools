import { expect, test } from '@yamatomo/playwright'
import { HttpResponse, http } from 'msw'

test('MSW can mock API responses', async ({ page, msw }) => {
  msw.use(
    http.get(msw.api('/message'), () => {
      return HttpResponse.json({ data: 'hello world' })
    }),
  )
  await page.goto('/')
  await expect(page.getByText('hello world')).toBeVisible()

  msw.use(
    http.get(msw.api('/message'), () => {
      return HttpResponse.json({ data: 'hello,world!' })
    }),
  )
  await page.reload()
  await expect(page.getByText('hello,world!')).toBeVisible()
})

test('MSW handlers are reset between tests', async ({ page, app }) => {
  const response = await page.goto('/')
  expect(response?.status()).toBe(500)

  await new Promise<void>((resolve) => {
    app.process.stderr?.on('data', (appProcessStderr: Buffer) => {
      // expect app.process.stderr to contain the fetch error from the app server
      expect(appProcessStderr.toString('utf-8')).toContain('TypeError: fetch failed')
      resolve()
    })
  })
})
