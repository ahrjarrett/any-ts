import type { any } from "../any/exports"
import type { assert, expect } from "../test/exports"
import type { Kind } from "./kind"

declare namespace Spec {
  type _ = unknown
  type n = number
  type s = string
  type b = boolean

  type __Kind_new__ = [
    // ^?
    expect<assert.equal<
      Kind.new<1>,
      { 0: _, [-1]: _ }>>,
    expect<assert.equal<
      Kind.new<2>,
      { 0: _, 1: _, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<3>,
      { 0: _, 1: _, 2: _, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<4>,
      { 0: _, 1: _, 2: _, 3: _, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<5>,
      { 0: _, 1: _, 2: _, 3: _, 4: _, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<6>,
      { 0: _, 1: _, 2: _, 3: _, 4: _, 5: _, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<7>,
      { 0: _, 1: _, 2: _, 3: _, 4: _, 5: _, 6: _, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<8>,
      { 0: _, 1: _, 2: _, 3: _, 4: _, 5: _, 6: _, 7: _, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<9>,
      { 0: _, 1: _, 2: _, 3: _, 4: _, 5: _, 6: _, 7: _, 8: _, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<[s]>,
      { 0: s, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<[s, n]>,
      { 0: s, 1: n, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<[s, n, b]>,
      { 0: s, 1: n, 2: b, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<[s, n, b, s]>,
      { 0: s, 1: n, 2: b, 3: s, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<[s, n, b, s, n]>,
      { 0: s, 1: n, 2: b, 3: s, 4: n, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<[s, n, b, s, n, b]>,
      { 0: s, 1: n, 2: b, 3: s, 4: n, 5: b, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<[s, n, b, s, n, b, s]>,
      { 0: s, 1: n, 2: b, 3: s, 4: n, 5: b, 6: s, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<[s, n, b, s, n, b, s, n]>,
      { 0: s, 1: n, 2: b, 3: s, 4: n, 5: b, 6: s, 7: n, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<[s, n, b, s, n, b, s, n, b]>,
      { 0: s, 1: n, 2: b, 3: s, 4: n, 5: b, 6: s, 7: n, 8: b, [-1]: _ }
    >>,
    expect<assert.equal<
      Kind.new<{ 0: s }>,
      { [-1]: _, 0: s }
    >>,
    expect<assert.equal<
      Kind.new<{ 0: s, 1: n }>,
      { [-1]: _, 0: s, 1: n }
    >>,
    expect<assert.equal<
      Kind.new<{ 0: s, 1: n, 2: b }>,
      { [-1]: _, 0: s, 1: n, 2: b }
    >>,
    expect<assert.equal<
      Kind.new<{ 0: s, 1: n, 2: b, 3: s }>,
      { [-1]: _, 0: s, 1: n, 2: b, 3: s }
    >>,
    expect<assert.equal<
      Kind.new<{ 0: s, 1: n, 2: b, 3: s, 4: n }>,
      { [-1]: _, 0: s, 1: n, 2: b, 3: s, 4: n }
    >>,
    expect<assert.equal<
      Kind.new<{ 0: s, 1: n, 2: b, 3: s, 4: n, 5: b }>,
      { [-1]: _, 0: s, 1: n, 2: b, 3: s, 4: n, 5: b }
    >>,
    expect<assert.equal<
      Kind.new<{ 0: s, 1: n, 2: b, 3: s, 4: n, 5: b, 6: s }>,
      { [-1]: _, 0: s, 1: n, 2: b, 3: s, 4: n, 5: b, 6: s }
    >>,
    expect<assert.equal<
      Kind.new<{ 0: s, 1: n, 2: b, 3: s, 4: n, 5: b, 6: s, 7: n }>,
      { [-1]: _, 0: s, 1: n, 2: b, 3: s, 4: n, 5: b, 6: s, 7: n }
    >>,
    expect<assert.equal<
      Kind.new<{ 0: s, 1: n, 2: b, 3: s, 4: n, 5: b, 6: s, 7: n, 8: b }>,
      { [-1]: _, 0: s, 1: n, 2: b, 3: s, 4: n, 5: b, 6: s, 7: n, 8: b }
    >>,
  ]

  interface Intercalate<delimiter extends any.showable> extends Kind<[string, string]> {
    [-1]: this[0] extends "" ? this[1] : `${this[0]}${delimiter}${this[1]}`
  }

  type reduce = [
    expect<assert.equal<
      Kind.apply<Kind.reduce<string>, [
        f: Intercalate<"::">,
        xs: ["1", "2", "3"],
        empty: ""
      ]>,
      "1::2::3"
    >>,
  ]
  type fold = [
    expect<assert.equal<
      Kind.apply<
        Kind.fold<string>,
        [
          f: Intercalate<", ">,
          xs: ["1", "2", "3"]
        ]
      >,
      "1, 2, 3"
    >>,
  ]
}


// type greatestArity<keys extends keyof Scope, countdown extends Arity = 9>
//   = countdown extends keys ? countdown
//   : greatestArity<keys, cached.prev[countdown]>
//   ;
// type constrainScope<type extends Scope> = never | (
//   & { [ix in keyof type & keyof Scope]: type[ix] }
//   & cached.slots[greatestArity<keyof type & keyof Scope, 9>]
// )
// type constrainArray<type extends any.array & { length: Arity }> = never | (
//   cached.params[type["length"]] extends type ? cached.slots[cached.prev[type["length"]]]
//   : { [ix in Extract<keyof type, `${number}`>]: type[ix] } & cached.slots[cached.prev[type["length"]]]
// )
// type constrainKind<type extends Arity | Scope | readonly []>
//   = [type] extends [readonly []] ? Fn1
//   : [type] extends [Arity] ? slots<type>
//   : [type] extends [any.array & { length: Arity }] ? constrainArray<type>
//   : [type] extends [Scope] ? constrainScope<type>
//   : never
//   ;
// type parseInt<type> = 
// interface Duplicate extends kind<1> { [-1]: [this[0], this[0]] }
// interface Concat extends kind<[string, number]> { [-1]: `${this[0]}${this[1]}` }
// interface Concat2 extends kind<[string]> { [-1]: `${this[0]}` }
/** LEGACY */
// type interpret1<fn extends Fn1, x extends fn[0]> = (fn & { [0]: x })[-1]
// type interpret2<fn extends Fn2, x extends any.two<fn[0], fn[1]>> = (fn & { [0]: x[0], [1]: x[1] })[-1]
// interface Fn1<type = unknown> { [-1]: unknown, [0]: type }
// interface Fn2<left = unknown, right = unknown> { [-1]: any.showable, [0]: left, [1]: right, }
// type params<arity extends Arity> = cached.params[arity]
// declare namespace Scope {
//   type min = Scope.new<1>
//   type max = Scope.new<9>
//   type any_<type extends Partial<Scope.max> = Partial<Scope.max>> = type
// type __declare_kind__ = [
//   declare.kind<3>,
//   declare.kind<[string, number, boolean]>,
//   declare.kind<3 | 4 | 2>,
//   declare.kind<[string] | [string, number]>,
// ]
//   export {
//     any_ as any,
//     min,
//     max,
//     scope as new,
//   }
// }
// declare const TypeErrorURI: unique symbol
// declare type TypeErrorURI = typeof TypeErrorURI
// interface TypeError<msg extends string | any.array> extends identity<{ [TypeErrorURI]: never }> { msg: msg }
// declare namespace TypeError {
//   type is<type> = TypeErrorURI extends keyof type ? true : false
//   type UnexpectedUnion<init extends number | any.object>
//     = never | TypeError<[msg: `Cannot declare a higher-kinded type with a union`, got: init]>
// }
// declare namespace declare {
//   type byArity<arity extends Arity> = never | Fn<Scope.new<arity>>
//   type byScope<scope extends Scope.any> = never
//     |
//     structured<scope> extends Scope.any<infer out> ? Fn<out>
//     : never.close.inline_var<"out">
//     ;
//   type validateInput<type extends number | any.object> = Union.is<type> extends true ? TypeError.UnexpectedUnion<type> : unknown
//     ;
// }
/** LEGACY */
/////////////////
/// instances ///
/////////////////
// interface Duplicate extends kind<1> { [-1]: [this[0], this[0]] }
// interface Capitalize extends kind<[string]> { [-1]: globalThis.Capitalize<this[0]> }
// type __greatestArity__ = [
//   greatestArity<keyof { 0: 100, 1: 200, 8: 300 }>,
//   greatestArity<7 | 8>,
//   greatestArity<5 | 3>,
//   greatestArity<9>,
// ]
// type __constrainKindByArity__ = [
//   // ^?
//   expect<assert.equal<constrainKind<0>, Fn1>>,
//   expect<assert.equal<constrainKind<1>, Fn1>>,
//   expect<assert.equal<constrainKind<2>, Fn2>>,
//   expect<assert.equal<constrainKind<3>, Fn3>>,
//   expect<assert.equal<constrainKind<4>, Fn4>>,
//   expect<assert.equal<constrainKind<5>, Fn5>>,
//   expect<assert.equal<constrainKind<6>, Fn6>>,
//   expect<assert.equal<constrainKind<7>, Fn7>>,
//   expect<assert.equal<constrainKind<8>, Fn8>>,
//   expect<assert.equal<constrainKind<9>, Fn9>>,
//   expect<assert.equal<constrainKind<10>, Fn10>>,
// ]
// type _ = unknown
// type n = number
// type s = string
// type b = boolean
// type __constrainKindByUnknownArray__ = [
//   constrainKind<[]>,
//   constrainKind<[_]>,
//   constrainKind<[_, _]>,
//   constrainKind<[_, _, _]>,
//   constrainKind<[_, _, _, _]>,
//   constrainKind<[_, _, _, _, _]>,
//   constrainKind<[_, _, _, _, _, _]>,
//   constrainKind<[_, _, _, _, _, _, _]>,
//   constrainKind<[_, _, _, _, _, _, _, _]>,
//   constrainKind<[_, _, _, _, _, _, _, _, _]>,
//   constrainKind<[_, _, _, _, _, _, _, _, _, _]>,
// ]
// type __constrainKindByKnownArray__ = [
//   expect<assert.equal<
//     constrainKind<[n]>,
//     Fn1 & { 0: number }
//   >>,
//   expect<assert.equal<
//     constrainKind<[n, s]>,
//     Fn2 & { 0: number, 1: string }
//   >>,
//   expect<assert.equal<
//     constrainKind<[n, s, b]>,
//     Fn3 & { 0: number, 1: string, 2: boolean }
//   >>,
//   expect<assert.equal<
//     constrainKind<[n, s, b, n]>,
//     Fn4 & { 0: number, 1: string, 2: boolean, 3: number }
//   >>,
//   expect<assert.equal<
//     constrainKind<[n, s, b, n, s]>,
//     Fn5 & { 0: number, 1: string, 2: boolean, 3: number, 4: string }
//   >>,
//   expect<assert.equal<
//     constrainKind<[n, s, b, n, s, b]>,
//     Fn6 & { 0: number, 1: string, 2: boolean, 3: number, 4: string, 5: boolean }
//   >>,
//   expect<assert.equal<
//     constrainKind<[n, s, b, n, s, b, n]>,
//     Fn7 & { 0: number, 1: string, 2: boolean, 3: number, 4: string, 5: boolean, 6: number }
//   >>,
//   expect<assert.equal<
//     constrainKind<[n, s, b, n, s, b, n, s]>,
//     Fn8 & { 0: number, 1: string, 2: boolean, 3: number, 4: string, 5: boolean, 6: number, 7: string }
//   >>,
//   expect<assert.equal<
//     constrainKind<[n, s, b, n, s, b, n, s, b]>,
//     Fn9 & { 0: number, 1: string, 2: boolean, 3: number, 4: string, 5: boolean, 6: number, 7: string, 8: boolean }
//   >>,
//   expect<assert.equal<
//     constrainKind<[n, s, b, n, s, b, n, s, b, n]>,
//     Fn10 & { 0: number, 1: string, 2: boolean, 3: number, 4: string, 5: boolean, 6: number, 7: string, 8: boolean, 9: number }
//   >>,
// ]
// type __slotsFromParams__ = [
//   // ^?
//   expect<assert.equal<constrainKind<{ 0: "zero" }>, Fn1 & { 0: "zero" }>>,
//   expect<assert.equal<constrainKind<{ 1: "one" }>, Fn2 & { 1: "one" }>>,
//   expect<assert.equal<constrainKind<{ 2: "two" }>, Fn3 & { 2: "two" }>>,
//   expect<assert.equal<constrainKind<{ 3: "three" }>, Fn4 & { 3: "three" }>>,
//   expect<assert.equal<constrainKind<{ 4: "four" }>, Fn5 & { 4: "four" }>>,
//   expect<assert.equal<constrainKind<{ 5: "five" }>, Fn6 & { 5: "five" }>>,
//   expect<assert.equal<constrainKind<{ 6: "six" }>, Fn7 & { 6: "six" }>>,
//   expect<assert.equal<constrainKind<{ 7: "seven" }>, Fn8 & { 7: "seven" }>>,
//   expect<assert.equal<constrainKind<{ 8: "eight" }>, Fn9 & { 8: "eight" }>>,
//   expect<assert.equal<constrainKind<{ 9: "nine" }>, Fn10 & { 9: "nine" }>>,
//   expect<assert.equal<constrainKind<{ 0: "zero", NOT_IN_OUTPUT: 100 }>, Fn1 & { 0: "zero" }>>,
//   expect<assert.equal<constrainKind<{ 1: "one", NOT_IN_OUTPUT: 100 }>, Fn2 & { 1: "one" }>>,
//   expect<assert.equal<constrainKind<{ 2: "two", NOT_IN_OUTPUT: 100 }>, Fn3 & { 2: "two" }>>,
//   expect<assert.equal<constrainKind<{ 3: "three", NOT_IN_OUTPUT: 100 }>, Fn4 & { 3: "three" }>>,
//   expect<assert.equal<constrainKind<{ 4: "four", NOT_IN_OUTPUT: 100 }>, Fn5 & { 4: "four" }>>,
//   expect<assert.equal<constrainKind<{ 5: "five", NOT_IN_OUTPUT: 100 }>, Fn6 & { 5: "five" }>>,
//   expect<assert.equal<constrainKind<{ 6: "six", NOT_IN_OUTPUT: 100 }>, Fn7 & { 6: "six" }>>,
//   expect<assert.equal<constrainKind<{ 7: "seven", NOT_IN_OUTPUT: 100 }>, Fn8 & { 7: "seven" }>>,
//   expect<assert.equal<constrainKind<{ 8: "eight", NOT_IN_OUTPUT: 100 }>, Fn9 & { 8: "eight" }>>,
//   expect<assert.equal<constrainKind<{ 9: "nine", NOT_IN_OUTPUT: 100 }>, Fn10 & { 9: "nine" }>>,
//   expect<assert.equal<constrainKind<{ 0: "zero", 5: "five", NOT_IN_OUTPUT: 100 }>, Fn6 & { 0: "zero", 5: "five" }>>,
//   expect<assert.equal<constrainKind<{ 1: "one", 5: "five", NOT_IN_OUTPUT: 100 }>, Fn6 & { 1: "one", 5: "five" }>>,
//   expect<assert.equal<constrainKind<{ 2: "two", 5: "five", NOT_IN_OUTPUT: 100 }>, Fn6 & { 2: "two", 5: "five" }>>,
//   expect<assert.equal<constrainKind<{ 3: "three", 5: "five", NOT_IN_OUTPUT: 100 }>, Fn6 & { 3: "three", 5: "five" }>>,
//   expect<assert.equal<constrainKind<{ 4: "four", 5: "five", NOT_IN_OUTPUT: 100 }>, Fn6 & { 4: "four", 5: "five" }>>,
//   expect<assert.equal<constrainKind<{ 5: "five", 8: "eight", NOT_IN_OUTPUT: 100 }>, Fn9 & { 5: "five", 8: "eight" }>>,
//   expect<assert.equal<constrainKind<{ 6: "six", 5: "five", NOT_IN_OUTPUT: 100 }>, Fn7 & { 6: "six", 5: "five" }>>,
//   expect<assert.equal<constrainKind<{ 7: "seven", 5: "five", NOT_IN_OUTPUT: 100 }>, Fn8 & { 7: "seven", 5: "five" }>>,
//   expect<assert.equal<constrainKind<{ 8: "eight", 5: "five", NOT_IN_OUTPUT: 100 }>, Fn9 & { 8: "eight", 5: "five" }>>,
//   expect<assert.equal<constrainKind<{ 9: "nine", 5: "five", NOT_IN_OUTPUT: 100 }>, Fn10 & { 9: "nine", 5: "five" }>>,
//   expect<assert.equal<
//     constrainKind<[n, s, b, n, s, b, n, s, b, n, s]>,
//     { 0: number, 1: string, 2: boolean, 3: number, 4: string, 5: boolean, 6: number, 7: string, 8: boolean, 9: number } & Fn10
//   >>,
//   expect<assert.equal<
//     constrainKind<[n, s, b, n, s, b, n, s, b, n, s, b]>,
//     { 0: number, 1: string, 2: boolean, 3: number, 4: string, 5: boolean, 6: number, 7: string, 8: boolean, 9: number } & Fn10
//   >>,
//   expect<assert.equal<
//     constrainKind<{ 0: "zero" }>,
//     { 0: "zero" } & Fn1
//   >>,
//   expect<assert.equal<
//     constrainKind<{ 0: "zero", 1: "one" }>,
//     { 0: "zero", 1: "one" } & Fn2
//   >>,
//   expect<assert.equal<
//     constrainKind<{ 0: "zero", 1: "one", 2: "two" }>,
//     { 0: "zero", 1: "one", 2: "two" } & Fn3
//   >>,
//   expect<assert.equal<
//     constrainKind<{ 0: "zero", 1: "one", 2: "two", 3: "three", }>,
//     { 0: "zero", 1: "one", 2: "two", 3: "three" } & Fn4
//   >>,
//   expect<assert.equal<
//     constrainKind<{ 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four" }>,
//     { 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four" } & Fn5
//   >>,
//   expect<assert.equal<
//     constrainKind<{ 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five" }>,
//     { 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five" } & Fn6
//   >>,
//   expect<assert.equal<
//     constrainKind<{ 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six" }>,
//     { 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six" } & Fn7
//   >>,
//   expect<assert.equal<
//     constrainKind<{ 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven" }>,
//     { 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven" } & Fn8
//   >>,
//   expect<assert.equal<
//     constrainKind<{ 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight" }>,
//     { 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight" } & Fn9
//   >>,
//   expect<assert.equal<
//     constrainKind<{ 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine" }>,
//     { 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine" } & Fn10
//   >>,
//   expect<assert.equal<
//     constrainKind<{ 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "NOT IN OUTPUT" }>,
//     { 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine" } & Fn10
//   >>,
// ]
