import type { any } from "../any/exports.js"
import type { assert } from "../test/exports.js"
import { describe, expect } from "../test/exports.js"
import type { mut } from "../mutable/exports.js"
import type { check, TypeError } from "./check.js"

type __Literal__ = [
  // ^?
  expect<assert.equal<check.is.literal<0>, any.literal>>,
  expect<assert.equal<check.is.literal<"">, any.literal>>,
  expect<assert.equal<check.is.literal<false>, any.literal>>,
  expect<assert.equal<check.is.literal<1 | "a">, any.literal>>,
  expect<assert.equal<check.is.literal<true | 1>, any.literal>>,
  expect<assert.equal<check.is.literal<"a" | true>, any.literal>>,
  expect<assert.is.never<check.is.literal<string, any.literal, "shh">>>,
  expect<assert.is.never<check.is.literal<number, any.literal, "shh">>>,
  expect<assert.is.never<check.is.literal<boolean, any.literal, "shh">>>,
  expect<assert.is.never<check.is.literal<string | number, any.literal, "shh">>>,
  expect<assert.is.never<check.is.literal<boolean | string, any.literal, "shh">>>,
  expect<assert.is.never<check.is.literal<number | boolean, any.literal, "shh">>>,
  expect<assert.is.never<check.is.literal<any.literal, any.literal, "shh">>>,
  expect<assert.equivalent<check.is.literal<string>, TypeError<"Expected literal", [got: string]>>>,
  expect<assert.equivalent<check.is.literal<number>, TypeError<"Expected literal", [got: number]>>>,
  expect<assert.equivalent<check.is.literal<boolean>, TypeError<"Expected literal", [got: boolean]>>>,
  expect<assert.equivalent<check.is.literal<string | number>, TypeError<"Expected literal", [got: string | number]>>>,
  expect<assert.equivalent<check.is.literal<string | boolean>, TypeError<"Expected literal", [got: string | boolean]>>>,
  expect<assert.equivalent<check.is.literal<number | boolean>, TypeError<"Expected literal", [got: number | boolean]>>>,
  expect<assert.equivalent<check.is.literal<any.literal>, TypeError<"Expected literal", [got: any.literal]>>>,
]

declare function noLiterals<type extends check.non.literal<type>>(type: type): type

declare function noLiteralsConstrained<constraint extends any.literal = never>():
  <type extends check.non.literal<type, constraint>>(type: type) => type
declare function noLiteralsConstrained<constraint extends any.literal>(constraint: constraint):
  <type extends check.non.literal<type, constraint>>(type: type) => type

declare function noLiteralsConstrainedShh<constraint extends any.literal = never>():
  <type extends check.non.literal<type, constraint, "shh">>(type: type) => type
declare function noLiteralsConstrainedShh<constraint extends any.literal>(constraint: constraint):
  <type extends check.non.literal<type, constraint, "shh">>(type: type) => type

declare function noLiteralsShh<type extends check.non.literal<type, "shh", any.literal>>(type: type): type

declare function onlyLiterals<type extends check.is.literal<type>>(type: type): type
declare function onlyUnions<type extends check.is.union<type>>(type: type): type
declare function onlyNonUnions<type extends check.non.union<type>>(type: type): type

declare const union: 1 | 2
declare const nonunion: 1
declare const boolean: boolean
declare const string: string
declare const number: number

declare const sn: string | number
declare const bn: number | boolean
declare const sb: string | boolean
declare const never: never

declare namespace lit {
  export const string: "string literal"
  export const number: 9000
  export const boolean: false
  export const sn: "string literal" | 9000
  export const sb: "string literal" | false
  export const bn: false | 9000
  export const sbn: "string literal" | false | 9000
  const true_: true
  const false_: false
  export { true_ as true, false_ as false }
}

declare namespace nonfinite {
  const string: string
  const number: number
  const boolean: boolean
  const sn: string | number
  const sb: string | boolean
  const bn: boolean | number
  const literal: any.literal
}

declare namespace mixed {
  const finiteString: "string literal" | number | boolean
  const finiteNumber: string | 9000 | boolean
  const finiteBoolean: string | number | false
}

const flipCoin = <const left, const right>(left: left, right: right) => Math.random() > 0.5 ? left : right

interface typeError {
  <msg extends string, const arg>(msg: msg, arg: arg): TypeError<msg, [arg]>
  <msg extends string, const arg1, const arg2>(msg: msg, arg1: arg1, arg2: arg2): TypeError<msg, [arg1, arg2]>
}

declare const typeError: TypeError.signature

describe("check", () => [
  // ^?
  describe("is.non.literal", t => [
    // ^?
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: false]>
        lit.boolean
      ),
      typeError("Expected non-literal", false)
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'string' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: "string literal"]>
        lit.string
      ),
      typeError("Expected non-literal", "string literal")
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: true]>
        lit.true
      ),
      typeError("Expected non-literal", true)
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: false]>
        lit.false
      ),
      typeError("Expected non-literal", false)
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: 9000]>
        lit.number
      ),
      typeError("Expected non-literal", 9000)
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: "string literal"]>
        lit.string
      ),
      typeError("Expected non-literal", "string literal")
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: "string literal"]>
        lit.string
      ),
      typeError("Expected non-literal", "string literal")
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: false | 9000]>
        lit.bn
      ),
      typeError("Expected non-literal", flipCoin(false, 9000))
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: false | "string literal"]>
        lit.sb
      ),
      typeError("Expected non-literal", flipCoin(false, "string literal"))
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: "string literal" | 9000]>
        lit.sn
      ),
      typeError("Expected non-literal", flipCoin(9000, "string literal"))
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: false | "string literal" | 9000]>
        lit.sbn
      ),
      typeError("Expected non-literal", flipCoin(flipCoin(false, "string literal"), 9000))
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: false]>
        mixed.finiteBoolean
      ),
      typeError("Expected non-literal", false)
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: 9000]>
        mixed.finiteNumber
      ),
      typeError("Expected non-literal", 9000)
    )),
    expect(t.assert.equal(
      noLiterals(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: "string literal"]>
        mixed.finiteString
      ),
      typeError("Expected non-literal", "string literal")
    )),
    expect(t.assert.equal(noLiterals(nonfinite.bn), nonfinite.bn)),
    expect(t.assert.equal(noLiterals(nonfinite.boolean), nonfinite.boolean)),
    expect(t.assert.equal(noLiterals(nonfinite.literal), nonfinite.literal)),
    expect(t.assert.equal(noLiterals(nonfinite.number), nonfinite.number)),
    expect(t.assert.equal(noLiterals(nonfinite.sb), nonfinite.sb)),
    expect(t.assert.equal(noLiterals(nonfinite.sn), nonfinite.sn)),
    expect(t.assert.equal(noLiterals(nonfinite.string), nonfinite.string)),
  ] as const),

  describe("is.non.literal<silent>", t => [
    // ^?
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: false]>
        lit.boolean
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'string' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: "string literal"]>
        lit.string
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: true]>
        lit.true
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: false]>
        lit.false
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: 9000]>
        lit.number
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: "string literal"]>
        lit.string
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: "string literal"]>
        lit.string
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: false | 9000]>
        lit.bn
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: false | "string literal"]>
        lit.sb
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: "string literal" | 9000]>
        lit.sn
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: false | "string literal" | 9000]>
        lit.sbn
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: false]>
        mixed.finiteBoolean
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: 9000]>
        mixed.finiteNumber
      ),
    )),
    expect(t.assert.is.never(
      noLiteralsShh(
        // @ts-expect-error: 
        // Argument of type 'boolean' is not assignable to parameter of type 
        // TypeError<"Expected non-literal", [got: "string literal"]>
        mixed.finiteString
      ),
    )),
    expect(t.assert.equal(noLiteralsShh(nonfinite.bn), nonfinite.bn)),
    expect(t.assert.equal(noLiteralsShh(nonfinite.boolean), nonfinite.boolean)),
    expect(t.assert.equal(noLiteralsShh(nonfinite.literal), nonfinite.literal)),
    expect(t.assert.equal(noLiteralsShh(nonfinite.number), nonfinite.number)),
    expect(t.assert.equal(noLiteralsShh(nonfinite.sb), nonfinite.sb)),
    expect(t.assert.equal(noLiteralsShh(nonfinite.sn), nonfinite.sn)),
    expect(t.assert.equal(noLiteralsShh(nonfinite.string), nonfinite.string)),
  ] as const),

  describe("is.literal", t => [
    expect(t.assert.equal(onlyLiterals(lit.bn), lit.bn)),
    expect(t.assert.equal(onlyLiterals(lit.boolean), lit.boolean)),
    expect(t.assert.equal(onlyLiterals(lit.false), lit.false)),
    expect(t.assert.equal(onlyLiterals(lit.number), lit.number)),
    expect(t.assert.equal(onlyLiterals(lit.sb), lit.sb)),
    expect(t.assert.equal(onlyLiterals(lit.sbn), lit.sbn)),
    expect(t.assert.equal(onlyLiterals(lit.sn), lit.sn)),
    expect(t.assert.equal(onlyLiterals(lit.string), lit.string)),
    expect(t.assert.equal(onlyLiterals(lit.true), lit.true)),
    expect(t.assert.equal(
      onlyLiterals(
        // @ts-expect-error:
        // Argument of type 'string | number | false' is not assignable to parameter of type 
        // TypeError<"Expected literal", [got: string | number]>
        mixed.finiteBoolean
      ),
      typeError("Expected literal", flipCoin(string, number))
    )),
    expect(t.assert.equal(
      onlyLiterals(
        // @ts-expect-error:
        // Argument of type 'string | number | false' is not assignable to parameter of type 
        // TypeError<"Expected literal", [got: string | boolean]>
        mixed.finiteNumber
      ),
      typeError("Expected literal", flipCoin(string, boolean))
    )),
    expect(t.assert.equal(
      onlyLiterals(
        // @ts-expect-error:
        // Argument of type 'string | number | false' is not assignable to parameter of type 
        // TypeError<"Expected literal", [got: number | boolean]>
        mixed.finiteString
      ),
      typeError("Expected literal", flipCoin(number, boolean))
    )),
    expect(t.assert.equal(
      onlyLiterals(
        // @ts-expect-error:
        // Argument of type 'string | number | false' is not assignable to parameter of type 
        // TypeError<"Expected literal", [got: number | boolean]>
        nonfinite.bn
      ),
      typeError("Expected literal", flipCoin(number, boolean))
    )),
    expect(t.assert.equal(
      onlyLiterals(
        // @ts-expect-error:
        // Argument of type 'string | number | false' is not assignable to parameter of type 
        // TypeError<"Expected literal", [got: boolean]>
        nonfinite.boolean
      ),
      typeError("Expected literal", boolean)
    )),
    expect(t.assert.equal(
      onlyLiterals(
        // @ts-expect-error:
        // Argument of type 'string | number | false' is not assignable to parameter of type 
        // TypeError<"Expected literal", [got: string | number | boolean]>
        nonfinite.literal
      ),
      typeError("Expected literal", flipCoin(flipCoin(boolean, string), number))
    )),
    expect(t.assert.equal(
      onlyLiterals(
        // @ts-expect-error:
        // Argument of type 'string | number | false' is not assignable to parameter of type 
        // TypeError<"Expected literal", [got: number]>
        nonfinite.number
      ),
      typeError("Expected literal", number)
    )),
    expect(t.assert.equal(
      onlyLiterals(
        // @ts-expect-error:
        // Argument of type 'string | number | false' is not assignable to parameter of type 
        // TypeError<"Expected literal", [got: string | boolean]>
        nonfinite.sb
      ),
      typeError("Expected literal", flipCoin(string, boolean))
    )),
    expect(t.assert.equal(
      onlyLiterals(
        // @ts-expect-error:
        // Argument of type 'string | number | false' is not assignable to parameter of type 
        // TypeError<"Expected literal", [got: string | number]>
        nonfinite.sn
      ),
      typeError("Expected literal", flipCoin(string, number))
    )),
    expect(t.assert.equal(
      onlyLiterals(
        // @ts-expect-error:
        // Argument of type 'string | number | false' is not assignable to parameter of type 
        // TypeError<"Expected literal", [got: string]>
        nonfinite.string
      ),
      typeError("Expected literal", string)
    )),
  ])
])

type __NonArrayObject__ = [
  // ^?
  expect<assert.equal<check.non.array<{}>, any.object>>,
  expect<assert.equal<check.non.array<{ abc: 123 }>, any.object>>,
  expect<assert.equivalent<
    check.non.array<[] | { abc: 123 }>,
    TypeError<"Expected `type` to be a non-array, but one of its members was an array", [[]]>
  >>,
  expect<assert.equivalent<
    check.non.array<any.array>,
    TypeError<
      "Expected `type` to be a non-array, but got an array",
      [any.array<unknown>]
    >
  >>,
  expect<assert.equivalent<
    check.non.array<mut.array>,
    TypeError<"Expected `type` to be a non-array, but got an array", [mut.array]>
  >>,
  expect<assert.equivalent<
    check.non.array<readonly 1[]>,
    TypeError<"Expected `type` to be a non-array, but got an array", [readonly 1[]]>
  >>,
  expect<assert.equivalent<
    check.non.array<1[]>,
    TypeError<"Expected `type` to be a non-array, but got an array", [1[]]>
  >>,
  expect<assert.equivalent<
    check.non.array<readonly []>,
    TypeError<"Expected `type` to be a non-array, but got an array", [readonly []]>
  >>,
  expect<assert.equivalent<
    check.non.array<[]>,
    TypeError<"Expected `type` to be a non-array, but got an array", [[]]>
  >>,
]

type __check_tuple__ = [
  // ^?
  // happy path
  expect<assert.equal<check.is.tuple<[1, 2, 3]>, any.array>>,
  expect<assert.equal<check.is.tuple<[1, 2, 3], number[]>, number[]>>,
  // unhappy path
  expect<assert.equal<check.is.tuple<[1, 2, 3], string[]>, never>>,
  expect<assert.equal<check.is.tuple<1[], any.array>, TypeError<"Expected a tuple", [got: 1[]]>>>,
  expect<assert.equal<check.is.tuple<2[], number[]>, TypeError<"Expected a tuple", [got: 2[]]>>>,
  expect<assert.equal<check.is.tuple<2[], string[]>, TypeError<"Expected a tuple", [got: 2[]]>>>,
]
