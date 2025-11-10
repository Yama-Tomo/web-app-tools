import * as fs from 'node:fs'

import type { Tool } from '@manypkg/get-packages'
import { getPackages, type Packages } from '@manypkg/get-packages'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as utils from './utils.ts'

vi.spyOn(console, 'log').mockImplementation(() => undefined)
vi.spyOn(console, 'warn').mockImplementation(() => undefined)
vi.spyOn(process, 'chdir').mockImplementation(() => undefined)

vi.mock('node:fs')
vi.mock('node:child_process')
vi.mock('@manypkg/get-packages')
vi.mock('./utils.ts', async (original) => ({
  ...(await original()),
  getPackageJsonContent: vi.fn(),
  getGitInfo: vi.fn(),
}))

const readdirSyncReturnValue = (files: string[]) =>
  files as unknown as ReturnType<typeof fs.readdirSync>

describe('pack', () => {
  const pack = async (...args: Parameters<typeof import('./pack.ts')['pack']>) =>
    (await import('./pack.ts')).pack(...args)

  let writtenPackageJson: string

  beforeEach(async () => {
    vi.clearAllMocks()

    writtenPackageJson = 'not written'

    vi.mocked(fs).existsSync.mockReturnValue(false)
    vi.mocked(fs).readdirSync.mockReturnValue(readdirSyncReturnValue(['test.tgz']))
    vi.mocked(fs).renameSync.mockImplementation(() => {})
    vi.mocked(fs).rmSync.mockImplementation(() => {})
    vi.mocked(fs).mkdtempSync.mockReturnValue('/tmp/gh-pack-xxxx')
    vi.mocked(fs).writeFileSync.mockImplementation((file, content) => {
      if (file === '/tmp/gh-pack-xxxx/package/package.json' && typeof content === 'string') {
        writtenPackageJson = content
        return
      }

      throw new Error('File not found')
    })

    vi.mocked(getPackages).mockResolvedValue({
      packages: [{ packageJson: { name: 'workspace-pkg' } }],
    } as Packages)

    vi.mocked(utils.getGitInfo).mockReturnValue({ owner: 'owner', repo: 'repo' })
    vi.mocked(utils.getPackageJsonContent).mockResolvedValue({
      name: 'test-package',
      version: '1.0.0',
      dependencies: { 'workspace-pkg': '1.0.0', 'external-pkg': '2.0.0' },
    })
  })

  it('should pack the package successfully', async () => {
    expect(await pack('test.tgz')).toBe(`${process.cwd()}/test.tgz`)
    expect(vi.mocked(process).chdir).toHaveBeenCalledWith('/tmp/gh-pack-xxxx/package')
  })

  it('should warn if no packages are found', async () => {
    vi.mocked(getPackages).mockResolvedValue({
      packages: [],
      tool: {} as Tool,
      rootDir: '',
    } as Packages)
    await pack('test.tgz')

    expect(vi.mocked(console.warn)).toHaveBeenCalledWith('⚠️  No packages found.')
  })

  it('should throw error if no tarball is found', async () => {
    vi.mocked(fs).readdirSync.mockReturnValue([])
    await expect(pack('test.tgz')).rejects.toThrow('No package tarball found after packing.')
  })

  it('should throw error if multiple tarballs are found', async () => {
    vi.mocked(fs).readdirSync.mockReturnValue(readdirSyncReturnValue(['a.tgz', 'test.tgz']))
    await expect(pack('test.tgz')).rejects.toThrow('Multiple package tarballs found after packing.')
  })

  it('should rewrite dependencies versions in package.json if workspace dependency exists', async () => {
    await pack('test.tgz')

    expect(JSON.parse(writtenPackageJson)).toStrictEqual({
      name: 'test-package',
      version: '1.0.0',
      dependencies: {
        'workspace-pkg':
          'https://github.com/owner/repo/releases/download/workspace-pkg-1.0.0/test.tgz',
        'external-pkg': '2.0.0',
      },
    })
  })

  it('should rewrite optionalDependencies versions in package.json if workspace dependency exists', async () => {
    vi.mocked(utils.getPackageJsonContent).mockResolvedValue({
      name: 'test-package',
      version: '1.0.0',
      dependencies: { 'external-pkg': '2.0.0' },
      optionalDependencies: { 'workspace-pkg': '1.0.0' },
    })
    await pack('test.tgz')

    expect(JSON.parse(writtenPackageJson)).toStrictEqual({
      name: 'test-package',
      version: '1.0.0',
      dependencies: { 'external-pkg': '2.0.0' },
      optionalDependencies: {
        'workspace-pkg':
          'https://github.com/owner/repo/releases/download/workspace-pkg-1.0.0/test.tgz',
      },
    })
  })

  it('should not rewrite devDependencies versions in package.json even if workspace dependency exists', async () => {
    vi.mocked(utils.getPackageJsonContent).mockResolvedValue({
      name: 'test-package',
      version: '1.0.0',
      dependencies: { 'external-pkg': '2.0.0' },
      optionalDependencies: {},
      devDependencies: { 'workspace-pkg': '1.0.0' },
    })
    await pack('test.tgz')

    expect(writtenPackageJson).toBe('not written')
  })

  it('should not rewrite dependencies in package.json if no workspace dependency exists', async () => {
    vi.mocked(utils.getPackageJsonContent).mockResolvedValue({
      name: 'test-package',
      version: '1.0.0',
      dependencies: { 'external-pkg': '2.0.0' },
      optionalDependencies: {},
    })
    await pack('test.tgz')

    expect(writtenPackageJson).toBe('not written')
  })
})
