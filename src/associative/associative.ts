export {
  Assoc as assoc,
}

import type { any } from "../any-namespace"
import { assert, describe, expect } from "../test/exports"
import type { TypeError } from "../err/exports"
import type { Universal } from "../universal/exports"
import type { cache } from "../cache/exports"
import type { enforce } from "../err/enforce"
import type { never } from "../semantic-never/exports"
import { real } from "../number/real"

const len$: unique symbol = Symbol.for("any-ts/associative::len$")
type len$ = typeof len$

declare namespace impl {
  type parseNumeric<type> = type extends `${infer x extends number}` ? x : never
  type asArraylike<type extends any.array> = never | { [ix in "length" | Extract<keyof type, `${number}`>]: type[ix] }

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

  type is<type extends { [len$]: number }>
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
  : <const type>(type: type) => Assoc.is<type>

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
  : <const type extends { [len$]: number }>(type: type) => indices<type>

type rangeInclusive<maxInclusive extends number>
  = number extends maxInclusive ? any.array<number>
  : [maxInclusive] extends [keyof cache.next.next]
  ? cache.next.next[maxInclusive] extends any.list<infer unknowns>
  ? { [ix in keyof unknowns]: impl.parseNumeric<ix> }
  : never.close.inline_var<"unknowns">
  : impl.rangeInclusive<[], maxInclusive>
  ;

type rangeExclusive<maxExclusive extends number>
  = number extends maxExclusive ? any.array<number>
  : [maxExclusive] extends [keyof cache.curr.curr]
  ? cache.curr.curr[maxExclusive] extends any.list<infer unknowns>
  ? { [ix in keyof unknowns]: impl.parseNumeric<ix> }
  : never.close.inline_var<"unknowns">
  : impl.rangeExclusive<[], maxExclusive>
  ;

type indices<type extends { [len$]: number }>
  = [type[len$]] extends [never] ? []
  : number extends type[len$] ? []
  : rangeInclusive<type[len$]>
  ;

type separate<type extends { [len$]: number }>
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
    order: { [k in ix]: type[k] },
    object: { [k in type[ix] & keyof type]: type[k] }
  ]
  : never.close.unmatched_expr
  : never.close.inline_var<"ix">
  : never.close.inline_var<"index">
  ;

declare const separate
  : <const type extends { [len$]: number }>(type: type) => separate<type>

type is<type>
  = [type] extends [{ [len$]: number }]
  ? Exclude<type, any.array> extends infer nonArray
  ? [nonArray] extends [never] ? false
  : impl.is<type>
  : false
  : false
  ;

/* @ts-expect-error - internal use only */
class assoc<const type extends object> extends impl.base<type> { }
type associative<type extends any.entries> = make<type, any.entries, Assoc<of<type>>>

type Assoc<type extends readonly [any.type, any.array]> = never | assoc<type[0] & impl.asArraylike<type[1]>>
declare function Assoc
  <const type extends any.entries & enforce.uniqNonNumericIndex<type>>(...type: type): associative<type>
declare function Assoc
  <const type extends any.object, const order extends any.array<keyof type>>(type: type, order: order): associative<impl.toEntries<type, order>>

const __test_1__ = Assoc({ abc: 123, def: 456 }, ["abc", "def"])
const __test_2__ = Assoc(["abc", 123], [0, 456])

declare namespace Assoc {
  export {
    is,
    separate,
    indices,
    rangeInclusive as range,
  }
}

namespace assoc {
  Assoc.is = is
  Assoc.separate = separate
  Assoc.indices = indices
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

  type __ = ({ 0: 123, 1: 456 } & [0, 1]) extends [any.array] ? true : false

  declare const happyPath: [
    { abc: 123 } & { 0: "abc", [len$]: 1 },
    { abc: 123, def: 456 } & { 0: "abc", 1: "def", [len$]: 2 },
  ]
  declare const assoc1: assoc<{ abc: 123; def: 456; } & { 0: "abc", 1: "def" }>
  declare const err1: TypeError<[𝗺𝘀𝗴: "Expected keys to be unique, but encountered 1 or more duplicate keys", 𝗴𝗼𝘁: ["abc"]]>

  type __indices__ = [
    // ^?
    expect<assert.equal<indices<never>, []>>,
    expect<assert.equal<indices<any>, []>>,
    expect<assert.equal<indices<{ [len$]: number }>, []>>,
    expect<assert.equal<indices<{ [len$]: 0 }>, [0]>>,
    expect<assert.equal<indices<{ [len$]: 2 }>, [0, 1, 2]>>,
    // all that matters is the "length" property (excess properties are ignored)
    expect<assert.equal<indices<{ [len$]: 2, abc: 123, def: 456, 0: "abc", 1: "def" }>, [0, 1, 2]>>,
    // all that matters is the "length" property (excess properties are ignored)
    expect<assert.equal<indices<{ [len$]: 3, abc: 123, def: 456, 0: "abc", 1: "def" }>, [0, 1, 2, 3]>>,
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
      ]),
      describe("is", t => {
        // ^?
        type __is__ = [
          // ^?
          /* 𝖈𝖚𝖗𝖘𝖊𝖉 */
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
          // correct
          expect<assert.is.true<Assoc.is<{ [len$]: 1, 0: "abc", abc: 123 }>>>,
          expect<assert.is.true<Assoc.is<{ [len$]: 2, 0: "abc", 1: "def", abc: 123, def: 455 }>>>,
        ]

        return [
          expect(t.assert.is.true(is(happyPath[0]))),
          expect(t.assert.is.true(is(happyPath[1]))),
        ]
      }),

      describe("is (not)", t => [
        // ^?
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
      expect<assert.equal<separate<{ [len$]: number }>, [{}, {}]>>,
      expect<assert.equal<separate<{ [len$]: 0 }>, [{}, {}]>>,
      expect<assert.equal<separate<{ [len$]: 1 }>, [{}, {}]>>,
      expect<assert.equal<
        separate<{ abc: 123, def: 456, 0: "abc", 1: "def", [len$]: 2 }>,
        [order: { 0: "abc", 1: "def" }, object: { abc: 123, def: 456 }]
      >>,
      /** 
       * CASE: too many members in `order`
       * handle gracefully by taking the greatest common denominator of `len$`, `order` and `object` 
       */
      expect<assert.equal<
        separate<{ [len$]: 2, abc: 123, def: 456, 0: "abc", 1: "def", 2: "ghi" }>,
        //                                                            🡑🡑🡑🡑🡑
        [order: { 0: "abc", 1: "def", }, object: { abc: 123, def: 456, }]
      >>,
      /** 
       * CASE: `len$` is too high
       * handle gracefully by taking the greatest common denominator of `len$`, `order` and `object` 
       */
      expect<assert.equal<
        separate<{ [len$]: 3, abc: 123, def: 456, 0: "abc", 1: "def" }>,
        //         🡑🡑🡑🡑🡑🡑
        [order: { 0: "abc", 1: "def", }, object: { abc: 123, def: 456, }]
      >>,
      /** 
       * CASE: too many members in `object` 
       * handle gracefully by taking the greatest common denominator of `len$`, `order` and `object`
       */
      expect<assert.equal<
        separate<{ [len$]: 2, abc: 123, def: 456, ghi: 789, 0: "abc", 1: "def" }>,
        //                                        🡑🡑🡑🡑🡑
        [order: { 0: "abc", 1: "def", }, object: { abc: 123, def: 456, }]
      >>,
    ]

    describe("corner cases", t => {
      return [
        expect(t.assert.extends<[order: {}, object: {}]>(separate(void 0 as any))),
        expect(t.assert.extends<[order: {}, object: {}]>(separate(void 0 as never))),
        expect(t.assert.extends<[order: {}, object: {}]>(separate({ [len$]: Math.random() }))),
        expect(t.assert.extends<[order: {}, object: {}]>(separate({ [len$]: 0 }))),
        expect(t.assert.extends<[order: {}, object: {}]>(separate({ [len$]: 1 }))),
        expect(t.assert.extends
          <[order: { 0: "abc", 1: "def" }, object: { abc: 123, def: 456 }]>
          (separate({ [len$]: 3, 0: "abc", 1: "def", abc: 123, def: 456 }))
          //          🡑🡑🡑🡑🡑🡑
        ),
        expect(t.assert.extends
          <[order: { 0: "abc", 1: "def" }, object: { abc: 123, def: 456 }]>
          (separate({ [len$]: 2, 0: "abc", 1: "def", 2: "ghi", abc: 123, def: 456 }))
          //                                         🡑🡑🡑🡑🡑
        ),
        expect(t.assert.extends
          <[order: { 0: "abc", 1: "def" }, object: { abc: 123, def: 456 }]>
          (separate(
            { [len$]: 2, 0: "abc", 1: "def", abc: 123, def: 456, ghi: 789 }))
          //                                                     🡑🡑🡑🡑🡑
        ),
      ] as const
      //   ^?
    })

    describe("happy path", t => {
      return [
        expect(t.assert.extends
          <[order: { 0: "abc", 1: "def" }, object: { abc: 123, def: 456 }]>
          (separate({ 0: "abc", 1: "def", abc: 123, def: 456, [len$]: 2 })),
        ),
      ] as const
      //   ^?
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
