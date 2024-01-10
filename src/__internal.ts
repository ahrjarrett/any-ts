/* eslint-disable
 import/first,
 @typescript-eslint/ban-types,
 @typescript-eslint/no-explicit-any,
 */
export {
  type Any as any,
}

declare namespace native {
  export {
    NonNullable as nonnullable,
    Object as object,
  }
  type Object = object
  type NonNullable = {}
}


/**
 * Note: the types in this namespace (local {@link any}) are **not** exported.
 * The {@link Any} namespace is exported as {@link Any any},
 * and is probably what you're after.
 */
declare namespace any {
  export type {
    Function as function,
    object_ as object,
  }
  export const object_: any.object
  export interface object_ extends native.object { }
  export const Function: { (...args: any): any }
  export type Function = typeof Function

  export type nullable = typeof nullable
  export const nullable: null | undefined
  export const nonnullable: nonnullable
  export interface nonnullable extends native.nonnullable { }

  export const key: string | number
  export type key = typeof key
  export const index: keyof any
  export type index = typeof index
  export const literal: string | number | boolean
  export type literal = typeof literal
  export const showable: string | number | boolean | bigint | null | undefined
  export type showable = typeof showable
  export const primitive: string | number | boolean | bigint | null | undefined | symbol
  export type primitive = typeof primitive

  export type array<type = unknown> = globalThis.ReadonlyArray<type>
  export interface dictionary<type = unknown> { [ix: any.index]: type }
  export interface struct { [ix: any.index]: any }

  export type type =
    | any.nullable
    | any.nonnullable
    ;
}

/**
 * 
 * Glossary
 * 
 * -----------
 * _type-constructor_
 * ---
 *   A {@link https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases type alias} 
 *   that accepts an argument. 
 * 
 *   Note that in the TypeScript ecosystem this is sometimes 
 *   called a "generic". The problem with "generic" is that 
 *   the ecosystem _also_ often calls the type parameter itself 
 *   a "generic", and _also_ calls a function that returns a 
 *   type-constructor a "generic".
 * 
 *   The lack of precision introduces the opportunity for 
 *   miscommunication, which wastes time and energy.
 * 
 *   See also:
 *   - {@link https://en.wikipedia.org/wiki/Type_constructor type-constructor}
 * 
 * 
 * -----------
 * _invariant_
 * ---
 *   A _type-constructor_ that sets an additional constraint 
 *   on the type being constructed. Usually this constraint
 *   comes in the form of an additional type parameter.
 *  
 *   Example: 
 *   - {@link Any.arrayof any.arrayof}
 * 
 * 
 * -----------
 * _nullary_
 * ---
 *   A _type-constructor_ that accepts zero arguments.
 * 
 *   Note that a type-constructor that accepts an optional
 *   argument can be called _nullary_ **or** _unary_,
 *   although conventionally you would use "nullary" in
 *   that context to indicate which variant you're referring 
 *   to.
 * 
 *   Example:
 *   - {@link Any.primitive any.primitive}
 *
 * 
 * -----------
 * _unary_
 * ---
 *   A _type-constructor_ that accepts (at least one) argument.
 * 
 *   Example:
 *   - {@link Any.primitive any.primitive}
 *   - {@link Any.arrayof any.arrayof}
 *
 *
 * -----------
 * _binary_
 * ---
 * 
 *   A _type-constructor_ that accepts (at least two) arguments.
 *   
 *   Example:
 *   - {@link Any.arrayof any.arrayof}
 */

declare namespace Any {
  /** 
   * Re-exports that assign simple aliases
   */
  export {
    dictionary as dict,
  }

  /** 
   * Re-exports that give their constructor its "canonical" name 
   * (as an ambient binding on the {@link Any any} namespace)
   */
  export {
    Boolean as boolean,
    Function as function,
    Number as number,
    Object as object,
    String as string,
  }

  /** 
   * Available by its fully-qualified name, {@link String any.string} 
   * 
   * @category 
   * - _nullary_
   * - _unary_ as a matcher
   */
  export type String<type extends string = string> = type
  /** 
   * Available by its fully-qualified name, {@link Number any.number} 
   * 
   * @category 
   * - _nullary_
   * - _unary_ as a matcher
   */
  export type Number<type extends number = number> = type
  /** 
   * Available by its fully-qualified name, {@link Boolean any.boolean} 
   * 
   * @category 
   * - _nullary_
   * - _unary_ as a matcher
   */
  export type Boolean<type extends boolean = boolean> = type
  /** 
   * Available by its fully-qualified name, {@link Object any.object} 
   * 
   * @category 
   * - _nullary_
   * - _unary_ as a matcher
   */
  export type Object<type extends any.object = any.object> = type
  /** 
   * Available by its fully-qualified name, {@link Function any.function} 
   * 
   * @category 
   * - _nullary_
   * - _unary_ as a matcher
   */
  export type Function<type extends any.function = any.function> = type

  /** @category _nullary_, _unary_ as a matcher */
  export type nullable<type extends any.nullable = any.nullable> = type
  /** @category _nullary_, _unary_ as a matcher */
  export type key<type extends any.key = any.key> = type
  /** @category _nullary_, _unary_ as a matcher */
  export type index<type extends any.index = any.index> = type
  /** @category _nullary_, _unary_ as a matcher */
  export type literal<type extends any.literal = any.literal> = type
  /** @category _nullary_, _unary_ as a matcher */
  export type showable<type extends any.showable = any.showable> = type
  /** @category _nullary_, _unary_ as a matcher */
  export type primitive<type extends any.primitive = any.primitive> = type

  /** @category _nullary_, _unary_ as a matcher */
  export type nonnullable<type extends any.nonnullable = any.nonnullable> = type
  /** @category _nullary_, _unary_ as a matcher */
  export type struct<type extends any.struct = any.struct> = type
  /** @category _nullary_, _unary_ as a matcher */
  export type list<type extends any.array = any.array> = type
  /** @category _nullary_, _unary_ as a matcher */
  export type array<type = unknown> = any.array<type>
  /** @category _nullary_, _unary_ as a matcher */
  export type dictionary<type = unknown> = any.dictionary<type>
  /** @category _nullary_, _unary_ as a matcher */
  export type enumerable<type extends { [ix: number]: unknown } = { [ix: number]: unknown }> = type
  /** @category _nullary_, _unary_ as a matcher */
  export type invertible<type extends { [ix: symbol]: any.key } = { [ix: any.key]: any.key }> = type
  /** @category _nullary_, _unary_ as a matcher */
  export type invertibleList<type extends any.array<any.key> = any.array<any.key>> = type

  /** @category _nullary_, _unary_ as a matcher */
  export type type<type extends any.type = any.type> = type

  /** @catergory _nullary_, _unary_ as a matcher, _binary_ as a matcher */
  export type record<key extends any.index = any.key, value = unknown> = globalThis.Record<key, value>

  /** @category _unary_ as matcher, _binary_ as an invariant */
  export type arrayof<invariant, type extends any.array<invariant> = any.array<invariant>> = type

  /** @category _unary_ as matcher, _binary_ as an invariant */
  export type keyof<invariant, type extends any.key & keyof invariant = any.key & keyof invariant> = type

  /** @category _unary_ as matcher, _binary_ as an invariant */
  export type indexof<invariant, type extends keyof invariant = keyof invariant> = type

  /** @category _unary_ as matcher, _binary_ as an invariant */
  export type indexedBy<
    invariant extends any.index,
    type extends
    | { [ix in invariant]: unknown }
    = { [ix in invariant]: unknown }> = type

  /** @category _unary_ as matcher, _binary_ as an invariant */
  export type subtypeOf<
    invariant,
    subtype extends
    | invariant extends invariant ? invariant : never
    = invariant extends invariant ? invariant : never
  > = subtype
}

