import * as fs from 'node:fs'

import { Octokit } from '@octokit/rest'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { pack } from './pack.ts'
import * as utils from './utils.ts'

vi.spyOn(console, 'log').mockImplementation(() => undefined)

vi.mock('node:fs')
vi.mock('@octokit/rest')
vi.mock('./pack.ts')
vi.mock('./utils.ts', async (original) => ({
  ...(await original()),
  getPackageJsonContent: vi.fn(),
  getGitInfo: vi.fn(),
}))

type OctokitInstance = InstanceType<typeof Octokit>
const OctokitInstance = Octokit.prototype as OctokitInstance

type PaginateMock = Mock<OctokitInstance['paginate']> & OctokitInstance['paginate']

describe('publish', () => {
  const publish = async (...args: Parameters<typeof import('./publish.ts')['publish']>) =>
    await (await import('./publish.ts')).publish(...args)

  beforeEach(() => {
    vi.clearAllMocks()

    process.env.GITHUB_TOKEN = 'test-token'

    vi.mocked(fs).existsSync.mockReturnValue(true)
    vi.mocked(fs).readFileSync.mockImplementation((file) => {
      if (file === 'CHANGELOG.md') {
        return `## 1.0.0

### Patch Changes

- changes1
- changes2

## 0.9.0
### Patch Changes

- changes2
`
      }

      if (file === '/path/to/test.tgz') {
        return 'tgz content'
      }

      throw new Error('File not found')
    })

    vi.mocked(Octokit.plugin).mockImplementation(() => Octokit)
    vi.mocked(OctokitInstance).paginate = vi.fn().mockResolvedValue([]) as PaginateMock
    vi.mocked(OctokitInstance).rest = {
      repos: {
        listReleases: vi.fn(),
        createRelease: vi.fn().mockResolvedValue({ data: { id: 123 } }),
        uploadReleaseAsset: vi.fn(),
      },
    } as unknown as OctokitInstance['rest']

    vi.mocked(pack).mockResolvedValue('/path/to/test.tgz')
    vi.mocked(utils.getPackageJsonContent).mockResolvedValue({
      name: '@scope/test-package',
      version: '1.0.0',
    })
    vi.mocked(utils.getGitInfo).mockReturnValue({ owner: 'owner', repo: 'repo' })
  })

  it('creates a new release and uploads asset', async () => {
    await publish('test.tgz', 'Release note', false)

    expect(OctokitInstance.rest.repos.createRelease).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      name: '@scope/test-package@1.0.0',
      tag_name: 'test-package-1.0.0',
      body: 'Release note',
      draft: false,
      prerelease: false,
    })
    expect(OctokitInstance.rest.repos.uploadReleaseAsset).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      release_id: 123,
      name: 'test.tgz',
      headers: { 'content-type': 'application/gzip' },
      data: 'tgz content',
    })
  })

  it('creates a prerelease if version contains hyphen', async () => {
    vi.mocked(utils.getPackageJsonContent).mockResolvedValue({
      name: '@scope/test-package',
      version: '1.0.0-beta.1',
    })
    await publish('test.tgz', 'Release note', false)

    expect(OctokitInstance.rest.repos.createRelease).toHaveBeenCalledWith(
      expect.objectContaining({
        name: '@scope/test-package@1.0.0-beta.1',
        tag_name: 'test-package-1.0.0-beta.1',
        prerelease: true,
      }),
    )
  })

  it('extracts content from CHANGELOG for CHANGESETS note', async () => {
    await publish('test.tgz', 'changesets:autodetect', false)

    expect(OctokitInstance.rest.repos.createRelease).toHaveBeenCalledWith(
      expect.objectContaining({
        body: `### Patch Changes

- changes1
- changes2`,
      }),
    )
  })

  it('skips if release already exists', async () => {
    vi.mocked(OctokitInstance).paginate = vi
      .fn()
      .mockResolvedValue([{ tag_name: 'test-package-1.0.0' }]) as PaginateMock
    await publish('test.tgz', 'Release note', false)

    expect(vi.mocked(console).log).toHaveBeenCalledWith(
      'ℹ️  test-package-1.0.0 already exists. skipping release creation.',
    )
  })
})
