export {
  Assoc as assoc,
  size$,
}

import type { any } from "../any/exports"
import { assert, describe, expect } from "../test/exports"
import type { TypeError } from "../err/exports"
import type { Universal } from "../universal/exports"
import type { cache } from "../cache/exports"
import type { iter } from "../iter/exports"
import type { enforce } from "../err/enforce"
import type { never } from "../semantic-never/exports"
import { real } from "../number/real"

const size$: unique symbol = Symbol.for("any-ts/associative::size$")
type size$ = typeof size$


declare namespace impl {
  type parseNumeric<type> = type extends `${infer x extends number}` ? x : never
  type asArraylike<type extends any.array> = never | { [ix in size$ | Extract<keyof type, `${number}`>]: ix extends keyof type ? type[ix] : type["length"] }

  type toEntries<type, order extends any.array<keyof type>>
    = never | { [ix in keyof order]: [order[ix], type[order[ix]]] }

  type rangeInclusive<acc extends any.array<number>, type extends number>
    = [type] extends [acc["length"]] ? Readonly<[...acc, acc["length"]]>
    : impl.rangeInclusive<[...acc, acc["length"]], type>
    ;

  type rangeExclusive<acc extends any.array<number>, type extends number>
    = [type] extends [acc["length"]] ? Readonly<acc>
    : impl.rangeExclusive<[...acc, acc["length"]], type>
    ;

  type is<type extends { [size$]: number }>
    = [separate<type>] extends [[infer order, infer object_]]
    ? [keyof order] extends [never] ? false
    : [keyof object_] extends [never] ? false
    : true
    : false
    ;
}

namespace impl {
  export const base = class {
    constructor(type: object) {
      Object.assign(this, type);
    }
  } as new <const type extends object>(type: type) => type;

  export const rangeInclusive
    : <x extends enforce.positiveNumber<x>>(upperBound: x) => impl.rangeInclusive<[], Extract<x, number>>
    = (upperBound) => {
      let acc = []
      if (!real.is$(upperBound)) return [] as never
      while (acc.length < upperBound) acc.push(acc.length)
      return acc as never
    }
  export const rangeExclusive
    : <x extends enforce.positiveNumber<x>>(upperBound: x) => impl.rangeExclusive<[], Extract<x, number>>
    = (upperBound) => {
      let acc = []
      if (!real.is$(upperBound)) return [] as never
      while (acc.length < upperBound) acc.push(acc.length)
      return acc as never
    }
}

declare const is
  : <const u>(u: u) => Assoc.is<u>
  /** TODO: move `assoc.is` to `assoc.test` or `assoc.isMember`, so `assoc.is` can be a type guard */
  // = (u): u is never => typeof u === "object" && u !== null && size$ in u
  ;

type of<type extends any.entries> = never | [
  { [e in type[number]as e[0]]: e[1] },
  Extract<{ -readonly [ix in keyof type]: type[ix][0] }, any.array>,
]

type make<
  type,
  constraint,
  returns
> = [type] extends [TypeError<any>]
  ? [type] extends [constraint & infer err] ? err
  : never : returns
  ;

declare const indices
  : <const type extends { [size$]: number }>(type: type) => indices<type>

/** 
 * TODO: I believe `rangeInclusive` actually behaves like "rangeInclusive 
 * plus one", and `rangeExclusive` behaves the way `rangeInclusive` should. 
 * fix that
 */
type rangeInclusive<inclusiveMax extends number>
  = number extends inclusiveMax ? any.array<number>
  : [inclusiveMax] extends [keyof cache.next.next]
  ? cache.next.next[inclusiveMax] extends any.list<infer unknowns>
  ? { [ix in keyof unknowns]: impl.parseNumeric<ix> }
  : never.close.inline_var<"unknowns">
  : impl.rangeInclusive<[], inclusiveMax>
  ;

/** 
 * TODO: I believe `rangeInclusive` actually behaves like "rangeInclusive 
 * plus one", and `rangeExclusive` behaves the way `rangeInclusive` should. 
 * fix that
 */
type rangeExclusive<exclusiveMax extends number>
  = number extends exclusiveMax ? any.array<number>
  : [exclusiveMax] extends [keyof cache.curr.curr]
  ? cache.curr.curr[exclusiveMax] extends any.list<infer unknowns>
  ? { [ix in keyof unknowns]: impl.parseNumeric<ix> }
  : never.close.inline_var<"unknowns">
  : impl.rangeExclusive<[], exclusiveMax>
  ;

type indices<type extends { [size$]: number }>
  = [type[size$]] extends [never] ? []
  : number extends type[size$] ? []
  : rangeInclusive<type[size$]>
  ;

type separate<type extends { [size$]: number }>
  = indices<type> extends any.path<infer index>
  ? Universal.key<
    index[number] extends infer ix
    ? ix extends keyof type
    ? type[ix] extends keyof type
    ? ix : never : never : never
  > extends infer ix
  ? [ix] extends [never] ? [{}, {}]
  : [ix] extends [Universal.keyof<type>]
  ? [
    object: { [k in type[ix] & keyof type]: type[k] },
    order: { [k in ix]: type[k] },
  ]
  : never.close.unmatched_expr
  : never.close.inline_var<"ix">
  : never.close.inline_var<"index">
  ;

declare const separate
  : <const type extends { [size$]: number }>(type: type) => separate<type>

type is<type>
  = [type] extends [{ [size$]: number }]
  ? Exclude<type, any.array> extends infer nonArray
  ? [nonArray] extends [never] ? false
  : impl.is<type>
  : false
  : false
  ;

declare const keys: <const type extends Any>(assoc: type) => Assoc.keys<type>
type keys<type extends Any>
  = iter.from<type[size$]> extends any.list<infer iterator>
  ? { [ix in keyof iterator]: Universal.get<ix, type> }
  : never.close.inline_var<"iterator">
  ;

declare const keyof: <type extends Any>(assoc: type) => Assoc.keyof<type>
type keyof<type extends Any> = Exclude<keyof type, number | size$>

/** @ts-expect-error - internal use only */
class assoc<const type extends any.object> extends impl.base<type> { }
type associative<type extends any.entries> = make<type, any.entries, Assoc<of<type>>>

type Assoc<type extends readonly [any.type, any.array]> = never | assoc<type[0] & impl.asArraylike<type[1]>>
declare function Assoc
  <const type extends any.entries & enforce.uniqNonNumericIndex<type>>(...type: type): associative<type>
declare function Assoc
  <const type extends any.object, const order extends any.array<keyof type>>(type: type, order: order): associative<impl.toEntries<type, order>>

/** 
 * If we consider {@link Assoc `assoc`} as the set of all "ordered structs"
 * or associative arrays (as defined in the context of this module),
 * then {@link Any `assoc.any`} is assoc's 
 * {@link https://en.wikipedia.org/wiki/Infimum_and_supremum#:~:text=The%20supremum%20(abbreviated%20sup%3B%20plural,to%20the%20greatest%20element%20of least upper bound}.
 */
type Any = Assoc<[any.type, any.entries]>

type evaluate<type> = never | { [ix in keyof type]: type[ix] }
type _4 = evaluate<Any>

declare namespace Assoc {
  // aliased exports
  export {
    Any as any,
    rangeInclusive as range,
  }
  // direct exports
  export {
    indices,
    is,
    keys,
    keyof,
    separate,
  }
}

namespace Assoc {
  Assoc.indices = indices
  Assoc.is = is
  Assoc.keyof = keyof
  Assoc.keys = keys
  Assoc.separate = separate
}

namespace __Spec__ {
  declare const failureCases: [
    never,
    any,
    unknown,
    {},
    [],
    readonly [],
    {} & [],
    any.array,
    any.object,
    any.array & any.object,
    { abc: 123 } & { 0: "xyz", length: 1 },
    { abc: 123 } & ["xyz"],
    { abc: 1230 } & { 0: "abc", length: 1 },
    { 0: 123, 1: 456 } & [0, 1],
  ]

  declare const happyPath: [
    { abc: 123 } & { 0: "abc", [size$]: 1 },
    { abc: 123, def: 456 } & { 0: "abc", 1: "def", [size$]: 2 },
  ]
  declare const assoc1: assoc<{ abc: 123; def: 456; } & { 0: "abc", 1: "def" }>
  declare const err1: TypeError<[𝗺𝘀𝗴: "Expected keys to be unique, but encountered 1 or more duplicate keys", 𝗴𝗼𝘁: ["abc"]]>

  type __indices__ = [
    // ^?
    expect<assert.equal<indices<never>, []>>,
    expect<assert.equal<indices<any>, []>>,
    expect<assert.equal<indices<{ [size$]: number }>, []>>,
    expect<assert.equal<indices<{ [size$]: 0 }>, [0]>>,
    expect<assert.equal<indices<{ [size$]: 2 }>, [0, 1, 2]>>,
    /** all that matters is the `size$` property (excess properties are ignored) */
    expect<assert.equal<indices<{ [size$]: 2, abc: 123, def: 456, 0: "abc", 1: "def" }>, [0, 1, 2]>>,
    /** all that matters is the `size$` property (excess properties are ignored) */
    expect<assert.equal<indices<{ [size$]: 3, abc: 123, def: 456, 0: "abc", 1: "def" }>, [0, 1, 2, 3]>>,
  ]

  type __toEntries__ = [
    // ^?
    expect<assert.equal<impl.toEntries<{}, []>, []>>,
    expect<assert.equal<impl.toEntries<{ abc: 123, def: 456 }, []>, []>>,
    expect<assert.equal<impl.toEntries<{ abc: 123, def: 456 }, ["abc", "def"]>, [["abc", 123], ["def", 456]]>>,
    expect<assert.equal<impl.toEntries<{ abc: 123, def: 456 }, ["def", "abc"]>, [["def", 456], ["abc", 123]]>>,
  ]

  describe("assoc", () => {
    // ^?
    return [
      describe("Assoc", t => [
        // ^?
        expect(t.assert.equal(Assoc(["abc", 123], ["def", 456]), assoc1)),
        /* @ts-expect-error: this directive makes sure passing invalid input raises a TypeError */
        expect(t.assert.equal(Assoc(["abc", 123], ["abc", 456]), err1)),
        // /* @ts-expect-error: this directive makes sure passing invalid input raises a TypeError */
        // Assoc(["abc", 123], ["def", 456]),

        // expect(t.assert.equal(Assoc(["abc", 123], ["abc", 456]), err1)),
      ]),
      describe("is", t => {
        // ^?
        type __is__ = [
          // ^?
          // unhappy path
          expect<assert.is.false<Assoc.is<any.array>>>,
          expect<assert.is.false<Assoc.is<[]>>>,
          expect<assert.is.false<Assoc.is<{}>>>,
          expect<assert.is.false<Assoc.is<[] & {}>>>,
          expect<assert.is.false<Assoc.is<[1]>>>,
          expect<assert.is.false<Assoc.is<[1] & { abc: 123 }>>>,
          expect<assert.is.false<Assoc.is<[] & { abc: 123 }>>>,
          expect<assert.is.false<Assoc.is<["abc", "def", "xyz"] & { abc: 123, def: 455, ghi: 789 }>>>,
          expect<assert.is.false<Assoc.is<["abc", "def", "ghii"] & { abc: 123, def: 455, ghi: 789 }>>>,
          expect<assert.is.false<Assoc.is<["abc", "def"] & { abc: 123, def: 455, ghi: 789 }>>>,
          expect<assert.is.false<Assoc.is<["abc"] & { abc: 123 }>>>,
          // happy path
          expect<assert.is.true<Assoc.is<{ [size$]: 1, 0: "abc", abc: 123 }>>>,
          expect<assert.is.true<Assoc.is<{ [size$]: 2, 0: "abc", 1: "def", abc: 123, def: 455 }>>>,
        ]

        return [
          expect(t.assert.is.true(is(happyPath[0]))),
          expect(t.assert.is.true(is(happyPath[1]))),
        ]
      }),

      describe("is (not)", t => [
        //                   ^?
        expect(t.assert.is.false(is(failureCases[0]))),
        expect(t.assert.is.false(is(failureCases[1]))),
        expect(t.assert.is.false(is(failureCases[2]))),
        expect(t.assert.is.false(is(failureCases[3]))),
        expect(t.assert.is.false(is(failureCases[4]))),
        expect(t.assert.is.false(is(failureCases[5]))),
        expect(t.assert.is.false(is(failureCases[6]))),
        expect(t.assert.is.false(is(failureCases[7]))),
        expect(t.assert.is.false(is(failureCases[8]))),
        expect(t.assert.is.false(is(failureCases[9]))),
        expect(t.assert.is.false(is(failureCases[10]))),
      ]),
    ]
  })

  describe("separate", t => {
    type __separate__ = [
      // ^?
      expect<assert.equal<separate<never>, [{}, {}]>>,
      expect<assert.equal<separate<any>, [{}, {}]>>,
      expect<assert.equal<separate<{ [size$]: number }>, [{}, {}]>>,
      expect<assert.equal<separate<{ [size$]: 0 }>, [{}, {}]>>,
      expect<assert.equal<separate<{ [size$]: 1 }>, [{}, {}]>>,
      expect<assert.equal<
        separate<{ abc: 123, def: 456, 0: "abc", 1: "def", [size$]: 2 }>,
        [object: { abc: 123, def: 456 }, order: { 0: "abc", 1: "def" }]
      >>,
      /** 
       * CASE: too many members in `order`
       * handle gracefully by taking the greatest common denominator of `size$`, `order` and `object` 
       */
      expect<assert.equal<
        separate<{ [size$]: 2, abc: 123, def: 456, 0: "abc", 1: "def", 2: "ghi" }>,
        //                                                            🡑🡑🡑🡑🡑
        [object: { abc: 123, def: 456, }, order: { 0: "abc", 1: "def", }]
      >>,
      /** 
       * CASE: `size$` is too high
       * handle gracefully by taking the greatest common denominator of `size$`, `order` and `object` 
       */
      expect<assert.equal<
        separate<{ [size$]: 3, abc: 123, def: 456, 0: "abc", 1: "def" }>,
        //         🡑🡑🡑🡑🡑🡑
        [object: { abc: 123, def: 456, }, order: { 0: "abc", 1: "def", }]
      >>,
      /** 
       * CASE: too many members in `object` 
       * handle gracefully by taking the greatest common denominator of `size$`, `order` and `object`
       */
      expect<assert.equal<
        separate<{ [size$]: 2, abc: 123, def: 456, ghi: 789, 0: "abc", 1: "def" }>,
        //                                        🡑🡑🡑🡑🡑
        [object: { abc: 123, def: 456, }, order: { 0: "abc", 1: "def", }]
      >>,
    ]

    describe("corner cases", t => {
      //                     ^?
      return [
        expect(t.assert.extends<[order: {}, object: {}]>(separate(void 0 as any))),
        expect(t.assert.extends<[order: {}, object: {}]>(separate(void 0 as never))),
        expect(t.assert.extends<[order: {}, object: {}]>(separate({ [size$]: Math.random() }))),
        expect(t.assert.extends<[order: {}, object: {}]>(separate({ [size$]: 0 }))),
        expect(t.assert.extends<[order: {}, object: {}]>(separate({ [size$]: 1 }))),
        expect(t.assert.extends
          <[object: { abc: 123, def: 456 }, order: { 0: "abc", 1: "def" }]>
          (separate({ [size$]: 3, 0: "abc", 1: "def", abc: 123, def: 456 }))
          //          🡑🡑🡑🡑🡑🡑
        ),
        expect(t.assert.extends
          <[object: { abc: 123, def: 456 }, order: { 0: "abc", 1: "def" }]>
          (separate({ [size$]: 2, 0: "abc", 1: "def", 2: "ghi", abc: 123, def: 456 }))
          //                                         🡑🡑🡑🡑🡑
        ),
        expect(t.assert.extends
          <[object: { abc: 123, def: 456 }, order: { 0: "abc", 1: "def" }]>
          (separate(
            { [size$]: 2, 0: "abc", 1: "def", abc: 123, def: 456, ghi: 789 }))
          //                                                     🡑🡑🡑🡑🡑
        ),
      ]
    })

    describe("happy path", t => {
      //                   ^?
      return [
        expect(t.assert.extends
          <[object: { abc: 123, def: 456 }, order: { 0: "abc", 1: "def" }]>
          (separate({ 0: "abc", 1: "def", abc: 123, def: 456, [size$]: 2 })),
        ),
      ]
    })
  })

  type _5 = rangeInclusive<70>["length"]

  type __range__ = [
    // ^?
    expect<assert.equal<rangeInclusive<10>, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>>,
    expect<assert.equal<rangeInclusive<70>["length"], 71>>,
    expect<assert.equal<rangeInclusive<number>, any.array<number>>>,
    expect<assert.equal<rangeExclusive<10>, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>>,
    expect<assert.equal<rangeExclusive<70>["length"], 70>>,
    expect<assert.equal<rangeExclusive<number>, any.array<number>>>,
  ]

  describe("range", t => {
    return [
      expect(t.assert.equal(impl.rangeExclusive(10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])),

    ] as const
    //   ^?
  })
}

const myassoc = Assoc({ abc: 123, def: 456 }, ["abc", "def"])
//    ^?
const two = myassoc[size$]
//    ^?
const abc = myassoc[0]
//    ^?
const def = myassoc[1]
//    ^?
/* @ts-expect-error: tests that accessing an index that doesn't exist raises a TypeError */
const typeError = myassoc[2]
//    ^?
const _123 = myassoc[myassoc[0]]
//    ^?
const _456 = myassoc[myassoc[1]]
//    ^?

const keysInOrder = Assoc.keys(myassoc)
//    ^?

/** TODO: see if you can implement the {@link Symbol.iterator `Symbol.iterator`} protocol in a way that the TS compiler understands */
// const spread = [...myassoc]
