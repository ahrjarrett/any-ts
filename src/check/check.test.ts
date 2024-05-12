import { attest } from "@arktype/attest"
import type { any } from "../any/exports.js"
import type { check, typecheck } from "./check.js"
import { describe, it } from "vitest"



function tuplesOnly<const T extends check.isTuple<T>>(tuple: T): T { return tuple }
function tupleOrThrow<const T extends check.isTuple<T>>(tuple: T): T { return tuple }

function literalsOnly<const T extends check.isLiteral<T>>(literal: T): T { return literal }
function literalOrThrow<const T extends typecheck.isLiteral<T>>(literal: T): T { return literal }

function unionsOnly<const T extends check.isUnion<T>>(union: T): T { return union }
function unionOrThrow<const T extends typecheck.isUnion<T>>(union: T): T { return union }

function noUnions<const T extends check.isNonUnion<T>>(nonUnion: T): T { return nonUnion }
function nonUnionOrThrow<const T extends typecheck.isNonUnion<T>>(nonUnion: T): T { return nonUnion }

function nonTuplesOnly<const T extends check.isNonFiniteArray<T>>(value: T): T { return value }
function nonTupleOrThrow<const T extends typecheck.isNonFiniteArray<T>>(value: T): T { return value }

function nonTuplesWithConstraint<const T extends check.isNonFiniteArray<T, any.primitives>>(value: T): T { return value }
function nonTupleOrThrowWithConstraint<const T extends typecheck.isNonFiniteArray<T, any.primitives>>(value: T): T { return value }

function noLiterals<const T extends check.isNonFiniteLiteral<T>>(value: T): T { return value }
function nonLiteralOrThrow<const T extends typecheck.isNonFiniteLiteral<T>>(value: T): T { return value }

const numbers: any.numbers = [1, 2, 3]
const number: number = 1
const finiteNonPrimitives: [any.matrix, any.objects] = [[[]], [{}]]
const nonfiniteNonPrimitives: any.array<any.matrix | any.objects> = finiteNonPrimitives
const union: 1 | 2 = Math.random() > 0.5 ? 1 : 2

type _3 = check.isTuple<any.numbers>
//   ^?
type _4 = check.isTuple<[1, 2, 3]>
//   ^?
type _5 = check.isTuple<any.numbers>
//   ^?
type _6 = check.isTuple<[1, 2, 3]>
//   ^?

type _7 = check.isNonFiniteArray<any.numbers>
//   ^?
type _8 = check.isNonFiniteArray<[1, 2, 3]>
//   ^?
type _9 = check.isNonFiniteArray<any.numbers>
//   ^?
type _10 = check.isNonFiniteArray<[1, 2, 3]>
//   ^?

const ex_00 = tuplesOnly([1, 2, 3])
//    ^? ✅
const ex_01 = tupleOrThrow([1, 2, 3])
//    ^? ✅
const ex_02 = nonTupleOrThrow(numbers)
//    ^? ✅
const ex_03 = nonLiteralOrThrow(number)
//    ^? ✅
const ex_04 = literalsOnly(1)
//    ^? ✅
const ex_05 = literalOrThrow(1)
//    ^? ✅
const ex_06 = noLiterals(number)
//    ^? ✅
const ex_07 = nonLiteralOrThrow(number)
//    ^? ✅
const ex_08 = noUnions(1)
//    ^? ✅
const ex_09 = nonUnionOrThrow(1)
//    ^? ✅
const ex_10 = nonTuplesOnly(numbers)
//    ^? ✅
const ex_11 = nonTupleOrThrow(numbers)
//    ^? ✅
const ex_12 = nonTuplesWithConstraint(numbers)
//    ^? ✅
const ex_13 = nonTupleOrThrowWithConstraint(numbers)
//    ^? ✅
const ex_14 = unionsOnly(union)
//    ^? ✅
const ex_15 = unionOrThrow(union)
//    ^? ✅

describe("Type errors", () => {
  it("throws with the right error message", () => {
    /** @ts-expect-error: hush, this is why we're here */
    attest(() => tuplesOnly(numbers)).type.errors(
      "Argument of type 'array<number>' is not assignable to parameter of type 'never'"
    )

    /** @ts-expect-error: hush, this is why we're here */
    attest(() => literalsOnly(number)).type.errors(
      "Argument of type 'number' is not assignable to parameter of type 'never'"
    )

    /** @ts-expect-error: hush, this is why we're here */
    attest(() => nonLiteralOrThrow(1)).type.errors(
      `Argument of type 'number' is not assignable to parameter of type `
      + `'TypeError<[msg: "Type cannot be finite: only non-finite strings, numbers or booleans allowed", got: 1]>'`
    )

    /** @ts-expect-error: hush, this is why we're here */
    attest(() => nonTupleOrThrow([1, 2, 3])).type.errors(
      `Type 'number' is not assignable to type '"Type cannot be finite: only non-finite arrays allowed"'`
    )

    /** @ts-expect-error: hush, this is why we're here */
    attest(() => nonTupleOrThrowWithConstraint(nonfiniteNonPrimitives)).type.errors(
      `Argument of type `
      + `'array<array<any_array<unknown>> | array<object_>>' `
      + `is not assignable to parameter of type `
      + `'TypeError<[msg: "Type must be an non-finite array", got: array<array<any_array<unknown>> | array<object_>>]>'`
    )
  })
})
