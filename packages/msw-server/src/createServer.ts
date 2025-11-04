import http, {
  type ServerOptions as HttpServerOptions,
  type RequestListener,
  type RequestOptions,
} from 'node:http'
import https, { type ServerOptions as HttpsServerOptions } from 'node:https'

import type { ServerOptions as WsServerOptions } from 'ws'
import { WebSocketServer } from 'ws'

const defaultRequestOptions = (defaultOptions: RequestOptions) => defaultOptions

export type Params = { port: number; setupMsw: typeof import('msw/node')['setupServer'] }

export type Options = {
  web?: (({ ssl?: false } & HttpServerOptions) | ({ ssl: true } & HttpsServerOptions)) & {
    requestOptions?: typeof defaultRequestOptions
  }
  ws?: Omit<WsServerOptions, 'noServer' | 'server'>
}

export const createServer = (params: Params, options?: Options) => {
  const { requestOptions = defaultRequestOptions, ...webServerOptions } = options?.web ?? {}

  const createHttpServer = (listener: RequestListener) => {
    return webServerOptions.ssl
      ? https.createServer(webServerOptions, listener)
      : http.createServer(webServerOptions, listener)
  }

  const httpServer = createHttpServer((req, res) => {
    const [hostname, port] = (req.headers.host || '').split(':')
    const proxyReq = http.request(
      requestOptions({
        host: req.headers.host,
        hostname,
        port,
        method: req.method,
        path: req.url,
        headers: req.headers,
      }),
    )

    req.pipe(proxyReq).on('response', (proxyRes) => {
      if (proxyRes.statusMessage === 'Unhandled Exception') {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: `Unhandled request to ${req.method}: ${req.url}` }))
        return
      }

      res.writeHead(proxyRes.statusCode || 500, proxyRes.headers)
      proxyRes.pipe(res)
    })
  })

  const wsServer = new WebSocketServer({ ...options?.ws, noServer: true })
  httpServer.on('upgrade', (request, socket, head) => {
    const proxyWs = new globalThis.WebSocket(`ws://${request.headers.host}${request.url}`)
    proxyWs.addEventListener('open', () => {
      wsServer.handleUpgrade(request, socket, head, (ws) => {
        proxyWs.addEventListener('message', ({ data }) => {
          ws.send(data)
        })

        ws.addEventListener('message', ({ data }) => {
          proxyWs.send(data as Parameters<typeof proxyWs.send>[0])
        })
      })
    })
  })

  const msw = params.setupMsw()
  const closeMsw = msw.close.bind(msw)
  const listenMsw = msw.listen.bind(msw)

  return Object.assign(msw, {
    listen() {
      listenMsw({
        onUnhandledRequest() {
          throw new Error()
        },
      })
      httpServer.listen(params.port)
    },
    close() {
      closeMsw()
      httpServer.close()
    },
    get port() {
      return params.port
    },
  })
}
