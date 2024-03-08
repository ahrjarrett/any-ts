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

declare namespace Err {
  const DepthFirstExpectedNonUnion: "Error: `go.depthFirst` expected a non-union argument for `path`; distribute `path` _outside_ of `go.depthFirst`, otherwise you will lose structure"
}

declare namespace go {
  type breadthFirst<xs extends pathable>
    = [xs] extends [any.one] ? xs[0]
    : { [e in Tree.enqueue<xs> as e[0]]: breadthFirst<e[1]> }
    ;

  type depthFirst<
    leaf,
    path extends any.path,
  > = // Union.is<path> extends true ? typeof Err.DepthFirstExpectedNonUnion
    // : 
    [path] extends [empty.path] ? leaf
    : [path] extends [nonempty.pathLeft<infer init, infer last>]
    ? go.depthFirst<{ [ix in last]: leaf }, init>
    : never.close.inline_var<"init" | "last">
    ;
}

declare namespace Tree {
  type enqueued<first extends any.index = any.index, second extends pathable = pathable> = any.two<first, second>

  type enqueue<xs extends pathable>
    = xs extends readonly [any.index<infer head>, ...pathable<infer tail>] ? any.two<head, tail> : never

  /** 
   * {@link fromPaths `Tree.fromPaths`} is a type constructor that accepts either a union or 
   * an array of {@link pathable `Tree.pathable`} types, and performs a **breadth-first**
   * traversal, grouping paths with a common first element under the same key in the tree.
   */
  type fromPaths<paths extends pathable | any.array<pathable>>
    = go.breadthFirst<paths extends pathable ? paths : paths[number]>

  type fromPathsDF<paths extends pathable | any.array<pathable>>
    = (paths extends pathable ? paths : paths[number]) extends pathable<infer p>
    ? (p extends nonempty<infer leaf, infer init> ? [leaf: leaf, init: init] : "BOB") extends infer out
    ? [out] extends [[any, any.path]] ? go.depthFirst<out[0], out[1]>
    : never
    // unfoldDepthFirst<init, leaf>

    // [paths] extends [nonemptyPath<infer leaf, infer init>] ? unfoldDepthFirst<init, leaf>
    : [FALLTHROUGH1: paths]
    : [FALLTHROUGH2: paths]
    ;


  type unfoldDepthFirst<path extends any.path, leaf>
    = [path] extends [empty.path] ? leaf
    : [path] extends nonempty.pathLeft<infer init, infer last>
    ? unfoldDepthFirst<init, { [ix in last]: leaf }>
    : never.close.inline_var<"init" | "last">
    ;

}

type __Tree_fromPathsDF__ = [
  Tree.fromPathsDF<[
    ["abc", "def", "ghi", "xyz"],
    ["abc", "jkl", "mno"],
    [123, 8],
    [123, 456, 789],
    ["abc", "def", "pqr", "stu", ["z"]],
  ]>,
]

type __Tree_fromPaths__ = [
  // ^?
  Tree.fromPaths<[
    ["abc", "def", "ghi", "xyz"],
    ["abc", "jkl", "mno"],
    [123, 8],
    [123, 456, 789],
    ["abc", "def", "pqr", "stu", ["z"]],
  ][number]>,
  Tree.fromPaths<[
    ["abc", "def", "ghi", "xyz"],
    ["abc", "jkl", "mno"],
    [123, 8],
    [123, 456, 789],
    ["abc", "def", "pqr", "stu", ["z"]],
  ]>,

  // Tree.fromPathsDF<[
  //   ["abc", "def", "ghi", "xyz"],
  //   ["abc", "jkl", "mno"],
  //   [123, 8],
  //   [123, 456, 789],
  //   ["abc", "def", "pqr", "stu", ["z"]],
  // ]>,
]

type __go_depthFirst__ = [
  go.depthFirst<4, [1, 2, 3]>,
]

type __branch__ = [
  Tree.enqueue<[]>,
  Tree.enqueue<[1]>,
  Tree.enqueue<[1, "abc"]>,
  Tree.enqueue<["def", "ghi"]>,
  Tree.enqueue<["def", "ghi", "jkl"]>,
]

type mergeTrees<union> = never.as_identity
  | [union] extends [any.primitive] ? union :
  { [ix in union extends union ? keyof union : never.close.distributive]
    : mergeTrees<union extends any.indexedby<ix> ? union[ix] : never.close.distributive> }
  ;
