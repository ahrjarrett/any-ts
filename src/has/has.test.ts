import { has } from "./has.js"

namespace happy_path {
  export type ex_01 = has.oneProperty<{ a: 1 }>
  //           ^?

  export type ex_02 = has.oneProperty<{ a: 1 }, number>
  //           ^?

  export type ex_03 = has.oneProperty.debug<{ a: 1 }>
  //           ^?

  export type ex_04 = has.oneProperty.debug<{ a: 1 }, number>
  //           ^?

  export const ex_05 = has.oneProperty({ a: 1 })
  //           ^?

  export const ex_06 = has.oneProperty<number>()({ a: 1 })
  //           ^?

  export const ex_07 = has.oneProperty.debug({ a: 1 })
  //           ^?

  export const ex_08 = has.oneProperty.debug({ a: 1 })
  //           ^?
}

namespace unhappy_path {
  export type ex_01 = has.oneProperty<[1]>
  //           ^?

  export type ex_02 = has.oneProperty<{}>
  //           ^?

  export type ex_03 = has.oneProperty<{}, number>
  //           ^?

  export type ex_04 = has.oneProperty<{ a: 1, b: 2 }>
  //           ^?

  export type ex_05 = has.oneProperty<{ a: 1, b: 2 }, number>
  //           ^?

  //////////////
  /// DEBUG
  /** @ts-expect-error: TypeError<[msg: "Expected an object with exactly one property", got: [1]]> */
  export type ex_06 = has.oneProperty.debug<[1]>
  //           ^?

  /** @ts-expect-error: TypeError<[msg: "Expected an object with exactly one property", got: {}]> */
  export type ex_07 = has.oneProperty.debug<{}>
  //           ^?

  /** @ts-expect-error: TypeError<[msg: "Expected an object with exactly one property", got: {}]> */
  export type ex_08 = has.oneProperty.debug<{}, number>
  //           ^?

  /** @ts-expect-error: TypeError<[msg: "Expected an object with exactly one property", got: { a: 1, b: 2 }]> */
  export type ex_09 = has.oneProperty.debug<{ a: 1, b: 2 }>
  //           ^?

  /** @ts-expect-error: TypeError<[msg: "Expected an object with exactly one property", got: { a: 1, b: 2 }]> */
  export type ex_10 = has.oneProperty.debug<{ a: 1, b: 2 }, number>
  //           ^?

  /** @ts-expect-error: never */
  export const ex_11 = has.oneProperty({})
  //           ^?

  /** @ts-expect-error: never */
  export const ex_12 = has.oneProperty<number>()({})
  //           ^?

  /** @ts-expect-error: never */
  export const ex_13 = has.oneProperty({ a: 1, b: 2 })
  //           ^?

  /** @ts-expect-error: never */
  export const ex_14 = has.oneProperty<number>()({ a: 1, b: 2 })
  //           ^?

  /** @ts-expect-error: Type 'number' is not assignable to type 'boolean' */
  export const ex_15 = has.oneProperty<boolean>()({ a: 1 })
  //           ^?

  /** @ts-expect-error: Argument of type '{ a: number; b: number; }' is not assignable to parameter of type 'never' */
  export const ex_16 = has.oneProperty<boolean>()({ a: 1, b: 2 })
  //           ^?

  /** @ts-expect-error: TypeError<[msg: "Expected an object with exactly one property", got: {}]> */
  export const ex_17 = has.oneProperty.debug({})
  //           ^?

  /** @ts-expect-error: Argument of type '{}' is not assignable to parameter of type 'TypeError_<[msg: "Expected an object with exactly one property", got: {}]>' */
  export const ex_18 = has.oneProperty.debug<number>()({})
  //           ^?

  /** @ts-expect-error: Object literal may only specify known properties, and 'a' does not exist in type 'TypeError_<[msg: "Expected an object with exactly one property", got: { readonly a: 1; readonly b: 2; }]>' */
  export const ex_19 = has.oneProperty.debug({ a: 1, b: 2 })
  //           ^?

  /** @ts-expect-error: Object literal may only specify known properties, and 'a' does not exist in type 'TypeError_<[msg: "Expected an object with exactly one property", got: { readonly a: 1; readonly b: 2; }]>' */
  export const ex_20 = has.oneProperty.debug<number>()({ a: 1, b: 2 })
  //           ^?

  /** @ts-expect-error: Object literal may only specify known properties, and 'a' does not exist in type 'TypeError_<[msg: "Expected an object with exactly one property", got: { readonly a: 1; readonly b: 2; }]>' */
  export const ex_21 = has.oneProperty.debug<boolean>()({ a: 1, b: 2 })
  //           ^?
}