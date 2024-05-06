import type { any } from "../any/exports"
import type { check } from "../check/exports"
import type { nonempty } from "../empty"
import type { queue } from "./queue"
import type { tuple, tupleN } from "./tuple"

export {
  queue,
  nonemptyArray as nonempty,
  tuple,
}

export declare namespace array {
  // namespace exports
  export {
    queue,
    nonemptyArray as nonempty,
    tuple,
  }

  // main api 
  export {
    finite,
    finiteOf,
    head,
    heads,
    last,
    lead,
    nonfinite,
    nonfiniteOf,
    snd,
    snds,
    tail,
    tails,
  }

  // auxillary exports
  export {
    // aliases
    fst,
    // types containing types
    tupleN,
  }

  type finite<xs> = check.is.tuple<xs, any.array, "hush">
  type finiteOf<xs, invariant extends any.array> = check.is.tuple<xs, invariant, "hush">
  type nonfinite<xs>
    = never | ([xs] extends [any.array] ? [number] extends [xs["length"]] ? any.array : never : never)
  type nonfiniteOf<xs, invariant extends any.array>
    = never | ([xs] extends [any.array] ? [number] extends [xs["length"]] ? invariant : never : never)
  /** {@link fst `array.fst`} is an alias for {@link head `array.head`} */

  type fst<xs extends any.array> = never | head<xs>
  /** {@link head `array.head`} returns just the _first_ element of an array */
  type head<xs extends any.array>
    = [xs] extends [nonempty.array<infer head, any>] ? head : (undefined | xs[number])
  /** {@link heads `array.heads`} returns just the _first_ item of _every_ element of a matrix (an array of arrays) */
  type heads<xss extends any.array<any.array>> = never | { [ix in keyof xss]: xss[ix][0] }
  /** {@link snd `array.snd`} returns just the _second_ element of an array */
  type snd<xs extends any.array> = never | head<tail<xs>>
  /** {@link snds `array.snds`} returns just the _second_ item of _every_ element of a matrix (an array of arrays) */
  type snds<xss extends any.array<any.array>> = never | { [ix in keyof xss]: xss[ix][1] }
  /** {@link tail `array.tail`} returns every element _but_ the _first_ element of an array */
  type tail<xs extends any.array> = xs extends [any, ...infer tail] ? tail : never
  /** {@link tail `array.tail`} returns every element _but_ the _first_ element of _every_ element of a matrix (an array of arrays) */
  type tails<xss extends any.array<any.array>> = never | { [ix in keyof xss]: tail<xss[ix]> }

  /** {@link last `array.last`} returns _just_ every element _but_ the _last_ element of an array */
  type last<xs extends any.array> = xs extends [infer last, any] ? last : never
  /** {@link lead `array.lead`} returns every element _but_ the _last_ element of an array */
  type lead<xs extends any.array> = xs extends [...infer lead, any] ? lead : never
}

export declare namespace nonemptyArray {
  type finite<xs> = never | (
    | [xs] extends [nonempty.array<any, infer tail>]
    ? [number] extends [tail["length"]] ? never
    : nonempty.array
    : never
  )
  type finiteOf<xs, invariant extends nonempty.array> = never | (
    | [xs] extends [nonempty.array<any, infer tail>]
    ? [number] extends [tail["length"]] ? never
    : invariant
    : never
  )
  type nonfinite<xs>
    = [xs] extends [nonempty.array<any, infer tail>]
    ? [number] extends [tail["length"]] ? any.array
    : never
    : never
  type nonfiniteOf<xs, invariant extends nonempty.array>
    = [xs] extends [nonempty.array<any, infer tail>]
    ? [number] extends [tail["length"]] ? invariant
    : never
    : never
}
