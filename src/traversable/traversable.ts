export {
  traversable,
  traversal,
}

import type { any } from "../any/any"
import type { empty, nonempty } from "../empty"

import type { never } from "../semantic-never/exports"

declare namespace impl {
  type unfold<path extends any.path, leaf = unknown>
    = path extends empty.array ? leaf
    : path extends nonempty.pathLeft<infer init, infer last>
    ? unfold<init, any.named<[𝐥𝐚𝐛𝐞𝐥: last, 𝐯𝐚𝐥𝐮𝐞: leaf]>>
    : never
    ;
}

type unfold<leaf, path extends any.path> = impl.unfold<path, leaf>

/** 
 * {@link by `traversable.by`} is a type-constructor that takes a path describing a tree and, 
 * via induction, constructs the tree it describes.
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
 *   (...path: path): <const tree>(tree: tree) => tree is tree & traversable.by<path>
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
type by<
  invariant extends any.path,
  type extends
  | impl.unfold<invariant>
  = impl.unfold<invariant>
>
  = type

declare namespace traversable {
  export {
    by,
    unfold,
  }
}

namespace traversal { export const never: never = void 0 as never }
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

