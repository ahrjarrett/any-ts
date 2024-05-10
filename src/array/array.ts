import type { any } from "../any/exports.js"
import type { check } from "../check/exports.js"
import type { TypeError } from "../exports.js"
import type { nonempty } from "../empty.js"
import type { queue } from "./queue.js"
import type { tuple } from "./tuple.js"

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
    finite,
    nonfinite,
  }

  // main api 
  export {
    head,
    heads,
    last,
    lead,
    next,
    reverse,
    snd,
    snds,
    tail,
    tails,
  }

  // auxillary exports
  export {
    // aliases
    fst,
  }

  /** 
   * {@link finite `array.finite`} constrains a **generic parameter** to only
   * match **finite arrays** (a.k.a. tuples).
   * 
   * _Note:_ {@link finite `array.finite`} should be applied to the 
   * **raw type parameter**; see the examples below for usage.
   * 
   * _Note:_ This variant will "fail silently", which makes it a good candidate when
   * defining function overloads (for example). If you need a variant that will 
   * surface an error message to the user, see {@link finite.orThrow `array.finite.orThrow`}.
   * 
   * @example
   *  import type { array } from "any-ts"
   * 
   *  // Note: `array.finite` must be applied to the RAW TYPE PARAMETER
   *  declare function overloaded<T extends array.finite<T>>(xs: [...T]): [TUPLE: T]
   *  //               LIKE THIS: ^^^^^^^^^^^^^^^^^^^^^^^^^
   * 
   *  // Note: you can apply constraints on `T` via the 2nd argument
   *  declare function overloaded<T extends array.finite<T, number[]>>>(xs: T): [ARRAY: T]
   *  //                                         LIKE THIS: ^^^^^^^^
   * 
   *  //    ✅ Matches the 1st overload
   *  const ex_01 = overloaded(myTuple)
   *  //    ^? const ex_01: [TUPLE: [1, 2, 3]]
   *
   *  //    ✅ Works as expected
   *  const ex_02 = overloaded(myArray)
   *  //    ^? const ex_02: [ARRAY: number[]]
   *
   *  // If you're using `array.finite` like this, you might want `array.finite.orThrow`
   *  declare function onlyTuples<const T extends array.finite<T>>(xs: [...T]): [...T]
   *
   *  //    ✅ Works as expected
   *  const ex_03 = onlyTuples(myTuple)
   *  //    ^? const ex_03: [1, 2, 3] 
   *
   *  //   🚫 Argument of type 'number[]' is not assignable to parameter of type 'never'
   *  //                       ↓↓↓↓↓↓↓↓↓↓↓
   *  const ex_04 = onlyTuples(numberArray)
   *  //    ^? const ex_04: never
   */
  type finite<xs, invariant extends any.array = any.array> = check.is.tuple<xs, invariant, "hush">

  namespace finite {
    /**
     * {@link finite `array.finite`} constrains a **generic parameter** to only
     * match **finite arrays** (a.k.a. tuples).
     * 
     * _Note:_ If the provided type is not a finite array, a custom TypeError is raised. 
     * 
     * If you need a variant that does not evaluate to a TypeError, see 
     * {@link array.finite}.
     * 
     * @example
     *  declare const myTuple: [1, 2, 3]
     *  declare const myArray: number[]
    
     *  declare function tuplesOnlyOrThrow<const T extends array.finite.orThrow<T>>(array: T): T
     *  //    ✅ Works as expected
     *  const ex_01 = tuplesOnlyOrThrow(myTuple)
     *  //    ^? const ex_01: [1, 2, 3]
    
     *  //    🚫 Argument of type 'number[]' is not assignable to parameter of type 
     *  //      'TypeError<["Expected a tuple", [got: number[]]]>'
     *  //                              ↓↓↓↓↓↓↓
     *  const ex_02 = tuplesOnlyOrThrow(myArray)
     *  //    ^? const ex_02: TypeError<["Expected a tuple", [got: number[]]]>
     */
    type orThrow<xs, invariant extends any.array = any.array> = never | check.is.tuple<xs, invariant, never>
  }

  type nonfinite<xs> = never |
    ([xs] extends [any.array] ? [number] extends [xs["length"]] ? any.array : never : never)

  namespace nonfinite {
    type orThrow<
      xs,
      invariant extends any.array = any.array,
      errorMsg extends string = `Expected a non-finite array`
    > = never | (
      [xs] extends [any.array] ? [number] extends [xs["length"]] ? invariant
      : TypeError<[errorMsg, [xs]]> : never
    )
  }

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

  /** You can use {@link reverse `array.reverse`} to reverse an array. */
  type reverse<xs extends any.array, acc extends any.array = []>
    = [xs] extends [nonempty.array<infer head, infer tail>] ? reverse<tail, [head, ...acc]> : acc

  /** 
   * {@link next `array.next`} splits an array into a two-tuple containing the first element, and the
   * rest of the array. 
   * 
   * Useful when loop over an array, especially when that iteration is recursive.
   */
  type next<xs extends any.array>
    = [xs] extends [nonempty.array<infer head, infer tail>]
    ? [head: head, tail: tail]
    : [head: xs[number] | undefined, tail: xs]
    ;
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
