import { chmodSync } from 'node:fs'
import { basename, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import serverAdapter from 'hono-react-router-adapter/vite'
import type { Plugin } from 'vite'

import type { GetLoadContext, Middlewares } from '~/types'
import { type Store, store } from './store.ts'
import { developmentConfig, productionConfig } from './viteConfig.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))

const noop = () => undefined

const PLUGIN_NAME = 'yamatomo-react-router-hono-plugin'

type ServerAdapterOptions = Parameters<typeof serverAdapter>[0]
type Msw = NonNullable<Store['msw']>

export type Options = Partial<{
  entry: string
  outFilePermissions: string
  dev: Partial<{
    isReloadWhenServerFileChanged: boolean
    middlewares: Middlewares
    getLoadContext: GetLoadContext
    msw: Promise<Msw> | Msw | false
    exclude: (defaultExclude: ServerAdapterOptions['exclude']) => ServerAdapterOptions['exclude']
  }>
}>

export declare namespace Options {
  export type { Msw }
}

export const reactRouterHono: (options?: Options) => Plugin = (options) => {
  const { entry = 'server', outFilePermissions = '755', dev } = options || {}

  const exclude = dev?.exclude ?? ((defaultExclude) => defaultExclude)
  const honoServerAdapter = serverAdapter({
    entry: `${__dirname}/devServerEntry`,
    exclude: exclude([
      /^\/@.+$/,
      /^\/node_modules\/.*/,
      /^\/static\/.+/,
      /^\/public\/.+/,
      /^\/app\/.+/,
      /^\/assets\/.+/,
      // matches for vite's import assets suffixes
      /\?(?:inline|url|no-inline|raw|import(?:&(?:inline|url|no-inline|raw)?)?)$/,
    ]),
    getLoadContext: dev?.getLoadContext,
  })

  return {
    ...honoServerAdapter,
    name: PLUGIN_NAME,
    config: async function (this, config, env) {
      const isPluginIncluded = !!config.plugins?.find(
        (plugin) => plugin && 'name' in plugin && plugin.name === PLUGIN_NAME,
      )
      if (!isPluginIncluded) return

      if (env.mode === 'production') {
        return productionConfig(config, entry)
      }

      if (typeof honoServerAdapter.config !== 'function') {
        throw new Error('Unexpected honoServerAdapter.config type')
      }
      const honoServerAdapterConfig =
        (await honoServerAdapter.config?.bind(this)(config, env)) ?? undefined

      store.middlewares = dev?.middlewares
      store.msw = (await dev?.msw) || undefined
      Object.entries(store.msw?.env() ?? {}).forEach(([name, value]) => {
        process.env[name] = value
      })

      return developmentConfig(config, honoServerAdapterConfig)
    },
    handleHotUpdate: dev?.isReloadWhenServerFileChanged ? honoServerAdapter.handleHotUpdate : noop,
    writeBundle: ({ dir }, outputBundle) => {
      const outFile = `${basename(entry, extname(entry))}.js`

      if (dir?.includes('server') && outFile in outputBundle) {
        chmodSync(join(dir, outFile), outFilePermissions)
      }
    },
  }
}
