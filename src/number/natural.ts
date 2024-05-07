export type { nat }

import type { boolean } from "../boolean/exports.js"
import type { int } from "./integer.js"
import type { isPositive } from "./shared.js"
import type { never } from "../never/exports.js"

/**
 * ℕ: the set of positive integers, zero-inclusive.
 */
declare namespace nat {
  type is<x> = boolean.all<[int.is<x>, isPositive<x>]>
}
