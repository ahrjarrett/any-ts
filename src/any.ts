export type { any_ as any, _ }
export type { ANY_TS_VERSION } from "./version"

import type { some } from "./some"
import type { to } from "./to"
import type { pathsof } from "./paths/paths"
import type { ANY_TS_VERSION } from "./version"

type _ = unknown

declare namespace any_ {
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

declare namespace any_ {
  // 🡓🡓 aliased exports 🡓🡓
  type string_<type extends string = string> = type
  type number_<type extends number = number> = type
  type boolean_<type extends boolean = boolean> = type
  type null_<type extends null = null> = type
  type undefined_<type extends undefined = undefined> = type
  type symbol_<type extends symbol = symbol> = type
  type function_<type extends some.function = some.function> = type
  type class_<type extends any.class = any.class> = type
  type object_<type extends any.object = any.object> = type
  // 🡑🡑 aliased exports 🡑🡑
  // 🡓🡓 direct exports 🡓🡓
  type type<type extends any.nullable | any.type = any.nullable | any.type>
    = never | (type extends any.nonnullable ? any.type<type> : type)
  type nullable<type extends any.nullable = any.nullable> = type
  type nonnullable<type extends any.nonnullable = any.nonnullable> = type
  type key<type extends any.key = any.key> = type
  type index<type extends any.index = any.index> = type
  type literal<type extends any.literal = any.literal> = type
  type showable<type extends any.showable = any.showable> = type
  /** 
   * {@link primitive `any.primitive`} 
   * [{@link https://developer.mozilla.org/en-US/docs/Glossary/Primitive MDN reference}]
   */
  type primitive<type extends any.primitive = any.primitive> = type
  type numeric<type extends any.numeric = any.numeric> = type
  type json<type extends any.json = any.json> = type
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
  type asserts<target = unknown> = some.assertion<[arg: any, out: target]>
  type assertion<arg = any, out = unknown> = some.assertion<[arg: arg, out: out]>
  type typeguard<arg = any, out = unknown> = some.typeguard<[arg: arg, out: out]>
  type guard<target = unknown> = some.typeguard<any, target>
  type array<type = unknown> = any.array<type>
  type list<type extends any.array = any.array> = type
  type entries<type extends any.array<entry> = any.array<entry>> = type
  type struct<type extends any.struct = any.struct> = type
  type dictionary<type = unknown> = any.dictionary<type>
  type enumerable<type extends any.enumerable = any.enumerable> = type
  type arraylike<type extends any.arraylike = any.arraylike> = type
  type invertible<type extends any.invertible = any.invertible> = type
  type path<type extends any.path = any.path> = type
  type keys<type extends any.keys = any.keys> = type
  /** 
   * Use {@link field `any.field`} when its more convenient to pass the key/value
   * separately, and {@link entry `any.entry`} when you'd prefer passing them as a pair.
   * @external 
   */
  type field<key extends any.index = any.index, value = unknown> = any.field<key, value>
  /** 
   * Use {@link entry `any.entry`} when its more convenient to pass the key/value together
   * as a pair, and {@link field `any.field`} when you'd prefer to pass them separately.
   * @external 
   */
  type entry<type extends any.entry = any.entry> = type

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


  namespace any {
    export type array<type = unknown> = readonly type[]
    export type index = keyof never
    interface class_<
      args extends
      | any.array<any>
      = any.array<any>
    > { new(...arg: args): unknown }
    export { class_ as class }

    type Object<type extends intrinsic.object = intrinsic.object> = intrinsic.object<type>
    export { Object as object }
    export type nonnullable = {}
    export type nullable = null | undefined
    export type type<type extends nullable | nonnullable = nullable | nonnullable> = type
    export type key<type extends string | number = string | number> = type
    export type literal<type extends string | number | boolean = string | number | boolean> = type
    export type showable = string | number | boolean | bigint | null | undefined
    export type primitive = string | number | boolean | bigint | null | undefined | symbol
    export type numeric = number | `${number}`
    export type scalar = string | number | boolean | null
    export interface dictionary<type = unknown> { [ix: keyof any]: type }
    export type json =
      | any.scalar
      | readonly json[]
      | dictionary<json>
      ;

    export type struct<type = any> = { [ix: string]: type }
    export interface enumerable<type = unknown> { [ix: number]: type }
    export interface arraylike<type = unknown> extends enumerable<type> { length: number }
    export interface invertible { [ix: key]: key }
    export type path<type extends readonly index[] = readonly index[]> = type
    export type keys<type extends readonly key[] = readonly key[]> = type
    export type field<k extends index = index, v = unknown> = readonly [key: k, value: v]
    export type entry<type extends readonly [any.index, unknown] = readonly [any.index, unknown]> = type
  }
}

type id<type> = type

declare namespace intrinsic {
  /** @ts-expect-error */
  export interface Object<type extends object = object> extends id<type> { }
  export { Object as object }
}
