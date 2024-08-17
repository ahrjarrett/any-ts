# any-ts

## 0.48.0

### Minor Changes

- [#169](https://github.com/ahrjarrett/any-ts/pull/169) [`648a8de`](https://github.com/ahrjarrett/any-ts/commit/648a8de2307062e8ebd78967433d3fbde64f9669) Thanks [@ahrjarrett](https://github.com/ahrjarrett)! - ### breaking changes
  - All of the members of Universal namespace have changed their implementations
    - Since `any-ts` is still pre v1.0, this is a minor version bump.
    - The API is relatively stable; I expect one (1) more breaking change before releasing v1.0.0 this fall

## 0.47.4

### Patch Changes

- [#167](https://github.com/ahrjarrett/any-ts/pull/167) [`4234c81`](https://github.com/ahrjarrett/any-ts/commit/4234c8192815d8415b2722aa56285d44f942d4c2) Thanks [@ahrjarrett](https://github.com/ahrjarrett)! - deprecate: `Identity` -- use `newtype` instead

## 0.47.3

### Patch Changes

- [#165](https://github.com/ahrjarrett/any-ts/pull/165) [`60f77df`](https://github.com/ahrjarrett/any-ts/commit/60f77df8c7b48ca5535f408be5ddcc6bb0dabb44) Thanks [@ahrjarrett](https://github.com/ahrjarrett)! - fix: `some.entriesOf` when used in matching position

## 0.47.2

### Patch Changes

- [#163](https://github.com/ahrjarrett/any-ts/pull/163) [`29e5043`](https://github.com/ahrjarrett/any-ts/commit/29e5043efcb49ca025693ba97527a27ed964af3e) Thanks [@ahrjarrett](https://github.com/ahrjarrett)! - feat: adds `some.entriesOf`

## 0.47.1

### Patch Changes

- [#161](https://github.com/ahrjarrett/any-ts/pull/161) [`b06a828`](https://github.com/ahrjarrett/any-ts/commit/b06a8286141de26b7729f5fae6b383e2e9d54178) Thanks [@ahrjarrett](https://github.com/ahrjarrett)! - fix: correctly exports `match.finite` namespace

## 0.47.0

### Minor Changes

- [#157](https://github.com/ahrjarrett/any-ts/pull/157) [`9fb7871`](https://github.com/ahrjarrett/any-ts/commit/9fb787131d523b176913da5cf7f3c91d952ce317) Thanks [@ahrjarrett](https://github.com/ahrjarrett)! - break: renames `match.finite*` to `match.finite.*`

  for example:

  ```
  match.finiteArray -> match.finite.array
  match.nonfiniteArray -> match.nonfinite.array
  ```

### Patch Changes

- [#160](https://github.com/ahrjarrett/any-ts/pull/160) [`350fd9f`](https://github.com/ahrjarrett/any-ts/commit/350fd9f26f853de331be1c88ae51cccadc2adbe8) Thanks [@ahrjarrett](https://github.com/ahrjarrett)! - fix: re-exports `some.instanceOf`; feat: adds `any.maybeIndexedBy`

## 0.46.0

### Minor Changes

- bf5df0f: ### new features

  - added `match`, a namespace for advanced pattern matching
  - added `any.functions` to describe any array of functions

  ### breaking changes

  a few members of the `some` namespace behave differently than before:

  - `some.keyOf`: this change was made to support a homomorphic `object.map` function
    that operates on both arrays and objects, preserves structure in either case.

    An example implementation:

    ```typescript
    /**
     * {@link map `map [overload 1/2]`} ("data-last")
     *
     * [TypeScript playground](https://tsplay.dev/weA2Yw)
     *
     * {@link map `map`} takes two arguments:
     * 1. a function
     * 2. a composite data structure that contains one or more targets to apply the function to
     *
     * A unique feature of this implementation is its polymorphism: it doesn't care whether the
     * composite data structure is an array, or whether it's an object. It will apply the argument
     * to each of the children, and will preserve the structure of the original shape.
     *
     * **Trade-off:** the data-last overload of {@link map `map`} is optimized for function composition.
     * It works best when used inside a call to {@link fn.pipe `fn.pipe`} or {@link fn.flow `fn.flow`}.
     * It comes with greater potential for code re-use, at the cost of slightly slower performance.
     *
     * **Ergonomics:** if you'd prefer to provide both arguments at the same time, see overload #2.
     */
    export function map<const xs, target>(
      fn: (x: xs[some.keyof<xs>], ix: some.keyof<xs>, xs: xs) => target
    ): (xs: xs) => { [ix in keyof xs]: target };
    /**
     * {@link map `map [overload 2/2]`} ("data-first")
     *
     * [TypeScript playground](https://tsplay.dev/weA2Yw)
     *
     * {@link map `map`} is a polymorphic function that accepts a function and a data structure (such
     * as an array or object) to apply the function to.
     *
     * A unique feature of this implementation is its ability to abstract away the type of the data
     * structure it maps the function over; whether you pass it an object or an array, it will handle
     * applying the function to the data strucuture's values and returning a data structure whose type
     * corresponds 1-1 with the type of input.
     *
     * **Trade-off:** the data-first overload of {@link map `map`} evaluates eagerly. It comes with
     * slightly better performance than the data-last overload, at the cost of reusability.
     *
     * **Ergonomics:** if you'd prefer to use {@link map `map`} in a pipeline, see overload #1.
     */
    export function map<const xs, target>(
      xs: xs,
      fn: (x: xs[some.keyof<xs>], xs: xs) => target
    ): { [ix in keyof xs]: target };
    // impl.
    export function map<const xs, target>(
      ...args:
        | [fn: (x: xs[some.keyof<xs>], ix: some.keyof<xs>, xs: xs) => target]
        | [
            xs: xs,
            fn: (x: xs[some.keyof<xs>], ix: some.keyof<xs>, xs: xs) => target
          ]
    ) {
      if (args.length === 1) return (xs: xs) => map(xs, args[0]);
      else {
        const [xs, fn] = args;
        if (globalThis.Array.isArray(xs)) return xs.map(fn as never);
        else {
          let out: any.struct = {};
          for (const k in xs) out[k] = fn(xs[k] as never, k as never, xs);
          return out;
        }
      }
    }
    ```

  - `some.entryOf`
    slightly different semantics to support a polymorphic `object.entries` function

  - `some.valueOf`
    slightly different semantics to support a polymorphic `object.values` function

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
