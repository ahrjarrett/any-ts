import type { any } from "../any/exports.js"
import { _ } from "../util.js";
import type { TypeError } from "../type-error/exports.js"

export declare namespace has {
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
}

export declare namespace has {
  namespace test$$ {
    type isUnion<t, u = t> = u extends u ? [t, u] extends [u, t] ? never : any.unit : never
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
