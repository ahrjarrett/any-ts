export type { any }
export type { ANY_TS_VERSION } from "../version"

import type { some } from "../some"
import type { to } from "../to"
import type { pathsof } from "../paths/paths"
import type { ANY_TS_VERSION } from "../version"
import type { _, id } from "../util"
import type { Any } from "./_internal"

declare namespace any {
  export {
    type ANY_TS_VERSION as VERSION,
  }
  export {
    string_ as string,
    number_ as number,
    boolean_ as boolean,
    object_ as object,
    function_ as function,
  }

  // 🡓🡓 aliases 🡓🡓
  export {
    arrayof as arrayOf,
    dictionary as dict,
    indexedby as indexedBy,
    indexableby as indexableBy,
    keyof as keyOf,
    keysof as keysOf,
  }
}


type key<type extends string | number = string | number> = type
type literal<type extends string | number | boolean = string | number | boolean> = type
type showable = string | number | boolean | bigint | null | undefined
type primitive = string | number | boolean | bigint | null | undefined | symbol
type numeric = number | `${number}`
type scalar = string | number | boolean | null

declare namespace any {
  // 🡓🡓 aliased exports 🡓🡓
  type string_<type extends string = string> = type
  type number_<type extends number = number> = type
  type boolean_<type extends boolean = boolean> = type
  type null_<type extends null = null> = type
  type undefined_<type extends undefined = undefined> = type
  type symbol_<type extends symbol = symbol> = type
  type function_<type extends some.function = some.function> = type
  type class_<type extends Any.Class = Any.Class> = type
  type object_<type extends Any.AnyObject = Any.AnyObject> = type
  // 🡑🡑 aliased exports 🡑🡑
  // 🡓🡓 direct exports 🡓🡓
  type type<type extends Any.Nullable | Any.NonNullable = Any.Nullable | Any.NonNullable>
    = never | (type extends Any.NonNullable ? Any.Type<type> : type)

  type nullable<type extends null | undefined = null | undefined> = type
  type nonnullable<type extends Any.NonNullable = Any.NonNullable> = type
  type key<type extends string | number = string | number> = type
  type index<type extends keyof never = keyof never> = type
  type literal<type extends string | number | boolean = string | number | boolean> = type
  type showable<
    type extends
    | string | number | boolean | bigint | null | undefined
    = string | number | boolean | bigint | null | undefined
  > = type

  /** 
   * {@link primitive `any.primitive`} 
   * [{@link https://developer.mozilla.org/en-US/docs/Glossary/Primitive MDN reference}]
   */
  type primitive<
    type extends
    | string | number | boolean | bigint | null | undefined | symbol
    = string | number | boolean | bigint | null | undefined | symbol
  > = type
  type numeric<type extends number | `${number}` = number | `${number}`> = type
  type json<type extends Any.Json = Any.Json> = type
  type one<only = unknown> = readonly [_1: only]
  type single<type extends one = one> = type
  type unary<type extends some.unary = some.unary> = type
  type two<one = unknown, two = unknown> = readonly [_1: one, _2: two]
  type double<type extends two = two> = type
  type binary<type extends some.binary = some.binary> = type
  type three<one = unknown, two = unknown, three = unknown> = readonly [_1: one, _2: two, _3: three]
  type triple<type extends three = three> = type
  type ternary<type extends some.ternary = some.ternary> = type

  type predicate<type extends some.predicate = some.predicate> = type
  type asserts<target = _> = some.assertion<[arg: any, out: target]>
  type assertion<arg = any, out = _> = some.assertion<[arg: arg, out: out]>
  type typeguard<arg = any, out = _> = some.typeguard<arg, out>
  type guard<target = _> = some.typeguard<any, target>
  type array<type = _> = Any.AnyArray<type>
  type list<type extends any.array = any.array> = type
  type entries<type extends any.array<entry> = any.array<entry>> = type
  type struct<type extends Any.Struct = Any.Struct> = type
  type dictionary<type = _> = Any.Dict<type>
  type enumerable<type extends Any.Enumerable = Any.Enumerable> = type
  type arraylike<type extends Any.ArrayLike = Any.ArrayLike> = type
  type invertible<type extends Any.Invertible = Any.Invertible> = type
  type path<type extends Any.Path = Any.Path> = type
  type keys<type extends Any.Keys = Any.Keys> = type
  type showables<type extends any.array<showable> = any.array<showable>> = type
  /** 
   * Use {@link field `any.field`} when its more convenient to pass the key/value
   * separately, and {@link entry `any.entry`} when you'd prefer passing them as a pair.
   * @external 
   */
  type field<key extends any.index = any.index, value = _> = Any.Field<key, value>
  /** 
   * Use {@link entry `any.entry`} when its more convenient to pass the key/value together
   * as a pair, and {@link field `any.field`} when you'd prefer to pass them separately.
   * @external 
   */
  type entry<type extends Any.Entry = Any.Entry> = type

  type keyof<
    invariant,
    type extends
    | keyof invariant
    = keyof invariant
  > = type

  type keysof<
    invariant,
    type extends
    | any.array<keyof invariant>
    = any.array<keyof invariant>
  > = type

  type propertyof<
    invariant,
    type extends
    | any.key & keyof invariant
    = any.key & keyof invariant
  > = type

  /**
   * @deprecated use {@link propertyof `any.propertyof`} or {@link propertyof `any.propertyOf`} instead
   */
  type showableKeyof<
    invariant,
    type extends
    | any.key & keyof invariant
    = any.key & keyof invariant
  > = type

  type indexof<
    invariant extends any.array,
    type extends
    | Extract<keyof invariant, `${number}`>
    = Extract<keyof invariant, `${number}`>
  > = type

  type indexedby<
    invariant extends any.index,
    type extends
    | { [ix in invariant]: unknown }
    = { [ix in invariant]: unknown }
  > = type

  type indexableby<
    invariant extends any.index,
    type extends
    | { [ix in invariant]: any.index }
    = { [ix in invariant]: any.index }
  > = type

  type pathof<
    invariant,
    type extends
    | pathsof<invariant>
    = pathsof<invariant>
  > = type

  type named<
    invariant extends field,
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

  type entryof<
    invariant,
    type extends
    | readonly [any.index, invariant]
    = readonly [any.index, invariant]
  > = type

  type entriesof<
    invariant,
    type extends
    | any.array<readonly [any.index, invariant]>
    = any.array<readonly [any.index, invariant]>
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
}

/** @ts-expect-error */
interface Any<type extends object = object> extends id<type> { }
