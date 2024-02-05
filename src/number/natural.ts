export { nat }

import { boolean } from "../boolean/exports"
import { int } from "./integer"
import { isPositive } from "./shared"
import type { never } from "../semantic-never/exports"

namespace nat { export const never: never.not_meant_for_use = void 0 as never }

/**
 * ℕ: the set of positive integers, zero-inclusive.
 */
declare namespace nat {
  type is<x> = boolean.all<[int.is<x>, isPositive<x>]>
}
