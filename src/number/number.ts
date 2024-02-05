export {
  number,
}

import { bigint } from "./bigint"
import { int } from "./integer"
import { nat } from "./natural"
import { real } from "./real"
import { boolean } from "../boolean/exports"
import {
  isNegative,
  isOne,
  isPositive,
  isZero,
} from "./shared"

declare namespace number {
  type is<x> = [x] extends [number] ? true : false
  namespace is {
    type big<x> = bigint.is<x>
    type integer<x> = int.is<x>
    type natural<x> = nat.is<x>
    type negative<x> = isNegative<x>
    type one<x> = isOne<x>
    type positive<x> = isPositive<x>
    type real<x> = real.is<x>
    type zero<x> = isZero<x>
    type universal<x> = [number] extends [x] ? true : false
    type literal<x> = boolean.all<[number.is<x>, boolean.not<number.is.universal<x>>]>
  }
}
