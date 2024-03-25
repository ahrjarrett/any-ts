export {
  char,
  charset,
}

import type { _ } from "../util"
import type { any } from "../any/exports"
import type { nonempty } from "../empty"
import type { boolean } from "../boolean/exports"
import type { string } from "./string"

declare namespace char {
  export const Lowers: [
    "a", "b", "c", "d", "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w", "x", "y", "z",
  ]
  export const Uppers: [
    "A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z",
  ]
  export const Digits
    : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
}

declare namespace Internal {
  type splitOnChar<acc extends any.array<string>, intermediate extends string, text extends string, splitOn extends any.showable>
    = text extends nonempty.string<infer head, infer tail>
    ? head extends splitOn
    ? splitOnChar<intermediate extends "" ? acc : [...acc, intermediate], "", tail, splitOn>
    : splitOnChar<acc, `${intermediate}${head}`, tail, splitOn>
    : intermediate extends "" ? acc : [...acc, intermediate]
    ;
}


declare namespace char {
  type Lower = charset.Lowers[number]
  type Upper = charset.Uppers[number]
  type Digit = charset.Digits[number]

  type is<type> = [type] extends [`${string}${infer tail}`] ? string.is.empty<tail> : false
  namespace is {
    type alpha<type extends string> = boolean.all<[char.is<type>, string.is.alpha<type>]>
    type digit<type> = boolean.all<[char.is<type>, [type] extends [char.Digit] ? true : false]>
    type lowercase<type extends string> = boolean.all<[char.is<type>, string.is.lowercase<type>]>
    type uppercase<type extends string> = boolean.all<[char.is<type>, string.is.uppercase<type>]>
    type uppercaseAlpha<type extends string> = boolean.all<[char.is.alpha<`${type}`>, char.is.uppercase<`${type}`>]>
  }

  type splitOnChar<text extends string, splitter extends any.showable> = Internal.splitOnChar<[], "", text, splitter>
}

declare namespace charset {
  type Lowers = typeof char.Lowers
  type Uppers = typeof char.Uppers
  type Digits = typeof char.Digits

  type is<chars>
    = chars extends nonempty.string<string, infer tail>
    ? string.is.nonempty<tail>
    : false
    ;
}
