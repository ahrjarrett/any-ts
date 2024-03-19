export {
  type Any
}

import type { intrinsic } from "./_intrinsic"

/** @internal */
declare namespace Any {
  export type array<type = unknown> = readonly type[]
  export type index = keyof never
  interface class_<
    args extends
    | array<any>
    = array<any>
  > { new(...arg: args): unknown }
  export { class_ as class }

  export { any_object as object }
  export type any_object<type extends intrinsic.object = intrinsic.object> = intrinsic.object<type>

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
    | scalar
    | readonly json[]
    | dictionary<json>
    ;

  export type struct<type = any> = { [ix: string]: type }
  export interface enumerable<type = unknown> { [ix: number]: type }
  export interface arraylike<type = unknown> extends enumerable<type> { length: number }
  export interface invertible { [ix: key]: key }
  export type path<type extends readonly index[] = readonly index[]> = type
  export type keys<type extends readonly key[] = readonly key[]> = type
  export type showables<type extends readonly showable[] = readonly showable[]> = type
  export type field<k extends index = index, v = unknown> = readonly [key: k, value: v]
  export type entry<type extends readonly [index, unknown] = readonly [index, unknown]> = type
}
