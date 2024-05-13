import type { any } from "./any/exports.js"
import type { never } from "./never/exports.js"
import type { _ } from "./util.js"

import type { to } from "./to.js"

export declare namespace some {
  export {
    /** {@link some.function `some.function`} @external */
    function_ as function,
    /** {@link some.class `some.class`} @external */
    class_ as class,
  }

  /** @internal Use {@link some.function `some.function`} instead */
  export interface function_
    <domain extends any.array<any> = any.array<any>, codomain = _> { (...arg: domain): codomain }

  /** @internal Use {@link some.class `some.class`} instead */
  export interface class_<
    instance = _,
    params extends
    | any.array<any>
    = any.array<any>,
  > { new(...a: params): instance }
}

/**
 * {@link some `some`} is the {@link https://en.wikipedia.org/wiki/Duality_(mathematics) dual} of {@link any `any`} .
 * 
 * **tldr:**
 * 
 * If {@link any `any`} is roughly analogous to 
 * {@link https://en.wikipedia.org/wiki/Universal_quantification _universal_ quantification}
 * (_for all_), then {@link some `some`} corresponds to 
 * {@link https://en.wikipedia.org/wiki/Existential_quantification _existential_ quantification}
 * (_there exists_).
 */
export declare namespace some {
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

  /** {@link predicate `some.predicate`} @external */
  interface predicate<type = any> { (u: type): boolean }

  /** {@link guard `some.guard`} @external */
  type guard<target = never> = never | typeguard<any, target>

  /** {@link typeguard `some.typeguard`} @external */
  type typeguard<source = any, target = _> = never | typePredicate<[source, target]>

  /** @internal Use {@link some.typeguard `some.typeguard`} instead */
  type typePredicate<
    map extends
    | [source: _, target: _]
    = [source: any, target: _]
  > = never | ((u: map[0]) => u is map[1])

  /** {@link asserts `some.asserts`} @external */
  type asserts<source = any, target = _> = never | assertion<[source, target]>

  /** {@link assertion `some.assertion`} @external */
  type assertion<
    map extends
    | readonly [source: _, target: _]
    = readonly [source: any, target: _]
  > = never | { (u: map[0]): asserts u is map[1] }

  /** {@link named `some.named`} @external */
  type named<
    invariant extends any.field,
    type extends
    | { [ix in invariant[0]]: invariant[1] }
    = { [ix in invariant[0]]: invariant[1] }
  > = type


  /** {@link keyof `some.keyof`} @external */
  type keyof<
    invariant,
    type extends
    | distributive.keyof<invariant>
    = distributive.keyof<invariant>
  > = type

  /** {@link entryOf `some.entryOf`} @external */
  type entryOf<
    invariant extends any.object,
    type extends
    | distributive.entryOf<invariant>
    = distributive.entryOf<invariant>
  > = type

  /** {@link valueOf `some.valueOf`} @external */
  type valueOf<
    invariant,
    type extends
    | distributive.values<invariant>
    = distributive.values<invariant>
  > = type

  /** {@link arrayOf `some.arrayOf`} @external */
  type arrayOf<
    invariant,
    type extends
    | any.array<invariant>
    = any.array<invariant>
  > = type

  /** {@link fieldOf `some.fieldOf`} @external */
  type fieldOf<
    invariant,
    type extends
    | to.entries<invariant>
    = to.entries<invariant>
  > = type

  /** {@link subtypeOf `some.subtypeOf`} @external */
  type subtypeOf<
    invariant,
    subtype extends
    | invariant extends invariant ? invariant : never
    = invariant extends invariant ? invariant : never
  > = subtype

  type instanceOf<invariant, distributive = never>
    = [distributive] extends [never]
    ? [invariant] extends [some.class<infer instance>] ? instance : never
    : invariant extends invariant ? some.instanceOf<invariant, never>
    : never.close.distributive<"invariant">
    ;
}

export declare namespace distributive {
  type values<type> = type extends any.array ? type[number] : type[keyof type]

  type keyof<type>
    = (
      type extends any.array
      ? Extract<keyof type, `${number}`>
      : keyof type
    ) extends infer key extends any.index
    ? values<{ [ix in key]: ix }>
    : never.close.inline_var<"key">
    ;

  type entryOf<type extends any.object>
    = type extends type
    ? (
      keyof type extends infer key
      ? key extends keyof type
      ? readonly [key, type[key]]
      : never
      : never
    )
    : never.close.distributive<"type">
    ;

}