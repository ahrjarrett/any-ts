import { type any } from "../src/exports"


type interpretFailure<fn extends Interpreter, left, right> = (fn & { 0: left, 1: right })[-1];
interface Interpreter { [-1]: unknown, [0]: unknown, [1]: unknown }

declare namespace interpreter {
  type point<map extends { [0]: unknown, [1]: unknown }> = never | [𝐥𝐞𝐟𝐭: map[0], 𝐫𝐢𝐠𝐡𝐭: map[1]]
  type eq<map extends { [0]: unknown, [1]: unknown }> = never | [𝐧𝐨𝐭_𝐞𝐪: point<map>]
  type equal<map extends { [0]: unknown, [1]: unknown }> = never | [𝐧𝐨𝐭_𝐞𝐪𝐮𝐚𝐥: point<map>]
  type not_eq<map extends { [0]: unknown, [1]: unknown }> = never | [𝐮𝐧𝐞𝐱𝐩𝐞𝐜𝐭𝐞𝐝_𝐞𝐪: point<map>]
  type not_equal<map extends { [0]: unknown, [1]: unknown }> = never | [𝐮𝐧𝐞𝐱𝐩𝐞𝐜𝐭𝐞𝐝_𝐞𝐪𝐮𝐚𝐥: point<map>]
}

interface Eq extends Interpreter { [-1]: interpreter.eq<this> }
interface NotEq extends Interpreter { [-1]: interpreter.not_eq<this> }
interface Equal extends Interpreter { [-1]: interpreter.equal<this> }
interface NotEqual extends Interpreter { [-1]: interpreter.not_equal<this> }

declare namespace relation {
  type illegalState = typeof illegalState
  const illegalState: unique symbol
  type not<type extends boolean>
    = [type] extends [true] ? false
    : [type] extends [false] ? true
    : illegalState
    ;

  type notEq<a, b> = not<eq<a, b>>
  type notEqual<a, b> = not<equal<a, b>>
  type eq<a, b> = [a, b] extends [b, a] ? true : false
  type equal<a, b> =
    (<fix>() => fix extends a ? 1 : 2) extends
    (<fix>() => fix extends b ? 1 : 2) ? true : false
    ;
}

declare namespace assert {
  type eq<a, b, fn extends Interpreter = Eq> = [relation.eq<a, b>] extends [true] ? "✅" : interpretFailure<fn, a, b>
  type equal<a, b, fn extends Interpreter = Equal> = [relation.equal<a, b>] extends [true] ? "" : interpretFailure<fn, a, b>
  type notEq<a, b, fn extends Interpreter = NotEq> = [relation.notEq<a, b>] extends [true] ? "✅" : interpretFailure<fn, a, b>
  type notEqual<a, b, fn extends Interpreter = NotEqual> = [relation.notEqual<a, b>] extends [true] ? "✅" : interpretFailure<fn, a, b>
}

type __ = assert.equal<{ a: 1 }, { a: 1 }>

type expect<type extends [type] extends ["✅"] ? "✅" : never> = type

type _3 = [
  expect<assert.eq<any.type, unknown>>,
  /* @ts-expect-error `any.type` and `unknown` are equivalent, but not strictly equal */
  expect<assert.equal<any.type, unknown>>,
  expect<assert.eq<any.object, object>>,
  /* @ts-expect-error `any.object` and `object` are equivalent, but not strictly equal */
  expect<assert.equal<any.object, object>>,
]
