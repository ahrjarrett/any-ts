import type { any } from "../any/exports.js"
import type { never } from "../never/exports.js"
import type { _ } from "../util.js"
import type { parseInt } from "../number/shared.js"

import type { to } from "../to.js"

/**
 * ## {@link some `some 🧩`}
 * `=================`
 *
 * {@link some `some`} is the 
 * [dual](https://en.wikipedia.org/wiki/Duality_(mathematics)) 
 * of {@link any `any`}.
 * 
 * If {@link any `any`} is roughly analogous to 
 * {@link https://en.wikipedia.org/wiki/Universal_quantification _universal_ quantification}
 * (_for all_), then {@link some `some`} corresponds to 
 * {@link https://en.wikipedia.org/wiki/Existential_quantification _existential_ quantification}
 * (_there exists_).
 */
export declare namespace some {
  export {
    /** {@link some_function `some.function`} @external */
    some_function as function,
    /** {@link some_class `some.class`} @external */
    some_class as class,
    /** {@link some_valueOf `some.valueOf`} @external */
    some_valueOf as valueOf,
    /** {@link some_keyof `some.keyof`} @external */
    some_keyof as keyof,
    /** {@link some_keyof `some.keyOf`} @external */
    some_keyof as keyOf,
    /** {@link some_propertyOf `some.propertyOf`} @external */
    some_propertyOf as propertyOf,
    /** {@link some_unary `some.unary`} @external */
    some_unary as unary,
    /** {@link some_binary `some.binary`} @external */
    some_binary as binary,
    /** {@link some_ternary `some.ternary`} @external */
    some_ternary as ternary,
    /** {@link some_variadic `some.variadic`} @external */
    some_variadic as variadic,
    /** {@link some_field `some.field`} @external */
    some_field as field,
    /** {@link some_record `some.record`} @external */
    some_record as record,
    /** {@link some_predicate `some.predicate`} @external */
    some_predicate as predicate,
    /** {@link some_guard `some.guard`} @external */
    some_guard as guard,
    /** {@link some_typeguard `some.typeguard`} @external */
    some_typeguard as typeguard,
    /** {@link some_asserts `some.asserts`} @external */
    some_asserts as asserts,
    /** {@link some_assertion `some.assertion`} @external */
    some_assertion as assertion,
    /** {@link some_named `some.named`} @external */
    some_named as named,
    /** {@link some_entryOf `some.entryOf`} @external */
    some_entryOf as entryOf,
    /** {@link some_entriesOf `some.entriesOf`} @external */
    some_entriesOf as entriesOf,
    /** {@link some_arrayOf `some.arrayOf`} @external */
    some_arrayOf as arrayOf,
    /** {@link some_fieldOf `some.fieldOf`} @external */
    some_fieldOf as fieldOf,
    /** {@link some_subtypeOf `some.subtypeOf`} @external */
    some_subtypeOf as subtypeOf,
    /** {@link some_instanceOf `some.instanceOf`} @external */
    some_instanceOf as instanceOf,
  }
}

export interface some_function
  <domain extends any.array<any> = any.array<any>, codomain = _> { (...arg: domain): codomain }

export interface some_class<
  instance = _,
  params extends
  | any.array<any>
  = any.array<any>,
> { new(...a: params): instance }

export type some_keyof<
  invariant,
  type extends
  & keyof invariant
  & ([invariant] extends [any.array]
    ? [number] extends [invariant["length"]] ? number
    : parseInt<Extract<keyof invariant, `${number}`>>
    : keyof invariant)
  = keyof invariant
  & ([invariant] extends [any.array]
    ? [number] extends [invariant["length"]] ? number
    : parseInt<Extract<keyof invariant, `${number}`>>
    : keyof invariant)
> = type

export type some_valueOf<
  invariant,
  type extends
  | invariant[some_keyof<invariant>]
  = invariant[some_keyof<invariant>]
> = type

export type some_propertyOf<
  invariant,
  type extends
  | any.key & keyof invariant
  = any.key & keyof invariant
> = type

export interface some_unary<
  returns = _,
  accepts = any
> { (x: accepts): returns }

export interface some_binary<
  returns = _,
  x = any,
  y = any
> { (x: x, y: y): returns }

export interface some_ternary<
  out = _,
  a = any,
  b = any,
  c = any
> { (x: a, y: b, z: c): out }

export interface some_variadic<
  returns = _,
  accepts extends any.array<any> = any.array<any>
> { (...args: accepts): returns }

export type some_field<key extends any.index = any.index, value = _> = any.field<key, value>

export type some_record<
  key extends
  | any.index
  = any.key,
  value = _
> = globalThis.Record<key, value>

export interface some_predicate<type = any> { (u: type): boolean }

export type some_guard<target = never> = never | some_typeguard<any, target>

export type some_typeguard<source = any, target = _> = never | some_typePredicate<[source, target]>

export type some_typePredicate<
  map extends
  | [source: _, target: _]
  = [source: any, target: _]
> = never | ((u: map[0]) => u is map[1])

export type some_asserts<source = any, target = _> = never | some_assertion<[source, target]>

export type some_assertion<
  map extends
  | readonly [source: _, target: _]
  = readonly [source: any, target: _]
> = never | { (u: map[0]): asserts u is map[1] }

export type some_named<
  invariant extends any.field,
  type extends
  | { [ix in invariant[0]]: invariant[1] }
  = { [ix in invariant[0]]: invariant[1] }
> = type

export type some_entryOf<
  invariant extends any.object,
  type extends
  | any.array<any.pair<keyof invariant, invariant[keyof invariant]>>
  = any.array<any.pair<keyof invariant, invariant[keyof invariant]>>
> = type

export type some_entriesOf<
  invariant,
  type extends
  | any.array<any.pair<keyof invariant, invariant[keyof invariant]>>
  = any.array<any.pair<keyof invariant, invariant[keyof invariant]>>
> = type

export type some_arrayOf<
  invariant,
  type extends
  | any.array<invariant>
  = any.array<invariant>
> = type

export type some_fieldOf<
  invariant,
  type extends
  | to.entries<invariant>
  = to.entries<invariant>
> = type

export type some_subtypeOf<
  invariant,
  subtype extends
  | invariant extends invariant ? invariant : never
  = invariant extends invariant ? invariant : never
> = subtype

export type some_instanceOf<invariant, distributive = never>
  = [distributive] extends [never]
  ? [invariant] extends [some.class<infer instance>] ? instance : never
  : invariant extends invariant ? some_instanceOf<invariant, never>
  : never.close.distributive<"invariant">
  ;

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
