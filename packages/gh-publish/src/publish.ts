import fs from 'node:fs'

import { throttling } from '@octokit/plugin-throttling'
import { Octokit } from '@octokit/rest'

import { pack } from './pack.ts'
import {
  createReleaseName,
  extractChangesetsChangelogContent,
  getGitInfo,
  getPackageJsonContent,
  RELEASE_NOTES,
} from './utils.ts'

const baseOctokit = Octokit.plugin(throttling)

const getOctokit = (params: ConstructorParameters<typeof baseOctokit>[0]) => {
  return new baseOctokit({
    ...params,
    throttle: {
      onRateLimit: (retryAfter, options, octokit) => {
        octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`)

        if (options.request.retryCount <= 2) {
          console.log(`Retrying after ${retryAfter} seconds!`)
          return true
        }
      },
      onSecondaryRateLimit: (retryAfter, options, octokit, retryCount) => {
        octokit.log.warning(
          `SecondaryRateLimit detected for request ${options.method} ${options.url}`,
        )

        if (retryCount <= 2) {
          console.log(`Retrying after ${retryAfter} seconds!`)
          return true
        }
      },
    },
  })
}

export const publish = async (tarName: string, releaseNote: string, draft: boolean) => {
  const packageJson = await getPackageJsonContent(`${process.cwd()}/package.json`)

  const repo = getGitInfo()

  const octokit = getOctokit({ auth: process.env.GITHUB_TOKEN })

  const releases = await octokit.rest.repos.listReleases({ ...repo, per_page: 50 })

  const releaseName = createReleaseName(packageJson.name, packageJson.version)

  if (releases.data.some((release) => release.tag_name === releaseName)) {
    console.log(`ℹ️  ${releaseName} already exists. skipping release creation.`)
    return
  }

  console.log(`🛠️  Creating GitHub Release: ${releaseName}`)

  const release = await octokit.rest.repos.createRelease({
    ...repo,
    tag_name: releaseName,
    name: `${packageJson.name}@${packageJson.version}`,
    body:
      releaseNote === RELEASE_NOTES.CHANGESETS
        ? extractChangesetsChangelogContent(packageJson.version)
        : releaseNote,
    draft,
    prerelease: packageJson.version.includes('-'),
  })

  const outputFile = await pack(tarName)

  await octokit.rest.repos.uploadReleaseAsset({
    ...repo,
    release_id: release.data.id,
    headers: { 'content-type': 'application/gzip' },
    name: tarName,
    data: fs.readFileSync(outputFile) as unknown as string,
  })

  console.log(`✅  Release ${releaseName} created successfully.`)
}
