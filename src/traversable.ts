import * as any from './__internal'
import { empty, nonempty } from "./empty"

import named = any.term.named
import { never } from "./never"
import { assert, expect } from '../test/test';

declare namespace impl {
  type unfold<path extends any.array<any.index>, leaf = unknown>
    = path extends empty.array ? leaf
    : path extends nonempty.pathLeft<infer init, infer last>
    ? unfold<init, named<[𝐥𝐚𝐛𝐞𝐥: last, 𝐯𝐚𝐥𝐮𝐞: leaf]>>
    : never
    ;
}

type _5 = nonempty.pathLeft<[1, 2, 3], 4>

type unfold<leaf, path extends any.array<any.key>> = impl.unfold<path, leaf>

/** 
 * {@link from `traversable.from`} is a type-constructor that takes a path and, via induction, 
 * constructs the tree it describes.
 *
 * See also: {@link of `traversable.of`}
 * 
 * When used as an invariant, this constructor is a particularly good example of the 
 * {@link https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence _natural correspondence_} 
 * between computation and propositional logic. 
 * 
 * By this interpretation, a program that builds the data structure that a path called `p` describes
 * is the proof that such a data structure can be built -- this process is sometimes called "proof 
 * by construction".
 * 
 * What does that look like in practice though?
 * 
 * @example
 *  import { type any } from "any-ts"
 * 
 * declare function hasPath<const path extends any.path>
 *   (...path: path): <const tree>(tree: tree) => tree is tree & traversable.from<path>
 *   
 *   // if "there exists" a path `abc.def.ghi` in the input object, 
 *   // let the output object's type reflect that information
 *   const hasAbcDefGhi = hasPath("abc", "def", "ghi")
 *   
 *   declare const blob: { xyz: "1223" }
 * 
 *   if (hasAbcDefGhi(blob)) {
 *     blob 
 *   } // ^? const blob: { xyz: "1223" } & { abc: { def: { ghi: unknown } } }
 */
type from<
  invariant extends any.path,
  type extends
  | impl.unfold<invariant>
  = impl.unfold<invariant>
>
  = type

type of<
  path extends any.path,
  leaf = unknown,
  type extends
  | impl.unfold<path, leaf>
  = impl.unfold<path, leaf>
>
  = type

declare namespace traversal {
  type of<
    tree,
    path extends any.array<any.index>,
  > = path extends empty.path ? tree
    : path extends nonempty.path<any.keyof<tree, infer head>, infer tail>
    ? traversal.of<tree[head], tail>
    : never.close.unmatched_expr
    ;
}

type leaf = typeof leaf
declare const leaf: unique symbol

type __traversal_of__ = [
  // ^?
  expect<assert.equivalent<traversal.of<leaf, []>, leaf>>,
  expect<assert.equivalent<traversal.of<{ a: leaf }, ["a"]>, leaf>>,
  expect<assert.equivalent<traversal.of<{ a: { b: leaf } }, ["a", "b"]>, leaf>>,
  expect<assert.equivalent<traversal.of<{ a: { b: { c: leaf } } }, ["a", "b", "c"]>, leaf>>,
  expect<assert.equivalent<traversal.of<{ a: { b: { c: leaf } } }, []>, { a: { b: { c: leaf } } }>>,
  expect<assert.equivalent<traversal.of<{ a: { b: { c: leaf } } }, ["a"]>, { b: { c: leaf } }>>,
  expect<assert.equivalent<traversal.of<{ a: { b: { c: leaf } } }, ["a", "b"]>, { c: leaf }>>,
  expect<assert.equivalent<traversal.of<{ a: { b: { c: leaf } } }, ["a", "b", "c"]>, leaf>>,
]

type __traversable_from__ = [
  // ^?
  expect<assert.equal<traversable.from<[]>, unknown>>,
  expect<assert.equal<traversable.from<["a"]>, { a: unknown }>>,
  expect<assert.equal<traversable.from<["a", "b"]>, { a: { b: unknown } }>>,
  expect<assert.equal<traversable.from<["a", "b", "c"]>, { a: { b: { c: unknown } } }>>,
  expect<assert.equal<traversable.from<[], leaf>, leaf>>,
  expect<assert.equal<traversable.from<["a"], { "a": 0 }>, { a: 0 }>>,
  expect<assert.equal<traversable.from<["a", "b"], { a: { b: leaf } }>, { a: { b: leaf } }>>,
  expect<assert.equal<traversable.from<["a", "b", "c"], { a: { b: { c: leaf } } }>, { a: { b: { c: leaf } } }>>,
]

type __nonempty_path__ = expect<assert.equal<nonempty.path<0, [1, 2, 3]>, readonly [0, 1, 2, 3]>>
//   ^?
type __nonempty_pathLeft__ = expect<assert.equal<nonempty.pathLeft<[1, 2, 3], 4>, readonly [1, 2, 3, 4]>>
//   ^?

namespace traversable { export const never: never = void 0 as never }
declare namespace traversable {
  export {
    from,
    unfold,
  }
}