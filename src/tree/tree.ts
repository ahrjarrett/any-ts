export type {
  Tree,
  pathable,
  nonempty,
}

import { type any } from "../any/exports"
import { type empty } from "../empty"
import { type never } from "../semantic-never/exports"

type pathable<
  type extends
  | empty.path | nonempty
  = empty.path | nonempty
> = type

type nonempty<
  last = any.nonnullable,
  lead extends any.path = any.path
> = readonly [...lead, last]

type merge<t> = never
  | [t] extends [any.primitive] ? t
  : { [k in t extends any.object ? keyof t : never]
    : merge<t extends any.indexedby<k> ? t[k] : never> }
  ;

type shift<xs extends pathable>
  = xs extends readonly [any.index<infer head>, ...pathable<infer tail>] ? any.two<head, tail> : never

declare namespace Tree {
  export {
    shift,
    fromPaths,
    merge,
    pathable,
  }

  /** 
   * {@link fromPaths `Tree.fromPaths`} is a type constructor that accepts either a union or 
   * an array of {@link pathable `Tree.pathable`} types, and performs a **breadth-first**
   * traversal, successively grouping paths with a common first element under the same key 
   * in the tree.
   */
  type fromPaths<paths extends pathable | any.array<pathable>>
    = go.breadthFirst<paths extends pathable ? paths : paths[number]>

  /** @internal */
  namespace go {
    type breadthFirst<xs extends pathable>
      = [xs] extends [any.one] ? xs[0]
      : { [e in Tree.shift<xs> as e[0]]: go.breadthFirst<e[1]> }
      ;
  }
}
