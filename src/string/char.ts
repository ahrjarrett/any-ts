export {
  char,
  chars,
}

import type { _ } from "../any"
import type { empty, nonempty } from "../empty"
import type { boolean } from "../boolean/exports"
import type { assert, expect } from "../test/exports"
import type { string } from "./string"

namespace char {
  export const Lowers = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w", "x", "y", "z",
  ] as const
  export const Uppers = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z",
  ] as const
  export const Digits
    = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const
}

declare namespace char {
  export type Lowers = typeof char.Lowers
  export type Uppers = typeof char.Uppers
  export type Digits = typeof char.Digits
  export {
    is,
  }

  type is<type> = [type] extends [`${any}${infer tail}`] ? string.is.empty<tail> : false
  namespace is {
    type alpha<type extends string> = boolean.all<[char.is<type>, string.is.alpha<type>]>
    type digit<type> = boolean.all<[char.is<type>, [type] extends [Digits[number]] ? true : false]>
    type lowercase<type extends string> = boolean.all<[char.is<type>, string.is.lowercase<type>]>
    type uppercase<type extends string> = boolean.all<[char.is<type>, string.is.uppercase<type>]>
    type uppercaseAlpha<type extends string> = boolean.all<[char.is.alpha<`${type}`>, char.is.uppercase<`${type}`>]>
  }
}

namespace chars { export const never: never = void 0 as never }
declare namespace chars {
  type first<chars extends _> = chars extends nonempty.string<infer first> ? first : never
  type is<chars extends _>
    = chars extends nonempty.string<any, infer tail> ? tail extends empty.string ? false : true : false
}

declare namespace __Spec__ {
  type __isDigit__ = [
    // ^?
    // forgotten path
    expect<assert.is.false<char.is.digit<".">>>,
    expect<assert.is.false<char.is.digit<"11">>>,
    expect<assert.is.false<char.is.digit<"a">>>,
    expect<assert.is.false<char.is.digit<" ">>>,
    // happy path
    expect<assert.is.true<char.is.digit<"0">>>,
    expect<assert.is.true<char.is.digit<"1">>>,
  ]

  type __char_is__ = [
    // ^?
    expect<assert.is.false<char.is<"">>>,
    expect<assert.is.false<char.is<string>>>,
    expect<assert.is.false<char.is<"hello">>>,
    // happy path
    expect<assert.is.true<char.is<"h">>>,
  ]

  type __chars_is__ = [
    // ^?
    expect<assert.is.false<chars.is<"">>>,
    expect<assert.is.false<chars.is<string>>>,
    expect<assert.is.false<chars.is<"h">>>,
    // happy path
    expect<assert.is.true<chars.is<"hello">>>,
  ]
}
