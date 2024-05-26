import type { any } from "../any/exports.js"
import { _ } from "../util.js";
import type { TypeError } from "../type-error/exports.js"

export declare namespace has {
  /** 
   * ### [`has.oneProperty`](has.oneProperty) 
   * 
   * [`has.oneProperty`](has.oneProperty) allows users to constrain a type parameter 
   * such that it only accepts objects that contain exactly 1 property.
   *
   * @example
   *  import type { has } from "any-ts"
   * 
   *  declare function exactlyOne<const T extends has.oneProperty<T>>(singleton: T): T
   *  declare function exactlyOne<const T extends has.oneProperty<T, unknown, "debug">>(one: T, _?: any): T
   *
   *  const ex_01 = exactlyOne({ a: 1 })
   *  //    ^? const ex_01: { readonly a: 1 }
   *
   *  const ex_02 = exactlyOne({}) // 🚫 TypeError: '{} is not assignable to parameter of type 'never'
   *  //    ^? const ex_02: never
   * 
   *  const ex_03 = exactlyOne({ a: 1, b: 2 }) // 🚫 TypeError: '{ a: 1, b: 2 } is not assignable to parameter of type 'never'
   *  //    ^? const ex_02: never
   *
   *  const ex_04 = exactlyOne({ a: 1 }, "debug")
   *  //    ^? const ex_03: { readonly a: 1 }
   *
   *  const ex_05 = exactlyOne({}, "debug")
   *  //                        ^? 
   *  // 🚫 Argument of type '{}' is not assignable to parameter of type 
   *  // 'TypeError_<[msg: "Expected an object containing exactly one property", got: {}]>'
   *
   *  /// Demonstrates using `has.oneProperty` to apply an arbitrary constraint to the property:
   *  declare function exactlyOneString<const T extends has.oneProperty<T, string>>(one: T): T
   *
   *  const ex_06 = exactlyOneString({ a: 1 })
   *  //                               ^? 🚫 Type 'number' is not assignable to type 'string'
   */
  export type oneProperty<type, invariant = _, debug = never>
    = [any.unit] extends [test$$.hasExactlyOneProp<type>] ? any.dict<invariant>
    : [debug] extends [never] ? never
    : TypeError.new<"Expected an object with exactly one property", type>
    ;

  export function oneProperty<Invariant = never>(): <const T extends has.oneProperty<T, Invariant>>(oneProperty: T) => T
  export function oneProperty<const T extends has.oneProperty<T>>(oneProperty: T): T
  export namespace oneProperty {
    type debug<type extends has.oneProperty<type, _, "debug">, invariant = _> = has.oneProperty<type, invariant, "debug">

    function debug<Invariant = never>(): <const T extends has.oneProperty<T, Invariant, "debug">>(oneProperty: T) => T
    function debug<const T extends has.oneProperty<T, _, "debug">>(oneProperty: T): T
  }

  /** 
   * ### [`has.oneElement`](has.oneElement) 
   * 
   * [`has.oneElement`](has.oneElement) allows users to constrain a type parameter 
   * such that it only accepts tuples that contain exactly 1 element.
   *
   * @example
   *  import type { has } from "any-ts"
   * 
   *  declare function exactlyOne<const T extends has.oneElement<T>>(singleton: T): T
   *  declare function exactlyOne<const T extends has.oneElement<T, unknown, "debug">>(one: T, _?: any): T
   *
   *  const ex_01 = exactlyOne([1])
   *  //    ^? const ex_01: readonly [1]
   *
   *  const ex_02 = exactlyOne([1, 2]) // 🚫 TypeError: 'number[]' is not assignable to parameter of type 'never'
   *  //    ^? const ex_02: never
   *
   *  const ex_03 = exactlyOne([1], "debug")
   *  //    ^? const ex_03: readonly [1]
   *
   *  const ex_04 = exactlyOne([1, 2], "debug")
   *  //                        ^? 
   *  // 🚫 Argument of type 'number[]' is not assignable to parameter of type 
   *  // 'TypeError_<[msg: "Expected a tuple containing exactly one element", got: readonly [1, 2]]>'
   *
   *  /// Demonstrates using `has.oneElement` to apply an arbitrary constraint to the element:
   *  declare function exactlyOneString<const T extends has.oneElement<T, string>>(one: T): T
   *
   *  const ex_05 = exactlyOneString([1])
   *  //                              ^? 🚫 Type 'number' is not assignable to type 'string'
   */
  export type oneElement<type, invariant = _, debug = never>
    = [any.unit] extends [test$$.hasExactlyOneElement<type>] ? any.array<invariant>
    : [debug] extends [never] ? never
    : TypeError.new<"Expected a tuple containing exactly one element", type>
    ;
  export function oneElement<Invariant = never>(): <const T extends has.oneElement<T, Invariant>>(singleton: T) => T
  export function oneElement<const T extends has.oneElement<T>>(singleton: T): T
  export namespace oneElement {
    type debug<type extends has.oneElement<type, _, "debug">, invariant = _> = has.oneElement<type, invariant, "debug">

    function debug<Invariant = never>(): <const T extends has.oneElement<T, Invariant, "debug">>(oneElement: T) => T
    function debug<const T extends has.oneElement<T, _, "debug">>(oneElement: T): T
  }

  /**
   * ### [`has.oneMember`](has.oneMember) 
   * 
   * [`has.oneMember`](has.oneMember) allows users to constrain a type parameter 
   * such that it only accepts types that are singletons.
   * 
   * That is, in order for `has.oneMember` to return its constraint (`invariant`),
   * `type` cannot be `never`, and it cannot be a union containing more than one type.
   */
  export type oneMember<type, invariant = _, debug = never>
    = [any.unit] extends [test$$.hasExactlyOneMember<type>]
    ? invariant
    : [debug] extends [never] ? never
    : TypeError.new<"Expected type to have exactly one member", type>
    ;
  export function oneMember<Invariant = never>(): <const T extends has.oneMember<T, Invariant>>(singleton: T) => T
  export function oneMember<const T extends has.oneMember<T>>(singleton: T): T
  export namespace oneMember {
    type debug<type extends has.oneMember<type, _, "debug">, invariant = _> = has.oneMember<type, invariant, "debug">
    function debug<Invariant = never>(): <const T extends has.oneMember<T, Invariant, "debug">>(oneMember: T) => T
    function debug<const T extends has.oneMember<T, _, "debug">>(oneMember: T): T
  }
}

export declare namespace has {
  namespace test$$ {
    type isUnion<t, u = t> = u extends u ? [t, u] extends [u, t] ? never : any.unit : never
    type hasExactlyOneMember<t>
      = [any.unit] extends [isUnion<t>] ? never
      : [t] extends [never] ? never
      : any.unit
      ;
    type hasExactlyOneProp<t>
      = [keyof t] extends [infer key]
      ? [key] extends [never] ? never
      : [any.unit] extends [isUnion<key>] ? never
      : any.unit
      : never
      ;

    type hasExactlyOneElement<t> = [1] extends [t[Extract<"length", keyof t>]] ? any.unit : never
  }
}
