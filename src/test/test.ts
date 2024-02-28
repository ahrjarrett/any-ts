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

type eval<type> = never | { [ix in keyof type]: type[ix] }

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

interface TestResult<_type> { }

/** {@link describe `describe`} `overload 1/4` @external */
function describe<title extends string, const results extends any.array>(title: title, t: (suite: Suite) => results): TestResult<byPos<results>>
/** {@link describe `describe`} `overload 2/4` @external */
function describe<title extends string, const results extends any.object>(title: title, t: (suite: Suite) => results): TestResult<byName<results>>
/** {@link describe `describe`} `overload 3/4` @external */
function describe<title extends string, const result>(title: title, t: (suite: Suite) => result): TestResult<byPos<[result]>>
/** {@link describe `describe`} `overload 4/4` @external */
function describe<title extends string>(title: title, t: (suite: Suite) => void): void
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: is overload #4 necessary anymore?
 * - [ ] TODO: Docs for overload 1/2
 */
function describe(_$0?: string, _$1?: (suite: Suite) => unknown): never { return void 0 as never }

type expect<type extends [type] extends [Sym.GreenEmoji] ? Sym.GreenEmoji : never> = type

/** 
 * {@link expect `expect`}
 * `overload 1/2`
 * 
 * This first overload is intentionally unsatisfiable. If you're seeing this documentation,
 * then **you've likely encountered a bug** (but try restarting your IDE's TS server before filing).
 * 
 * This is the trick to getting the type of `type` to "come through" when the assertion fails 
 * (otherwise on invalid input TS chooses the second overload, and since `type` can only be 
 * the literal {@link Sym.GreenEmoji `Sym.GreenEmoji`}, we lose access to the type that triggered 
 * the invalid state.
 * 
 * @external 
 */
function expect<const type>(type: type, _skip: never): [Sym.RedEmoji, type]
/** 
 * {@link expect `expect`} `overload 2/2`
 * @external 
 */
function expect<const type extends Sym.GreenEmoji>(type: type): type
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: Docs for overload 2/2
 */
function expect(_$0: Sym.GreenEmoji, _$1?: unknown): never { return void 0 as never }

/** 
 * {@link expectToFail `expectToFail`}
 * `overload 1/2`
 * 
 * This first overload is intentionally unsatisfiable. If you're seeing this documentation,
 * then **you've likely encountered a bug** (but try restarting your IDE's TS server before filing).
 * 
 * This is the trick to getting the type of `type` to "come through" when the assertion fails 
 * (otherwise on invalid input TS chooses the second overload, and since `type` can only be 
 * the literal {@link Sym.GreenEmoji `Sym.GreenEmoji`}, we lose access to the type that triggered 
 * the invalid state.
 * 
 * @external 
 */
function expectToFail<const type>(type: type, _skip: never): [Sym.GreenEmoji] extends [type] ? TypeError<[Sym.RedEmoji, Case.ExpectedFailure]> : type
/** 
 * {@link expectToFail `expectToFail`} `overload 2/2` @external 
 */
function expectToFail<const type extends [type] extends [Sym.GreenEmoji] ? TypeError<[Sym.RedEmoji, Case.ExpectedFailure]> : unknown>(type: type): Sym.GreenEmoji
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: Docs for overload 2/2
 */
function expectToFail(_$0?: unknown, _$1?: unknown): never { return void 0 as never }

/** 
 * {@link assertIsTrue `assert.is.true`} 
 * @since 0.3.0
 * @external 
 */
type assertIsTrue<type> = handleAnys<type, never, [true] extends [type] ? Sym.GreenEmoji : interpretFailure<TrueLiteral, type, never>>
/** 
 * {@link assertIsTrue `assert.is.true`} 
 * `overload [1/1]` 
 * @since 0.3.0
 * @external 
 */
function assertIsTrue<const type>(type: type): assert.is.true<type>
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: Docs for overload 1/1
 */
function assertIsTrue(_$0?: unknown): never { return void 0 as never }

/** 
 * {@link assertIsFalse `assert.is.false`} 
 * @since 0.3.0
 * @external 
 */
type assertIsFalse<type> = handleAnys<type, never, [false] extends [type] ? Sym.GreenEmoji : interpretFailure<FalseLiteral, type, never>>
/** 
 * {@link assertIsFalse `assert.is.false`} 
 * `overload [1/1]` 
 * @since 0.3.0
 * @external 
 */
function assertIsFalse<const type>(type: type): assert.is.false<type>
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: Docs for overload 1/1
 */
function assertIsFalse(_$0?: unknown): never { return void 0 as never }

/** 
 * {@link assertIsNever `assert.is.never`} 
 * @since 0.3.0
 * @external 
 */
type assertIsNever<type> = handleAnys<type, never, [type] extends [never] ? Sym.GreenEmoji : interpretFailure<Never, type, never>>
/** 
 * {@link assertIsNever `assert.is.never`} 
 * `overload [1/1]` 
 * @since 0.3.0
 * @external 
 */
function assertIsNever<const type>(type: type): assert.is.never<type>
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: Docs for overload 1/1
 */
function assertIsNever(_$0?: unknown): never { return void 0 as never }

/** 
 * {@link assertIsUnknown `assertIsUnknown`} 
 * @since 0.3.0
 * @external 
 */
type assertIsUnknown<type> = handleAnys<type, never, unknown extends type ? Sym.GreenEmoji : interpretFailure<Unknown, type, never>>
/** 
 * {@link assertIsUnknown `assertIsUnknown`} 
 * `overload [1/1]` 
 * @since 0.3.0
 * @external 
 */
function assertIsUnknown<const type>(type: type): assert.is.unknown<type>
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: Docs for overload 1/1
 */
function assertIsUnknown(_$0?: unknown): never { return void 0 as never }

declare namespace is {
  export {
    assertIsTrue as true,
    assertIsFalse as false,
    assertIsNever as never,
    assertIsUnknown as unknown,
  }
}
namespace is {
  is.true = assertIsTrue
  is.false = assertIsFalse
  is.never = assertIsNever
  is.unknown = assertIsUnknown
}

/** 
 * {@link assertIsNotEquivalent `assert.not.equivalent`} 
 * @since 0.3.0
 * @external 
 */
type assertIsNotEquivalent<a, b, fn extends Interpreter = NotEquivalent>
  = handleAnys<a, b, [relation.notEquivalent<a, b>] extends [true] ? Sym.GreenEmoji : interpretFailure<fn, a, b>>
/** 
 * {@link assertIsNotEquivalent `assert.not.equivalent`} 
 * `overload [1/2]`
 * @since 0.3.0
 * @external 
 */
function assertIsNotEquivalent<const a, const b, fn extends Interpreter = NotEquivalent>(a: a, b: b, fn?: fn): assertIsNotEquivalent<a, b, fn>
/** 
 * {@link assertIsNotEquivalent `assert.not.equivalent`} 
 * `overload [2/2]`
 * @since 0.3.0
 * @external 
 */
function assertIsNotEquivalent<const b>(b: b): <const a, fn extends Interpreter = NotEquivalent>(a: a, fn?: fn) => assertIsNotEquivalent<a, b, fn>
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: Docs for overloads 1/2 & 2/2
 */
function assertIsNotEquivalent(_$0?: unknown): never { return ((_$1?: unknown) => void 0) as never }

/** 
 * {@link assertIsNotEqual `assert.not.equal`} 
 * @since 0.3.0
 * @external 
 */
type assertIsNotEqual<a, b, fn extends Interpreter = NotEqual>
  = handleAnys<a, b, [relation.notEqual<a, b>] extends [true] ? Sym.GreenEmoji : interpretFailure<fn, a, b>>
/** 
 * {@link assertIsNotEqual `assert.not.equal`} 
 * `overload [1/2]`
 * @since 0.3.0
 * @external 
 */
function assertIsNotEqual<const a, const b, fn extends Interpreter = NotEqual>(a: a, b: b, fn?: fn): assertIsNotEqual<a, b, fn>
/** 
 * {@link assertIsNotEqual `assert.not.equal`} 
 * `overload [2/2]`
 * @since 0.3.0
 * @external 
 */
function assertIsNotEqual<const b>(b: b): <const a, fn extends Interpreter = NotEqual>(a: a, fn?: fn) => assertIsNotEqual<a, b, fn>
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: Docs for overloads 1/2 & 2/2
 */
function assertIsNotEqual(_$0?: unknown, _$1?: unknown, _$2?: unknown): never { return ((_$3: unknown) => void 0) as never }

/** 
 * {@link assertDoesNotExtend `assert.not.extends`} 
 * @since 0.3.0
 * @external 
 */
type assertDoesNotExtend<a, b, fn extends Interpreter = Extends>
  = handleAnys<a, b, [relation.doesNotExtend<a, b>] extends [true] ? Sym.GreenEmoji : interpretFailure<fn, a, b>>
/** 
 * {@link assertDoesNotExtend `assert.not.extends`} 
 * `overload [1/2]`
 * @since 0.3.0
 * @external 
 */
function assertDoesNotExtend<const a, const b, fn extends Interpreter = NotEqual>(a: a, b: b, fn?: fn): assertDoesNotExtend<a, b, fn>
/** 
 * {@link assertDoesNotExtend `assert.not.extends`} 
 * `overload [2/2]`
 * @since 0.3.0
 * @external 
 */
function assertDoesNotExtend<const b>(b: b): <const a, fn extends Interpreter = NotEqual>(a: a, fn?: fn) => assertDoesNotExtend<a, b, fn>
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: Docs for overloads 1/2 & 2/2
 */
function assertDoesNotExtend(_$0?: unknown, _$1?: unknown, _$2?: unknown): never { return ((_$3?: unknown) => void 0) as never }

declare namespace isNot {
  export {
    assertIsNotEqual as equal,
    assertIsNotEquivalent as equivalent,
    assertDoesNotExtend as extends,
  }
}
namespace isNot {
  isNot.equal = assertIsNotEqual
  isNot.equivalent = assertIsNotEquivalent
  isNot.extends = assertDoesNotExtend
}

type assertEqual<a, b, fn extends Interpreter = Equal>
  = handleAnys<a, b, [relation.equal<a, b>] extends [true] ? Sym.GreenEmoji : interpretFailure<fn, a, b>>
/** 
 * {@link assertEqual `assert.equal`} 
 * `overload [1/2]`
 * @since 0.3.0
 * @external 
 */
function assertEqual<const a, const b, fn extends Interpreter = Equal>(a: a, b: b, fn?: fn): assert.equal<a, b, fn>
/** 
 * {@link assertEqual `assert.equal`} 
 * `overload [2/2]`
 * @since 0.3.0
 * @external 
 */
function assertEqual<const b>(b: b): <const a, fn extends Interpreter = Equal>(a: a, fn?: fn) => assert.equal<a, b, fn>
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: Docs for overloads 1/2 & 2/2
 */
function assertEqual(_$0?: unknown, _$1?: unknown, _$2?: unknown): never { return ((_$3?: unknown) => void 0) as never }

type assertEquivalent<a, b, fn extends Interpreter = Equivalent>
  = handleAnys<a, b, [relation.equivalent<a, b>] extends [true] ? Sym.GreenEmoji : interpretFailure<fn, a, b>>
/** 
 * {@link assertEquivalent `assert.equivalent`} 
 * `overload [1/2]`
 * @since 0.3.0
 * @external 
 */
function assertEquivalent<const a, const b, fn extends Interpreter = Equivalent>(a: a, b: b, fn?: fn): assert.equivalent<a, b, fn>
/** 
 * {@link assertEquivalent `assert.equivalent`} 
 * `overload [2/2]`
 * @since 0.3.0
 * @external 
 */
function assertEquivalent<const b>(b: b): <const a, fn extends Interpreter = Equivalent>(a: a, fn?: fn) => assert.equivalent<a, b, fn>
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: Docs for overloads 1/2 & 2/2
 */
function assertEquivalent(_$0?: unknown, _$1?: unknown, _$2?: unknown): never { return ((_$3?: unknown) => void 0) as never }

type assertExtends<a, b, fn extends Interpreter = Extends>
  = handleAnys<a, b, [relation.extends<a, b>] extends [true] ? Sym.GreenEmoji : interpretFailure<fn, a, b>>
/** 
 * {@link assertExtends `assert.extends`} 
 * `overload [1/2]`
 * @since 0.3.0
 * @external 
 */
function assertExtends<expected = never, actual = unknown>(actual: actual & expected, _skip: never): [Sym.RedEmoji, [expected, actual]]
/** 
 * {@link assertExtends `assert.extends`} 
 * `overload [2/2]`
 * @since 0.3.0
 * @external 
 */
function assertExtends<expected = never, actual = unknown, fn extends Interpreter = Extends>(actual: actual & expected, fn?: fn): assert.extends<expected, actual, fn>
/** 
 * Implementation comment, **not externally visible**
 * - [ ] TODO: Docs for overloads 1/2 & 2/2
 */
function assertExtends(_$0?: unknown, _$1?: unknown): never { return ((_$2?: unknown) => void 0) as never }

function assert() { }
declare namespace assert {
  export {
    /** 
     * {@link is `assert.is`} is a namespace containing a handful of mostly type-level primitives for
     * making assertions that the type-system is capable of understanding and enforcing at compile-time.
     * 
     * See also: {@link isNot `assert.not`}.
     * @since 0.3.0
     * @external 
     */
    is,
    /** 
     * {@link isNot `assert.not`} is the dual of {@link is `assert.is`}. It contains the
     * same set of assertions, except that their predicate is flipped. 
     * @since 0.3.0
     * @external 
     */
    isNot as not,
    assertEqual as equal,
    assertEquivalent as equivalent,
    assertExtends as extends,
  }
}

namespace assert {
  /** 
   * {@link is `assert.is`} is a namespace containing a handful of mostly type-level primitives for
   * making assertions that the type-system is capable of understanding and enforcing at compile-time.
   * 
   * See also: {@link isNot `assert.not`}.
   * @since 0.3.0
   * @external 
   */
  assert.is = is
  /** 
   * {@link isNot `assert.not`} is the dual of {@link is `assert.is`}. It contains the
   * same set of assertions, except that their predicate is flipped. 
   * @since 0.3.0
   * @external 
   */
  assert.not = isNot
  assert.equal = assertEqual
  assert.equivalent = assertEquivalent
  assert.extends = assertExtends
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
