export {
  $$,
}
export type {
  isNegative,
  isNumber,
  isOne,
  isPositive,
  isZero,
  newtype,
  Whitespace,
}

import type { any } from "../any/exports.js"

type isNumber<x> = [x] extends [number] ? true : false
type isNegative<x> = [x] extends [any.showable] ? [`${x}`] extends [`-${number}`] ? true : false : false
type isPositive<x> = [x] extends [any.showable] ? [`${x}`] extends [`-${number}`] ? false : true : false
type isZero<x> = [0, x] extends [x, 0] ? true : false
type isOne<x> = [1, x] extends [x, 1] ? true : false

type Whitespace = typeof Whitespace[keyof typeof Whitespace]
const Whitespace = {
  space: " ",
  newline: "\n",
  tab: "\t",
} as const

namespace newtype { export const never: never = void 0 as never }
declare namespace newtype {
  type free<uri extends symbol, type> = never | (newtype<uri, type>)
  type forget<nt extends newtype<any, any>> = nt[0]
  interface newtype<uri extends symbol, type> {
    [0]: type
    [$$.newtype]: uri
  }
}

namespace $$ {
  export const newtype: unique symbol = Symbol.for("any-ts/newtype")
  export const int: unique symbol = Symbol.for("any-ts/number::Integer")
  export const nat: unique symbol = Symbol.for("any-ts/number::Natural")
  export const big: unique symbol = Symbol.for("any-ts/number::Big")
  export const real: unique symbol = Symbol.for("any-ts/number::Real")
}
declare namespace $$ {
  type newtype = typeof newtype
  type int = typeof $$.int
  type nat = typeof $$.nat
  type big = typeof $$.big
  type real = typeof $$.real
}