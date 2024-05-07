export type {
  number,
}

import type { bigint } from "./bigint.js"
import type { int } from "./integer.js"
import type { nat } from "./natural.js"
import type { real as real_ } from "./real.js"
import type { boolean } from "../boolean/exports.js"
import type {
  isNegative,
  isOne,
  isPositive,
  isZero,
} from "./shared.js"

declare namespace number {
  type is<x> = [x] extends [number] ? true : false
  namespace is {
    type big<x> = bigint.is<x>
    type integer<x> = int.is<x>
    type natural<x> = nat.is<x>
    type negative<x> = isNegative<x>
    type one<x> = isOne<x>
    type positive<x> = isPositive<x>
    type real<x> = real_.is<x>
    type zero<x> = isZero<x>
    type universal<x> = [number] extends [x] ? true : false
    type literal<x> = boolean.all<[number.is<x>, boolean.not<number.is.universal<x>>]>
  }
}
