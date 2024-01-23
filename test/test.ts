export {
  assert,
  expect,
  phantomUri,
}

import { type any } from "../src/exports"

type interpretFailure<fn extends Interpreter, left, right> = (fn & { 0: left, 1: right })[-1];
interface Interpreter { [-1]: unknown, [0]: unknown, [1]: unknown }

declare namespace interpreter {
  type trueLiteral<type extends { [0]: unknown }> = never | [𝐧𝐨𝐭_𝐭𝐫𝐮𝐞: type[0]]
  type falseLiteral<type extends { [0]: unknown }> = never | [𝐧𝐨𝐭_𝐟𝐚𝐥𝐬𝐞: type[0]]
  type point<map extends { [0]: unknown, [1]: unknown }> = never | [𝐥𝐞𝐟𝐭: map[0], 𝐫𝐢𝐠𝐡𝐭: map[1]]
  type equal<map extends { [0]: unknown, [1]: unknown }> = never | [𝐧𝐨𝐭_𝐞𝐪𝐮𝐚𝐥: point<map>]
  type equivalent<map extends { [0]: unknown, [1]: unknown }> = never | [𝐧𝐨𝐭_𝐞𝐪: point<map>]
  type not_equivalent<map extends { [0]: unknown, [1]: unknown }> = never | [𝐮𝐧𝐞𝐱𝐩𝐞𝐜𝐭𝐞𝐝_𝐞𝐪: point<map>]
  type not_equal<map extends { [0]: unknown, [1]: unknown }> = never | [𝐮𝐧𝐞𝐱𝐩𝐞𝐜𝐭𝐞𝐝_𝐞𝐪𝐮𝐚𝐥: point<map>]
}

interface Equal extends Interpreter { [-1]: interpreter.equal<this> }
interface Equivalent extends Interpreter { [-1]: interpreter.equivalent<this> }
interface NotEquivalent extends Interpreter { [-1]: interpreter.not_equivalent<this> }
interface NotEqual extends Interpreter { [-1]: interpreter.not_equal<this> }
interface TrueLiteral extends Interpreter { [-1]: interpreter.trueLiteral<this> }
interface FalseLiteral extends Interpreter { [-1]: interpreter.falseLiteral<this> }

declare namespace relation {
  type illegalState = typeof illegalState
  const illegalState: unique symbol
  type not<type extends boolean>
    = [type] extends [true] ? false
    : [type] extends [false] ? true
    : illegalState
    ;

  type notEquivalent<a, b> = not<equivalent<a, b>>
  type notEqual<a, b> = not<equal<a, b>>
  type equivalent<a, b> = [a, b] extends [b, a] ? true : false
  type equal<a, b> =
    (<fix>() => fix extends a ? 1 : 2) extends
    (<fix>() => fix extends b ? 1 : 2) ? true : false
    ;
}

declare const assert: {
  isTrue<const type>(type: type): assert.isTrue<type>
  isFalse<const type>(type: type): assert.isFalse<type>
  equal<const a, const b, fn extends Interpreter = Equal>(a: a, b: b, fn?: fn): assert.equal<a, b, fn>
  equivalent<const a, const b, fn extends Interpreter = Equivalent>(a: a, b: b, fn?: fn): assert.equivalent<a, b, fn>
  notEquivalent<const a, const b, fn extends Interpreter = NotEquivalent>(a: a, b: b, fn?: fn): assert.notEquivalent<a, b, fn>
  notEqual<const a, const b, fn extends Interpreter = NotEqual>(a: a, b: b, fn?: fn): assert.notEqual<a, b, fn>
}
declare namespace assert {
  type isTrue<type> = [true] extends [type] ? "✅" : interpretFailure<TrueLiteral, type, never>
  type isFalse<type> = [false] extends [type] ? "✅" : interpretFailure<FalseLiteral, type, never>
  type equal<a, b, fn extends Interpreter = Equal> = [relation.equal<a, b>] extends [true] ? "✅" : interpretFailure<fn, a, b>
  type equivalent<a, b, fn extends Interpreter = Equivalent> = [relation.equivalent<a, b>] extends [true] ? "✅" : interpretFailure<fn, a, b>
  type notEquivalent<a, b, fn extends Interpreter = NotEquivalent> = [relation.notEquivalent<a, b>] extends [true] ? "✅" : interpretFailure<fn, a, b>
  type notEqual<a, b, fn extends Interpreter = NotEqual> = [relation.notEqual<a, b>] extends [true] ? "✅" : interpretFailure<fn, a, b>
}

type _1 = expect<assert.equal<{ a: 1 }, { a: 1 }>>
//   ^?

const _1 = expect(assert.equal({ a: 1 }, { a: 1 }))
//    ^?

/** @ts-expect-error: testing to make sure comparing 2 unequal values raises a TypeError */
type _2 = expect<assert.equal<{ a: 1 }, { a: 2 }>>
//   ^?

/** @ts-expect-error: testing to make sure comparing 2 unequal values raises a TypeError */
const _2 = expect(assert.equal({ a: 1 }, { a: 2 }))
//    ^?


type expect<type extends [type] extends ["✅"] ? "✅" : never> = type

declare const phantomUri: unique symbol
type phantomUri = typeof phantomUri

declare const expect
  : {
    /** 
     * This overload is the trick to getting the type of `type` to come through:
     * by having the first overload be unsatisfiable
     */
    <const type>(type: type, _skip: never): ["🚫", type]
    <const type extends "✅">(type: type): type
  }
  ;

type _30 = [
  // ^?
  expect<assert.equivalent<any.type, unknown>>,
  expect<assert.equivalent<any.object, object>>,
  /* @ts-expect-error `any.type` and `unknown` are equivalent, but not strictly equal */
  expect<assert.equal<any.type, unknown>>,
  /* @ts-expect-error `any.object` and `object` are equivalent, but not strictly equal */
  expect<assert.equal<any.object, object>>,
]

type containsEvery<queries extends { [ix: string]: string }, text extends string, acc extends any.array = []>
  = text extends `` ? [keyof queries] extends [never] ? true : false
  : [keyof queries] extends [never] ? true
  : text extends `${infer head}{{${infer keyword}}}${infer tail}`
  ? keyword extends keyof queries ? containsEvery<Omit<queries, keyword>, tail, [...acc, keyword]>
  : containsEvery<queries, tail, acc>
  : false
  ;

type __contains__ = [
  containsEvery<{ mm: "mm", dd: "dd", yyyy: "yyyy" }, `hey{{hey}}today is {{mm}}/{{dd}}/{{yyyy}} how about that?`>,
  containsEvery<{ abc: "abc", def: "def", ghi: "ghi" }, "hey{{ab}}you{{def}}how{{ghi}}are{{you}}today?">,
  containsEvery<{ xyz: "xyz" }, "">,
  containsEvery<{}, "">,
  containsEvery<{ a: "1" }, "">,
  containsEvery<{ lets: "hey", "w": "nope" }, "heyho{{lets}}go">,
  containsEvery<{ lets: "hey" }, "{{lets}}go">,
  containsEvery<{ lets: "hey" }, "hey {{lets}}">,
  containsEvery<{ lets: "hey" }, "{{lets}}">,
]
