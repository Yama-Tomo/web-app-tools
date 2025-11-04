import { execSync } from 'node:child_process'

import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('node:child_process')

describe('createReleaseName', () => {
  const createReleaseName = async (
    ...args: Parameters<typeof import('./utils.ts')['createReleaseName']>
  ) => (await import('./utils.ts')).createReleaseName(...args)

  it('removes scope and combines with version', async () => {
    expect(await createReleaseName('@scope/pkg', '1.2.3')).toBe('pkg-1.2.3')
    expect(await createReleaseName('pkg', '0.0.1')).toBe('pkg-0.0.1')
  })
})

describe('getGitInfo', () => {
  const getGitInfo = async () => (await import('./utils.ts')).getGitInfo()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('parses owner and repo from https remote url', async () => {
    vi.mocked(execSync).mockReturnValue('https://github.com/owner/repo.git\n')
    expect(await getGitInfo()).toEqual({ owner: 'owner', repo: 'repo' })
  })

  it('parses owner and repo from ssh remote url', async () => {
    vi.mocked(execSync).mockReturnValue('git@github.com:owner/repo.git\n')
    expect(await getGitInfo()).toEqual({ owner: 'owner', repo: 'repo' })
  })

  it('throws if owner is missing', async () => {
    vi.mocked(execSync).mockReturnValue('https://github.com//repo.git\n')
    await expect(getGitInfo()).rejects.toThrow(
      'Could not parse repo owner from remote URL: https://github.com//repo.git',
    )
  })

  it('throws if repo is missing', async () => {
    vi.mocked(execSync).mockReturnValue('https://github.com/owner/.git\n')
    await expect(getGitInfo()).rejects.toThrow(
      'Could not parse repo name from remote URL: https://github.com/owner/.git',
    )
  })
})
