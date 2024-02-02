export {
  Integer,
  Natural,
  Number as number,
  Real as real,
  bigint,
}

import * as any from "../any"
import { empty, nonempty } from "../empty"
import { never } from "../semantic-never/exports"
import { boolean } from "../boolean/exports"
import { assert, enforce, expect } from "../exports"
import { constrain } from "../err/enforce"

type Whitespace = typeof Whitespace[keyof typeof Whitespace]
const Whitespace = {
  space: " ",
  newline: "\n",
  tab: "\t",
} as const

namespace $$ {
  export const Int: unique symbol = Symbol.for("any-ts/number::Integer")
  export const Nat: unique symbol = Symbol.for("any-ts/number::Natural")
  export const Big: unique symbol = Symbol.for("any-ts/number::Big")
  export const Real: unique symbol = Symbol.for("any-ts/number::Real")
}
declare namespace $$ {
  type Int = typeof $$.Int
  type Nat = typeof $$.Nat
  type Big = typeof $$.Big
  type Real = typeof $$.Real
}

declare namespace Parser {
  type parse<x extends any.showable>
    = x extends `${infer y extends number}n`
    ? bigint.parse<y>
    : x
    ;

  type __Parser_parse__ = [
    Parser.parse<`${1n}`>,
    Parser.parse<`${1}`>,
    Parser.parse<1n>,
  ]
}

declare namespace bigint {
  type is<x> = [x] extends [bigint] ? true : false
  namespace is {
    type literal<x> = [x] extends [bigint] ? [bigint] extends [x] ? false : true : false
    type universal<x> = [bigint] extends [x] ? true : false
  }

  type parse<type>
    = [type] extends [bigint] ? type
    : [type] extends [any.key]
    ? [`${type}`] extends [`${infer x extends number}n`] ? bigint.parse<x>
    : [`${type}`] extends [`${infer x extends bigint}`] ? x
    : never.close.unmatched_expr
    : never.close.unmatched_expr
    ;

  namespace parse {
    type literal<type> = [bigint] extends [type] ? never.as_nothing : bigint.parse<type>
    type universal<type> = [bigint] extends [type] ? type : [`${bigint}`] extends [type] ? bigint : never.as_nothing
  }

  type __Parser_parseBigInt__ = [
    // ^?
    bigint.parse<1n>,
    bigint.parse<`1n`>,
    bigint.parse<1>,
    bigint.parse<0.0>,
    bigint.parse<-1>,
    bigint.parse<`-1`>,
    bigint.parse<`${number}1`>,
    bigint.parse<`${number}1n`>,
    bigint.parse<bigint>,
    bigint.parse<number>,
    bigint.parse<`${bigint}1`>,
    bigint.parse<`${bigint}1n`>,
    bigint.parse.literal<bigint>,
    bigint.parse.literal<1n>,
    bigint.parse.universal<bigint>,
    bigint.parse.universal<`${bigint}`>,
    bigint.parse.universal<"bigint">,
    bigint.parse.universal<`${1n}`>,
    bigint.parse<"0.0">,
    bigint.parse<0.3>,
  ]
}

namespace Natural { export const never: never.not_meant_for_use = void 0 as never }
declare namespace Natural {
  type is<x> = boolean.all<[Integer.is<x>, number.isPositive<x>]>

  type __Natural_is__ = [
    // ^?
    /* 𝖈𝖚𝖗𝖘𝖊𝖉 */
    expect<assert.is.false<Natural.is<never>>>,
    expect<assert.is.false<Natural.is<number>>>,
    expect<assert.is.false<Natural.is<0.1>>>,
    expect<assert.is.false<Natural.is<-0.1>>>,
    expect<assert.is.false<Natural.is<` `>>>,
    expect<assert.is.false<Natural.is<`\n`>>>,
    expect<assert.is.false<Natural.is<`\t`>>>,
    expect<assert.is.false<Natural.is<Whitespace>>>,
    expect<assert.is.false<Natural.is<`${number}1`>>>,
    expect<assert.is.false<Natural.is<`${number}1n`>>>,
    expect<assert.is.false<Natural.is<`${bigint}1`>>>,
    expect<assert.is.false<Natural.is<`${bigint}1n`>>>,
    expect<assert.is.false<Natural.is<`${1.1}n`>>>,
    expect<assert.is.false<Natural.is<`${1n}`>>>,
    expect<assert.is.false<Natural.is<-1>>>,
    expect<assert.is.false<Natural.is<-1n>>>,
    /* happy path */
    expect<assert.is.true<Natural.is<0>>>,
    expect<assert.is.true<Natural.is<-0>>>,
    expect<assert.is.true<Natural.is<1>>>,
    /* positive bigints are also natural numbers */
    expect<assert.is.true<Natural.is<1n>>>,
    expect<assert.is.true<Natural.is<bigint>>>,
  ]
}


function Integer() { }

const integer = <x extends constrain<number, enforce.integer<x>>>(x: x) => x
type integer<type extends enforce.integer<type>> = type

namespace Integer {
  Integer.new = Integer.new;
}


declare namespace Integer {
  export { integer as new }


  export type is<x>
    = [x] extends [string] ? false
    : [`${x & any.showable}`] extends
    | [`${bigint}`]
    | [`${bigint}e+${bigint}`] ? true
    : false
    ;
}

declare namespace Real {
  type is<x> = boolean.all<[Number.is<x>, boolean.not<Integer.is<x>>]>
}

namespace Real {

}

type Number = 0
declare function Number<x extends number>(): x
namespace Number {

}

declare namespace Number {
  type is<x> = [x] extends [number] ? true : false
  namespace is {
    type zero<x> = number.isZero<x>
    type one<x> = number.isOne<x>
    type natural<x> = Natural.is<x>
    type positive<x> = number.isPositive<x>
    type negative<x> = number.isNegative<x>
    type integer<x> = Integer.is<x>
    type real<x> = Real.is<x>
    type universal<x> = [number] extends [x] ? true : false
    type literal<x> = boolean.all<[Number.is<x>, boolean.not<Number.is.universal<x>>]>
  }
}

/** @internal */
declare function number<x extends number>(): x
/** @internal */
namespace number {
  export declare const integer
    : {
      <x extends never>(number: x): enforce.integer<x>
      <x extends enforce.integer<x>>(x: x): x
    }

}

/** @internal */
declare namespace number {
  type isNegative<x> = [x] extends [any.showable] ? [`${x}`] extends [`-${number}`] ? true : false : false
  type isPositive<x> = [x] extends [any.showable] ? [`${x}`] extends [`-${number}`] ? false : true : false
  type isZero<x> = [0, x] extends [x, 0] ? true : false
  type isOne<x> = [1, x] extends [x, 1] ? true : false
}

declare namespace __Spec__ {
  type __is__ = [
    Real.is<1.3>,
    Real.is<-1>,
    Real.is<number>,
  ]

  type __Integer_is__ = [
    // ^?
    /* 𝖈𝖚𝖗𝖘𝖊𝖉 */
    expect<assert.is.false<Integer.is<never>>>,
    expect<assert.is.false<Integer.is<number>>>,
    expect<assert.is.false<Integer.is<0.1>>>,
    expect<assert.is.false<Integer.is<-0.1>>>,
    expect<assert.is.false<Integer.is<` `>>>,
    expect<assert.is.false<Integer.is<`\n`>>>,
    expect<assert.is.false<Integer.is<`\t`>>>,
    expect<assert.is.false<Integer.is<Whitespace>>>,
    expect<assert.is.false<Integer.is<`${number}1`>>>,
    expect<assert.is.false<Integer.is<`${number}1n`>>>,
    expect<assert.is.false<Integer.is<`${bigint}1`>>>,
    expect<assert.is.false<Integer.is<`${bigint}1n`>>>,
    expect<assert.is.false<Integer.is<`${1.1}n`>>>,
    expect<assert.is.false<Integer.is<`${1n}`>>>,
    /* happy path */
    expect<assert.is.true<Integer.is<0>>>,
    expect<assert.is.true<Integer.is<-0>>>,
    expect<assert.is.true<Integer.is<1>>>,
    expect<assert.is.true<Integer.is<-1>>>,
    /* happy path -> bigints are still integers */
    expect<assert.is.true<Integer.is<1n>>>,
    expect<assert.is.true<Integer.is<-1n>>>,
    expect<assert.is.true<Integer.is<bigint>>>,
    expect<assert.is.true<Integer.is<0e1>>>,
    expect<assert.is.true<Integer.is<9999e+3>>>,
  ]
}

