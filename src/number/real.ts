export { Real as real }

import { boolean } from "../boolean/exports"
import { int } from "./integer"
import { $$, isNumber } from "./shared"


/**
 * ℝ: the set of all rational and irrational (but not imaginary) numbers.
 */
declare namespace Real {
  export type is<x> = boolean.all<[isNumber<x>, boolean.not<int.is<x>>]>
  /** 
   * _INTENTIONALLY NOT EXPORTED_
   * 
   * TODO: switch over to `newtype` encoding 
   */
  type __new<x extends number> = x & { __phantom__: $$.real }
  type __new$<x> = x & number & { __phantom__: $$.real }
}

namespace Real {
  export const is
    : <x extends number>(x: x) => x is x & { __phantom__: $$.real }
    = (x): x is never => globalThis.Number.isFinite(x)

  export const is$
    : <x>(x: x) => x is x & number & { __phantom__: $$.real }
    = (x): x is never => typeof x === "number" && globalThis.Number.isFinite(x)
}
