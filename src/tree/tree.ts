export type {
  Tree,
}

import type { any } from "../any/exports.js"
import type { empty } from "../empty/empty.js"
import type { nonempty } from "../nonempty/nonempty.js"

declare namespace Tree {
  export {
    fromPaths,
    merge,
    nonempty,
    pathable,
    pathway,
    shift,
    traversableBy,
    traversal,
    unfold,
  }

  /** 
   * {@link pathway `Tree.pathway`} is an array of indices that terminates in any non-nullable value.
   * 
   * @example
   *  //////////
   *  /// ok
   *  const ex_01 = [{}] satisfies Tree.pathway                                  // ✅
   *  const ex_02 = [[]] satisfies Tree.pathway                                  // ✅
   *  const ex_03 = ["a", "b", "c", [1, 2, 3]] satisfies Tree.pathway            // ✅
   *  const ex_04 = [1, 2, 3, { x: "a", y: "b", z: "c" }] satisfies Tree.pathway // ✅
   *  //////////
   *  /// err
   *  const ex_05 = [] satisfies Tree.pathway                          // 🚫 TypeError
   *  const ex_06 = ["a", "b", "c", null] satisfies Tree.pathway       // 🚫 TypeError
   *  const ex_07 = ["a", "b", "c", undefined]  satisfies Tree.pathway // 🚫 TypeError
   */
  type pathway = readonly [...any.path, {}]

  /**
   * {@link pathable `Tree.pathable`} is similar to {@link pathway `Tree.pathway`},
   * with two notable differences:
   * 
   * 1. {@link pathable `Tree.pathable`} admits an empty array
   * 2. {@link pathable `Tree.pathable`} is a type constructor, whereas
   *    {@link pathway `Tree.pathway`} is nullary
   * 
   * @example
   *  //////////
   *  /// ok
   *  type ex_01 = Tree.pathable<[]>                            // ✅ => []
   *  type ex_02 = Tree.pathable<[{}]>                          // ✅ => [{}]
   *  type ex_03 = Tree.pathable<[[]]>                          // ✅ => [[]]
   *  type ex_04 = Tree.pathable<["a", "b", "c", [x: 1, y: 2]]> // ✅ => ["a", "b", "c", [1, 2]]
   *  type ex_05 = Tree.pathable<[1, 2, 3, { xyz: 4 }]>         // ✅ => [1, 2, 3, { xyz: 4 }]
   *  //////////
   *  /// err
   *  type ex_06 = Tree.pathable<["a", null]>       // 🚫 Type in position 1 [...] is not assignable to type '{}'
   *  type ex_07 = Tree.pathable<[1, 2, undefined]> // 🚫 Type [...] in position 2 is not assignable to type '{}'
   */
  type pathable<
    type extends
    | empty.path | pathway
    = empty.path | pathway
  > = type

  /**
   * {@link unfold `Tree.unfold`} accepts a `path` and a `leaf` and creates the
   * data structure that the pair describes (with `leaf` as the terminal value).
   * 
   * @example
   *  type MySparseTree = Tree.unfold<[x: 0, y: 1], ["a", "b", "c"]>
   *  //   ^? type MySparseTree = { a: { b: { c: [x: 0, y: 1] } } }
   */
  type unfold<path extends any.path, leaf = unknown> = unfold.go<path, leaf>
  namespace unfold {
    type go<path extends any.path, leaf>
      = path extends empty.array ? leaf
      : path extends nonempty.pathLeft<infer init, infer last>
      ? unfold.go<init, any.named<[last: last, value: leaf]>>
      : never
      ;
  }

  /**
   * {@link merge `Tree.merge`} expects a union of trees to merge, and merges them.
   * 
   * Performant, non-distributive, handles value collisions gracefully.
   * 
   * **Note:** Because {@link merge `Tree.merge`} is non-distributive, you'll get
   * the best results if any possible collisions belong to the same basic "kind".
   * 
   * If you try to merge a primitive (like `number`) with a composite (like `Array`),
   * you'll end up merging their "prototypes".
   * 
   * @example
   *  declare const myTree: Tree.merge<
   *    | { a: 1, b: { c: 2, d: 3, g: { i: 8 } }, e: 4 } 
   *    | { a: 5, b: { f: 6, g: { h: 7 } } }
   *  >
   * 
   *  type MyTreeTest = expect<assert.equal<
   *    // ^? type MyTreeTest = "✅"
   *    typeof myTree,
   *    { a: 1 | 5, b: { c: 2, f: 6, d: 3, g: { i: 8, h: 7 } }, e: 4 }
   *  >>
   */
  type merge<trees> = never | merge.go<trees>
  namespace merge {
    type go<t> = never
      | [t] extends [any.primitive] ? t
      : { [k in t extends any.object ? keyof t : never]
        : merge.go<t extends any.indexedBy<k> ? t[k] : never> }
  }

  type shift<xs extends pathable> = Tree.fromPaths.NEXT<xs>

  /**
   * @example
   *  type input = { a: { b: { c: { d: 2, e: 3 }, f: 4 }, g: 5 }, h: 6 }
   *  type ex_01
   *    // ^? type ex_01 = 2
   *    = input extends Tree.traversableBy<["a", "b", "c", "d"], infer T>
   *    // even though `T` was declared as an inline variable, the type
   *    // system is aware that it has the path that we inferred above
   *    ? T["a"]["b"]["c"]["d"]
   *    : never
   *    ;
   */
  type traversableBy<
    invariant extends any.path,
    type extends
    | Tree.unfold<invariant, {}>
    = Tree.unfold<invariant, {}>
  > = type

  /** 
   * {@link fromPaths `Tree.fromPaths`} is a type constructor that 
   * _accepts either a union, or an array_ of {@link pathable `Tree.pathable`} types
   * and performs a **breadth-first** traversal, successively grouping paths with a common 
   * first element under the same key in the tree.
   * 
   * @example
   *  type TestMyTree = expect<assert.equal<
   *    // ^? type TestMyTree = "✅"
   *    Tree.fromPaths<[
   *      ["abc", "def", "ghi", "jkl"],
   *      ["abc", "mno", "pqr"],
   *      ["abc", "def", "stu", "vwx", ["y", "z"]],
   *      [0, 1, [2, 3, 4]],
   *      [0, 5, 6],
   *    ]>,
   *    {
   *      abc: {
   *        mno: "pqr",
   *        def: {
   *          ghi: "jkl",
   *          stu: { 
   *            vwx: ["y", "z"] 
   *          }
   *        },
   *      },
   *      0: { 
   *        1: [2, 3, 4], 
   *        5: 6
   *      }
   *    }
   *  >>
   */
  type fromPaths<paths extends pathable | any.array<pathable>>
    = fromPaths.go<paths extends pathable ? paths : paths[number]>
    ;
  namespace fromPaths {
    type DONE = any.one
    type NEXT<xs extends pathable>
      = xs extends readonly [any.index<infer head>, ...pathable<infer tail>] ? any.pair<head, tail>
      : never
    type go<xs extends pathable>
      = [xs] extends [DONE] ? xs[0] : { [next in NEXT<xs> as next[0]]: fromPaths.go<next[1]> }
  }

  /**
   * {@link traversal `Tree.traversal`} takes a tree and a path into that
   * tree and walks the path, returning whatever it finds there.
   * 
   * Note: this type is not related to
   * {@link https://hackage.haskell.org/package/lens-5.3.1/docs/Control-Lens-Traversal.html `Traversal`},
   * nor does it describe an iterative "walking" of a tree from OO.
   * 
   * @example
   *  type three = Tree.traversal<{ a: { b: { c: 3 }, d: 4 } }, ["a", "b", "c"]>
   */
  type traversal<
    tree,
    path extends any.array<any.index>,
  > = traversal.go<tree, path>
  namespace traversal {
    type go<
      tree,
      path extends any.array<any.index>,
    > = path extends empty.path ? tree
      : path extends nonempty.path<any.keyof<tree, infer head>, infer tail>
      ? traversal<tree[head], tail>
      : never
      ;
  }
}
