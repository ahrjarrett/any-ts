export type { some }

import type { any } from "./any/exports"
import type { never } from "./semantic-never/exports"

import type { to } from "./to"

declare namespace distributive {
  type values<type> = type extends any.array ? type[number] : type[keyof type]
  type keyof<type>
    = (
      type extends any.array
      ? Extract<keyof type, `${number}`>
      : keyof type
    ) extends infer key extends any.index
    ? values<{ [ix in key]: ix }>
    : never // never.close.inline_var<"key">
    ;

  type entryof<type extends any.object>
    = type extends type
    ? keyof type extends infer key
    ? key extends keyof type
    ? readonly [key, type[key]]
    : never // never.close.unmatched_expr
    : never // never.close.inline_var<"key">
    : never.close.distributive<"type">
    ;
}


interface fn<args extends any.array<any> = any.array<any>, returns = unknown> { (...arg: args): returns }

interface predicate<type = any> { (u: type): boolean }

type guard<target = never> = typeguard<any, target>
type typeguard<source = any, target = unknown> = typePredicate<[source, target]>
type typePredicate<
  map extends
  | readonly [source: unknown, target: unknown]
  = readonly [source: any, target: unknown]
> = never | { (u: map[0]): u is map[1] }

type asserts<source = any, target = unknown> = assertion<[source, target]>
type assertion<
  map extends
  | readonly [source: unknown, target: unknown]
  = readonly [source: any, target: unknown]
> = never | { (u: map[0]): asserts u is map[1] }

type arrayof<
  invariant,
  type extends
  | any.array<invariant>
  = any.array<invariant>
> = type

type fieldof<
  invariant,
  type extends
  | to.entries<invariant>
  = to.entries<invariant>
> = type

type subtypeof<
  invariant,
  subtype extends
  | invariant extends invariant ? invariant : never
  = invariant extends invariant ? invariant : never
> = subtype

type named<
  invariant extends any.field,
  type extends
  | { [ix in invariant[0]]: invariant[1] }
  = { [ix in invariant[0]]: invariant[1] }
> = type

interface predicate<type> { (x: type): boolean }


/**
 * The {@link some `some`} namespace is the dual of {@link any `any`}.
 * 
 * Whereas the {@link any `any`} namespace is analogous to 
 * {@link https://en.wikipedia.org/wiki/Universal_quantification universal quantification}
 * (read: "for all"), {@link some `some`} is more closely related to 
 * {@link https://en.wikipedia.org/wiki/Existential_quantification _existential_ quantification}
 * (read: "there exists").
 */
declare namespace some {
  // aliased exports
  export {
    /** {@link arrayof `some.arrayof`} @external */
    arrayof,
    /** {@link arrayof `some.arrayOf`} @external */
    arrayof as arrayOf,
    /** {@link fn `some.function`} @external */
    fn as function,
    /** {@link fieldof `some.fieldof`} @external */
    fieldof,
    /** {@link fieldof `some.fieldOf`} @external */
    fieldof as fieldOf,
    /** {@link subtypeof `some.subtypeof`} @external */
    subtypeof,
    /** {@link subtypeof `some.subtypeOf`} @external */
    subtypeof as subtypeOf,
  }

  // direct exports
  export {
    /** {@link assertion `some.assertion`} @external */
    assertion,
    /** {@link binary `some.binary`} @external */
    binary,
    /** {@link field `some.field`} @external */
    field,
    /** {@link guard `some.guard`} @external */
    guard,
    /** {@link named `some.named`} @external */
    named,
    /** {@link predicate `some.predicate`} @external */
    predicate,
    /** {@link record `some.record`} @external */
    record,
    /** {@link ternary `some.ternary`} @external */
    ternary,
    /** {@link typeguard `some.typeguard`} @external */
    typeguard,
    /** {@link unary `some.unary`} @external */
    unary,
  }


  /** {@link unary `some.unary`} @external */
  interface unary<
    out = unknown,
    arg = any
  > { (_: arg): out }

  /** {@link binary `some.binary`} @external */
  interface binary<
    out = unknown,
    arg_0 = any,
    arg_1 = any
  > { (_0: arg_0, _1: arg_1): out }

  /** {@link ternary `some.ternary`} @external */
  interface ternary<
    out = unknown,
    arg_0 = any,
    arg_1 = any,
    arg_2 = any
  > { (_0: arg_0, _1: arg_1, _2: arg_2): out }

  /** {@link field `some.field`} @external */
  type field<key extends any.index = any.index, value = unknown> = any.field<key, value>

  /** {@link record `some.record`} @external */
  type record<
    key extends
    | any.index
    = any.key,
    value = unknown
  > = globalThis.Record<key, value>

  export type entryof<
    invariant extends any.object,
    type extends
    | distributive.entryof<invariant>
    = distributive.entryof<invariant>
  > = type

  export type keyof<
    invariant,
    type extends
    | distributive.keyof<invariant>
    = distributive.keyof<invariant>
  > = type

  export type valueof<
    invariant,
    type extends
    | distributive.values<invariant>
    = distributive.values<invariant>
  > = type
}