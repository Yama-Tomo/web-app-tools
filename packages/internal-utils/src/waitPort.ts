import { connect } from 'node:net'

export const waitPort = (
  port: number,
  options?: { host: string; timeout: number; interval: number },
): Promise<void> => {
  const { host = 'localhost', timeout = 5_000, interval = 10 } = options ?? {}

  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tryConnect = () => {
      const socket = connect(port, host)

      socket.once('connect', () => {
        socket.end()
        resolve()
      })

      socket.once('error', () => {
        socket.destroy()
        if (Date.now() - start > timeout) {
          reject(new Error(`Timeout waiting for port: ${host}:${port}`))
        } else {
          setTimeout(tryConnect, interval)
        }
      })
    }

    tryConnect()
  })
}
