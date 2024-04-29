# any-ts

## 0.40.14

### Patch Changes

- 77e9cfd: export `filter` and `filterKeys` from `object` module

## 0.40.13

### Patch Changes

- ffc37c8: fix: exports `filter` from object module; moves function signatures to experimental status

## 0.40.12

### Patch Changes

- 6cd69ad: infra: moves commit title to github action
- bbbb0b7: chore: exports internal `Fn*` type constructors

## 0.40.11

### Patch Changes

- e611ada: ## features
  adds:

  - `object.filter`
  - `object.filterKeys`

  ## deprecations

  deprecates:

  - `any.arrayof` - use `any.arrayOf` instead
  - `any.entriesof` - use `any.entriesOf` instead
  - `any.entryof` - use `any.entryOf` instead
  - `any.keysof` - use `any.keysOf` instead
  - `any.subtypeof` - use `any.subtypeOf` instead
  - `any.indexedby` - use `any.indexedBy` instead

## 0.40.10

### Patch Changes

- 66a6800: feat: adds `Widen` type + ambient namespace

## 0.40.9

### Patch Changes

- 1dd4331: ci
- 4eaefdb: fix: don't run `pnpm run version` in `bin/version`, run `changeset version`
- 6060a67: fix: straightens out release pipeline

## 0.40.8

### Patch Changes

- fix: configure changesets to make access public

## 0.40.7

### Patch Changes

- fix: adds npm script to ci

## 0.40.6

### Patch Changes

- fix: adds publish script

## 0.40.5

### Patch Changes

- chore: commits lockfile

## 0.40.4

### Patch Changes

- chore: specify node version in CI

## 0.40.3

### Patch Changes

- 2c28f7e: uses changesets to manage version; updates deps
- 8a688b2: chore: upgrades deps
- f7fd9e2: initial release test
- infra: adds changesets to release pipeline
