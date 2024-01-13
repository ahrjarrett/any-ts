/* eslint-disable
 prettier/prettier,
 */
/** TODO: generate this identifier from manifest */
export type PKG_VERSION = typeof PKG_VERSION
export const PKG_VERSION = "0.2.0"

// re-exports
export {
  keyof,
  keyof as keyOf,
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
  type arraylike,
  type binary,
  type dictionary,
  type double,
  type entries,
  type entry,
  type enumerable,
  type field,
  type index,
  type invertible,
  type key,
  type list,
  type literal,
  type nonnullable,
  type nullable,
  type one,
  type primitive,
  type showable,
  type single,
  type struct,
  type ternary,
  type three,
  type triple,
  type two,
  type type,
  type unary,
}

import * as any from './__internal'
import { to } from "./to"

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
 * `unknown` : wizard ∷  {@link type `any.type`} : muggle
 * ---
 * 
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
type array<type = _> = globalThis.ReadonlyArray<type>

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
type one<first = _> = readonly [_𝟭: first]

/** {@link two `any.two`} @external */
type two<first = _, second = _> = readonly [_𝟭: first, _𝟮: second]

/** {@link three `any.three`} @external */
type three<first = _, second = _, third = _> = readonly [_𝟭: first, _𝟮: second, _𝟯: third]

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

/** {@link field `any.field`} @external */
type field<key extends any.key = any.key, value = _> = any.field<key, value>

/** {@link entry `any.entry`} @external */
type entry<type extends any.field = any.field> = type

/** {@link entries `any.entries`} @external */
type entries<type extends any.array<entry> = any.array<entry>> = type

/** {@link struct `any.struct`} @external */
type struct<type extends any.struct = any.struct> = type

/** {@link dictionary `any.dictionary`} @external */
type dictionary<type = _> = any.dictionary<type>

/** {@link enumerable `any.enumerable`} @external */
type enumerable<type extends any.enumerable = any.enumerable> = type

/** {@link arraylike `any.arraylike`} @external */
type arraylike<type extends any.arraylike = any.arraylike> = type

/** {@link invertible `any.invertible`} @external */
type invertible<type extends any.invertible = any.invertible> = type

namespace some { export const never: never = void 0 as never }

/** The {@link some `some`} namespace, a.k.a. {@link some `invariant`}  */
declare namespace some {
  // re-exports from parent scope
  export {
    /** {@link array `some.array`} @external */
    array,
  }

  // namespace aliases
  export {
    /** {@link arrayof `some.arrayOf`} @external */
    arrayof as arrayOf,
    /** {@link function_ `some.function`} @external */
    function_ as function,
    /** {@link indexof `some.indexOf`} @external */
    indexof as indexOf,
    /** {@link fieldof `some.fieldOf`} @external */
    fieldof as fieldOf,
    /** {@link subtypeof `some.subtypeOf`} @external */
    subtypeof as subtypeOf,
  }

  /** {@link arrayof `some.arrayof`} @external */
  export type arrayof<
    invariant,
    type extends
    | any.array<invariant>
    = any.array<invariant>
  > = type

  /** {@link indexed `some.indexed`} @external */
  export type indexed<
    invariant extends field,
    type extends
    | { [𝒊𝒙 in invariant[0]]: invariant[1] }
    = { [𝒊𝒙 in invariant[0]]: invariant[1] }
  > = type

  /** {@link indexedBy `some.indexedBy`} @external */
  export type indexedBy<
    invariant extends any.index,
    type extends
    | { [𝒊𝒙 in invariant]: _ }
    = { [𝒊𝒙 in invariant]: _ }
  > = type

  /** {@link indexof `some.indexof`} @external */
  export type indexof<
    invariant,
    type extends
    | keyof invariant
    = keyof invariant
  > = type

  /** {@link field `some.field`} @external */
  export type field<key extends any.index = any.index, value = _> = any.field<key, value>

  /** {@link fieldof `some.fieldof`} @external */
  export type fieldof<
    invariant,
    type extends
    | to.entries<invariant>
    = to.entries<invariant>
  > = type

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

  /** {@link subtypeof `some.subtypeof`} @external */
  export type subtypeof<
    invariant,
    subtype extends
    | invariant extends invariant ? invariant : never
    = invariant extends invariant ? invariant : never
  > = subtype
}
