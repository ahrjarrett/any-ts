
<br>
<h2 align="center">𝗮𝗻𝘆-𝘁𝘀</h2>
<br>

[![NPM Package][]](https://npmjs.org/package/any-ts)

[npm package]: https://img.shields.io/npm/v/any-ts.svg?color=44bb17

[any-ts](https://github.com/ahrjarrett/any-ts) is a small set of TypeScript namespaces that overload built-in names (like [`any`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)) to make them extensible.

> [!NOTE]
> Currently, `any-ts` is **BYOI**: "bring your own implementation". With the exception of the [`ANY_TS_VERSION`](https://github.com/ahrjarrett/any-ts/blob/main/src/version.ts#L1-L2) constant, `any-ts` only ships _type declarations_.

## Requirements
- [TypeScript v5.0](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/) or greater
- The [`strict`](https://www.typescriptlang.org/tsconfig/#strict) compiler option enabled in your `tsconfig.json`:

## What problem does `any-ts` solve?

The reason `any-ts` exists is because TypeScript types are hard to get right.

The TypeScript team has invested a lot of time into making their syntax beginner friendly, and easy to use.

The problem, as anyone who's used TypeScript for some time knows, is that while the type system is incredibly powerful, it's also incredibly 🦄 _magical_ 🌈.

I think most TS users would agree:

> **While TypeScript is, in some ways, "easy" to use, it's not simple.** 

Some of this complexity, we feel, is avoidable. Let's look at an example.

Let's say you're writing a small library of helper functions:

```typescript
/**
 * `identity` is a function that takes any arbitrary input, captures as much type
 * information as possible, and returns it to you:
 */
const identity = <const type>(term: type): type => term

/** `flatten` is a variadic function that takes a list of arrays and... well, flattens them. */
const flatten = <const T extends Array<Array<any>>>(...arrays: T) => arrays.flat()
```

You write some tests, everything works as expected, so you ship it. Nice work!

But before long, someone creates an issue. Here's what they tried to do:

```typescript
import { identity, flatten } from "helpful-helpers"

const arr1 = identity([0, 1, 2, 3])
const arr2 = identity([4, 5, 6, 7])

const arr3 = flatten(arr1, arr2)
//                   ^^^^ 🚫 TypeError
```

> Can you spot the problem?


The problem here is that `arr1` has the type `readonly [1, 2, 3]`, and `flatten` only accepts mutable arrays.

You do some research and find it that every `ReadonlyArray`, despite having the longer, more "qualified" name, does not extend `Array`.

In fact, it's actually the other way around: **every `Array` is a structural subtype of `ReadonlyArray`**.

Here's how `any-ts` solves this problem:

```typescript
import type { any } from "any-ts"

const identity = <const type>(term: type): type => term

const flatten = <const T extends any.array<any.array>>(...arrays: T) => arrays.flat()

const arr1 = identity([0, 1, 2, 3])
const arr2 = identity([4, 5, 6, 7])

flatten(arr1, arr2)
// no type error
```

### What's happening?

If you're troubled by the `any.array<any.array>` syntax, don't worry: it's not as cursed as it might sound.

#### But how are you adding properties to `any`, as if it were an object?

The short answer is that types and namespaces can share identifiers. This has been the case for years. And unlike objects, namespace can export types.

All we've done is overload `any`, which allows us to piggyback on its semantics. `any` is still `any`, and `any.array` is a type that absorbs the complexity (and verbosity) of `readonly unknown[]`.

#### But what if I want an array of strings?

```typescript
import type { any } from "any-ts"

type myStringArray = any.array<string>
//   readonly string[]
```

#### But what if I want a mutable array?

With `any-ts`, your intent is explicit:

```typescript
import type { any, mut } from "any-ts"

type myMutableArray = mut.array
//   ^? type myMutableArray = unknown[]
type myMutableStringArray = mut.array<string>
//   ^? type myMutableStringArray = string[]

// or, if you prefer not importing both:
type myOtherArray = any.mut.array
//   ^? type myOtherArray = unknown[]

type myOtherStringArray = any.mut.array<string>
//   ^? type myOtherStringArray = string[]
```

#### But what if I want to express more advanced types?

In our opinion, this is where `any-ts` really shines.

If you're a power user, you can do some pretty cool things with `any-ts`. Let's continue using `any.array`, even though it's one of the simplest types the library implements.

What if you wanted to _extract_ (or pattern-match) the type that an array holds?

```typescript
declare namespace Dictionary {
  type fromArray<xs extends any.array> 
    = xs extends any.array<infer x> ? Record<string, x> : never;
}

type featureFlags = Dictionary.fromArray<boolean[]>
//   ^? type featureFlags = Record<string, boolean>
```

Of the hundreds of types that `any-ts` ships, almost all of them can be used in _matching position_, like above.

If you're looking for more examples, you can find more in the [examples](https://github.com/ahrjarrett/any-ts/tree/main/src/examples) directory (WIP).

Looking for something that we don't ship yet? [Raise an issue](https://github.com/ahrjarrett/any-ts/issues/new) -- we'd love to try to help!

### Namespaces

- [`any`](https://github.com/ahrjarrett/any-ts/blob/main/src/any.ts)
- [`boolean`](https://github.com/ahrjarrett/any-ts/blob/main/src/boolean/boolean.ts)
- [`char`](https://github.com/ahrjarrett/any-ts/blob/main/src/string/char.ts)
- [`empty`](https://github.com/ahrjarrett/any-ts/blob/main/src/empty.ts)
- [`Kind`](https://github.com/ahrjarrett/any-ts/blob/main/src/kind/kind.ts) (a [higher-kinded type](https://en.wikipedia.org/wiki/Kind_(type_theory)) encoding that is more ergonomic than any other we've found)
- [`integer`](https://github.com/ahrjarrett/any-ts/blob/main/src/number/integer.ts)
- [`mut`](https://github.com/ahrjarrett/any-ts/blob/main/src/mutable/mutable.ts)
- [`never`](https://github.com/ahrjarrett/any-ts/blob/main/src/semantic-never/semantic-never.ts), a.k.a. semantic never
- [`nonempty`](https://github.com/ahrjarrett/any-ts/blob/main/src/empty.ts)
- [`number`](https://github.com/ahrjarrett/any-ts/blob/main/src/number/number.ts)
- [`bigint`](https://github.com/ahrjarrett/any-ts/blob/main/src/number/bigint.ts)
- [`object`](https://github.com/ahrjarrett/any-ts/blob/main/src/object.ts)
- [`Path`](https://github.com/ahrjarrett/any-ts/blob/main/src/paths/Path.ts)
- [`some`](https://github.com/ahrjarrett/any-ts/blob/main/src/some.ts)
- [`string`](https://github.com/ahrjarrett/any-ts/blob/main/src/string/string.ts)
- [`traversable`](https://github.com/ahrjarrett/any-ts/blob/main/src/traversable/traversable.ts)
- [`traversal`](https://github.com/ahrjarrett/any-ts/blob/main/src/traversable/traversal.ts)
- [`Tree`](https://github.com/ahrjarrett/any-ts/blob/main/src/tree/tree.ts)
  - in particular, we believe our implementation of `Tree.fromPaths` to be the simplest and most performant solution possible
- [`Union`](https://github.com/ahrjarrett/any-ts/blob/main/src/union/union.ts)
- [`Universal`](https://github.com/ahrjarrett/any-ts/blob/main/src/universal/universal.ts)





<br>
<h2 align="center">𝗮𝗻𝘆-𝘁𝘀</h2>
<br>

[![NPM Package][]](https://npmjs.org/package/any-ts)

[npm package]: https://img.shields.io/npm/v/any-ts.svg?color=44bb17

[any-ts](https://github.com/ahrjarrett/any-ts) is a small set of TypeScript namespaces that overload built-in names (like [`any`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)) to make them extensible.

> [!NOTE]
> Currently, `any-ts` is **BYOI**: "bring your own implementation". With the exception of the [`ANY_TS_VERSION`](https://github.com/ahrjarrett/any-ts/blob/main/src/version.ts#L1-L2) constant, `any-ts` only ships _type declarations_.

## Requirements
- [TypeScript v5.0](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/) or greater
- The [`strict`](https://www.typescriptlang.org/tsconfig/#strict) compiler option enabled in your `tsconfig.json`:

## What problem does `any-ts` solve?

The reason `any-ts` exists is because TypeScript types are hard to get right.

The TypeScript team has invested a lot of time into making their syntax beginner friendly, and easy to use.

The problem, as anyone who's used TypeScript for some time knows, is that while the type system is incredibly powerful, it's also incredibly 🦄 _magical_ 🌈.

I think most TS users would agree:

> **While TypeScript is, in some ways, "easy" to use, it's not simple.** 

Some of this complexity, we feel, is avoidable. Let's look at an example.

Let's say you're writing a small library of helper functions:

```typescript
/**
 * `identity` is a function that takes any arbitrary input, captures as much type
 * information as possible, and returns it to you:
 */
const identity = <const type>(term: type): type => term

/** `flatten` is a variadic function that takes a list of arrays and... well, flattens them. */
const flatten = <const T extends Array<Array<any>>>(...arrays: T) => arrays.flat()
```

You write some tests, everything works as expected, so you ship it. Nice work!

But before long, someone creates an issue. Here's what they tried to do:

```typescript
import { identity, flatten } from "helpful-helpers"

const arr1 = identity([0, 1, 2, 3])
const arr2 = identity([4, 5, 6, 7])

const arr3 = flatten(arr1, arr2)
//                   ^^^^ 🚫 TypeError
```

> Can you spot the problem?


The problem here is that `arr1` has the type `readonly [1, 2, 3]`, and `flatten` only accepts mutable arrays.

You do some research and find it that every `ReadonlyArray`, despite having the longer, more "qualified" name, does not extend `Array`.

In fact, it's actually the other way around: **every `Array` is a structural subtype of `ReadonlyArray`**.

Here's how `any-ts` solves this problem:

```typescript
import type { any } from "any-ts"

const identity = <const type>(term: type): type => term

const flatten = <const T extends any.array<any.array>>(...arrays: T) => arrays.flat()

const arr1 = identity([0, 1, 2, 3])
const arr2 = identity([4, 5, 6, 7])

flatten(arr1, arr2)
// no type error
```

### What's happening?

If you're troubled by the `any.array<any.array>` syntax, don't worry: it's not as cursed as it might sound.

#### But how are you adding properties to `any`, as if it were an object?

The short answer is that types and namespaces can share identifiers. This has been the case for years. And unlike objects, namespace can export types.

All we've done is overload `any`, which allows us to piggyback on its semantics. `any` is still `any`, and `any.array` is a type that absorbs the complexity (and verbosity) of `readonly unknown[]`.

#### But what if I want an array of strings?

```typescript
import type { any } from "any-ts"

type myStringArray = any.array<string>
//   readonly string[]
```

#### But what if I want a mutable array?

With `any-ts`, your intent is explicit:

```typescript
import type { any, mut } from "any-ts"

type myMutableArray = mut.array
//   ^? type myMutableArray = unknown[]
type myMutableStringArray = mut.array<string>
//   ^? type myMutableStringArray = string[]

// or, if you prefer not importing both:
type myOtherArray = any.mut.array
//   ^? type myOtherArray = unknown[]

type myOtherStringArray = any.mut.array<string>
//   ^? type myOtherStringArray = string[]
```

#### But what if I want to express more advanced types?

In our opinion, this is where `any-ts` really shines.

If you're a power user, you can do some pretty cool things with `any-ts`. Let's continue using `any.array`, even though it's one of the simplest types the library implements.

What if you wanted to _extract_ (or pattern-match) the type that an array holds?

```typescript
declare namespace Dictionary {
  type fromArray<xs extends any.array> 
    = xs extends any.array<infer x> ? Record<string, x> : never;
}

type featureFlags = Dictionary.fromArray<boolean[]>
//   ^? type featureFlags = Record<string, boolean>
```

Of the hundreds of types that `any-ts` ships, almost all of them can be used in _matching position_, like above.

If you're looking for more examples, you can find more in the [examples](https://github.com/ahrjarrett/any-ts/tree/main/src/examples) directory (WIP).

Looking for something that we don't ship yet? [Raise an issue](https://github.com/ahrjarrett/any-ts/issues/new) -- we'd love to try to help!

### Namespaces

- [`any`](https://github.com/ahrjarrett/any-ts/blob/main/src/any.ts)
- [`boolean`](https://github.com/ahrjarrett/any-ts/blob/main/src/boolean/boolean.ts)
- [`char`](https://github.com/ahrjarrett/any-ts/blob/main/src/string/char.ts)
- [`check` and `checkNot`](https://github.com/ahrjarrett/any-ts/blob/main/src/check/check.ts)
- [`empty`](https://github.com/ahrjarrett/any-ts/blob/main/src/empty.ts)
- [`Kind`](https://github.com/ahrjarrett/any-ts/blob/main/src/kind/kind.ts) (a [higher-kinded type](https://en.wikipedia.org/wiki/Kind_(type_theory)) encoding that is more ergonomic than any other we've found)
- [`integer`](https://github.com/ahrjarrett/any-ts/blob/main/src/number/integer.ts)
- [`mut`](https://github.com/ahrjarrett/any-ts/blob/main/src/mutable/mutable.ts)
- [`never`](https://github.com/ahrjarrett/any-ts/blob/main/src/semantic-never/semantic-never.ts), a.k.a. semantic never
- [`nonempty`](https://github.com/ahrjarrett/any-ts/blob/main/src/empty.ts)
- [`number`](https://github.com/ahrjarrett/any-ts/blob/main/src/number/number.ts)
- [`bigint`](https://github.com/ahrjarrett/any-ts/blob/main/src/number/bigint.ts)
- [`object`](https://github.com/ahrjarrett/any-ts/blob/main/src/object.ts)
- [`Path`](https://github.com/ahrjarrett/any-ts/blob/main/src/paths/Path.ts)
- [`some`](https://github.com/ahrjarrett/any-ts/blob/main/src/some.ts)
- [`string`](https://github.com/ahrjarrett/any-ts/blob/main/src/string/string.ts)
- [`traversable`](https://github.com/ahrjarrett/any-ts/blob/main/src/traversable/traversable.ts)
- [`traversal`](https://github.com/ahrjarrett/any-ts/blob/main/src/traversable/traversal.ts)
- [`Tree`](https://github.com/ahrjarrett/any-ts/blob/main/src/tree/tree.ts)
  - in particular, we believe our implementation of `Tree.fromPaths` to be the simplest and most performant solution possible
- [`Union`](https://github.com/ahrjarrett/any-ts/blob/main/src/union/union.ts)
- [`Universal`](https://github.com/ahrjarrett/any-ts/blob/main/src/universal/universal.ts)

