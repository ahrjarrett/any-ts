export type { any }
export type { ANY_TS_VERSION } from "../version.js"

import type { some } from "../some.js"
import type { to } from "../to.js"
import type { pathsof } from "../paths/paths.js"
import type { ANY_TS_VERSION } from "../version.js"
import type { _, id } from "../util.js"

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
    dictionary as dict,
    keyof as keyOf,
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
  export type object_<type extends any_object = any_object> = type
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
  export type two<first = _, second = _> = readonly [_1: first, _2: second]
  export type pair<left = _, right = _> = readonly [left: left, right: right]
  export type double<type extends two = two> = type
  export type binary<type extends some.binary = some.binary> = type
  export type three<first = _, second = _, third = _> = readonly [_1: first, _2: second, _3: third]
  export type triple<type extends three = three> = type
  export type ternary<type extends some.ternary = some.ternary> = type
  export type record<type extends globalThis.Record<string, _> = globalThis.Record<string, _>> = type

  export type predicate<type extends some.predicate = some.predicate> = type
  export type asserts<target = _> = never | some.asserts<any, target>
  export type assertion<arg = any, out = _> = never | some.assertion<[arg: arg, out: out]>
  export type guard<target = _> = never | some.typeguard<any, target>
  export type typeguard<arg = any, out = _> = never | some.typeguard<arg, out>
  export type array<type = _> = any_array<type>
  export type list<type extends any.array = any.array> = type
  export type entries<type extends any.array<entry> = any.array<entry>> = type
  export type struct<type extends any_struct = any_struct> = type
  export type dictionary<type = _> = any_dict<type>
  export type enumerable<type extends any_enumerable = any_enumerable> = type
  export type arraylike<type extends any_arraylike = any_arraylike> = type
  export type invertible<type extends any_invertible = any_invertible> = type
  export type path<type extends any.array<any.index> = any.array<any.index>> = type

  export type strings<type extends any.array<string> = any.array<string>> = type
  export type numbers<type extends any.array<number> = any.array<number>> = type
  export type booleans<type extends any.array<boolean> = any.array<boolean>> = type
  export type indices<type extends any.array<any.index> = any.array<any.index>> = type
  export type keys<type extends any.array<any.key> = any.array<any.key>> = type
  export type paths<type extends any.array<any.path> = any.array<any.path>> = type
  export type literals<type extends any.array<any.literal> = any.array<any.literal>> = type
  export type primitives<type extends any.array<any.primitive> = any.array<any.primitive>> = type
  export type showables<type extends any.array<showable> = any.array<showable>> = type
  export type matrix<type extends any.array<any.array> = any.array<any_array>> = type
  export type objects<type extends any.array<any.object> = any.array<any.object>> = type
  export type nullables<type extends any.array<any.nullable> = any.array<any.nullable>> = type
  export type scalars<type extends any.array<any.scalar> = any.array<any.scalar>> = type
  export type unit = typeof unit
  export const unit: unique symbol
  // export type { unit as true }

  export type bottom<type extends never = never> = type
  export type { bottom as never }
  export type top<type = _> = type
  export type { top as any }

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

  export type keysOf<
    invariant,
    type extends
    | any.array<keyof invariant>
    = any.array<keyof invariant>
  > = type

  export type propertyOf<
    invariant,
    type extends
    | any.key & keyof invariant
    = any.key & keyof invariant
  > = type

  export type indexOf<
    invariant extends any.array,
    type extends
    | Extract<keyof invariant, `${number}`>
    = Extract<keyof invariant, `${number}`>
  > = type

  export type indexedBy<
    invariant extends any.index,
    type extends
    | { [ix in invariant]: _ }
    = { [ix in invariant]: _ }
  > = type

  export type indexableBy<
    invariant extends any.index,
    type extends
    | { [ix in invariant]: any.index }
    = { [ix in invariant]: any.index }
  > = type

  export type pathOf<
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

  export type arrayOf<
    invariant,
    type extends
    | any.array<invariant>
    = any.array<invariant>
  > = type

  export type entryOf<
    invariant,
    type extends
    | readonly [any.index, invariant]
    = readonly [any.index, invariant]
  > = type

  export type entriesOf<
    invariant,
    type extends
    | any.array<readonly [any.index, invariant]>
    = any.array<readonly [any.index, invariant]>
  > = type

  export type fieldOf<
    invariant,
    type extends
    | to.entries<invariant>
    = to.entries<invariant>
  > = type

  export type subtypeOf<
    invariant,
    subtype extends
    | invariant extends invariant ? invariant : never
    = invariant extends invariant ? invariant : never
  > = subtype


  export type domainOf<
    invariant extends some.function,
    target extends
    | globalThis.Parameters<invariant>
    = globalThis.Parameters<invariant>
  > = target

  export type codomainOf<
    invariant extends some.function,
    target extends
    | globalThis.ReturnType<invariant>
    = globalThis.ReturnType<invariant>
  > = target
}

export type any_index = keyof never
export type any_nonnullable = {}
export type any_nullable = null | undefined
export type any_type<type extends any_nullable | any_nonnullable = any_nullable | any_nonnullable> = type
export type any_key<type extends string | number = string | number> = type
export type any_scalar = string | number | boolean | null

export interface any_dict<type = _> { [ix: keyof never]: type }
export type any_array<type = _> = readonly type[]
/** @ts-expect-error */
export interface any_object<type extends object = object> extends id<type> { }
export type any_struct<type = any> = { [ix: string]: type }
export interface any_enumerable<type = _> { [ix: number]: type }
export interface any_arraylike<type = _> extends any_enumerable<type> { length: number }
export interface any_invertible { [ix: any_key]: any_key }
export type any_field<key extends any_index = any_index, value = _> = readonly [key: key, value: value]
export type any_entry<type extends readonly [any_index, _] = readonly [any_index, _]> = type
export interface any_class<
  args extends
  | any.array<any>
  = any.array<any>,
  target = _
> { new(...arg: args): target }

export type any_json =
  | any.scalar
  | readonly any_json[]
  | any_dict<any_json>
  ;
