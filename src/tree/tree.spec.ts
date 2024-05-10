import type { Tree } from "./tree.js"

import type { any } from "../any/exports.js"
import { assert, expect } from "../test/exports.js"

declare namespace Tree_merge {
  type $returnType = [
    // ^?
    expect<assert.equal<
      Tree.merge<
        | { a: { b: { c: 1 }, d: 2 }, e: 3 }
        | { a: { b: { f: 4 }, g: 5, h: 6 }, i: { j: 7, k: { l: 8 } } }
        | { a: { m: { n: 9 }, o: 10, p: 11, q: { r: 12, s: 13 } } }
        | { i: { t: 14 }, u: 15, v: { w: 16, x: { y: 17, z: 18 } } }
      >,
      {
        a: {
          b: {
            c: 1,
            f: 4
          },
          d: 2,
          g: 5,
          h: 6,
          m: { n: 9 },
          o: 10,
          p: 11,
          q: {
            r: 12,
            s: 13
          }
        },
        e: 3,
        i: {
          j: 7,
          k: {
            l: 8
          },
          t: 14
        },
        u: 15,
        v: {
          w: 16,
          x: {
            y: 17,
            z: 18
          }
        }
      }
    >>,
  ]
}

declare namespace Tree_unfold {
  type $returnType = [
    // ^?
    expect<assert.equal<Tree.unfold<["a", "b", "c"]>, { a: { b: { c: unknown } } }>>,
    expect<assert.equal<Tree.unfold<["a", "b", "c"], [0, 1]>, { a: { b: { c: [0, 1] } } }>>,
  ]
}

declare namespace Tree_fromPaths {
  const paths: [
    [_1: "abc", _2: "def", _3: "ghi", LEAF: "xyz"],
    [_1: "abc", _2: "jkl", LEAF: "mno"],
    [_1: 123, _2: 8, LEAF: [1, 2, 3]],
    [_1: 123, _2: 456, LEAF: 789],
    [_1: "abc", _2: "def", _3: "pqr", _4: "stu", LEAF: ["z"]],
  ]

  type $propertyTests = [
    // ^?
    expect<assert.equal<
      /** 
       * _equivalence_: calling `fromPaths` with a matrix (2d-array) 
       * vs. a union of arrays results in the same behavior
       */
      Tree.fromPaths<typeof paths>,
      Tree.fromPaths<typeof paths[number]>
    >>
  ]

  type $returnType = [
    // ^?
    expect<assert.equal<
      Tree.fromPaths<typeof paths>,
      {
        abc: {
          def: {
            ghi: "xyz",
            pqr: {
              stu: ["z"]
            }
          },
          jkl: "mno"
        },
        123: {
          8: [1, 2, 3],
          456: 789
        }
      }
    >>,
  ]
}

declare namespace Tree_shift {
  type $returnType = [
    // ^?
    expect<assert.equal<Tree.shift<[]>, never>>,
    expect<assert.equal<Tree.shift<[1]>, any.pair<1, []>>>,
    expect<assert.equal<Tree.shift<[1, "abc"]>, any.pair<1, ["abc"]>>>,
    expect<assert.equal<Tree.shift<["def", "ghi"]>, any.pair<"def", ["ghi"]>>>,
    expect<assert.equal<Tree.shift<["def", "ghi", "jkl"]>, any.pair<"def", ["ghi", "jkl"]>>>,
  ]
}

declare namespace Tree_traversableBy {
  type input = { a: { b: { c: { d: 2, e: 3 }, f: 4 }, g: 5 }, h: 6 }

  type $returnType = [
    // ^?
    expect<assert.equal<
      Tree.traversableBy<[1, 2, 3]>,
      { 1: { 2: { 3: {} } } }
    >>,

    expect<assert.equal<
      input extends
      | Tree.traversableBy<["a", "b", "c", "d"], infer out>
      ? out["a"]["b"]["c"]["d"]
      : never,
      2
    >>
  ]
}

declare namespace Tree_traversal {
  /** TODO: write more tests */
  type $returnType = [
    // ^?
    expect<assert.equal<Tree.traversal<{ a: { b: { c: 3 }, d: 4 } }, ["a", "b", "c"]>, 3>>
  ]
}
