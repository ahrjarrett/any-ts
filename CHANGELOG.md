# any-ts

## 0.45.2

### Patch Changes

- 1ea3201: fix: `Case.pascal` and `Case.camel` converting all caps incorrectly
- 58593b0: fix: removes "module" field in manifest so `any-ts` plays nice with Vite

## 0.45.1

### Patch Changes

- d10ee8c: fix: ensure `string.intercalate` produces a string result

## 0.45.0

### Minor Changes

- 5e1829b: fix: expose `any_*` constructors

  Fixes:

  ```
  Exported variable 'x' has or is using name 'any_dict' from external module "node_modules/any-ts/dist/index" but cannot be named.
  ```

## 0.44.2

### Patch Changes

- 9065c4b: fix: account for contravariance in index signature of `any.dict`

## 0.44.1

### Patch Changes

- 9d96ba7: feat: adds `has.oneMember`

## 0.44.0

### Minor Changes

- d2c28aa: feat: adds `has` module

  - `has.oneProperty` lets you express a constraint that the input type contains exactly 1 property. For example:

    ```typescript
    /**
     * @example
     *  const one = singleton({ a: 1 })       // ✅
    
     *  const zero = singleton({})            // 🚫
     *  //    ^? const zero: never
     *  const two = singleton({ a: 1, b: 2 }) // 🚫
     *  //    ^? const two: never
     */
    declare function singleton<const T extends has.oneProperty<T>>(
      objectWithExactlyOneProperty: T
    ): T;
    ```

    **Note:** `has.oneProperty` accepts 2 additional optional type parameters

    1. an invariant, which allows you to apply an additional constraint on the type of the property itself; and
    2. a "debug" flag, which, if non-never, changes the behavior of `has.oneProperty` to raise a custom `TypeError` if `T` fails to satisfy the constraint

  - `has.oneElement`

    ```typescript
    /**
     * @example
     *  const one = singleton([1])    // ✅
     *  //    ^? const one: readonly [1]
     *
     *  const zero = singleton([])    // 🚫
     *  //    ^? const zero: never
     *  const two = singleton([1, 2]) // 🚫
     *  //    ^? const two: never
     */
    declare function oneNumber<const T extends has.oneElement<T, number>>(
      tupleContainingOneNumber: T
    ): T;
    ```

    **Note:** like `has.oneProperty`, `has.oneElement` also accepts 2 additional optional type parameters

    1. an invariant, which allows you to apply an additional constraint on the type of the element itself; and,
    2. a "debug" flag, which, if non-never, changes the behavior of `has.oneElement` to raise a custom `TypeError` if `T` fails to satisfy the constraint

## 0.43.7

### Patch Changes

- f2e8ef6: docs: fix `empty.string` docs (moves them to the right jsdoc node)

## 0.43.6

### Patch Changes

- 9fcdbda: - feat: separates `empty` from `nonempty`
  - docs: documents `empty` and `nonempty` namespaces
  - feat: adds simplified `TypeError` module (`type-error/type-error.ts`)
  - todo: creates this todo: https://github.com/ahrjarrett/any-ts/issues/132

## 0.43.5

### Patch Changes

- 10981fe: fix: `string.camel and `string.pascal` handle non-finite strings now`

## 0.43.4

### Patch Changes

- 8c4fcc5: feat: adds
  - [`mut.strings`](242b529)
  - [`mut.numbers`](242b529)
  - [`mut.booleans`](242b529)
  - [`mut.literals`](7c8c41b)
  - [`mut.primitives`](7c8c41b)

## 0.43.3

### Patch Changes

- 6dccbe0: 24e3d93 \* @ahrjarrett/v0.43.3 feat: adds simplified `Kind` implementation (available now under `experimental.Kind`)
- 6dccbe0: feat: adds `any.four`, `mut.four`, exports experimental Kind encoding from `experimental.Kind`

## 0.43.2

### Patch Changes

- 746458e: feat: adds `some.class`, `any.instanceOf`

## 0.43.1

### Patch Changes

- 54b7436: feat: adds `mut.json`

## 0.43.0

### Minor Changes

- bf4769e: simplifies `check` API (full rewrite); adds `typecheck` API for throwing custom TypeErrors on failure case

## 0.42.1

### Patch Changes

- 42f115c: 🧹 cleans up `Catch` module to expose fewer types directly
- 0a29710: fixes broken internal import of `join`

## 0.42.0

### Minor Changes

- 66e5d7a: infra: library is written in ESM now. still targeting both CJS and ESM
- a25502d: feat: merges traversable and traversal into Tree
- 39fefd8: fixes broken version script

### Patch Changes

- 4facde2: fix typechecking issue in `Lens.tree`
- dd6dc3a: adds type-checking to release pipeline to make it harder to publish bad code
- a780e80: fix: uses import.meta.url instead of \_\_dirname
- 46b499e: tweaks a few aliases to prevent compiler from appending `$1`, `$2` to the end of output types

## 0.41.4

### Patch Changes

- 804b331: fix: moves `array` member declar… Andrew Jarrett 1 minute

## 0.41.3

### Patch Changes

- 3595cde: feat: merge `mut` namespace with `mutable` type (both now exported as just `mut`)
- 5fe03fc: feat: adds `Identity` type
- 857ca94: feat: `eval` type (a simpler version of `evaluate`) is now exported from the library

## 0.41.2

### Patch Changes

- 858c11e: chore: now exports submodules at the toplevel:
  - `array.nonempty`: now also available as `nonemptyArray`
  - `array.queue`: now also available as `queue`
  - `array.tuple`: now also available as `tuple`

## 0.41.1

### Patch Changes

- 8638a0f: fix: exports `array` submodule

## 0.41.0

### Minor Changes

- 89f1189: feat: adds `tuple` module to `array.tuple`
- 4c017dd: internal: move `semantic-never*` to `never*`

### Patch Changes

- 4c017dd: feat: adds `array` module (includes submodules: `array.queue, array.nonempty`)

## 0.40.15

### Patch Changes

- ce4239e: chore: fix `object` module exports

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
