export type {
  enforce,
  constrain,
  partial as Partial,
}

/** @internal - only exported for testing purposes */
export type { impl as internal }

import type { any } from "../any/exports.js"
import type { number } from "../number/number.js"

import type { Fn } from "../function/exports.js"
import type { Err, Err2 } from "./err.js"
import type { never } from "../never/exports.js"
import type { HasDiscriminant } from "../tag/tag.js"
import type { Union as U } from "../union/exports.js"
import type { empty } from "../empty.js"

declare namespace partial {
  type strict<type extends globalThis.Partial<invariant>, invariant> = (
    & globalThis.Partial<invariant>
    & { [ix in Exclude<keyof type, keyof invariant>]?: never }
  )
}

declare namespace impl {
  type parseNumeric<type> = type extends `${infer x extends number}` ? x : never
  type extract<type, invariant> = [type] extends [invariant] ? type : never
  type getKeys<type>
    = [type] extends [any.entries] ? extract<{ [ix in keyof type]: type[ix][extract<0, keyof type[ix]>] }, any.array> : never

  type duplicateKeys<type extends any.array, seen extends any.object, duplicates extends any.array>
    = [type] extends [readonly []] ? 0 extends duplicates["length"] ? never : duplicates
    : [type] extends [readonly [any.index<infer head>, ...any.list<infer tail>]]
    ? [head] extends [keyof seen] ? impl.duplicateKeys<tail, seen, [...duplicates, head]>
    : impl.duplicateKeys<tail, seen & { [ix in head]: void }, duplicates>
    : never.illegal_state<"branch unreachable">
    ;

  type nonnumericIndex_<ix extends any.index>
    = ix extends number ? true : [parseNumeric<ix>] extends [never] ? false : true

  type isNumeric<ix extends any.index>
    = nonnumericIndex_<ix> extends infer b
    ? [boolean] extends [b] ? true : [b] extends [true] ? true : false
    : never.close.inline_var<"b">
    ;

  type numericKeys<type extends any.array, numerics extends any.array>
    = [type] extends [readonly []] ? 0 extends numerics["length"] ? never : numerics
    : [type] extends [readonly [any.index<infer head>, ...infer tail]]
    ? impl.isNumeric<head> extends true ? impl.numericKeys<tail, [...numerics, head]>
    : impl.numericKeys<tail, numerics>
    : never.illegal_state<"branch unreachable">
    ;

  type nonnumericIndex<type extends any.array<any.two<any.index, unknown>>>
    = 0 extends type["length"] ? unknown
    : isNumeric<type[number][0]> extends false ? (unknown)
    : impl.numericKeys<impl.getKeys<type>, []>
    ;

  type bijection<left extends any.object, right extends any.object>
    = [Exclude<keyof left, keyof right>, Exclude<keyof right, keyof left>] extends infer out
    ? out extends [never, never]
    ? (unknown)
    : out
    : never.close.inline_var<"out">
    ;
}

type constrain<invariant, type> = type & invariant

type check<type, constraint, applied, err> =
  [type] extends [constraint]
  ? ([type] extends [applied] ? unknown : err)
  : never
  ;

type nonobject<type> = check<type, any.object, enforce.nonobject<type>, "err">
  ;

declare namespace enforce {
  type nonobject<type>
    = [type] extends [any.array] ? (unknown)
    : [type] extends [any.object] ? Fn.return<typeof Err.NonObject<type>>
    : (unknown)
    ;

  type extract<t, u> = [t] extends [u] ? t : never

  type tuple<xs, constraint extends any.array>
    = [xs] extends [constraint]
    ? [number] extends [xs["length"]] ? Fn.return<typeof Err.NonArrayTuple<xs>>
    : constraint
    : never
    ;

  type singleChar<type>
    = [string] extends [type] ? Fn.return<typeof Err.SingleCharGotUniversal<type>>
    : [type] extends [`${any}${infer rest}`]
    ? rest extends empty.string ? (unknown)
    : Fn.return<typeof Err.SingleCharGotLonger<type>>
    : Fn.return<typeof Err.SingleCharGotShorter<type>>
    ;

  type noExcessProps<left extends any.object, right extends left>
    = impl.bijection<left, right> extends any.two<infer l, infer r>
    ? Fn.return<typeof Err.NoExcessProps<
      [...(
        | [l] extends [never] ? [r]
        : [r] extends [never] ? [l]
        : [l, r]
      )]
    >>
    : (unknown)
    ;

  type nonunion<type>
    = U.is<type> extends false ? (unknown)
    : Fn.return<typeof Err.NonUnion<type>>
    ;

  type singletonObject<type>
    = [type] extends [any.array] ? (unknown)
    : [type] extends [any.object]
    ? [keyof type] extends [never] ? (unknown)
    : U.is<keyof type> extends true ? Fn.return<typeof Err.MaxOneProp<type>>
    : type
    : (unknown)
    ;

  type nonnumericIndex<type extends any.array<any.two<any.index, unknown>>>
    = 0 extends type["length"] ? unknown
    : [impl.isNumeric<type[number][0]>] extends [false] ? (unknown)
    : Err2<"NonNumericIndex", impl.numericKeys<impl.getKeys<type>, []>>
    ;

  type uniqNonNumericIndex<type>
    = [type] extends [any.entries]
    ? impl.nonnumericIndex<type> extends any.arrayOf<any.index, infer numerics>
    ? Err2<"NonNumericIndex", numerics>
    : enforce.uniqueness.ofEntries<type> extends infer dupes
    ? unknown extends dupes ? (unknown)
    : dupes
    : never.close.inline_var<"uniq">
    : never
    ;

  type literal<type>
    = [string] extends [type] ? Fn.return<typeof Err.Literal<type>>
    : [number] extends [type] ? Fn.return<typeof Err.Literal<type>>
    : [boolean] extends [type] ? Fn.return<typeof Err.Literal<type>>
    : (unknown)
    ;

  type stringLiteral<type extends string>
    = [string] extends [type] ? Fn.return<typeof Err.StringLiteral<type>>
    : (unknown)
    ;

  type numberLiteral<type extends number>
    = [number] extends [type] ? Fn.return<typeof Err.NumberLiteral<type>>
    : (unknown)
    ;

  type booleanLiteral<type extends boolean>
    = [boolean] extends [type] ? Fn.return<typeof Err.BooleanLiteral<type>>
    : (unknown)
    ;

  type numericLiteral<type extends number | bigint>
    = [number] extends [type] ? Fn.return<typeof Err.NumericLiteral<type>>
    : [bigint] extends [type] ? Fn.return<typeof Err.NumericLiteral<type>>
    : (unknown)
    ;

  type bigintLiteral<type extends bigint>
    = [bigint] extends [type] ? Fn.return<typeof Err.BigIntLiteral<type>>
    : (unknown)
    ;

  type integer<type>
    = [number.is.integer<type>] extends [true] ? (unknown)
    : Fn.return<typeof Err.Integer<type>>
    ;

  const integer
    : <x extends number & enforce.integer<x>>(x: x) => x
    ;

  type natural<type>
    = number.is.natural<type> extends true ? (unknown)
    : Fn.return<typeof Err.Integer<type>>
    ;

  type negativeNumber<type>
    = number.is.negative<type> extends true ? (unknown)
    : Fn.return<typeof Err.Negative<type>>
    ;

  type positiveNumber<type>
    = number.is.positive<type> extends true ? (number)
    : Fn.return<typeof Err.Positive<type>>
    ;

  type nonliteral<type>
    = [string] extends [type] ? (unknown)
    : [number] extends [type] ? (unknown)
    : [boolean] extends [type] ? (unknown)
    : Fn.return<typeof Err.MaxOneProp<type>>
    ;

  type isNotAssignableTo<type, disallow>
    = [type] extends [disallow] ? Fn.return<typeof Err.IsNotAssignableTo<type>>
    : (unknown)
    ;

  type nonEmptyString<type>
    = [type] extends [``]
    ? Fn.return<typeof Err.NonEmptyString<type>>
    : (unknown)
    ;

  type nonEmptyArray<type>
    = [type] extends readonly []
    ? Fn.return<typeof Err.NonEmptyString<type>>
    : (unknown)
    ;

  type shallowArray<type extends any.array> = U.exists<
    type[number],
    any.object,
    { onMatch: Fn.return<typeof Err.Shallow<type>>; onNoMatch: unknown }
  >

  type shallow<type>
    = [type] extends [any.primitive] ? (unknown)
    : [type] extends [HasDiscriminant] ? (unknown)
    : [type] extends [any.array] ? enforce.shallowArray<type>
    : [type] extends [any.object] ? Fn.return<typeof Err.Shallow<type>>
    : (unknown)
    ;

  namespace uniqueness {
    type ofEntries<type>
      = [impl.duplicateKeys<impl.getKeys<type>, {}, []>] extends [any.list<infer duplicates>]
      ? [duplicates] extends [never]
      ? (unknown)
      : Fn.return<typeof Err.KeyUniqueness<duplicates>>
      : (unknown)
      ;
  }
}
