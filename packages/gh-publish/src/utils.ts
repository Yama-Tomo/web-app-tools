import { execSync } from 'node:child_process'

import type { Package } from '@manypkg/get-packages'

const pkgNameWithoutScope = (pkgName: string) => pkgName.split('/').pop() || pkgName

export const createReleaseName = (pkgName: string, version: string) =>
  `${pkgNameWithoutScope(pkgName)}-${version}`

export const getGitInfo = () => {
  const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim()
  const match = remoteUrl.match(/(?:github\.com[:/])(.+?)\/(.+?)(?:\.git)?$/i)

  const owner = match?.at(1)
  if (!owner) {
    throw new Error(`Could not parse repo owner from remote URL: ${remoteUrl}`)
  }

  const repo = match?.at(2)?.replace(/\.git$/, '')
  if (!repo) {
    throw new Error(`Could not parse repo name from remote URL: ${remoteUrl}`)
  }

  return { owner, repo }
}

export const DEFAULT_TAR_NAME = 'package.tgz'

export const RELEASE_NOTES = {
  CHANGESETS: 'changesets:autodetect',
  NONE: '',
} as const

export const getPackageJsonContent = async (jsonFile: string): Promise<Package['packageJson']> => {
  return (await import(jsonFile, { with: { type: 'json' } })).default
}
