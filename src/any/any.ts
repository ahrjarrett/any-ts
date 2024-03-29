export type { any }
export type { ANY_TS_VERSION } from "../version"

import type { some } from "../some"
import type { to } from "../to"
import type { pathsof } from "../paths/paths"
import type { ANY_TS_VERSION } from "../version"
import type { _, id } from "../util"

declare namespace any {
  export {
    type ANY_TS_VERSION as VERSION,
  }

  /////////////////////
  /// 🡓🡓 intrinsics
  export {
    boolean_ as boolean,
    class_ as class,
    function_ as function,
    null_ as null,
    number_ as number,
    object_ as object,
    string_ as string,
    symbol_ as symbol,
    undefined_ as undefined,
  }
  /// 🡑🡑 intrinsics
  /////////////////////
  /// 🡓🡓 aliases
  export {
    arrayof as arrayOf,
    dictionary as dict,
    indexableby as indexableBy,
    indexedby as indexedBy,
    keyof as keyOf,
    keysof as keysOf,
  }
  /// 🡑🡑 aliases
  ///////////////////

  ///////////////////
  /// 🡓🡓 aliased
  type boolean_<type extends boolean = boolean> = type
  type class_<type extends any_class = any_class> = type
  type function_<type extends some.function = some.function> = type
  type null_<type extends null = null> = type
  type number_<type extends number = number> = type
  type object_<type extends object = object> = any_object<type>
  type string_<type extends string = string> = type
  type symbol_<type extends symbol = symbol> = type
  type undefined_<type extends undefined = undefined> = type
  // 🡑🡑 aliased
  /////////////////////////

  /////////////////////////
  /// 🡓🡓 direct exports
  export type type<type extends any_nullable | any_nonnullable = any_nullable | any_nonnullable>
    = never | (type extends any_nonnullable ? any_type<type> : type)

  export type nullable<type extends null | undefined = null | undefined> = type
  export type nonnullable<type extends any_nonnullable = any_nonnullable> = type
  export type key<type extends string | number = string | number> = type
  export type index<type extends keyof never = keyof never> = type
  export type literal<type extends string | number | boolean = string | number | boolean> = type
  export type showable<
    type extends
    | string | number | boolean | bigint | null | undefined
    = string | number | boolean | bigint | null | undefined
  > = type

  /** 
   * {@link primitive `any.primitive`} 
   * [{@link https://developer.mozilla.org/en-US/docs/Glossary/Primitive MDN reference}]
   */
  export type primitive<
    type extends
    | string | number | boolean | bigint | null | undefined | symbol
    = string | number | boolean | bigint | null | undefined | symbol
  > = type
  export type numeric<type extends number | `${number}` = number | `${number}`> = type
  export type scalar<type extends any_scalar = any_scalar> = type
  export type json<type extends any_json = any_json> = type
  export type one<only = _> = readonly [_1: only]
  export type single<type extends one = one> = type
  export type unary<type extends some.unary = some.unary> = type
  export type two<one = _, two = _> = readonly [_1: one, _2: two]
  export type double<type extends two = two> = type
  export type binary<type extends some.binary = some.binary> = type
  export type three<one = _, two = _, three = _> = readonly [_1: one, _2: two, _3: three]
  export type triple<type extends three = three> = type
  export type ternary<type extends some.ternary = some.ternary> = type

  export type predicate<type extends some.predicate = some.predicate> = type
  export type asserts<target = _> = some.assertion<[arg: any, out: target]>
  export type assertion<arg = any, out = _> = some.assertion<[arg: arg, out: out]>
  export type typeguard<arg = any, out = _> = some.typeguard<arg, out>
  export type guard<target = _> = some.typeguard<any, target>
  export type array<type = _> = any_array<type>
  export type list<type extends any.array = any.array> = type
  export type entries<type extends any.array<entry> = any.array<entry>> = type
  export type struct<type extends any_struct = any_struct> = type
  export type dictionary<type = _> = dict<type>
  export type enumerable<type extends any_enumerable = any_enumerable> = type
  export type arraylike<type extends any_arraylike = any_arraylike> = type
  export type invertible<type extends any_invertible = any_invertible> = type
  export type path<type extends any.array<any.index> = any.array<any.index>> = type
  export type keys<type extends any.array<any.key> = any.array<any.key>> = type
  export type showables<type extends any.array<showable> = any.array<showable>> = type

  /** 
   * Use {@link field `any.field`} when its more convenient to pass the key/value
   * separately, and {@link entry `any.entry`} when you'd prefer passing them as a pair.
   * @external 
   */
  export type field<key extends any.index = any.index, value = _> = any_field<key, value>

  /** 
   * Use {@link entry `any.entry`} when its more convenient to pass the key/value together
   * as a pair, and {@link field `any.field`} when you'd prefer to pass them separately.
   * @external 
   */
  export type entry<type extends any_entry = any_entry> = type

  export type keyof<
    invariant,
    type extends
    | keyof invariant
    = keyof invariant
  > = type

  export type keysof<
    invariant,
    type extends
    | any.array<keyof invariant>
    = any.array<keyof invariant>
  > = type

  export type propertyof<
    invariant,
    type extends
    | any.key & keyof invariant
    = any.key & keyof invariant
  > = type

  /**
   * @deprecated use {@link propertyof `any.propertyof`} or {@link propertyof `any.propertyOf`} instead
   */
  export type showableKeyof<
    invariant,
    type extends
    | any.key & keyof invariant
    = any.key & keyof invariant
  > = type

  export type indexof<
    invariant extends any.array,
    type extends
    | Extract<keyof invariant, `${number}`>
    = Extract<keyof invariant, `${number}`>
  > = type

  export type indexedby<
    invariant extends any.index,
    type extends
    | { [ix in invariant]: _ }
    = { [ix in invariant]: _ }
  > = type

  export type indexableby<
    invariant extends any.index,
    type extends
    | { [ix in invariant]: any.index }
    = { [ix in invariant]: any.index }
  > = type

  export type pathof<
    invariant,
    type extends
    | pathsof<invariant>
    = pathsof<invariant>
  > = type

  export type named<
    invariant extends field,
    type extends
    | { [ix in invariant[0]]: invariant[1] }
    = { [ix in invariant[0]]: invariant[1] }
  > = type

  export type arrayof<
    invariant,
    type extends
    | any.array<invariant>
    = any.array<invariant>
  > = type

  export type entryof<
    invariant,
    type extends
    | readonly [any.index, invariant]
    = readonly [any.index, invariant]
  > = type

  export type entriesof<
    invariant,
    type extends
    | any.array<readonly [any.index, invariant]>
    = any.array<readonly [any.index, invariant]>
  > = type

  export type fieldof<
    invariant,
    type extends
    | to.entries<invariant>
    = to.entries<invariant>
  > = type

  export type subtypeof<
    invariant,
    subtype extends
    | invariant extends invariant ? invariant : never
    = invariant extends invariant ? invariant : never
  > = subtype
}

type any_index = keyof never
type any_nonnullable = {}
type any_nullable = null | undefined
type any_type<type extends any_nullable | any_nonnullable = any_nullable | any_nonnullable> = type
type any_key<type extends string | number = string | number> = type
type any_scalar = string | number | boolean | null

interface dict<type = _> { [ix: keyof never]: type }
type any_array<type = _> = readonly type[]
/** @ts-expect-error */
interface any_object<type extends object = object> extends id<type> { }
type any_struct<type = any> = { [ix: string]: type }
interface any_enumerable<type = unknown> { [ix: number]: type }
interface any_arraylike<type = unknown> extends any_enumerable<type> { length: number }
interface any_invertible { [ix: any_key]: any_key }
type any_field<k extends any_index = any_index, v = unknown> = readonly [key: k, value: v]
type any_entry<type extends readonly [any_index, unknown] = readonly [any_index, unknown]> = type
interface any_class<
  args extends
  | any.array<any>
  = any.array<any>
> { new(...arg: args): _ }
type any_json =
  | any.scalar
  | readonly any_json[]
  | dict<any_json>
  ;
