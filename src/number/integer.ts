export {
  Int as int,
}

import type { any } from "../any"
import type { Fn } from "../function/exports";
import { Err } from "../exports"
import { $$, newtype } from "./shared"


type enforce<x>
  = number extends x ? Fn.return<typeof Err.Literal<x>>
  /** bigints are integers */
  : bigint extends x ? unknown
  : [x] extends [any.showable]
  ? [typecheck<x>] extends [true] ? (number | bigint)
  : Fn.return<typeof Err.Integer<x>>
  : Fn.return<typeof Err.Numeric<x>>
  ;

type typecheck<type>
  = [type] extends [string] ? false
  : [type] extends [never] ? false
  : [`${type & any.showable}`] extends [`${bigint}` | `${bigint}e+${bigint}`]
  ? true
  : false
  ;

type narrow<x extends number> = [x] extends [enforce<x>] ? x : number extends x ? number & int<number> : never

type is<type> = [typecheck<type>] extends [true] ? true : false
declare function is<x extends number>(u: int<x>): u is int<x>
declare function is<x extends number>(x: x): x is narrow<x>
declare function is(x: number): x is number & int<number>
declare function is(u: unknown): u is int<number>

/** @internal */
interface int<x extends number> extends newtype.newtype<$$.int, x> { }

type Int<x extends enforce<x>> = never | (x extends number ? int<x> : x)
function Int<const x extends enforce<x>>(x: x): Int<x> {
  return globalThis.Number.isInteger(x) as never
}

namespace Int {
  Int.new = Int
  Int.is = is
}

/**
 * ℤ: the set of positive and negative numbers + zero
 */
declare namespace Int {
  export {
    Int as new,
    is,
    enforce,
    typecheck,
  }
}
