import type { Tree, nonempty as nonemptyPath } from "./tree"

import type { any } from "../any/exports"
import { type empty, type nonempty } from "../empty"
import { type never } from "../never/exports"

declare namespace Err {
  const DepthFirstExpectedNonUnion: "Error: `go.depthFirst` expected a non-union argument for `path`; distribute `path` _outside_ of `go.depthFirst`, otherwise you will lose structure"
}

type depthFirst<
  leaf,
  path extends any.path,
> = [path] extends [empty.path] ? leaf
  : [path] extends [nonempty.pathLeft<infer init, infer last>]
  ? depthFirst<{ [ix in last]: leaf }, init>
  : never.close.inline_var<"init" | "last">
  ;

type unfoldDepthFirst<path extends any.path, leaf>
  = [path] extends [empty.path] ? leaf
  : [path] extends nonempty.pathLeft<infer init, infer last>
  ? unfoldDepthFirst<init, { [ix in last]: leaf }>
  : never.close.inline_var<"init" | "last">
  ;

type fromPaths<paths extends Tree.pathable | any.array<Tree.pathable>>
  = (paths extends Tree.pathable ? paths : paths[number]) extends Tree.pathable<infer p>
  ? (p extends nonemptyPath<infer leaf, infer init> ? [leaf: leaf, init: init] : "BOB") extends infer out
  ? [out] extends [[any, any.path]] ? depthFirst<out[0], out[1]>
  : never
  // unfoldDepthFirst<init, leaf>
  // [paths] extends [nonemptyPath<infer leaf, infer init>] ? unfoldDepthFirst<init, leaf>
  : [FALLTHROUGH1: paths]
  : [FALLTHROUGH2: paths]
  ;


type __fromPaths__ = [
  fromPaths<[
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
]

type __go_depthFirst__ = [
  depthFirst<4, [1, 2, 3]>,
]

type __branch__ = [
  Tree.shift<[]>,
  Tree.shift<[1]>,
  Tree.shift<[1, "abc"]>,
  Tree.shift<["def", "ghi"]>,
  Tree.shift<["def", "ghi", "jkl"]>,
]