export {
  type Any
}

import type { intrinsic } from "./_intrinsic"

/** @internal */
declare namespace Any {
  export type AnyArray<type = unknown> = readonly type[]
  export type AnyObject<type extends intrinsic.object = intrinsic.object> = intrinsic.object<type>

  export type Index = keyof never
  export interface Class<
    args extends
    | AnyArray<any>
    = AnyArray<any>
  > { new(...arg: args): unknown }


  export type NonNullable = {}
  export type Nullable = null | undefined
  export type Type<type extends Any.Nullable | Any.NonNullable = Any.Nullable | Any.NonNullable> = type
  export type Key<type extends string | number = string | number> = type
  export type Literal<type extends string | number | boolean = string | number | boolean> = type
  export type Showable = string | number | boolean | bigint | null | undefined
  export type Primitive = string | number | boolean | bigint | null | undefined | symbol
  export type Numeric = number | `${number}`
  export type Scalar = string | number | boolean | null
  export interface Dict<type = unknown> { [ix: keyof any]: type }
  export type Json =
    | Any.Scalar
    | readonly Any.Json[]
    | Dict<Any.Json>
    ;

  export type Struct<type = any> = { [ix: string]: type }
  export interface Enumerable<type = unknown> { [ix: number]: type }
  export interface ArrayLike<type = unknown> extends Any.Enumerable<type> { length: number }
  export interface Invertible { [ix: Any.Key]: Any.Key }
  export type Path<type extends readonly Any.Index[] = readonly Any.Index[]> = type
  export type Keys<type extends readonly Any.Key[] = readonly Any.Key[]> = type
  export type Showables<type extends readonly Any.Showable[] = readonly Any.Showable[]> = type
  export type Field<k extends Any.Index = Any.Index, v = unknown> = readonly [key: k, value: v]
  export type Entry<type extends readonly [Any.Index, unknown] = readonly [Any.Index, unknown]> = type
}
