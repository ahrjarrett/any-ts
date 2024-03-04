// module namespaces
export type {
  any_ as any,
  some,
}

// external module namespaces
export type { mut } from "./mutable/exports"

import type { any } from "./any-native"
import type { never } from "./semantic-never/exports"

import { to } from "./to"

type id<type> = type

type function_<type extends any.function = any.function> = type

interface predicate<type = any> { (u: type): boolean }
type typeguard<
  map extends
  | readonly [source: unknown, target: unknown]
  = readonly [source: unknown, target: unknown]
> = never | { (u: map[0]): u is map[1] }

type assertion<
  map extends
  | readonly [source: unknown, target: unknown]
  = readonly [source: any, target: unknown]
> = never | { (u: map[0]): asserts u is map[1] }


declare namespace any_ {
  // aliased exports
  export {
    /** {@link object_ `any.object`} @internal */
    type object_ as object,
    /** {@link function_ `any.function`} @internal */
    type function_ as function,
    /** {@link class_ `any.class`} @internal */
    type class_ as class,
    /** {@link instanceOf `any.instanceof`} @internal */
    type instanceOf as instanceof,
  }
  // direct exports
  export {
    /** {@link array `any.array`} @internal */
    type array,
    /** {@link arraylike `any.arraylike`} @internal */
    type arraylike,
    /** {@link assertion `any.assertion`} @internal */
    type assertion,
    /** {@link dictionary `any.dictionary`} @internal */
    type dictionary,
    /** {@link entries `any.entries`} @internal */
    type entries,
    /** {@link enumerable `any.enumerable`} @internal */
    type enumerable,
    /** {@link entry `any.entry`} @internal */
    type entry,
    /** {@link field `any.field`} @internal */
    type field,
    /** {@link index `any.index`} @internal */
    type index,
    /** {@link invertible `any.invertible`} @internal */
    type invertible,
    /** {@link json `any.json`} @internal */
    type json,
    /** {@link key `any.key`} @internal */
    type key,
    /** {@link keys `any.keys`} @internal */
    type keys,
    /** {@link literal `any.literal`} @internal */
    type literal,
    /** {@link listlike `any.listlike`} @internal */
    type listlike,
    /** {@link nonnullable `any.nonnullable`} @internal */
    type nonnullable,
    /** {@link nullable `any.nullable`} @internal */
    type nullable,
    /** {@link numeric `any.numeric`} @internal */
    type numeric,
    /** {@link path `any.path`} @internal */
    type path,
    /** {@link predicate `any.predicate`} @internal */
    type predicate,
    /** {@link primitive `any.primitive`} @internal */
    type primitive,
    /** {@link scalar `any.scalar`} @internal */
    type scalar,
    /** {@link showable `any.showable`} @internal */
    type showable,
    /** {@link struct `any.struct`} @internal */
    type struct,
    /** {@link type `any.type`} @internal */
    type type,
    /** {@link typeguard `any.typeguard`} @internal */
    type typeguard,
  }

  type id<type> = type
  /** @ts-expect-error */
  interface type<type extends {} = {}> extends id<type> { }

  interface class_<
    args extends
    | any.array<any>
    = any.array<any>
  > { new(...arg: args): unknown }

  type key = string | number
  type index = string | number | symbol
  type numeric = number | `${number}`
  type keys = readonly any.key[]
  type path = readonly index[]
  type literal = string | number | boolean
  type primitive = string | number | boolean | bigint | null | undefined | symbol

  interface struct { [ix: string]: any }
  interface invertible { [ix: key]: key }
  interface dictionary<type = unknown> { [ix: keyof never]: type }
  interface listlike<type = unknown> extends globalThis.ReadonlyArray<type> { }
  interface enumerable<type = unknown> { [ix: number]: type }
  interface arraylike<type = unknown> extends enumerable<type> { length: number }

  type showable = string | number | boolean | bigint | null | undefined
  type nullable = null | undefined
  type nonnullable = {}
  type array<type = unknown> = globalThis.ReadonlyArray<type>
  type field<k extends index = index, v = unknown> = readonly [key: k, value: v]
  type entry<type extends readonly [any.index, unknown] = readonly [any.index, unknown]> = type
  type entries<type extends any.array<any.entry> = any.array<any.entry>> = type
  type scalar = string | number | boolean | null
  type json =
    | any.scalar
    | readonly json[]
    | dictionary<json>
    ;

}

type named<
  invariant extends any.field,
  type extends
  | { [ix in invariant[0]]: invariant[1] }
  = { [ix in invariant[0]]: invariant[1] }
> = type

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

type instanceOf<
  super_ extends any_.class = any_.class,
  instance extends InstanceType<super_> = InstanceType<super_>
> = instance

type subtypeof<
  invariant,
  subtype extends
  | invariant extends invariant ? invariant : never
  = invariant extends invariant ? invariant : never
> = subtype

namespace some { export const never: never = void 0 as never }
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
    /** {@link assertion_ `some.assertion`} @external */
    assertion_ as assertion,
    /** {@link function_ `some.function`} @external */
    function_ as function,
    /** {@link fieldof `some.fieldof`} @external */
    fieldof,
    /** {@link fieldof `some.fieldOf`} @external */
    fieldof as fieldOf,
    /** {@link guard `some.guard`} @external */
    guard,
    /** {@link subtypeof `some.subtypeof`} @external */
    subtypeof,
    /** {@link subtypeof `some.subtypeOf`} @external */
    subtypeof as subtypeOf,
    /** {@link typeguard_ `some.typeguard`} @external */
    typeguard_ as typeguard,
  }

  // direct exports
  export {
    /** {@link binary `some.binary`} @external */
    binary,
    /** {@link field `some.field`} @external */
    field,
    /** {@link named `some.named`} @external */
    named,
    /** {@link predicate `some.predicate`} @external */
    predicate,
    /** {@link record `some.record`} @external */
    record,
    /** {@link ternary `some.ternary`} @external */
    ternary,
    /** {@link unary `some.unary`} @external */
    unary,
  }

  type predicate<type = never> = any.predicate<type>
  type guard<target = never> = typeguard_<any, target>
  type typeguard_<source = never, target = never> = typeguard<[source, target]>
  type assertion_<source = never, target = never> = assertion<[source, target]>

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

// NOTE: Do not move this namespace. It needs to stay here (positionally _after_ 
// ambient `any`), otherwise the aliases it exports such as `any.object_` will 
// not be preserved.
namespace any_ {
  export type PKG_VERSION = typeof PKG_VERSION
  // TODO: generate this identifier from manifest
  export const PKG_VERSION = `0.35.0` as const

  /** @internal */
  type id<type> = type
  /** @internal */
  // NOTE: Do not move. It needs to stay here (in the non-ambient `any` namespace) to preserve
  // the `any.object` name (otherwise the alias is not preserved)
  export interface object_ extends id<object> { }
  /** @internal */
  // NOTE: Do not move. It needs to stay here (in the non-ambient `any` namespace) to preserve
  // the `any.function` name (otherwise the alias is not preserved)
  export interface function_<args extends any.array<any> = any.array<any>, ret = unknown> { (...arg: args): ret }
}
