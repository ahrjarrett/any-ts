export type {
  is,
  takeUntilCaseChange,
  takeUntilCaseChangeRec,
  takeUntilExclusive,
  takeUntilInclusive,
  endsWith,
  startsWith,
  splitOnceOnChar,
  splitOnceOnChars,
  split,
  intercalate,
  join,
  delimitedCase,
  screamingSnake,
  kebab,
  screamingKebab,
  snake,
}

import type { any } from "../any/exports"
import type { boolean } from "../boolean/boolean"
import type { empty, nonempty } from "../empty"
import type { never } from "../semantic-never/exports"
import type { Kind } from "../kind/exports"

import type { char, charset } from "./char"

type parseNumeric<type> = type extends `${infer x extends number}` ? x : never

type endsWith<matcher extends any.showable, text extends string> = [text] extends [`${string}${matcher}`] ? true : false
type startsWith<matcher extends any.showable, text extends string> = [text] extends [`${matcher}${string}`] ? true : false

type is<type> = [type] extends [string] ? true : false
declare namespace is {
  type empty<type extends string> = [type] extends [``] ? true : false
  type nonempty<type extends string> = boolean.not<is.empty<type>> // [type] extends [``] ? true : false
  type alpha<type extends string> = [Uppercase<type> | Lowercase<type>] extends [type] ? false : true
  type nonalpha<type extends string> = boolean.not<is.alpha<type>>
  // type numeric<type extends string> = `${number}`
  type uppercase<type extends string> = [Uppercase<type>] extends [type] ? true : false
  type lowercase<type extends string> = [Lowercase<type>] extends [type] ? true : false
  type uppercaseAlpha<type extends string> = boolean.all<[is.uppercase<type>, is.alpha<type>]>
  type lowercaseAlpha<type extends string> = boolean.all<[is.lowercase<type>, is.alpha<type>]>
  type parsableNumeric<type extends string>
    = parseNumeric<type> extends any.number<infer x>
    ? [x] extends [never]
    ? false : true : false
    ;
}

type takeUntilInclusive<
  acc extends string,
  text extends string,
  matchers extends any.showables
> = text extends nonempty.string<infer head, infer tail>
  ? (
    head extends matchers[number]
    ? takeUntilInclusive<`${acc}${head}`, tail, matchers>
    : [acc, text]
  )
  : acc extends empty.string ? [text, ""] : [acc, text]
  ;

type takeUntilCaseChangeRec<
  acc extends any.array<string>,
  text extends string,
> = text extends nonempty.string<infer head, infer tail>
  // collect consecutive digits
  ? char.is.digit<head> extends true ?
  (
    takeUntilInclusive<"", text, charset.Digits> extends
    | [any.string<infer before>, any.string<infer after>]
    ? takeUntilCaseChangeRec<[...acc, before], after>
    : [acc, text]
  )
  // drop non-alpha numeric characters
  : is.nonalpha<head> extends true ? takeUntilCaseChangeRec<acc, tail>
  // collect consecutive lowercase characters
  : is.lowercase<head> extends true ?
  (
    takeUntilInclusive<empty.string, text, charset.Lowers> extends
    | [any.string<infer before>, any.string<infer after>]
    ? takeUntilCaseChangeRec<[...acc, before], after>
    : [acc, text]
  )
  // collect consecutive uppercase characters
  : is.uppercase<head> extends true ?
  (
    tail extends nonempty.string<infer snd, string>
    ? char.is.uppercase<snd> extends true ?
    (
      takeUntilExclusive<empty.string, text, charset.Uppers> extends
      | [any.string<infer before>, any.string<infer after>]
      ? takeUntilCaseChangeRec<[...acc, before], after>
      : [acc, text]
    )
    : char.is.lowercase<snd> extends true ?
    (
      takeUntilInclusive<"", tail, charset.Lowers> extends
      | [any.string<infer before>, any.string<infer after>]
      ? takeUntilCaseChangeRec<[...acc, `${head}${before}`], after>
      : [acc, text]
    )
    : never.illegal_state
    : [...acc, head]
  )
  : never.close.inline_var<"head" | "tail">
  : acc
  ;

type takeUntilCaseChange<
  acc extends string,
  text extends string,
> = text extends nonempty.string<infer head, infer tail>
  ? char.is.lowercase<head> extends true ? takeUntilInclusive<acc, text, charset.Lowers>
  : char.is.uppercase<head> extends true ?
  (
    tail extends nonempty.string<infer snd, string>
    ? char.is.uppercase<snd> extends true ? takeUntilExclusive<acc, text, charset.Uppers>
    : char.is.lowercase<snd> extends true ? takeUntilInclusive<`${acc}${head}`, tail, charset.Lowers>
    : never.illegal_state
    : [`${acc}${head}`, tail]
  )
  : never.illegal_state
  : [acc, text]
  ;

type takeUntilExclusive<
  acc extends string,
  text extends string,
  matchers extends any.showables
> = text extends nonempty.string<infer head, infer tail> ?
  (tail extends nonempty.string<infer snd, string> ?
    (head extends matchers[number] ?
      (snd extends matchers[number]
        ? takeUntilExclusive<`${acc}${head}`, tail, matchers>
        : acc extends empty.string ? [head, tail] : [acc, text])
      : [`${acc}${head}`, tail]
    )
    : head extends matchers[number]
    ? [`${acc}${head}`, empty.string]
    : acc extends empty.string ? [acc, head] : [acc, text]
  )
  : [acc, text]
  ;

type splitOnceOnChar<
  text extends string,
  delimiter extends any.showable
>
  = text extends `${infer head}${delimiter}${infer tail}`
  ? [before: head, after: tail]
  : never
  ;

type splitOnceOnChars<acc extends string, text extends string, delimiter extends any.showable>
  = text extends empty.string ? acc
  : text extends nonempty.string<infer head, infer tail>
  ? delimiter extends nonempty.string<infer d_head, infer d_tail>
  ? head extends d_head
  ? startsWith<d_tail, tail> extends true
  ? tail extends `${d_tail}${infer rest}`
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
  matcher extends Kind<[any.showable]> | any.array<any.showable>,
  onMatch extends Kind<[any.showable]>
>
  = [text] extends [empty.string] ? [...acc, intermediate]
  : [text] extends [nonempty.string<infer head, infer tail>]
  ? (
    [matcher] extends [Kind<[any.showable]>] ? Kind.apply$<matcher, [head]>
    : [matcher] extends [any.array]
    ? [head] extends [matcher[number]] ? true
    : false : false
  ) extends true
  ? split<[...acc, intermediate], Extract<Kind.apply$<onMatch, [head]>, any.showable>, tail, matcher, onMatch>
  : split<acc, `${intermediate}${head}`, tail, matcher, onMatch>
  : never.close.unmatched_expr
  ;

type intercalate<
  acc extends string,
  lines extends any.array<any.showable>,
  delimiter extends any.showable = empty.string
> = lines extends empty.array ? acc
  : lines extends nonempty.arrayof<any.showable, infer head, infer tail>
  ? intercalate<acc extends `` ? head : `${acc}${delimiter}${head}`, tail, delimiter>
  : never.close.inline_var<"head" | "tail">
  ;

type join<
  type extends any.array<any.showable>,
  delimiter extends
  | any.showable
  = empty.string
> = intercalate<``, type, delimiter>


type delimitedCase<text extends string, delimiter extends string>
  = join<takeUntilCaseChangeRec<[], text>, delimiter>
  ;

type screamingSnake<text extends string>
  = [string] extends [text]
  ? globalThis.Uppercase<string>
  : globalThis.Uppercase<snake<text>>
  ;

type kebab<text extends string>
  = [string] extends [text]
  ? globalThis.Lowercase<string>
  : globalThis.Lowercase<delimitedCase<text, "-">>
  ;

type screamingKebab<text extends string>
  = [string] extends [text]
  ? globalThis.Uppercase<string>
  : globalThis.Uppercase<kebab<text>>
  ;

type snake<text extends string>
  = [string] extends [text]
  ? globalThis.Lowercase<string>
  : globalThis.Lowercase<delimitedCase<text, "_">>
  ;
