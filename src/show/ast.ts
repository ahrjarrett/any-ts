export {
  // type FlattenedAST,
}

import * as any from "../any";
import { never } from "../semantic-never/exports";

import { empty, nonempty } from "../empty"
import { assert, expect } from "../exports";


interface enumerable<type = unknown> { [ix: number]: type }

/** 
 * 3 * 4 + 7
 * (3 * 4) + 7
 * 
 * @example
 *
 * declare const LeafNode: unique symbol
 * declare const PathNode: unique symbol
 * declare const RootNode: unique symbol
 * type LeafNode = typeof LeafNode
 * type PathNode = typeof PathNode
 * type RootNode = typeof RootNode
 * 
 * [
 *   ["a", "b", "c", string],
 *   ["d", "e", number],
 *   ["f", "g", "h", "i", boolean],
 * ]
 * 
 * [
 *   [RootNode, "a"], [PathNode, "b"], [PathNode, "c"], [LeafNode, string], 
 *   [RootNode, "d"], [PathNode, "e"], [LeafNode, number],
 *   [RootNode, "f"], [PathNode, "g"], [PathNode, "h"], [PathNode, "i"], [LeafNode, boolean], 
 * ]
 * 
 */

type pathway<
  type extends
  | (any.keys) | ([...any.keys, any.guard<any.nonnullable>])
  = (any.keys) | ([...any.keys, any.guard<any.nonnullable>])> = type


type flatten<type extends any.array<pathway>> = type
type guard<type extends any.guard<any.nonnullable> = any.guard<any.nonnullable>> = type



// type FlattenedAST<type extends any.two<segment,
// ;

type paths = [
  ["a..b..c==0;;d..e==1;;f..g..h..i==2;;"],
  [any.guard<string>, number, boolean],
];

declare namespace impl {
  type fromPathways<acc extends intermediate.paths, guards extends any.array<guard>, type extends any.array<any.keys | [...any.keys, any.guard]>>
    = type extends empty.array ? [acc, guards]
    : type extends nonempty.arrayof<pathway, infer path, infer paths>
    ?
    (
      path extends any.keys
      ? fromPathways<{ [ix in guards["length"] | keyof acc]: ix extends keyof acc ? acc[ix] : path }, [...guards, guard], paths>
      : path extends readonly [...infer p extends any.keys, infer g extends guard]
      ? fromPathways<{ [ix in guards["length"] | keyof acc]: ix extends keyof acc ? acc[ix] : p }, [...guards, g], paths>
      : never.illegal_state
    )
    : [_2: acc, g: guards, t: type]
    ;

  type toFlattenedPath<acc extends string, path extends any.keys, ix extends number>
    = path extends empty.array ? acc extends empty.string ? ix : `${acc}==${ix};;`
    : path extends nonempty.arrayof<any.key, infer head, infer tail>
    ? impl.toFlattenedPath<`${acc extends `` ? acc : acc extends `${string};;` ? acc : `${acc}..`}${head}`, tail, ix>
    : never
    ;


  /**
   * [
   *   ["a..b..c==0;;d..e==1;;f..g..h..i==2;;"],
   *   [string, number, boolean],
   * ]
   */

  type __impl_toFlattenedPath__ = [
    // ^?
    expect<assert.equal<impl.toFlattenedPath<``, [], 0>, 0>>,
    expect<assert.equal<impl.toFlattenedPath<``, ["a"], 10>, "a==10;;">>,
    expect<assert.equal<impl.toFlattenedPath<``, ["a", "b"], 0>, "a..b==0;;">>,
    expect<assert.equal<impl.toFlattenedPath<``,
      ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
      0>,
      "a..b..c..d..e..f..g..h..i..j..k..l..m..n..o..p..q..r..s..t..u..v..w..x..y..z==0;;"
    >>,

    // >>,

    // expect<assert.equal<

    // >>,

    // expect<assert.equal<

    // >>,

    // expect<assert.equal<

    // >>,

  ]

  type __impl_fromPathways__ = [
    // ^?
    expect<assert.equal<
      impl.fromPathways<{}, [], [["a", "b", "c", any.guard<string>], ["d", "e", any.guard<number>]]>,
      [{ [0]: ["a", "b", "c"], [1]: ["d", "e"] }, [any.guard<string>, any.guard<number>]]
    >>,
  ]
  type __intermediate_toFlattened__ = [
    intermediate.toFlattened<[
      { 0: ["a", "b", "c"], 1: ["d", "e"], 2: ["f", "g", "h", "i"] },
      [any.guard<string>, any.guard<number>, any.guard<boolean>]]
    >
  ]

  type __intermediate_fromPathways__ = [
    // ^?
    expect<assert.equal<intermediate.fromPathways<[]>, [{}, []]>>,
    expect<assert.equal<
      intermediate.fromPathways<[["a", "b", "c", any.guard<string>]]>,
      [{ 0: ["a", "b", "c"] }, [any.guard<string>]]
    >>,
    expect<assert.equal<
      intermediate.fromPathways<[["a", "b", "c"]]>,
      [{ 0: ["a", "b", "c"] }, [any.guard<any.nonnullable>]]
    >>,
    expect<assert.equal<
      intermediate.fromPathways<[
        ["a", "b", "c"],
        ["d", "e"],
      ]>,
      [
        { 0: ["a", "b", "c"], [1]: ["d", "e"] },
        [any.guard<any.nonnullable>, any.guard<any.nonnullable>],
      ]
    >>,
    expect<assert.equal<
      intermediate.fromPathways<[
        ["a", "b", "c", any.guard<string>],
        ["d", "e", any.guard<number>],
      ]>,
      [
        { 0: ["a", "b", "c"], [1]: ["d", "e"] },
        [any.guard<string>, any.guard<number>],
      ]
    >>,
    expect<assert.equal<
      intermediate.fromPathways<[
        ["a", "b", "c", any.guard<string>],
        ["d", "e", any.guard<number>],
        ["f", "g", "h", "i", any.guard<boolean>],
      ]>,
      [
        { 0: ["a", "b", "c"], [1]: ["d", "e"], [2]: ["f", "g", "h", "i"] },
        [any.guard<string>, any.guard<number>, any.guard<boolean>],
      ]
    >>,
    expect<assert.equal<
      intermediate.fromPathways<[
        ["a", "b", "c"],
        ["d", "e"],
        ["f", "g", "h", "i"],
      ]>,
      [
        { 0: ["a", "b", "c"], [1]: ["d", "e"], [2]: ["f", "g", "h", "i"] },
        [any.guard<any.nonnullable>, any.guard<any.nonnullable>, any.guard<any.nonnullable>],
      ]
    >>,
  ]

  const example: [
    {
      0: ["a", "b", "c"],
      1: ["d", "e"],
      2: ["f", "g", "h"],
    },
    [string, number, boolean],
  ]

  type flattenPaths<
    delimited extends string,
    ix extends any.array<void>,
    paths extends enumerable<any.keys>,
    guards extends any.array<guard>
  > = paths extends any.indexedby<ix["length"]>
    ? impl.flattenPaths<
      impl.toFlattenedPath<delimited, paths[ix["length"]], ix["length"]>,
      [...ix, void],
      paths,
      guards
    >
    : [paths: delimited, guards: guards]
    ;
}

declare namespace intermediate {
  type intermediate = readonly [paths, any.array<guard>]
  type paths = enumerable<any.keys>

  type fromPathways<type extends any.array<pathway>> = impl.fromPathways<{}, [], type>
  type toFlattened<type extends intermediate.intermediate> = impl.flattenPaths<``, [], type[0], type[1]>
}

declare namespace AST {
  type fromPathways<type extends any.array<pathway>> = impl.fromPathways<{}, [], type>
  // type flatTreeFromPathways<type extends any.array<pathway>>
  //   = 
}

/**
 * @example
 * /////////////////
 * /// example 1 ///
 * /////////////////
 * 
 * // evaluating the expression:
 * 10 * (3 + 2) = 15
 * 
 * // representing the expression in pseudocode:
 * Mul(10, Add(3, 2))
 * 
 * // first we flatten the expression, replacing each sub-expression 
 * // with its index in the accumulator (which is always `accumulator["length"]`;
 * // doing it this way gives us a guarantee that we never need to "look backwards"
 * // (when parsing) or "look forwards" (when interpreting).
 * 
 * Mul(    // => ix_0
 *   10,   // => ix_1
 *   Add(  // => ix_2
 *     3,  // => ix_3
 *     2   // => ix_4
 *   )
 * )
 * // =>
 * [
 *   ix_0: Mul(ix_1, ix_2),
 *   ix_1: LiteralInt(10),
 *   ix_2: Add(ix_3, ix_4),
 *   ix_3: LiteralInt(3),
 *   ix_4: LiteralInt(4),
 * ]
 * 
 * // great! one nice thing about doing it this way is that our 
 * // nodes are ordered topologically.
 * 
 * // that means that for any given node, _all of its children 
 * // are stored at larger indices_.
 * 
 * /////////////////
 * /// example 2 ///
 * /////////////////
 * 
 * (10 * 3) + 2 = 32
 * 
 * Add(Mul(10, 3), 2)
 * 
 * [
 *   ix_0: Add(ix_1, ix_2),
 *   ix_1: Mul(ix_3, ix_4),
 *   ix_2: LiteralInt(2),
 *   ix_3: LiteralInt(10),
 *   ix_4: LiteralInt(3)
 * ]
 */

type _userinput_ = [
  ["abc", "def", "ghi", any.guard<number>],
  ["jkl", "mno", "pqr", any.guard<string>],
  ["stu", "vwx", "yz", any.guard<boolean>],
]

type bindGuards<type extends any.array<pathway>>
  = { [ix in keyof type]
    : type[ix] extends any.keys
    ? [any.guard<any.nonnullable>, type[ix]]
    : type[ix] extends readonly [...infer lead, infer last] ? [last, lead]
    : never }

type heads<type extends any.array<any.array>> = { [ix in keyof type]: type[ix][0] }

type createIR<type extends any.array<pathway>>
  = bindGuards<type> extends any.list<infer xs>
  ? xs extends any.array<readonly [guard, any.keys]>
  ? [{ [ix in Extract<keyof xs, `${number}`>]: xs[ix][1] }, heads<xs>]
  : never
  : never
  ;

type _5 = createIR<[
  ["A", "B", "C"],
  ["abc", "def", "ghi", any.guard<number>],
  ["jkl", "mno", "pqr", any.guard<string>],
  ["stu", "vwx", "yz", any.guard<boolean>],
]>

type _intermediateRepresentation_ = [
  {
    0: ["abc", "def", "ghi"],
    1: ["jkl", "mno", "pqr"],
    2: ["stu", "vwx", "yz"],
  },
  [number, string, boolean],
]

type _2 = any.guard<{
  abc: {
    def: {
      ghi: number
    },
    jkl: {
      mno: {
        pqr: string
      }
    },
  },
  stu: {
    vwx: {
      yz: boolean,
    }
  }
}>
