export type { some }

import type { any } from "./any/exports"
import type { never } from "./semantic-never/exports"
import type { _ } from "./util"

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


interface fn<dom extends any.array<any> = any.array<any>, cod = _> { (...arg: dom): cod }

interface predicate<type = any> { (u: type): boolean }

type guard<target = never> = never | typeguard<any, target>
type typeguard<source = any, target = _> = never | typePredicate<[source, target]>
type typePredicate<
  map extends
  | readonly [source: _, target: _]
  = readonly [source: any, target: _]
> = never | ((u: map[0]) => u is map[1])

type asserts<source = any, target = _> = never | assertion<[source, target]>
type assertion<
  map extends
  | readonly [source: _, target: _]
  = readonly [source: any, target: _]
> = never | { (u: map[0]): asserts u is map[1] }

type arrayOf<
  invariant,
  type extends
  | any.array<invariant>
  = any.array<invariant>
> = type

type fieldOf<
  invariant,
  type extends
  | to.entries<invariant>
  = to.entries<invariant>
> = type

type subtypeOf<
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
 * {@link some `some`} is {@link any `any`}'s {@link https://en.wikipedia.org/wiki/Duality_(mathematics) dual}.
 * 
 * Explanation:
 * 
 * If {@link any `any`} is analogous to 
 * {@link https://en.wikipedia.org/wiki/Universal_quantification universal quantification}
 * (that is, _for all_), then {@link some `some`} corresponds to 
 * {@link https://en.wikipedia.org/wiki/Existential_quantification _existential_ quantification}
 * (that is, _there exists_).
 */
declare namespace some {
  export {
    /** {@link fn `some.function`} @external */
    fn as function,
  }

  // direct exports
  export {
    /** {@link arrayOf `some.arrayOf`} @external */
    arrayOf,
    /** {@link assertion `some.assertion`} @external */
    assertion,
    /** {@link asserts `some.asserts`} @external */
    asserts,
    /** {@link binary `some.binary`} @external */
    binary,
    /** {@link entryOf `some.entryOf`} @external */
    entryOf,
    /** {@link field `some.field`} @external */
    field,
    /** {@link fieldOf `some.fieldOf`} @external */
    fieldOf,
    /** {@link guard `some.guard`} @external */
    guard,
    /** {@link keyof `some.keyof`} @external */
    keyof,
    /** {@link named `some.named`} @external */
    named,
    /** {@link predicate `some.predicate`} @external */
    predicate,
    /** {@link record `some.record`} @external */
    record,
    /** {@link subtypeOf `some.subtypeOf`} @external */
    subtypeOf,
    /** {@link ternary `some.ternary`} @external */
    ternary,
    /** {@link typeguard `some.typeguard`} @external */
    typeguard,
    /** {@link unary `some.unary`} @external */
    unary,
    /** {@link valueOf `some.valueOf`} @external */
    valueOf,
    /** {@link variadic `some.variadic`} @external */
    variadic,
  }

  /** {@link unary `some.unary`} @external */
  interface unary<
    returns = _,
    accepts = any
  > { (x: accepts): returns }

  /** {@link binary `some.binary`} @external */
  interface binary<
    returns = _,
    x = any,
    y = any
  > { (x: x, y: y): returns }

  /** {@link ternary `some.ternary`} @external */
  interface ternary<
    out = _,
    a = any,
    b = any,
    c = any
  > { (x: a, y: b, z: c): out }

  /** {@link variadic `some.variadic`} @external */
  interface variadic<
    returns = _,
    accepts extends any.array<any> = any.array<any>
  > { (...args: accepts): returns }

  /** {@link field `some.field`} @external */
  type field<key extends any.index = any.index, value = _> = any.field<key, value>

  /** {@link record `some.record`} @external */
  type record<
    key extends
    | any.index
    = any.key,
    value = _
  > = globalThis.Record<key, value>

  /** {@link record `some.record`} @external */
  type keyof<
    invariant,
    type extends
    | distributive.keyof<invariant>
    = distributive.keyof<invariant>
  > = type

  type entryOf<
    invariant extends any.object,
    type extends
    | distributive.entryof<invariant>
    = distributive.entryof<invariant>
  > = type

  type valueOf<
    invariant,
    type extends
    | distributive.values<invariant>
    = distributive.values<invariant>
  > = type
}