export type {
  String as string,
}

import type { any } from "../any-namespace"
import type { boolean } from "../boolean/boolean"
import type { assert, expect } from "../test/exports"
import type { empty, nonempty } from "../empty"
import type { never } from "../semantic-never/exports"

import type { char, chars } from "./char"
import type { Fn1, Fn2, interpret1, interpret2 } from "./kind"
import type { Union } from "../union/exports"

type parseNumeric<type> = type extends `${infer x extends number}` ? x : never

declare namespace Config {
  export interface options { recursive: boolean }
  export interface defaults extends options { recursive: false }
  export { defaults as default }
}

declare namespace Fn {
  // re-exports
  export {
    Fn1,
    Fn2,
    interpret1,
    interpret2,
  }

  // internal exports
  export {
    between,
    capitalize,
    is,
    prefix,
    postfix,
    unprefix,
    unpostfix,
    replace,
    show,
    snake,
  }

  namespace is {
    interface capitalizedString extends Fn1<any.showable> { [-1]: String.is.alpha<`${this[0]}`> }
    interface uppercaseString extends Fn1<any.showable> { [-1]: String.is.uppercase<`${this[0]}`> }
    interface uppercaseAlphaChar extends Fn1<any.showable> { [-1]: char.is.uppercaseAlpha<`${this[0]}`> }
  }

  interface show extends Fn1<any.showable> { [-1]: `${this[0]}` }
  interface between<middle extends any.showable> extends Fn2<any.showable, any.showable> { [-1]: `${this[0]}${middle}${this[1]}` }
  interface capitalize extends Fn1<any.showable> { [-1]: globalThis.Capitalize<`${this[0]}`> }

  interface prefix<before extends any.showable> extends Fn1<any.showable> { [-1]: `${before}${this[0]}` }
  interface postfix<after extends any.showable> extends Fn1<any.showable> { [-1]: `${this[0]}${after}` }
  interface unprefix<prefix extends any.showable> extends Fn1<string> { [-1]: String.unprefix<prefix, this[0]> }
  interface unpostfix<suffix extends any.showable> extends Fn1<string> { [-1]: String.unpostfix<suffix, this[0]> }

  interface replace<needle extends any.showable, next extends any.showable> extends Fn1<string> { [-1]: String.replace<needle, next, this[0]> }
  interface snake extends Fn1<any.showable> { [-1]: `_${Lowercase<`${this[0]}`>}` }
}

type String = "hey"
function String(): void { }

namespace String { String.case = case_ }
declare namespace String {
  export {
    case_ as case,
    Config,
  }

  export type Digits = typeof char.Digits
  export type Digit = Digits[number]
  export type LowercaseChars = typeof char.Lowers
  export type LowercaseChar = LowercaseChars[number]
  export type UppercaseChars = typeof char.Uppers
  export type UppercaseChar = UppercaseChars[number]

  type is<type> = [type] extends [string] ? true : false
  export namespace is {
    export type empty<type extends string> = [type] extends [``] ? true : false
    export type alpha<type extends string> = [Uppercase<type> | Lowercase<type>] extends [type] ? false : true
    export type uppercase<type extends string> = [Uppercase<type>] extends [type] ? true : false
    export type lowercase<type extends string> = [Lowercase<type>] extends [type] ? true : false
    export type uppercaseAlpha<type extends string> = boolean.all<[String.is.uppercase<type>, String.is.alpha<type>]>
    export type lowercaseAlpha<type extends string> = boolean.all<[String.is.lowercase<type>, String.is.alpha<type>]>
    export type parsableNumeric<type extends string>
      = parseNumeric<type> extends any.number<infer x>
      ? [x] extends [never]
      ? false : true : false
      ;
  }

  export type lowercaseAll<type extends any.array<any.showable>> = { [ix in keyof type]: Lowercase<`${type[ix]}`> }
  export type uppercaseAll<type extends any.array<any.showable>> = { [ix in keyof type]: Uppercase<`${type[ix]}`> }
  export type capitalizeAll<type extends any.array<any.showable>> = { [ix in keyof type]: Capitalize<`${type[ix]}`> }
  export type join<
    type extends any.array<any.showable>,
    delimiter extends
    | any.showable
    = empty.string
  > = string.intercalate<``, type, delimiter>

  export type endsWith<matcher extends any.showable, text extends string> = [text] extends [`${string}${matcher}`] ? true : false
  export type startsWith<matcher extends any.showable, text extends string> = [text] extends [`${matcher}${string}`] ? true : false
  export type replace<needle extends any.showable, next extends any.showable, haystack extends string>
    = [haystack] extends [`${infer before}${needle}${infer after}`] ? `${before}${next}${after}` : haystack

  export type head<chars extends string> = chars extends nonempty.string<infer head, any> ? head : never
  export type tail<chars extends string> = chars extends nonempty.string<any, infer tail> ? tail : never
  export type behead<chars extends string> = chars extends nonempty.string<infer head, infer tail> ? [head: head, tail: tail] : never
  export type second<chars extends string> = chars extends nonempty.string<any, infer tail> ? head<tail> : never

  export type concat<left extends string, right extends string> = `${left}${right}`
  export type between<left extends string, middle extends string, right extends string> = `${left}${middle}${right}`
  export type prefix<before extends any.showable, text extends string> = `${before}${text}`
  export type postfix<after extends any.showable, text extends string> = `${text}${after}`
  export type unprefix<prefix extends any.showable, text extends string> = text extends `${prefix}${infer tail}` ? tail : never
  export type unpostfix<suffix extends any.showable, text extends string> = text extends `${infer head}${suffix}` ? head : never

  export type split<
    text extends string,
    matcher extends Fn1<any.showable> | any.array<any.showable>,
    onMatch extends Fn1<any.showable> = Fn.show
  >
    = string.intercalate<``, string.split<[], ``, text, matcher, onMatch>>

  /**
   * TODO: 
   * - [ ]: currently `options` are not respected. Add support for:
   *        - [ ]: specifying whether the operation should be applied once, or recursively
   * - [ ]: better error messages to handle union inputs
   */
  export type splitOn<
    delimiter extends any.showable,
    text extends string,
    _options extends Config.options = Config.default
  >
    = Union.is<delimiter> extends true ? "Union delimiters are not currently supported"
    : char.is<`${delimiter}`> extends true ? string.splitOnceOnChar<``, text, delimiter>
    : chars.is<`${delimiter}`> extends true ? string.splitOnceOnChars<``, text, delimiter>
    : never.illegal_state<"`char.is` and `chars.is` should be total over strings">
    ;
}

declare namespace string {
  export type splitOnceOnChar<acc extends string, text extends string, delimiter extends any.showable>
    = text extends `${infer head}${delimiter}${infer tail}` ? [before: head, after: tail] : never

  export type splitOnceOnChars<acc extends string, text extends string, delimiter extends any.showable>
    = text extends empty.string ? acc
    : text extends nonempty.string<infer head, infer tail>
    ? delimiter extends nonempty.string<infer dhead, infer dtail>
    ? head extends dhead
    ? String.startsWith<dtail, tail> extends true
    ? tail extends `${dtail}${infer rest}`
    ? [before: acc, after: rest]
    : never.close.inline_var<"rest">
    : never.close.unmatched_expr
    : splitOnceOnChars<`${acc}${head}`, tail, delimiter>
    : never.close.inline_var<"dhead" | "dtail">
    : never.close.inline_var<"head" | "tail">
    ;

  type split<
    acc extends any.array<any.showable>,
    intermediate extends any.showable,
    text extends string,
    matcher extends Fn1<any.showable> | any.array<any.showable>,
    onMatch extends Fn1<any.showable>
  >
    = [text] extends [empty.string] ? [...acc, intermediate]
    : [text] extends [nonempty.string<infer head, infer tail>]
    ? (
      [matcher] extends [Fn1<any.showable>] ? interpret1<matcher, head>
      : [matcher] extends [any.array]
      ? [head] extends [matcher[number]] ? true
      : false : false
    ) extends true
    ? split<[...acc, intermediate], Extract<interpret1<onMatch, head>, any.showable>, tail, matcher, onMatch>
    : split<acc, `${intermediate}${head}`, tail, matcher, onMatch>
    : never.close.unmatched_expr
    ;

  type intercalate<
    acc extends string,
    lines extends any.array<any.showable>,
    delimiter extends any.showable = empty.string
  > = lines extends empty.array ? acc
    : lines extends nonempty.arrayof<any.showable, infer head, infer tail>
    ? string.intercalate<acc extends `` ? `${head}` : `${acc}${delimiter}${head}`, tail, delimiter>
    : never.close.inline_var<"head" | "tail">
    ;

  type snakeFromCamel<text extends string>
    = split<[], ``, text, typeof char.Uppers, Fn.snake>
}

namespace case_ {
  export namespace snake {
    export declare const fromCamel: <text extends string>(text: text) => case_.snake.fromCamel<text>
  }
}
declare namespace case_ {
  namespace snake {
    type fromCamel<text extends string>
      = string.intercalate<``, string.snakeFromCamel<text>> extends any.string<infer out>
      ? [out] extends [`_${infer tail}`] ? tail : out
      : never.close.inline_var<"out">
      ;
  }
}

declare namespace __Spec__ {
  type __Fn_isUppercaseAlphaChar__ = [
    // ^?
    /* 𝖈𝖚𝖗𝖘𝖊𝖉 */
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "a">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "z">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, " ">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "-">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "0">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "Aa">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "AA">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "aa">>>,
    /* happy path */
    expect<assert.is.true<interpret1<Fn.is.uppercaseAlphaChar, "A">>>,
    expect<assert.is.true<interpret1<Fn.is.uppercaseAlphaChar, "Z">>>,
  ]

  type __String_isParsableNumeric__ = [
    // ^?
    // forgotten path
    expect<assert.is.false<String.is.parsableNumeric<"abc">>>,
    expect<assert.is.false<String.is.parsableNumeric<"a0a">>>,
    // happy path
    expect<assert.is.true<String.is.parsableNumeric<"0">>>,
    expect<assert.is.true<String.is.parsableNumeric<"0.000">>>,
  ]

  type __String_split__ = [
    // ^?
    expect<assert.equal<String.split<``, [``]>, "">>,
    expect<assert.equal<String.split<`.`, [`.`]>, `.`>>,
    expect<assert.equal<String.split<`hey jude`, Fn.is.uppercaseAlphaChar, Fn.snake>, "hey jude">>,
    expect<assert.equal<
      String.split<`123e4567-e89b-12d3-a456-426614174000`, [`-`], Fn.replace<`-`, `_`>>,
      "123e4567_e89b_12d3_a456_426614174000"
    >>,
  ]

  type __string_splitOnceOnChar__ = [
    // ^?
    expect<assert.equal<string.splitOnceOnChar<``, ``, ``>, never>>,
    expect<assert.equal<string.splitOnceOnChar<``, " ", " ">, [before: "", after: ""]>>,
    expect<assert.equal<string.splitOnceOnChar<``, `1`, 1>, [before: "", after: ""]>>,
    expect<assert.equal<string.splitOnceOnChar<``, `.x`, `.`>, [before: "", after: "x"]>>,
    expect<assert.equal<string.splitOnceOnChar<``, `x.`, `.`>, [before: "x", after: ""]>>,
    expect<assert.equal<string.splitOnceOnChar<``, `hey.ho`, `,`>, never>>,
  ]

  type __splitOnceOnChars__ = [
    // ^?
    expect<assert.equal<
      string.splitOnceOnChars<``, `555-555-5555`, `555`>,
      [before: "", after: "-555-5555"]
    >>,
    expect<assert.equal<
      string.splitOnceOnChars<``, `555-333-5555`, `333`>,
      [before: "555-", after: "-5555"]
    >>,
  ]

  type __startsWith__ = [
    // ^?
    /* 𝖈𝖚𝖗𝖘𝖊𝖉 */
    expect<assert.is.false<String.startsWith<123, "hey">>>,
    /* happy path */
    expect<assert.is.true<String.startsWith<"", "">>>,
    expect<assert.is.true<String.startsWith<"", "123">>>,
    expect<assert.is.true<String.startsWith<123, "123">>>,
    expect<assert.is.true<String.startsWith<123, "123456">>>,
  ]
}
