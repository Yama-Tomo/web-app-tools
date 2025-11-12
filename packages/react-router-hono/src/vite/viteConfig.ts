import { createRequire } from 'node:module'
import { basename, extname } from 'node:path'

import { mergeConfig, type UserConfig } from 'vite'

import pkg from '../../package.json' with { type: 'json' }

const require = createRequire(import.meta.url)

class ConfigBuilder {
  private readonly baseConfig: UserConfig
  private extendFunctions: ((extendedConfig: UserConfig) => UserConfig)[] = []

  constructor(baseConfig: UserConfig) {
    this.baseConfig = baseConfig
  }

  build() {
    return this.extendFunctions.reduce(
      (extendedConfig, fn) => mergeConfig(extendedConfig, fn(extendedConfig)),
      this.baseConfig,
    )
  }

  extend(extendFn: (typeof this.extendFunctions)[number]) {
    this.extendFunctions.push(extendFn)
    return this
  }
}

const commonConfig = (extendedConfig: UserConfig) => ({
  base: extendedConfig.base ?? process.env.BASE ?? undefined,
})

// Fixed: https://github.com/remix-run/react-router/issues/14102
const useProductionReactRouterConfig = () => ({
  resolve: {
    alias: {
      'react-router/dom': require.resolve('react-router/dom').replace('development', 'production'),
      'react-router': require.resolve('react-router').replace('development', 'production'),
    },
  },
  ssr: {
    noExternal: [/react-router/, /@react-router/],
  },
})

const bunSupportConfig = () => ({
  resolve: {
    alias: {
      // Fixed: https://github.com/facebook/react/issues/33612
      'react-dom/server': require.resolve('react-dom/server.node'),
    },
  },
  ssr: {
    noExternal: ['@mjackson/node-fetch-server'],
  },
})

export const productionConfig = (baseConfig: UserConfig, entry: string) => {
  const isServerSideBuild = () =>
    typeof baseConfig?.build?.rollupOptions?.input === 'string' &&
    baseConfig.build.rollupOptions.input.includes('react-router/server-build')

  if (isServerSideBuild()) {
    const entryName = basename(entry, extname(entry))

    return new ConfigBuilder(baseConfig)
      .extend(commonConfig)
      .extend(useProductionReactRouterConfig)
      .extend(bunSupportConfig)
      .extend(() => ({
        build: {
          rollupOptions: {
            input: { [entryName]: entryName },
            output: { entryFileNames: '[name].js' },
          },
        },
        ssr: {
          noExternal: [new RegExp(pkg.name)],
        },
      }))
      .build()
  }

  return new ConfigBuilder(baseConfig)
    .extend(commonConfig)
    .extend(useProductionReactRouterConfig)
    .build()
}

export const developmentConfig = (
  baseConfig: UserConfig,
  honoServerAdapterConfig: UserConfig | undefined,
) => {
  const _honoServerAdapterConfig = () => honoServerAdapterConfig || {}

  return new ConfigBuilder(baseConfig)
    .extend(commonConfig)
    .extend(_honoServerAdapterConfig)
    .extend((extendedConfig) => ({
      server: {
        port: extendedConfig.server?.port || Number(process.env.PORT),
      },
    }))
    .build()
}
