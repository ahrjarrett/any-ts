/* eslint-disable
 prettier/prettier,
 */
/** TODO: generate this identifier from manifest */
export type PKG_VERSION = typeof PKG_VERSION
export const PKG_VERSION = "0.3.0"

// re-exports
export {
  keyof,
  keyof as keyOf,
  indexof,
  indexof as indexOf,
  numeric,
  pathof,
  pathof as pathOf,
} from "./__internal"

// module namespaces
export {
  some,
  some as invariant,
}

// module aliases
export {
  type boolean_ as boolean,
  type function_ as function,
  type number_ as number,
  type object_ as object,
  type string_ as string,

}

// module exports
export {
  type array,
  type arrayof,
  /** {@link arrayof `any.arrayOf`} @external */
  type arrayof as arrayOf,
  type arraylike,
  type binary,
  /** {@link dictionary `any.dict`} @external */
  type dictionary as dict,
  type dictionary,
  type double,
  type entries,
  type entry,
  type enumerable,
  type field,
  type fieldof,
  /** {@link fieldof `any.fieldOf`} @external */
  type fieldof as fieldOf,
  type index,
  type indexedby,
  /** {@link indexedby `any.indexedBy`} @external */
  type indexedby as indexedBy,
  type invertible,
  type key,
  type list,
  type literal,
  type nonnullable,
  type nullable,
  type one,
  type path,
  type primitive,
  type showable,
  type single,
  type struct,
  type subtypeof,
  /** {@link subtypeof `any.subtypeOf`} @external */
  type subtypeof as subtypeOf,
  type ternary,
  type three,
  type triple,
  type two,
  type type,
  type typeguard,
  type unary,
}

import * as any from './__internal'
import { to } from "./to"

import named = any.term.named

/** @internal */
type _ = unknown

/** {@link string_ `any.string`} */
type string_<type extends string = string> = type

/** {@link number_ `any.number`} */
type number_<type extends number = number> = type

/** {@link boolean_ `any.boolean`} */
type boolean_<type extends boolean = boolean> = type

/** {@link function_ `any.function`} */
type function_<type extends some.function = some.function> = type

/** {@link object_ `any.object`} */
type object_<type extends any.object = any.object> = type

/**
 * {@link type `any.type`} is a type-constructor that can construct 
 * any abitrary type. 
 * 
 * Alternatively:
 * 
 * {@link type `any.type`} is a type-constructor that applies zero 
 * constraints to its argument.
 * 
 * @external
 */
type type<type extends any.type = any.type> = type

/** {@link nullable `any.nullable`} @external */
type nullable<type extends any.nullable = any.nullable> = type

/** {@link nonnullable `any.nonnullable`} @external */
type nonnullable<type extends any.nonnullable = any.nonnullable> = type

/** {@link array `any.array`} @external */
type array<type = any.thing> = globalThis.ReadonlyArray<type>

/** {@link key `any.key`} @external */
type key<type extends any.key = any.key> = type

/** {@link index `any.index`} @external */
type index<type extends any.index = any.index> = type

/** {@link literal `any.literal`} @external */
type literal<type extends any.literal = any.literal> = type

/** {@link showable `any.showable`} @external */
type showable<type extends any.showable = any.showable> = type

/** {@link primitive `any.primitive`} @external */
type primitive<type extends any.primitive = any.primitive> = type

/** {@link list `any.list`} @external */
type list<type extends any.array = any.array> = type

/** {@link one `any.one`} @external */
type one<first = any.thing> = readonly [_𝟭: first]

/** {@link two `any.two`} @external */
type two<first = any.thing, second = any.thing> = readonly [_𝟭: first, _𝟮: second]

/** {@link three `any.three`} @external */
type three<first = any.thing, second = any.thing, third = any.thing> = readonly [_𝟭: first, _𝟮: second, _𝟯: third]

/** {@link single `any.single`} @external */
type single<type extends one = one> = type

/** {@link double `any.double`} @external */
type double<type extends two = two> = type

/** {@link triple `any.triple`} @external */
type triple<type extends three = three> = type

/** {@link unary `any.unary`} @external */
type unary<type extends some.unary = some.unary> = type

/** {@link double `any.double`} @external */
type binary<type extends some.binary = some.binary> = type

/** {@link ternary `any.ternary`} @external */
type ternary<type extends some.ternary = some.ternary> = type

/** {@link typeguard `any.typeguard`} @external */
type typeguard<𝐢𝐧 = any, 𝐨𝐮𝐭 = unknown> = any.typeguard<[𝐢𝐧: 𝐢𝐧, 𝐨𝐮𝐭: 𝐨𝐮𝐭]>

/** 
 * Use {@link field `any.field`} when its more convenient to pass the key/value
 * separately, and {@link field `any.entries`} when you'd prefer passing them as a pair.
 * @external 
 */
type field<key extends any.key = any.key, value = any.thing> = any.field<key, value>

/** 
 * Use {@link field `any.field`} when its more convenient to pass the key/value
 * separately, and {@link field `any.entries`} when you'd prefer passing them as a pair.
 * @external 
 */
type entry<type extends readonly [any.key, any.thing] = readonly [any.key, any.thing]> = type

/** {@link entries `any.entries`} @external */
type entries<type extends any.array<entry> = any.array<entry>> = type

/** {@link struct `any.struct`} @external */
type struct<type extends any.struct = any.struct> = type

/** {@link dictionary `any.dictionary`} @external */
type dictionary<type = any.thing> = any.dictionary<type>

/** {@link enumerable `any.enumerable`} @external */
type enumerable<type extends any.enumerable = any.enumerable> = type

/** {@link arraylike `any.arraylike`} @external */
type arraylike<type extends any.arraylike = any.arraylike> = type

/** {@link invertible `any.invertible`} @external */
type invertible<type extends any.invertible = any.invertible> = type

/** {@link path `any.path`} @external */
type path<type extends any.path = any.path> = type

/** {@link arrayof `any.arrayof`} @external */
type arrayof<
  invariant,
  type extends
  | any.array<invariant>
  = any.array<invariant>
> = type

/** {@link fieldof `some.fieldof`} @external */
type fieldof<
  invariant,
  type extends
  | to.entries<invariant>
  = to.entries<invariant>
> = type

/** {@link subtypeof `some.subtypeof`} @external */
type subtypeof<
  invariant,
  subtype extends
  | invariant extends invariant ? invariant : never
  = invariant extends invariant ? invariant : never
> = subtype

/** {@link indexedby `any.indexedby`} @external */
type indexedby<
  invariant extends any.index,
  type extends
  | { [𝒊𝒙 in invariant]: any.thing }
  = { [𝒊𝒙 in invariant]: any.thing }
> = type

namespace some { export const never: never = void 0 as never }
/** The {@link some `some`} */
declare namespace some {
  // namespace aliases
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
    /** {@link named `some.named`} @external */
    named,
  }

  /** {@link field `some.field`} @external */
  export type field<key extends any.index = any.index, value = any.thing> = any.field<key, value>

  /** {@link function_ `some.function`} @external */
  export interface function_<arg extends array<any> = array<any>, out = _> { (...arg: arg): out }

  /** {@link unary `some.unary`} @external */
  export interface unary<
    out = _,
    arg_0 = any
  > { (_: arg_0): out }

  /** {@link binary `some.binary`} @external */
  export interface binary<
    out = _,
    arg_0 = any,
    arg_1 = any
  > { (_0: arg_0, _1: arg_1): out }

  /** {@link ternary `some.ternary`} @external */
  export interface ternary<
    out = _,
    arg_0 = any,
    arg_1 = any,
    arg_2 = any
  > { (_0: arg_0, _1: arg_1, _2: arg_2): out }

  /** {@link record `some.record`} @external */
  export type record<
    key extends
    | any.index
    = any.key,
    value = _
  > = globalThis.Record<key, value>
}
