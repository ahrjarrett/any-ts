// module namespaces
export type {
  any_ as any,
  some,
}

// external module namespaces
export type { mut } from "./mutable/exports"

import type { any } from "./any-native"

import { to } from "./to"
import { pathsof } from "./paths/paths"

/** @internal */
type _ = unknown

type id<type> = type
interface object_ extends id<object> { }

type function_<type extends any_.function = any_.function> = type

declare namespace any_ {
  // aliased exports
  export {
    /** {@link object_ `any.object`} @internal */
    type object_ as object,
    /** {@link function_ `any.function`} @internal */
    type function_ as function,
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

  type key = string | number
  type index = string | number | symbol
  type numeric = number | `${number}`
  type keys = any.array<any.key>
  type path = readonly index[]
  interface struct { [𝐢𝐱: keyof never]: any }
  type literal = string | number | boolean
  type primitive = string | number | boolean | bigint | null | undefined | symbol

  interface invertible { [𝐢𝐱: key]: key }
  interface dictionary<type = _> { [𝐢𝐱: keyof never]: type }
  interface listlike<type = _> extends globalThis.ReadonlyArray<type> { }
  type showable = string | number | boolean | bigint | null | undefined
  type type = nullable | nonnullable
  type nullable = null | undefined
  type nonnullable = {}
  type array<type = _> = globalThis.ReadonlyArray<type>
  type field<k extends index = index, v = _> = readonly [𝐤𝐞𝐲: k, 𝐯𝐚𝐥𝐮𝐞: v]
  type entry<type extends readonly [any.index, _] = readonly [any.index, _]> = type
  type entries<type extends any.array<any.entry> = any.array<any.entry>> = type
  interface enumerable<type = _> { [𝐢𝐱: number]: type }
  interface arraylike<type = _> extends enumerable<type> { length: number }
  type scalar = string | number | boolean | null
  type json =
    | any.scalar
    | readonly json[]
    | dictionary<json>
    ;

  interface predicate<type = any> { (u: type): boolean }
  type typeguard<
    map extends
    | readonly [𝐟𝐫𝐨𝐦: _, 𝐭𝐨: _]
    = readonly [𝐟𝐫𝐨𝐦: any, 𝐭𝐨: _]
  > = never | { (u: map[0]): u is map[1] }

  type assertion<
    map extends
    | readonly [𝐟𝐫𝐨𝐦: _, 𝐭𝐨: _]
    = readonly [𝐟𝐫𝐨𝐦: any, 𝐭𝐨: _]
  > = never | { (u: map[0]): asserts u is map[1] }
}

type named<
  invariant extends any.field,
  type extends
  | { [𝒊𝒙 in invariant[0]]: invariant[1] }
  = { [𝒊𝒙 in invariant[0]]: invariant[1] }
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
    /** {@link function_ `some.function`} @external */
    function_ as function,
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

  /** {@link unary `some.unary`} @external */
  interface unary<
    out = _,
    arg = any
  > { (_: arg): out }

  /** {@link binary `some.binary`} @external */
  interface binary<
    out = _,
    arg_0 = any,
    arg_1 = any
  > { (_0: arg_0, _1: arg_1): out }

  /** {@link ternary `some.ternary`} @external */
  interface ternary<
    out = _,
    arg_0 = any,
    arg_1 = any,
    arg_2 = any
  > { (_0: arg_0, _1: arg_1, _2: arg_2): out }

  /** {@link field `some.field`} @external */
  type field<key extends any.index = any.index, value = _> = any.field<key, value>

  /** {@link record `some.record`} @external */
  type record<
    key extends
    | any.index
    = any.key,
    value = _
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
    : never // never.close.distributive<"type">
    ;
}

// NOTE: Do not move this namespace. It needs to stay here (positionally _after_ 
// ambient `any`), otherwise the aliases it exports such as `any.object_` will 
// not be preserved.
namespace any_ {
  export type PKG_VERSION = typeof PKG_VERSION
  // TODO: generate this identifier from manifest
  export const PKG_VERSION = "0.28.0" as const

  /** @internal */
  type id<type> = type
  /** @internal */
  // NOTE: Do not move. It needs to stay here (in the non-ambient `any` namespace) to preserve
  // the `any.object` name (otherwise the alias is not preserved)
  export interface object_ extends id<object> { }
  /** @internal */
  // NOTE: Do not move. It needs to stay here (in the non-ambient `any` namespace) to preserve
  // the `any.function` name (otherwise the alias is not preserved)
  export interface function_<arg extends any.array<any> = any.array<any>, out = _> { (...arg: arg): out }
  /** 
   * Note: this term is not meant to be consumed; it is only
   * exposed for the "side-effect" (allows us to support 
   * namespace aliasing using "import equals" syntax, as 
   * documented in the readme)
   * 
   * @category term, implementation detail
   * @internal
   */
  export const never: never = void 0 as never
}
