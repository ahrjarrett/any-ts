export type {
  Tree,
  pathable,
  nonempty,
}

import { type any } from "../any"
import { type empty, type nonempty } from "../empty"
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

type mergeTrees<union> = never.as.identity
  | [union] extends [any.primitive] ? union :
  { [ix in union extends union ? keyof union : never.close.distributive]
    : mergeTrees<union extends any.indexedby<ix> ? union[ix] : never.close.distributive> }
  ;

type shift<xs extends pathable>
  = xs extends readonly [any.index<infer head>, ...pathable<infer tail>] ? any.two<head, tail> : never

declare namespace Tree {
  export {
    shift,
    fromPaths,
    mergeTrees as merge,
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