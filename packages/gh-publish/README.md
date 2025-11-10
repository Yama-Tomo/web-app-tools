# gh-publish

A simple CLI tool to publish npm package to GitHub Releases.

## usage

```bash
GITHUB_TOKEN=xxxxxxxxx npx gh-publish [options]
```

## github actions example

```yaml
name: Release

on:
  push:
    tags:
      - v*

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5.0.0
      - uses: pnpm/action-setup@4.2.0
      - uses: actions/setup-node@6.0.0
        with:
          node-version: 22
          cache: 'pnpm'
      - run: pnpm i
      - name: Publish
        run: |
          pnpm build
          pnpm gh-publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

with [changesets](https://github.com/changesets/changesets)
```yaml
name: Release

on:
  push:
    branches:
      - main

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5.0.0
      - uses: pnpm/action-setup@4.2.0
      - uses: actions/setup-node@6.0.0
        with:
          node-version: 22
          cache: 'pnpm'
      - run: pnpm i
      - name: Create Release Pull Request or Trigger publish
        id: changesets
        uses: changesets/action@1.5.3
        with:
          publish: pnpm changeset tag
          createGithubReleases: false
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Publish
        if: steps.changesets.outputs.hasChangesets == 'false'
        run: |
          pnpm build
          echo '${{steps.changesets.outputs.publishedPackages}}' | jq -c '.[]' | while read -r package; do
            pnpm --filter=$(echo $package | jq -r '.name') gh-publish --notes="changesets:autodetect"
          done
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
