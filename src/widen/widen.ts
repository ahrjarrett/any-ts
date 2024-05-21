import type { any } from "../any/exports.js"
import type { nonempty } from "../nonempty/nonempty.js"

/**
 * {@link Widen `Widen`} is a type constructor that accepts a tree and an optional max depth 
 * (default to `2`), and constructs a new tree with the same overall structure.
 * 
 * Until it hits its max depth, any leaf it encounters is widened to the least upper bound of
 * its respective domain.
 * 
 * For example: 
 * 
 * - given `{ abc: ["def", "ghi"] }`, {@link Widen `Widen`} returns `{ abc: [string, string] }`;
 * - given `[{ abc: 123 }, { def: 456 }]`, {@link Widen `Widen`} returns `[{ abc: number }, { def: number }]`
 * 
 * @example 
 *  import type { Widen } from "any-ts"
 *  
 *  type StateTuple<S> = readonly [state: S, setState: S | ((s: S) => S)]
 *  declare function useState<const state>(initialState: Widen<state, 3>): StateTuple<Widen<state, 3>>
 *  
 *  const [state] = useState([
 *    { user: { first: "Caril Ann", last: "Fugate", email: "ms.nat-born-killer@yahoo.com" } },
 *    { user: { first: "Charles", last: "Starkweather", email: "mr.nat-born-killer@yahoo.com" } }
 *  ])
 *  
 *  state
 *  // ^? [{ user: { first: string, last: string, email: string } }, { user: { first: string, last: string, email: string } }]
 */
export type Widen<type, maxDepth extends number = 2> = Widen.tree<type, maxDepth>

export declare namespace Widen {
  type leaf<type> = type extends { valueOf(): infer target } ? target : type
  type tree<type, maxDepth extends number> = internal.widen<type, [], maxDepth>
}

declare namespace internal {
  type widen<type, depth extends void[], maxDepth extends number>
    = type extends any.primitive ? Widen.leaf<type>
    : [depth[`length`], maxDepth] extends [maxDepth, depth[`length`]] ? type
    : type extends any.array ? internal.widenAll<type, [], depth, maxDepth>
    : { -readonly [k in keyof type]: internal.widen<type[k], [...depth, void], maxDepth> }

  type widenAll<
    xs extends any.array,
    acc extends any.array,
    depth extends void[],
    maxDepth extends number,
  > = [depth[`length`], maxDepth] extends [maxDepth, depth[`length`]] ? xs
    : xs extends nonempty.array<infer head, infer tail>
    ? internal.widen<head, [...depth, void], maxDepth> extends infer x
    ? widenAll<tail, [...acc, x], depth, maxDepth>
    : never
    : acc
}
