import type { any } from "../any/exports"
import type { check } from "../check/exports"
import type { nonempty } from "../empty"
import type { queue } from "./queue"

export declare namespace array {
  // namespace exports
  export {
    queue,
    nonemptyArray as nonempty,
  }

  // main api 
  export {
    finite,
    finiteOf,
    nonfinite,
    nonfiniteOf,
    fst,
    snd,
    snds,
    head,
    heads,
    tail,
    tails,
  }

  // auxillary exports
  export {
  }
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

type finite<xs> = check.is.tuple<xs, any.array, "hush">
type finiteOf<xs, invariant extends any.array> = check.is.tuple<xs, invariant, "hush">
type nonfinite<xs>
  = never | ([xs] extends [any.array] ? [number] extends [xs["length"]] ? any.array : never : never)
type nonfiniteOf<xs, invariant extends any.array>
  = never | ([xs] extends [any.array] ? [number] extends [xs["length"]] ? invariant : never : never)

/** 
 * {@link fst `array.fst`} is an alias for {@link head `array.head`} 
 */
type fst<xs extends any.array> = never | head<xs>

type head<xs extends any.array>
  = [xs] extends [nonempty.array<infer head, any>] ? head : (undefined | xs[number])

type heads<xss extends any.array<any.array>> = never | { [ix in keyof xss]: xss[ix][0] }

type snd<xs extends any.array> = never | head<tail<xs>>
type snds<xss extends any.array<any.array>> = never | { [ix in keyof xss]: xss[ix][1] }

type tail<xs extends any.array> = xs extends [any, ...infer tail] ? tail : never
type tails<xss extends any.array<any.array>> = never | { [ix in keyof xss]: tail<xss[ix]> }
