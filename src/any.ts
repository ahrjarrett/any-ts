export type { any }
export type { ANY_TS_VERSION } from "./version"
export type { id } from "./id"

// import type { some } from "./some"
import type { to } from "./to"
import type { any as any_ } from "./any_"
import type { pathsof } from "./paths/paths"
import type { ANY_TS_VERSION } from "./version"
import type { checkNot, violatesRule } from "./err/check"
import { Semantic } from "./semantic/semantic"
import type { _ } from "./_"


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
    // arrayof as arrayOf,
    // dictionary as dict,
    // indexedby as indexedBy,
    // indexableby as indexableBy,
    // keyof as keyOf,
    // keysof as keysOf,
  }
}

type _4<type extends any.nonnullable> = type

declare namespace any {
  // 🡓🡓 aliased exports 🡓🡓
  type string_<type extends string = string> = type
  type number_<type extends number = number> = type
  type boolean_<type extends boolean = boolean> = type
  type null_<type extends null = null> = type
  type undefined_<type extends undefined = undefined> = type
  type symbol_<type extends symbol = symbol> = type
  type function_<type extends some.function = some.function> = type
  // type class_<type extends any.class = any.class> = type
  type object_<type extends any_.object = any_.object> = type
  // 🡑🡑 aliased exports 🡑🡑
  // 🡓🡓 direct exports 🡓🡓
  type type<type extends any.nullable | any.nonnullable = any.nullable | any.nonnullable> = type
  type nullable<type extends null | void | undefined = null | void | undefined> = type

  type nonnullable<type extends some.nonnullable = some.nonnullable> = type

  type key<type extends some.key = some.key> = type
  type index<type extends some.index = some.index> = type
  type literal<type extends any.literal = any.literal> = type
  // type showable<type extends any.showable = any.showable> = type
  /** 
   * {@link primitive `any.primitive`} 
   * • {@link https://developer.mozilla.org/en-US/docs/Glossary/Primitive MDN reference}
   */
  // type primitive<type extends any.primitive = any.primitive> = type
  // type numeric<type extends any.numeric = any.numeric> = type
  // type json<type extends any.json = any.json> = type
  // type one<only = unknown> = readonly [_1: only]
  // type single<type extends one = one> = type
  // type unary<type extends some.unary = some.unary> = type
  // type two<one = unknown, two = unknown> = readonly [_1: one, _2: two]
  // type double<type extends two = two> = type
  // type binary<type extends some.binary = some.binary> = type
  // type three<one = unknown, two = unknown, three = unknown> = readonly [_1: one, _2: two, _3: three]
  // type triple<type extends three = three> = type
  // type ternary<type extends some.ternary = some.ternary> = type

  /** {@link struct `any.struct`} is a special constructor that accepts (and produces) non-array objects */
  // type struct<type extends checkNot<type, any.array, any.object> = any.object>
  // = [type] extends [any.array] ? violatesRule<any.array, type> : type

  // type predicate<type extends some.predicate = some.predicate> = type
  // type asserts<target = unknown> = some.assertion<[arg: any, out: target]>
  // type assertion<arg = any, out = unknown> = some.assertion<[arg: arg, out: out]>
  // type typeguard<arg = any, out = unknown> = some.typeguard<arg, out>
  // type guard<target = unknown> = some.typeguard<any, target>
  type array<type = unknown> = some.array<type>
  type list<type extends any.array = any.array> = type
  type entries<type extends any.array<entry> = any.array<entry>> = type
  // type dictionary<type = unknown> = any.dictionary<type>
  // type enumerable<type extends any.enumerable = any.enumerable> = type
  // type arraylike<type extends any.arraylike = any.arraylike> = type
  // type invertible<type extends any.invertible = any.invertible> = type
  // type path<type extends any.path = any.path> = type
  // type keys<type extends any.keys = any.keys> = type
  /** 
   * Use {@link field `any.field`} when its more convenient to pass the key/value
   * separately, and {@link entry `any.entry`} when you'd prefer passing them as a pair.
   * @external 
   */
  // type field<key extends any.index = any.index, value = unknown> = any.field<key, value>

  /** 
   * Use {@link entry `any.entry`} when its more convenient to pass the key/value together
   * as a pair, and {@link field `any.field`} when you'd prefer to pass them separately.
   * @external 
   */
  type entry<type extends readonly [any.index, unknown] = readonly [any.index, unknown]> = type

  // type keyof<
  //   invariant,
  //   type extends
  //   | keyof invariant
  //   = keyof invariant
  // > = type

  // type keysof< invariant,
  //   type extends
  //   | any.array<keyof invariant>
  //   = any.array<keyof invariant>
  // > = type

  // type propertyof<
  //   invariant,
  //   type extends
  //   | any.key & keyof invariant
  //   = any.key & keyof invariant
  // > = type

  // type indexof<
  //   invariant extends any.array,
  //   type extends
  //   | Extract<keyof invariant, `${number}`>
  //   = Extract<keyof invariant, `${number}`>
  // > = type

  // type indexedby<
  //   invariant extends any.index,
  //   type extends
  //   | { [ix in invariant]: unknown }
  //   = { [ix in invariant]: unknown }
  // > = type

  // type indexableby<
  //   invariant extends any.index,
  //   type extends
  //   | { [ix in invariant]: any.index }
  //   = { [ix in invariant]: any.index }
  // > = type

  // type pathof<
  //   invariant,
  //   type extends
  //   | pathsof<invariant>
  //   = pathsof<invariant>
  // > = type

  // type named<
  //   invariant extends field,
  //   type extends
  //   | { [ix in invariant[0]]: invariant[1] }
  //   = { [ix in invariant[0]]: invariant[1] }
  // > = type

  // type arrayof<
  //   invariant,
  //   type extends
  //   | any.array<invariant>
  //   = any.array<invariant>
  // > = type

  // type entryof<
  //   invariant,
  //   type extends
  //   | readonly [any.index, invariant]
  //   = readonly [any.index, invariant]
  // > = type

  // type entriesof<
  //   invariant,
  //   type extends
  //   | any.array<readonly [any.index, invariant]>
  //   = any.array<readonly [any.index, invariant]>
  // > = type

  // type fieldof<
  //   invariant,
  //   type extends
  //   | to.entries<invariant>
  //   = to.entries<invariant>
  // > = type

  // type subtypeof<
  //   invariant,
  //   subtype extends
  //   | invariant extends invariant ? invariant : never
  //   = invariant extends invariant ? invariant : never
  // > = subtype

}


declare namespace some {
  export interface nonnullable<type extends {} = {}> extends Semantic<type> { }
  /** 
   * {@link array `some.array`} is an existential quantifier and type capable of representing 
   * an array of any length, and containing any element.
   * 
   * **Note:** Like many of the types that inhabit {@link some `some`}, if you don't manually 
   * specify the type parameter, you'll get the _lower bound_. If you're looking a type representing 
   * an array's upper bound, try {@link any.array `any.array`}.
   */
  export type array<type extends _ = never> = globalThis.ReadonlyArray<type>
  /** 
   * {@link array `some.entry`} is an existential quantifier and type capable of representing 
   * an _entry_, which is a type representing a key/value pair.
   */
  export type entry<type extends readonly [any.index, _] = readonly [any.index, _]> = type

  export type key = string | number
  export type index = keyof never



  /** 
   * {@link variadic `some.variadic`} is an existential quantifier and 
   * type representing a function that accepts an _unbounded_ (`n`) arguments
   */
  export interface variadic { (...args: never): unknown }

  export { fn as function }
  export interface fn<
    in arg extends some.array<any> = some.array<never>,
    out returns = unknown
  > extends variadic {
    <args extends arg>(...arg: args): returns
  }

  /** 
   * {@link nullary `some.nullary`} is an existential quantifier and 
   * type representing a function that accepts _exactly zero_ (0) arguments
   */
  export interface nullary<out returns = unknown> { (): returns }

  /** 
   * {@link unary `some.unary`} is an existential quantifier and 
   * type representing a function that accepts _up to one_ (1) argument
   */
  export interface unary<
    in arg extends readonly [any] = [never],
    out returns = unknown
  > {
    (...arg: [a_0: arg[0]]): returns
    <args extends arg>(...arg: args): returns
  }

  /** 
   * {@link binary `some.binary`} is an existential quantifier and 
   * type representing a function that accepts _up to two_ (2) arguments
   */
  export interface binary<
    in arg extends readonly [any, any] = [never, never],
    out returns = unknown
  > {
    (...arg: [a_0: arg[0], a_1: arg[1]]): returns
    <args extends arg>(...arg: args): returns
  }

  /** 
   * {@link ternary `some.ternary`} is an existential quantifier and 
   * type representing a function that accepts _up to three_ (3) arguments
   */
  export interface ternary<
    in arg extends
    | readonly [any, any, any]
    = [never, never, never],
    out returns = unknown
  > {
    (...arg: [a_0: arg[0], a_1: arg[1], a_2: arg[2]]): returns
    <args extends arg>(...arg: args): returns
  }
}





// declare namespace intrinsic {
//   /** @ts-expect-error */
//   export interface Object<type extends object = object> extends id<type> { }
//   export { Object as object }
// }
