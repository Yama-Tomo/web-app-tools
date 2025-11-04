if (process.env.START_SERVER === 'true') {
  const { createServer } = await import('./createServer')
  const { setupServer } = await import('msw/node')
  const { http, HttpResponse, graphql, ws } = await import('msw')

  const server = createServer({ port: Number(process.env.TEST_PORT), setupMsw: setupServer })

  server.use(
    http.get(`http://localhost:${server.port}/`, () => {
      return HttpResponse.text('hello world')
    }),
    graphql.query('GetUser', ({ variables }) => {
      return HttpResponse.json({
        data: {
          user: { name: `james bond [${variables.userId}]` },
        },
      })
    }),
    ws.link(`ws://localhost:${server.port}`).addEventListener('connection', ({ client }) => {
      client.addEventListener('message', (event) => {
        if (event.data === 'hello from client') {
          client.send('hello from server')
        }
      })
    }),
  )

  server.listen()

  process.on('exit', () => {
    server.close()
    process.exit(0)
  })

  await new Promise(() => undefined)
}

import { execSync, spawn } from 'node:child_process'

import { getPort, waitPort } from '@yamatomo/internal-utils'
import { beforeAll, expect, it } from 'vitest'

let port = 0

beforeAll(async () => {
  port = await getPort()

  const tsxBinPath = execSync('pnpm exec which tsx').toString().trim()
  const child = spawn(tsxBinPath, [__filename], {
    env: { ...process.env, START_SERVER: 'true', TEST_PORT: String(port) },
  })
  await waitPort(port)

  process.on('SIGTERM', () => {
    child.kill('SIGTERM')
  })
})

it('should handle HTTP requests', async () => {
  const res = await fetch(`http://localhost:${port}/`)

  expect(res.status).toBe(200)
  expect(await res.text()).toBe('hello world')
})

it('should 404 response when unhandled requests', async () => {
  const res = await fetch(`http://localhost:${port}/not_found`)

  expect(res.status).toBe(404)
  expect(await res.json()).toStrictEqual({ error: 'Unhandled request to GET: /not_found' })
})

it('should handle GraphQL requests', async () => {
  const res = await fetch(`http://localhost:${port}/graphql`, {
    method: 'POST',
    body: JSON.stringify({
      query: `query GetUser($userId: String!) {
        user(id: $userId) {
          name
        }
      }`,
      variables: { userId: '007' },
    }),
  })

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual({
    data: {
      user: { name: 'james bond [007]' },
    },
  })
})

it('should handle WebSocket connections', () =>
  new Promise<void>((success, fail) => {
    const ws = new WebSocket(`ws://localhost:${port}`)
    ws.onopen = () => {
      ws.send('hello from client')
    }
    ws.onmessage = (event) => {
      expect(event.data).toBe('hello from server')
      ws.close()
      success()
    }
    ws.onerror = (error) => {
      fail(error)
    }
  }))
