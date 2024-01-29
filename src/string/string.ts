export {
  between,
  concat,
  endsWith,
  splitOn,
  startsWith,
}

import { Union } from "../union/exports"
import * as any from "../any"
import type { never } from "../semantic-never/exports"
import { char, chars } from "./char"
import { empty, nonempty } from "../empty"
import { assert, expect } from "../exports"

export declare namespace Config {
  export interface options { recursive: boolean }
  export interface defaults extends options { recursive: false }
  export { defaults as default }
}

type _ = string
type empty = ``
type concat<left extends _, right extends _> = `${left}${right}`
type between<left extends _, middle extends _, right extends _> = `${left}${middle}${right}`
type startsWith<matcher extends any.showable, text extends _> = text extends `${matcher}${string}` ? true : false
type endsWith<matcher extends any.showable, text extends _> = text extends `${string}${matcher}` ? true : false

/**
 * TODO: 
 * - [ ]: currently `options` are not respected. Add support for:
 *        - [ ]: specifying whether the operation should be applied once, or recursively
 * - [ ]: better error messages to handle union inputs
 */
type splitOn<delimiter extends any.showable, text extends _, options extends Config.options = Config.default>
  = Union.is<delimiter> extends true ? "Union delimiters are not currently supported"
  : char.is<`${delimiter}`> extends true ? string.splitOnceOnChar<``, text, delimiter>
  : chars.is<`${delimiter}`> extends true ? string.splitOnceOnChars<``, text, delimiter>
  : never.illegal_state<"`char.is` and `chars.is` should be total over strings">
  ;
;


declare namespace string {
  export type splitOnceOnChar<acc extends _, text extends _, delimiter extends any.showable>
    = text extends `${infer head}${delimiter}${infer tail}` ? [before: head, after: tail] : never

  export type splitOnceOnChars<acc extends _, text extends _, delimiter extends any.showable>
    = text extends empty.string ? acc
    : text extends nonempty.string<infer head, infer tail>
    ? delimiter extends nonempty.string<infer dhead, infer dtail>
    ? head extends dhead
    ? startsWith<dtail, tail> extends true
    ? tail extends `${dtail}${infer rest}`
    ? [before: acc, after: rest]
    : never.close.inline_var<"rest">
    : never.close.unmatched_expr
    : splitOnceOnChars<`${acc}${head}`, tail, delimiter>
    : never.close.inline_var<"dhead" | "dtail">
    : never.close.inline_var<"head" | "tail">
    ;
}


declare namespace __Spec__ {
  type __string_splitOnceOnChar__ = [
    expect<assert.equal<string.splitOnceOnChar<``, ``, ``>, never>>,
    expect<assert.equal<string.splitOnceOnChar<``, " ", " ">, [before: "", after: ""]>>,
    expect<assert.equal<string.splitOnceOnChar<``, `1`, 1>, [before: "", after: ""]>>,
    expect<assert.equal<string.splitOnceOnChar<``, `.x`, `.`>, [before: "", after: "x"]>>,
    expect<assert.equal<string.splitOnceOnChar<``, `x.`, `.`>, [before: "x", after: ""]>>,
    expect<assert.equal<string.splitOnceOnChar<``, `hey.ho`, `,`>, never>>,
  ]

  type __splitOnceOnChars__ = [
    string.splitOnceOnChars<``, `555-555-5555`, `555`>,
    string.splitOnceOnChars<``, `555-333-5555`, `333`>,
  ]

  type __startsWith__ = [
    startsWith<"", "">,
    startsWith<"", "123">,
    startsWith<123, "123">,
    startsWith<123, "123456">,
    // failures
    startsWith<123, "hey">,
  ]

}