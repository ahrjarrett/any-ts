export {
  assert,
  describe,
  expect,
  expectToFail,
}

import type { any } from "../any-namespace"
import type { Case, TypeError } from "../err/exports"

import * as Sym from "./symbol"
import type { never } from "../exports"

interface Suite {
  assert: typeof assert
}

type byPos<type extends any.array, failures extends any.object = {}, ix extends void[] = []>
  = type extends readonly [] ? [keyof failures] extends [never] ? Sym.GreenEmoji : eval<failures>
  : type extends readonly [infer head, ...infer tail]
  ? byPos<
    tail,
    [Sym.GreenEmoji] extends [head] ? failures
    : failures & { [x in `#${ix["length"]}`]: head },
    [...ix, void]
  >
  : never
  ;

type byName<type extends any.object>
  = (
    keyof type extends infer key
    ? key extends keyof type
    ? type[key] extends Sym.GreenEmoji
    ? never.as_identity
    : key
    : never.close.distributive<"key">
    : never.close.inline_var<"key">
  ) extends infer key ? [key] extends [keyof type]
  ? { [k in key]: type[k] }
  : never
  : never
  ;

interface TestResult<type> { }

type eval<type> = never | { [ix in keyof type]: type[ix] }

const describe: Describe = (_title: string, _t: (suite: Suite) => unknown) => undefined as never

interface Describe {
  <title extends string, const results extends any.array>(title: title, t: (suite: Suite) => results): TestResult<byPos<results>>
  <title extends string, const results extends any.object>(title: title, t: (suite: Suite) => results): TestResult<byName<results>>
  <title extends string, const result>(title: title, t: (suite: Suite) => result): TestResult<byPos<[result]>>
  <title extends string>(title: title, t: (suite: Suite) => void): void
}

type expect<type extends [type] extends [Sym.GreenEmoji] ? Sym.GreenEmoji : never> = type

declare const expect
  : {
    /** 
     * The first overload is intentionally unsatisfiable. This is the trick to
     * getting the type of `type` to "come through" when the assertion fails
     * (otherwise on invalid input TS chooses the second overload, and since 
     * `type` can only be {@link Sym.GreenEmoji}, we lose access to the type
     * that triggered the invalid state
     */
    <const type>(type: type, _skip: never): [Sym.RedEmoji, type]
    <const type extends Sym.GreenEmoji>(type: type): type
  }


declare const expectToFail
  : {
    /** 
     * The first overload is intentionally unsatisfiable. This is the trick to
     * getting the type of `type` to "come through" when the assertion fails
     * (otherwise on invalid input TS chooses the second overload, and since 
     * `type` can only be {@link Sym.GreenEmoji}, we lose access to the type
     * that triggered the invalid state
     */
    <const type>(type: type, _skip: never): [Sym.GreenEmoji] extends [type] ? TypeError<[Sym.RedEmoji, Case.ExpectedFailure]> : type
    <const type extends [type] extends [Sym.GreenEmoji] ? TypeError<[Sym.RedEmoji, Case.ExpectedFailure]> : unknown>(type: type): Sym.GreenEmoji
  }

declare const assert: {
  is: {
    true<type>(type: type): assert.is.true<type>
    false<type>(type: type): assert.is.false<type>
    never<type>(type: type): assert.is.never<type>
    unknown<type>(type: type): assert.is.unknown<type>
  }
  equal: {
    <const a, const b, fn extends Interpreter = Equal>(a: a, b: b, fn?: fn): assert.equal<a, b, fn>
    <const b>(b: b): <const a, fn extends Interpreter = Equal>(a: a, fn?: fn) => assert.equal<a, b, fn>
  }
  equivalent: {
    <const a, const b, fn extends Interpreter = Equivalent>(a: a, b: b, fn?: fn): assert.equivalent<a, b, fn>
    <const b>(b: b): <const a, fn extends Interpreter = Equivalent>(a: a, fn?: fn) => assert.equivalent<a, b, fn>
  }
  not: {
    equal: {
      <const a, const b, fn extends Interpreter = NotEqual>(a: a, b: b, fn?: fn): assert.not.equal<a, b, fn>
      <const b>(b: b): <const a, fn extends Interpreter = NotEqual>(a: a, fn?: fn) => assert.not.equal<a, b, fn>
    }
    equivalent: {
      <const a, const b, fn extends Interpreter = NotEquivalent>(a: a, b: b, fn?: fn): assert.not.equivalent<a, b, fn>
      <const b>(b: b): <const a, fn extends Interpreter = NotEquivalent>(a: a, fn?: fn) => assert.not.equivalent<a, b, fn>
    }
  }
  // curried assertions:
  extends: {
    <expected = never, actual = unknown>(actual: actual & expected, _skip: never): [Sym.RedEmoji, [expected, actual]]
    <expected = never, actual = unknown, fn extends Interpreter = Extends>(actual: actual & expected, fn?: fn): assert.extends<expected, actual, fn>
  }

  // <const actual, fn extends Interpreter = Equal>
  //   (actual: actual, fn?: fn) => assert.equal<actual, expected, fn>
  // equals: <expected = never>() => <const actual, fn extends Interpreter = Equal>
  //   (actual: actual, fn?: fn) => assert.equal<actual, expected, fn>
}

declare namespace assert {
  export namespace is {
    export {
      true_ as true,
      false_ as false,
      never_ as never,
      unknown_ as unknown,
    }
    type true_<type> = handleAnys<type, never, [true] extends [type] ? Sym.GreenEmoji : interpretFailure<TrueLiteral, type, never>>
    type false_<type> = handleAnys<type, never, [false] extends [type] ? Sym.GreenEmoji : interpretFailure<FalseLiteral, type, never>>
    type never_<type> = handleAnys<type, never, [type] extends [never] ? Sym.GreenEmoji : interpretFailure<Never, type, never>>
    type unknown_<type> = handleAnys<type, never, unknown extends type ? Sym.GreenEmoji : interpretFailure<Unknown, type, never>>
  }

  export type equal<a, b, fn extends Interpreter = Equal>
    = handleAnys<a, b, [relation.equal<a, b>] extends [true] ? Sym.GreenEmoji : interpretFailure<fn, a, b>>
    ;
  type extends_<a, b, fn extends Interpreter = Extends>
    = handleAnys<a, b, [relation.extends<a, b>] extends [true] ? Sym.GreenEmoji : interpretFailure<fn, a, b>>
    ;
  export { extends_ as extends }

  export type equivalent<a, b, fn extends Interpreter = Equivalent>
    = handleAnys<a, b, [relation.equivalent<a, b>] extends [true] ? Sym.GreenEmoji : interpretFailure<fn, a, b>>
    ;
  export namespace not {
    export type equivalent<a, b, fn extends Interpreter = NotEquivalent>
      = handleAnys<a, b, [relation.notEquivalent<a, b>] extends [true] ? Sym.GreenEmoji : interpretFailure<fn, a, b>>
      ;
    export type equal<a, b, fn extends Interpreter = NotEqual>
      = handleAnys<a, b, [relation.notEqual<a, b>] extends [true] ? Sym.GreenEmoji : interpretFailure<fn, a, b>>
      ;
    type extends_<a, b, fn extends Interpreter = Extends>
      = handleAnys<a, b, [relation.doesNotExtend<a, b>] extends [true] ? Sym.GreenEmoji : interpretFailure<fn, a, b>>
    export { extends_ as extends }
  }
}

declare namespace interpreter {
  type never_<type extends { [0]: unknown }> = never | [𝐰𝐚𝐧𝐭: never, 𝐠𝐨𝐭: type[0]]
  export { never_ as never }
  type unknown_<type extends { [0]: unknown }> = never | [𝐰𝐚𝐧𝐭: unknown, 𝐠𝐨𝐭: type[0]]
  export { unknown_ as unknown }
  type extends_<map extends { [0]: unknown, [1]: unknown }> = never | [want: map[0], want: map[1]]
  export { extends_ as extends }

  export type trueLiteral<type extends { [0]: unknown }> = never | [𝐰𝐚𝐧𝐭: true, 𝐠𝐨𝐭: type[0]]
  export type falseLiteral<type extends { [0]: unknown }> = never | [𝐰𝐚𝐧𝐭: false, 𝐠𝐨𝐭: type[0]]
  export type point<map extends { [0]: unknown, [1]: unknown }> = never | [𝐥𝐞𝐟𝐭: map[0], 𝐫𝐢𝐠𝐡𝐭: map[1]]
  export type equal<map extends { [0]: unknown, [1]: unknown }> = never | [𝐧𝐨𝐭_𝐞𝐪𝐮𝐚𝐥: point<map>]

  export type equivalent<map extends { [0]: unknown, [1]: unknown }> = never | [𝐧𝐨𝐭_𝐞𝐪: point<map>]
  export type not_equivalent<map extends { [0]: unknown, [1]: unknown }> = never | [𝐮𝐧𝐞𝐱𝐩𝐞𝐜𝐭𝐞𝐝_𝐞𝐪: point<map>]
  export type not_equal<map extends { [0]: unknown, [1]: unknown }> = never | [𝐮𝐧𝐞𝐱𝐩𝐞𝐜𝐭𝐞𝐝_𝐞𝐪𝐮𝐚𝐥: point<map>]
}

type interpretFailure<fn extends Interpreter, left, right> = never | (fn & { 0: left, 1: right })[-1];
interface Interpreter { [-1]: unknown, [0]: unknown, [1]: unknown }

interface TrueLiteral extends Interpreter { [-1]: interpreter.trueLiteral<this> }
interface FalseLiteral extends Interpreter { [-1]: interpreter.falseLiteral<this> }
interface Never extends Interpreter { [-1]: interpreter.never<this> }
interface Unknown extends Interpreter { [-1]: interpreter.unknown<this> }
interface Extends extends Interpreter { [-1]: interpreter.extends<this> }
interface Equal extends Interpreter { [-1]: interpreter.equal<this> }
interface Equivalent extends Interpreter { [-1]: interpreter.equivalent<this> }
interface NotEquivalent extends Interpreter { [-1]: interpreter.not_equivalent<this> }
interface NotEqual extends Interpreter { [-1]: interpreter.not_equal<this> }

namespace relation {
  export declare const illegalState: unique symbol
}
declare namespace relation {
  export type illegalState = typeof relation.illegalState
  export type not<type extends boolean>
    = [type] extends [true] ? false
    : [type] extends [false] ? true
    : illegalState
    ;

  type extends_<a, b> = [a] extends [b] ? true : false
  export { extends_ as extends }

  export type notEquivalent<a, b> = not<equivalent<a, b>>
  export type notEqual<a, b> = not<equal<a, b>>
  export type doesNotExtend<a, b> = not<relation.extends<a, b>>
  export type equivalent<a, b> = [a, b] extends [b, a] ? true : false
  /** OG source: https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650 */
  export type equal<a, b> =
    (<fix>() => fix extends a ? 1 : 2) extends
    (<fix>() => fix extends b ? 1 : 2) ? true : false
    ;
}

type handleAnys<a, b, ifNeitherIsAny>
  = bothAreAny<a, b> extends true ? BothIllegal
  : 0 extends 1 & a ? IllegalLeft
  : 0 extends 1 & b ? IllegalRight
  : ifNeitherIsAny
  ;

/** @internal */
type BothIllegal = never | [𝐋: Sym.IllegalAny, 𝐑: Sym.IllegalAny]
/** @internal */
type IllegalLeft = never | [𝐋: Sym.IllegalAny]
/** @internal */
type IllegalRight = never | [𝐑: Sym.IllegalAny]

type bothAreAny<a, b> =
  [true, true] extends [
    0 extends 1 & a ? true : false,
    0 extends 1 & b ? true : false
  ] ? true : false
  ;

namespace __Spec__ {
  declare const unsafeAny: any
  const singleAny: [Sym.IllegalAny] = [Sym.IllegalAny]
  const doubleAny: [Sym.IllegalAny, Sym.IllegalAny] = [Sym.IllegalAny, Sym.IllegalAny]

  describe("handleAnys", t => {
    // ^?
    return [
      expect(t.assert.equal(assert.is.true(unsafeAny), singleAny)),
      expect(t.assert.equal(assert.is.false(unsafeAny), singleAny)),
      expect(t.assert.equal(assert.equal(1, unsafeAny), singleAny)),
      expect(t.assert.equal(assert.equal(unsafeAny, 1), singleAny)),
      expect(t.assert.equal(assert.equal(unsafeAny, unsafeAny), doubleAny)),
    ]
  })

  describe("assert.equal", t => {
    // ^?
    return expect(t.assert.equal({ a: 1 }, { a: 1 }))
  })

  const result = describe(
    "comparing 2 unequal values raises a TypeError",
    t => ({
      /** @ts-expect-error: directive makes sure this relation raises a TypeError */
      notEqual: expectToFail(t.assert.not.equal({ a: 2 }, { a: 3 })),
      /** @ts-expect-error: directive makes sure this relation raises a TypeError */
      equal: expect(t.assert.equal({ a: 1 }, { a: 2 })),
    })
  )

  /** @ts-expect-error: testing to make sure comparing 2 unequal values raises a TypeError */
  type __2 = expect<assert.equal<{ a: 1 }, { a: 2 }>>
  //   ^?
  /** @ts-expect-error: testing to make sure comparing 2 unequal values raises a TypeError */
  const __2 = expect(assert.equal({ a: 1 }, { a: 2 }))
  //    ^?

  declare const __2_expected: ["🚫", [𝐧𝐨𝐭_𝐞𝐪𝐮𝐚𝐥: [𝐥𝐞𝐟𝐭: { readonly a: 1; }, 𝐫𝐢𝐠𝐡𝐭: { readonly a: 2; }]]]
  expect(assert.equal(__2, __2_expected))
  // ^?

  type __any_type__ = [
    // ^?
    expect<assert.not.equivalent<any.type, unknown>>,
    expect<assert.equivalent<any.object, object>>,
    expect<assert.not.equal<any.type, unknown>>,
    expect<assert.not.equal<any.object, object>>,
    expect<assert.extends<any.type, unknown>>,
    expect<assert.not.extends<unknown, any.type>>,
  ]

  declare const expectToFailErrorMsg: TypeError<[Sym.RedEmoji, `Expected a failing test, but got a passing one instead`]>

  describe(
    // ^?
    "expectToFail",
    t => [
      expect(
        assert.equal(
          /* @ts-expect-error: tests to make a failing assertion raises a TypeError */
          expectToFail(t.assert.equal({ abc: 123 }, { abc: 123 })),
          expectToFailErrorMsg
        )
      ),
      expect(
        assert.equal(
          /* @ts-expect-error: tests to make a failing assertion raises a TypeError */
          expectToFail(Sym.GreenEmoji),
          expectToFailErrorMsg
        )
      )
    ]
  )

  const __extends__ = [
    //  ^?
    /* 𝖈𝖚𝖗𝖘𝖊𝖉 */
    /* @ts-expect-error: failing to provide a value raises a type error */
    assert.extends(),
    /* @ts-expect-error: failing to provide a value raises a type error */
    assert.extends<number>(),
    /* @ts-expect-error: failing to explicitly provide a type parameter raises a type error */
    assert.extends(1),
    /* happy path */
    assert.extends<number>(2),
    assert.extends<2>(2),
  ] as const

}
