/** term-level import */ import { describe, expect } from "../test/exports.js"

import type { any } from "../any/exports.js"
import type { nonempty } from "../empty.js"

import type { Catch } from "./catch.js"
import type { mut } from "../mutable/exports.js"

declare const tuple: [[1, 2], [3, 4]]
declare const unionNontuple: number[] | string[]
declare const unionTuple:
  | [[1, 2], [3, 4]]
  | [[4, 5], [6, 7]]
declare const nontuple: number[]

declare function testUnion<const xss extends Catch.union<xss, any.array<nonempty.array>>>(xss: xss): mut<["catch_union", xss]>
declare function testUnion<const xss extends Catch.union<xss, any.array<nonempty.array>>>(...xss: xss): mut<["catch_union", xss]>
declare function testUnion<const xss extends Catch.nonunion<xss, any.array<nonempty.array>>>(xss: xss): mut<["catch_nonunion", xss]>
declare function testUnion<const xss extends Catch.nonunion<xss, any.array<nonempty.array>>>(...xss: xss): mut<["catch_nonunion", xss]>

declare function testTuple<const xs extends Catch.nonunion<Catch.tuple<xs, any.array>, any.array>>(xs: xs): mut<["catch_tuple", xs]>
declare function testTuple<const xs extends Catch.tuple<xs, any.array>>(xs: xs): mut<["catch_union_tuple", xs]>
declare function testTuple<const xs extends Catch.nontuple<Catch.union<xs, any.array>, any.array>>(xs: xs): mut<["catch_union_nontuple", xs]>
declare function testTuple<const xs extends Catch.nontuple<xs, any.array>>(xs: xs): mut<["catch_nontuple", xs]>

declare function testTuple<const xs extends Catch.nontuple<Catch.union<xs, any.array>, any.array>>(...xs: xs): mut<["catch_union_nontuple", xs]>
declare function testTuple<const xs extends Catch.tuple<xs, any.array>>(...xs: xs): mut<["catch_tuple", xs]>
declare function testTuple<const xs extends Catch.nontuple<xs, any.array>>(...xs: xs): mut<["catch_nontuple", xs]>
declare function testTuple<const xs extends Catch.union<Catch.tuple<xs, any.array>, any.array>>(...xs: xs): mut<["catch_union_tuple", xs]>

declare const nonliteral: string
declare const literal: "hey"
declare function testLiteral<type extends Catch.nonliteral<type>>(literal: type): ["nonliteral", type]
declare function testLiteral<type extends Catch.literal<type>>(literal: type): ["literal", type]

namespace Spec {
  /** @internal - exported for testing, should never be included in the bundle */
  function $_mut<const type>(type: type): mut<type> { return type as never }

  describe("Catch", () => [
    // ^?
    describe("union", t => [
      expect(t.assert.equal(testUnion(unionTuple), $_mut(["catch_union", unionTuple]))),
      expect(t.assert.equal(testUnion(...unionTuple), $_mut(["catch_union", unionTuple]))),
    ] as const),
    describe("nonunion", t => [
      expect(t.assert.equal(testUnion(tuple), $_mut(["catch_nonunion", tuple]))),
      expect(t.assert.equal(testUnion(...tuple), $_mut(["catch_nonunion", tuple]))),
    ] as const),

    describe("tuple", t => [
      expect(t.assert.equal(testTuple(tuple), $_mut(["catch_tuple", tuple]))),
      expect(t.assert.equal(testTuple(...tuple), $_mut(["catch_tuple", tuple]))),
    ]),
    describe("nontuple", t => [
      expect(t.assert.equal(testTuple(nontuple), $_mut(["catch_nontuple", nontuple]))),
      expect(t.assert.equal(testTuple(...nontuple), $_mut(["catch_nontuple", nontuple]))),
    ]),

    describe("unionNontuple", t => [
      expect(t.assert.equal(testTuple(unionNontuple), $_mut(["catch_union_nontuple", unionNontuple]))),
      expect(t.assert.equal(testTuple(...unionNontuple), $_mut(["catch_union_nontuple", unionNontuple]))),
    ]),

    describe("literal", t => [
      expect(t.assert.equal(testLiteral(literal), $_mut(["literal", literal]))),
    ]),
    describe("nonliteral", t => [
      expect(t.assert.equal(testLiteral(nonliteral), $_mut(["nonliteral", nonliteral]))),
    ]),
  ] as const)

  // TODO: figure out if you can pull this off
  // describe("unionTuple", t => [
  //   expect(t.assert.equal(testTuple(unionTuple), $_mut(["catch_union_tuple", unionTuple]))),
  //   expect(t.assert.equal(testTuple(...unionTuple), $_mut(["catch_union_tuple", unionTuple]))),
  // ]),

  //   ^?
}
