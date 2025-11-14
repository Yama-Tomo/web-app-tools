import { expect, test } from '@yamatomo/playwright'
import { HttpResponse, http } from 'msw'

test('Should return 200 response', async ({ page, msw }) => {
  msw.use(
    http.get(msw.api('/message'), () => {
      return HttpResponse.json({ data: 'Welcome to React Router Hono(Bun)' })
    }),
  )

  const response = await page.goto('/')
  await expect(page.getByText('Welcome to React Router Hono(Bun)')).toBeVisible()
  expect(await response?.headerValue('X-Powered-By')).toBe('React Router Hono(Bun)')
})
