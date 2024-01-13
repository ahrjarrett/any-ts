/* eslint-disable
 prettier/prettier,
 */
export type PKG_VERSION = typeof PKG_VERSION
export const PKG_VERSION = "0.2.0"
export {
  any_ as any
}

import * as any from './__internal';

declare namespace any_ {
  /**
   * `unknown` : wizard ∷  {@link type `any.type`} : muggle
   * ---
   * 
   * {@link type `any.type`} is a type-constructor that can construct 
   * any abitrary type. 
   * 
   * Alternatively:
   * 
   * {@link type `any.type`} is a type-constructor that applies
   * zero constraints to its argument.
   */
  export type type<type extends nullable | nonnullable = nullable | nonnullable> = type

  /** @external */
  export type nullable<type extends any.nullable = any.nullable> = type

  /** @external */
  export type nonnullable<type extends any.nonnullable = any.nonnullable> = type

  /** @external */
  export type array<type = unknown> = globalThis.ReadonlyArray<type>;

  /** @external */
  export type key<type extends any.key = any.key> = type;

  /** @external */
  export type index<type extends any.index = any.index> = type;

  /** @external */
  export type string_<type extends string = string> = type;

  /** @external */
  export type object_<type extends any.object = any.object> = type;
  export { object_ as object, string_ as string }
}

// declare namespace Any {
//   /** 
//    * Re-exports that assign simple aliases
//    */
//   export {
//     dictionary as dict,
//   }

//   /** 
//    * Re-exports that give their constructor its "canonical" name 
//    * (as an ambient binding on the {@link Any any} namespace)
//    */
//   export {
//     Boolean as boolean,
//     Function as function,
//     Number as number,
//     Object as object,
//     String as string,
//   }

//   /** 
//    * Available by its fully-qualified name, {@link String any.string} 
//    * 
//    * @category 
//    * - _nullary_
//    * - _unary_ as a matcher
//    */
//   export type String<type extends string = string> = type
//   /** 
//    * Available by its fully-qualified name, {@link Number any.number} 
//    * 
//    * @category 
//    * - _nullary_
//    * - _unary_ as a matcher
//    */
//   export type Number<type extends number = number> = type
//   /** 
//    * Available by its fully-qualified name, {@link Boolean any.boolean} 
//    * 
//    * @category 
//    * - _nullary_
//    * - _unary_ as a matcher
//    */
//   export type Boolean<type extends boolean = boolean> = type
//   /** 
//    * Available by its fully-qualified name, {@link Object any.object} 
//    * 
//    * @category 
//    * - _nullary_
//    * - _unary_ as a matcher
//    */
//   export type Object<type extends any.object = any.object> = type
//   /** 
//    * Available by its fully-qualified name, {@link Function any.function} 
//    * 
//    * @category 
//    * - _nullary_
//    * - _unary_ as a matcher
//    */
//   export type Function<type extends any.function = any.function> = type

//   /** @category _nullary_, _unary_ as a matcher */
//   export type nullable<type extends any.nullable = any.nullable> = type
//   /** @category _nullary_, _unary_ as a matcher */
//   export type key<type extends any.key = any.key> = type
//   /** @category _nullary_, _unary_ as a matcher */
//   export type index<type extends any.index = any.index> = type
//   /** @category _nullary_, _unary_ as a matcher */
//   export type literal<type extends any.literal = any.literal> = type
//   /** @category _nullary_, _unary_ as a matcher */
//   export type showable<type extends any.showable = any.showable> = type
//   /** @category _nullary_, _unary_ as a matcher */
//   export type primitive<type extends any.primitive = any.primitive> = type

//   /** @category _nullary_, _unary_ as a matcher */
//   export type nonnullable<type extends any.nonnullable = any.nonnullable> = type
//   /** @category _nullary_, _unary_ as a matcher */
//   export type struct<type extends any.struct = any.struct> = type
//   /** @category _nullary_, _unary_ as a matcher */
//   export type list<type extends any.array = any.array> = type
//   /** @category _nullary_, _unary_ as a matcher */
//   export type array<type = unknown> = any.array<type>
//   /** @category _nullary_, _unary_ as a matcher */
//   export type dictionary<type = unknown> = any.dictionary<type>
//   /** @category _nullary_, _unary_ as a matcher */
//   export type enumerable<type extends { [ix: number]: unknown } = { [ix: number]: unknown }> = type
//   /** @category _nullary_, _unary_ as a matcher */
//   export type invertible<type extends { [ix: symbol]: any.key } = { [ix: any.key]: any.key }> = type
//   /** @category _nullary_, _unary_ as a matcher */
//   export type invertibleList<type extends any.array<any.key> = any.array<any.key>> = type

//   /** @category _nullary_, _unary_ as a matcher */
//   export type type<type extends any.type = any.type> = type

//   /** @catergory _nullary_, _unary_ as a matcher, _binary_ as a matcher */
//   export type record<key extends any.index = any.key, value = unknown> = globalThis.Record<key, value>

//   /** @category _unary_ as matcher, _binary_ as an invariant */
//   export type arrayof<invariant, type extends any.array<invariant> = any.array<invariant>> = type

//   /** @category _unary_ as matcher, _binary_ as an invariant */
//   export type keyof<invariant, type extends any.key & keyof invariant = any.key & keyof invariant> = type

//   /** @category _unary_ as matcher, _binary_ as an invariant */
//   export type indexof<invariant, type extends keyof invariant = keyof invariant> = type

//   /** @category _unary_ as matcher, _binary_ as an invariant */
//   export type indexedBy<
//     invariant extends any.index,
//     type extends
//     | { [ix in invariant]: unknown }
//     = { [ix in invariant]: unknown }> = type

//   /** @category _unary_ as matcher, _binary_ as an invariant */
//   export type subtypeOf<
//     invariant,
//     subtype extends
//     | invariant extends invariant ? invariant : never
//     = invariant extends invariant ? invariant : never
//   > = subtype
// }

