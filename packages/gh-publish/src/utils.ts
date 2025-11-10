import { execSync } from 'node:child_process'
import fs from 'node:fs'

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

export const extractChangesetsChangelogContent = (version: string) => {
  const filePath = 'CHANGELOG.md'

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  CHANGELOG file not found.`)
    return ''
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const regex = new RegExp(
    // 1. Start: (beginning of string ## or newline ##) + version number
    `(?:^##|\\n##)\\s*${version}[^\\n]*\\n` +
      // 2. Content: capture all characters non-greedily (group 1)
      //    (including ### Patch Changes and blank lines)
      `([\\s\\S]*?)` +
      // 3. End: (newline followed by next version header or end of file)
      `(?=(?:\\n##\\s*\\d+\\.)|$)`,
    'g',
  )

  return regex.exec(content)?.at(1)?.trim() || ''
}
