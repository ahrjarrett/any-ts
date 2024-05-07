import type { _ } from "../util";
import type { any } from "../any/exports"
import type { nonempty } from "../empty"

export declare namespace tuple {
  export {
    flattenOnce,
    one,
    split,
    take,
    three,
    tupleN,
    two,
    variadic,
  }

  type one<only = _> = readonly [_1: only]
  type two<first = _, second = _> = readonly [_1: first, _2: second]
  type three<first = _, second = _, third = _> = readonly [_1: first, _2: second, _3: third]

  type tupleN = [
    one,
    two,
    three,
  ]

  /** 
   * {@link take `tuple.take`} takes the first `n` elements of a 
   * tuple.
   * 
   * This variant is unique in that it trades a bit of performance 
   * to **preserve tuple labels**.
   * 
   * A good tradeoff to make, when you're working with function 
   * arguments programmatically.
   */
  type take<xs extends any.array, n extends number>
    = xs extends { length: n | 0 } ? xs
    : xs extends nonempty.pathLeft<infer lead, any> ? take<lead, n>
    : []

  /**
   * {@link split `split`} splits a tuple into two parts. The
   * first tuple will have length {@link n `n`}.
   *
   * This implementation preserves tuple labels, if they exist,
   * which makes it ideal for working with function parameters
   * (since you won't lose the names of the original parameters).
   *
   * @example
   *  type myTuple = [a: 1, b: 2, c: 3, d: 4, e: 5]
   *  type Beheaded = splitAt<1, myTuple>
   *  //   ^? [before: [a: 1], after: [b: 2, c: 3, d: 4, e: 5]]
   */
  type split<xs extends any.array, n extends number> = tuple.take<xs, n> extends any.list<infer ys>
    ? xs extends readonly [...ys, ...infer zs]
    ? [n, 1] extends [1, n]
    ? [head: ys, tail: zs]
    : [before: ys, after: zs]
    : never
    : never

  type variadic<xs extends any.array> = Readonly<xs> | any.one<Readonly<xs>>
  type flattenOnce<xs extends any.array, acc extends any.array = []>
    = xs extends nonempty.array<infer head, infer tail>
    ? flattenOnce<tail, [...acc, ...(head extends any.array ? head : [head])]>
    : acc
}

