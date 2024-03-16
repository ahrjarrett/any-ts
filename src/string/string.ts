export type {
  string,
  Internal,
}

import type { any } from "../any"
import type { boolean } from "../boolean/boolean"
import type { empty, nonempty } from "../empty"
import type { never } from "../semantic-never/exports"
import type { Kind } from "../kind/exports"
import type { Union } from "../union/exports"
import type { check } from "../check/exports"

import type { char, charset } from "./char"

type parseNumeric<type> = type extends `${infer x extends number}` ? x : never

declare namespace HKT {
  interface show extends Kind<[any.showable]> { [-1]: string.show<this[0]> }
  interface replace<needle extends any.showable, next extends any.showable> extends Kind<[string]> { [-1]: string.replace<needle, next, this[0]> }
  interface snake extends Kind<[string]> { [-1]: string.snake<this[0]> }
  namespace is {
    interface uppercaseAlphaChar extends Kind<[any.showable]> { [-1]: char.is.uppercaseAlpha<`${this[0]}`> }
  }
}

/**
 * TODO: 
 * - [ ]: currently `options` are not respected. Add support for:
 *        - [ ]: specifying whether the operation should be applied once, or recursively
 * - [ ]: better error messages to handle union inputs
 */
type splitOn<
  delimiter extends any.showable,
  text extends string,
// _options extends Config.options = Config.default
>
  = Union.is<delimiter> extends true ? "Union delimiters are not currently supported"
  : char.is<`${delimiter}`> extends true ? Internal.splitOnceOnChar<``, text, delimiter>
  : charset.is<`${delimiter}`> extends true ? Internal.splitOnceOnChars<``, text, delimiter>
  : never.illegal_state<"`char.is` and `chars.is` should be total over strings">
  ;


declare namespace string {
  // namespace exports
  export {
    is,
    lowercase,
    uppercase,
    capitalize,
    uncapitalize,
    snake,
    kebab,
    screamingSnake,
    screamingKebab,
  }

  // nullary
  export {
    Digits,
    Digit,
    LowercaseChars,
    LowercaseChar,
    UppercaseChars,
    UppercaseChar,
  }

  // direct exports
  export {
    join,
    endsWith,
    startsWith,
    replace,
    head,
    tail,
    behead,
    second,
    show,
    split,
    concat,
    between,
    prefix,
    postfix,
    unprefix,
    unpostfix,
    takeUntilInclusive,
    takeUntilExclusive,
    delimitedCase,
  }
}

type Digits = typeof char.Digits
type Digit = Digits[number]
type LowercaseChars = typeof char.Lowers
type LowercaseChar = LowercaseChars[number]
type UppercaseChars = typeof char.Uppers
type UppercaseChar = UppercaseChars[number]

type is<type> = [type] extends [string] ? true : false
declare namespace is {
  type empty<type extends string> = [type] extends [``] ? true : false
  type nonempty<type extends string> = boolean.not<string.is.empty<type>> // [type] extends [``] ? true : false
  type alpha<type extends string> = [Uppercase<type> | Lowercase<type>] extends [type] ? false : true
  type nonalpha<type extends string> = boolean.not<string.is.alpha<type>>
  type uppercase<type extends string> = [Uppercase<type>] extends [type] ? true : false
  type lowercase<type extends string> = [Lowercase<type>] extends [type] ? true : false
  type uppercaseAlpha<type extends string> = boolean.all<[string.is.uppercase<type>, string.is.alpha<type>]>
  type lowercaseAlpha<type extends string> = boolean.all<[string.is.lowercase<type>, string.is.alpha<type>]>
  type parsableNumeric<type extends string>
    = parseNumeric<type> extends any.number<infer x>
    ? [x] extends [never]
    ? false : true : false
    ;
}

type show<type extends any.showable> = `${type}`

type join<
  type extends any.array<any.showable>,
  delimiter extends
  | any.showable
  = empty.string
> = Internal.intercalate<``, type, delimiter>

type endsWith<matcher extends any.showable, text extends string> = [text] extends [`${string}${matcher}`] ? true : false
type startsWith<matcher extends any.showable, text extends string> = [text] extends [`${matcher}${string}`] ? true : false
type replace<needle extends any.showable, next extends any.showable, haystack extends string>
  = [haystack] extends [`${infer before}${needle}${infer after}`] ? `${before}${next}${after}` : haystack

type head<chars extends string> = chars extends nonempty.string<infer head, any> ? head : never
type tail<chars extends string> = chars extends nonempty.string<any, infer tail> ? tail : never
type behead<chars extends string> = chars extends nonempty.string<infer head, infer tail> ? [head: head, tail: tail] : never
type second<chars extends string> = chars extends nonempty.string<any, infer tail> ? head<tail> : never

type concat<left extends string, right extends string> = `${left}${right}`
type between<left extends string, middle extends string, right extends string> = `${left}${middle}${right}`
type prefix<before extends any.showable, text extends string> = `${before}${text}`
type postfix<after extends any.showable, text extends string> = `${text}${after}`
type unprefix<prefix extends any.showable, text extends string> = text extends `${prefix}${infer tail}` ? tail : never
type unpostfix<suffix extends any.showable, text extends string> = text extends `${infer head}${suffix}` ? head : never

type split<
  text extends string,
  matcher extends Kind<[any.showable]> | any.array<any.showable>,
  onMatch extends Kind<[any.showable]> = HKT.show
>
  = Internal.intercalate<``, Internal.split<[], ``, text, matcher, onMatch>>

type takeUntilInclusive<
  text extends string,
  matchers extends any.showables
> = Internal.takeUntilInclusive<"", text, matchers>

type takeUntilExclusive<
  text extends string,
  matchers extends any.showables
> = Internal.takeUntilExclusive<"", text, matchers>

type lowercase<type extends any.showable> = globalThis.Lowercase<`${type}`>
type lowercaseKey<type extends any.primitive> = type extends any.showable ? globalThis.Lowercase<`${type}`> : type
type lowercaseKeys<type extends any.object> = { [ix in keyof type as lowercaseKey<ix>]: type[ix] }
type lowercaseArrayValues<type extends any.showables> = { [ix in keyof type]: lowercase<type[ix]> }
type lowercaseObjectValues<type extends any.dict<any.showable>> = { [ix in keyof type]: lowercase<type[ix]> }
type lowercaseValues<type extends any.showables | Record<string, any.showable>>
  = [type] extends [any.showables] ? lowercaseArrayValues<type>
  : [type] extends [any.dict<any.showable>] ? lowercaseObjectValues<type>
  : never
  ;

declare namespace lowercase {
  export {
    lowercaseKey as key,
    lowercaseKeys as object,
    lowercaseValues as values,
  }
}

type uppercase<type extends any.showable> = globalThis.Uppercase<`${type}`>
type uppercaseKey<type extends any.primitive> = type extends any.showable ? uppercase<type> : type
type uppercaseKeys<type extends any.object> = { [ix in keyof type as uppercaseKey<ix>]: type[ix] }
type uppercaseArrayValues<type extends any.showables> = { [ix in keyof type]: uppercase<type[ix]> }
type uppercaseObjectValues<type extends any.dict<any.showable>> = { [ix in keyof type]: uppercase<type[ix]> }
type uppercaseValues<type extends any.showables | any.dict<any.showable>>
  = [type] extends [any.showables] ? uppercaseArrayValues<type>
  : [type] extends [any.dict<any.showable>] ? uppercaseObjectValues<type>
  : never
  ;

declare namespace uppercase {
  export {
    uppercaseKey as key,
    uppercaseKeys as object,
    uppercaseValues as values,
  }
}

type capitalize<type extends any.showable> = globalThis.Capitalize<`${type}`>
type capitalizeKey<type extends any.primitive> = type extends any.showable ? capitalize<type> : type
type capitalizeKeys<type extends any.object> = { [ix in keyof type as capitalizeKey<ix>]: type[ix] }
type capitalizeArrayValues<type extends any.showables> = { [ix in keyof type]: capitalize<type[ix]> }
type capitalizeObjectValues<type extends any.dict<any.showable>> = { [ix in keyof type]: capitalize<type[ix]> }
type capitalizeValues<type extends any.showables | any.dict<any.showable>>
  = [type] extends [any.showables] ? capitalizeArrayValues<type>
  : [type] extends [any.dict<any.showable>] ? capitalizeObjectValues<type>
  : never
  ;

declare namespace capitalize {
  export {
    capitalizeKey as key,
    capitalizeKeys as object,
    capitalizeValues as values,
  }
}

type uncapitalize<type extends any.showable> = globalThis.Uncapitalize<`${type}`>
type uncapitalizeKey<type extends any.primitive> = type extends any.showable ? uncapitalize<type> : type
type uncapitalizeKeys<type extends any.object> = { [ix in keyof type as uncapitalizeKey<ix>]: type[ix] }
type uncapitalizeArrayValues<type extends any.showables> = { [ix in keyof type]: uncapitalize<type[ix]> }
type uncapitalizeObjectValues<type extends any.dict<any.showable>> = { [ix in keyof type]: uncapitalize<type[ix]> }
type uncapitalizeValues<type extends any.showables | any.dict<any.showable>>
  = [type] extends [any.showables] ? uncapitalizeArrayValues<type>
  : [type] extends [any.dict<any.showable>] ? uncapitalizeObjectValues<type>
  : never
  ;

declare namespace uncapitalize {
  export {
    uncapitalizeKey as key,
    uncapitalizeKeys as object,
    uncapitalizeValues as values,
  }
}

type delimitedCase<text extends any.showable, delimiter extends any.showable>
  = Internal.delimitedCase<`${text}`, `${delimiter}`>
type delimitedCaseKey<type extends any.primitive, delimiter extends any.showable>
  = [type] extends [any.showable] ? delimitedCase<type, delimiter> : type
type delimitedCaseKeys<type extends any.object, delimiter extends any.showable>
  = { [ix in keyof type as delimitedCaseKey<ix, delimiter>]: type[ix] }
type delimitedCaseArrayValues<type extends any.showables, delimiter extends any.showable>
  = { [ix in keyof type]: delimitedCase<type[ix], delimiter> }
type delimitedCaseObjectValues<type extends any.dict<any.showable>, delimiter extends any.showable>
  = { [ix in keyof type]: delimitedCase<type[ix], delimiter> }
type delimitedCaseValues<type extends any.showables | any.dict<any.showable>, delimiter extends any.showable>
  = [type] extends [any.showables] ? delimitedCaseArrayValues<type, delimiter>
  : [type] extends [any.dict<any.showable>] ? delimitedCaseObjectValues<type, delimiter>
  : never
  ;

namespace screaming { screaming.snake = screamingSnake; screaming.kebab = screamingKebab; }
declare namespace screaming { export { screamingSnake as snake, screamingKebab as kebab, } }

declare namespace delimitedCase {
  export {
    delimitedCaseKey as key,
    delimitedCaseKeys as object,
    delimitedCaseValues as values,
  }
}

function delimitedCase<delimiter extends check.is.stringLiteral<string, "shh">>(delimiter: delimiter): {
  <text extends check.is.stringLiteral<text, "shh">>(text: text): delimitedCase<text, delimiter>
  <type extends any.showable>(showable: type): delimitedCase<type, delimiter>
  <type extends any.primitive>(key: type): delimitedCaseKey<type, delimiter>
  // <type extends any.object>(object: type): delimitedCaseKeys<type, delimiter>
  (string: string): Uncapitalize<string>
}
function delimitedCase(delimiter: string): {
  <text extends check.is.stringLiteral<text, "shh">>(text: text): Internal.delimitedCase<text, string>
  <type extends any.showable>(showable: type): delimitedCase<type, string>
  <type extends any.primitive>(key: type): delimitedCaseKey<type, string>
  // <type extends any.object>(object: type): delimitedCaseKeys<type, string>
  (text: string): Uncapitalize<string>
}

function delimitedCase<delimiter extends string>(delimiter: delimiter) {
  return <text extends string>(text: text) => text
    // trim any non-alphanumeric character from beginning & end of string
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "")
    // match lowercase letters immediately followed by uppercase letters or digits, inserting `delimiter` btwn
    .replace(/([a-z])([A-Z0-9])/g, (_s, a, b) => a + delimiter + b.toLowerCase())
    // replace non-alphanumeric characters, including underscore, with Delimiter
    .replace(/[^A-Za-z0-9]+|_+/g, delimiter)
}

type snake<type extends any.showable> = Internal.snake<`${type}`>
type snakeKey<type extends any.primitive> = type extends any.showable ? snake<type> : type
type snakeKeys<type extends any.object> = { [ix in keyof type as snakeKey<ix>]: type[ix] }
type snakeArrayValues<type extends any.showables> = { [ix in keyof type]: snake<type[ix]> }
type snakeObjectValues<type extends any.dict<any.showable>> = { [ix in keyof type]: snake<type[ix]> }
type snakeValues<type extends any.showables | any.dict<any.showable>>
  = [type] extends [any.showables] ? snakeArrayValues<type>
  : [type] extends [any.dict<any.showable>] ? snakeObjectValues<type>
  : never
  ;

function snake<text extends check.is.stringLiteral<text, "shh">>(string: text): snake<text>
function snake<type extends any.showable>(showable: type): snake<type>
function snake<type extends any.primitive>(key: type): snakeKey<type>
function snake(text: string): globalThis.Lowercase<string>
// function snake<type extends any.object>(object: type): snakeKeys<type>
function snake(text: string) { return delimitedCase("_")(text).toLowerCase() }

namespace snake { snake.case = snake; }
declare namespace snake {
  export {
    snake as case,
    snakeKey as key,
    snakeKeys as object,
    snakeValues as values,
  }
}

type screamingSnake<type extends any.showable> = Internal.screamingSnake<`${type}`>
type screamingSnakeKey<type extends any.primitive> = type extends any.showable ? screamingSnake<`${type}`> : type
type screamingSnakeKeys<type extends any.object> = { [ix in keyof type as screamingSnakeKey<ix>]: type[ix] }
type screamingSnakeArrayValues<type extends any.showables> = { [ix in keyof type]: screamingSnake<type[ix]> }
type screamingSnakeObjectValues<type extends any.dict<any.showable>> = { [ix in keyof type]: screamingSnake<type[ix]> }
type screamingSnakeValues<type extends any.showables | any.dict<any.showable>>
  = [type] extends [any.showables] ? screamingSnakeArrayValues<type>
  : [type] extends [any.dict<any.showable>] ? screamingSnakeObjectValues<type>
  : never
  ;

function screamingSnake<text extends check.is.stringLiteral<text, "shh">>(string: text): screamingSnake<text>
function screamingSnake<type extends any.showable>(showable: type): screamingSnake<type>
function screamingSnake<type extends any.primitive>(key: type): screamingSnakeKey<type>
function screamingSnake(text: string): globalThis.Uppercase<string>
// function screamingSnake<type extends any.object>(object: type): screamingSnakeKeys<type>
function screamingSnake(text: string) { return delimitedCase("_")(text).toUpperCase() }

namespace screamingSnake { screamingSnake.case = screamingSnake; }
declare namespace screamingSnake {
  export {
    screamingSnake as case,
    screamingSnakeKey as key,
    screamingSnakeKeys as object,
    screamingSnakeValues as values,
  }
}

type kebab<type extends any.showable> = Internal.kebab<`${type}`>
type kebabKey<type extends any.primitive> = type extends any.showable ? kebab<type> : type
type kebabKeys<type extends any.object> = { [ix in keyof type as kebabKey<ix>]: type[ix] }
type kebabArrayValues<type extends any.showables> = { [ix in keyof type]: kebab<type[ix]> }
type kebabObjectValues<type extends any.dict<any.showable>> = { [ix in keyof type]: kebab<type[ix]> }
type kebabValues<type extends any.showables | any.dict<any.showable>>
  = [type] extends [any.showables] ? kebabArrayValues<type>
  : [type] extends [any.dict<any.showable>] ? kebabObjectValues<type>
  : never
  ;

function kebab<text extends check.is.stringLiteral<text, "shh">>(text: text): kebab<text>
function kebab<type extends any.showable>(showable: type): kebab<type>
function kebab<type extends any.primitive>(key: type): kebabKey<type>
function kebab(text: string): globalThis.Lowercase<string>
// function kebab<type extends any.object>(object: type): kebabKeys<type>
function kebab(text: string) { return delimitedCase("-")(text).toLowerCase() }

namespace kebab { kebab.case = kebab; }
declare namespace kebab {
  export {
    kebab as case,
    kebabKey as key,
    kebabKeys as object,
    kebabValues as values,
  }
}

type screamingKebab<type extends any.showable> = Internal.screamingKebab<`${type}`>
type screamingKebabKey<type extends any.primitive> = type extends any.showable ? Internal.screamingKebab<`${type}`> : type
type screamingKebabKeys<type extends any.object> = { [ix in keyof type as screamingKebabKey<ix>]: type[ix] }
type screamingKebabArrayValues<type extends any.showables> = { [ix in keyof type]: screamingKebab<type[ix]> }
type screamingKebabObjectValues<type extends any.dict<any.showable>> = { [ix in keyof type]: screamingKebab<type[ix]> }
type screamingKebabValues<type extends any.showables | any.dict<any.showable>>
  = [type] extends [any.showables] ? screamingKebabArrayValues<type>
  : [type] extends [any.dict<any.showable>] ? screamingKebabObjectValues<type>
  : never
  ;

function screamingKebab<text extends check.is.stringLiteral<text, "shh">>(string: text): screamingKebab<text>
function screamingKebab<type extends any.showable>(showable: type): screamingKebab<type>
function screamingKebab<type extends any.primitive>(key: type): screamingKebabKey<type>
function screamingKebab(text: string): globalThis.Uppercase<string>
// function screamingKebab<type extends any.object>(object: type): screamingKebabKeys<type>
function screamingKebab(text: string) { return delimitedCase("_")(text).toUpperCase() }

namespace screamingKebab { screamingKebab.case = screamingKebab; }
declare namespace screamingKebab {
  export {
    screamingKebab as case,
    screamingKebabKey as key,
    screamingKebabKeys as object,
    screamingKebabValues as values,
  }
}


declare namespace Internal {
  type takeUntilInclusive<
    acc extends string,
    // lastChar extends string,
    text extends string,
    matchers extends any.showables
  > =
    text extends nonempty.string<infer head, infer tail>
    ? (
      head extends matchers[number]
      ? Internal.takeUntilInclusive<`${acc}${head}`, tail, matchers>
      : [_1: `${acc}`, text]
    )
    : acc extends "" ? [_88: text, ""] : [_89: acc, text]
    ;

  type takeUntilCaseChangeRec<
    acc extends any.array<string>,
    text extends string,
  > = text extends nonempty.string<infer head, infer tail>
    ? string.is.nonalpha<head> extends true
    ? Internal.takeUntilCaseChangeRec<[...acc, head], tail>
    : string.is.lowercase<head> extends true ?
    (
      Internal.takeUntilInclusive<"", text, charset.Lowers> extends
      | [infer before extends string, infer after extends string]
      ? Internal.takeUntilCaseChangeRec<[...acc, before], after>
      : [acc, text]
    )
    : string.is.uppercase<head> extends true ?
    (
      tail extends nonempty.string<infer snd, string>
      ? char.is.uppercase<snd> extends true ?
      (
        Internal.takeUntilExclusive<"", text, charset.Uppers> extends
        | [infer before extends string, infer after extends string]
        ? Internal.takeUntilCaseChangeRec<[...acc, before], after>
        : [acc, text]
      )
      : char.is.lowercase<snd> extends true ?
      (
        Internal.takeUntilInclusive<"", tail, charset.Lowers> extends
        | [infer before extends string, infer after extends string]
        ? Internal.takeUntilCaseChangeRec<[...acc, `${head}${before}`], after>
        : [acc, text]
      )
      : never.illegal_state<"`char.is.lowercase` and `char.is.uppercase` together should be total">
      : [...acc, head]
    )
    : never.close.inline_var<"head" | "tail">
    : acc
    ;


  type takeUntilCaseChange<
    acc extends string,
    text extends string,
  > = text extends nonempty.string<infer head, infer tail>
    ? char.is.lowercase<head> extends true ? Internal.takeUntilInclusive<acc, text, charset.Lowers>
    : char.is.uppercase<head> extends true ?
    (
      tail extends nonempty.string<infer snd, string>
      ? char.is.uppercase<snd> extends true ? Internal.takeUntilExclusive<acc, text, charset.Uppers>
      : char.is.lowercase<snd> extends true ? Internal.takeUntilInclusive<`${acc}${head}`, tail, charset.Lowers>
      : never.illegal_state<"`char.is.lowercase` and `char.is.uppercase` together should be total">
      : [_0n: `${acc}${head}`, tail]
    )
    : never.illegal_state<"`char.is.lowercase` and `char.is.uppercase` together should be total">
    : [_1n: acc, text]
    ;


  type takeUntilExclusive<
    acc extends string,
    text extends string,
    matchers extends any.showables
  > =
    text extends nonempty.string<infer head, infer tail> ?
    (
      tail extends nonempty.string<infer snd, string> ?
      (
        head extends matchers[number] ?
        (
          snd extends matchers[number]
          ? Internal.takeUntilExclusive<`${acc}${head}`, tail, matchers>
          : acc extends "" ? [head, tail] : [acc, text]
        )
        : [`${acc}${head}`, tail]
      )
      : head extends matchers[number]
      ? [`${acc}${head}`, ""]
      : acc extends "" ? [acc, head] : [acc, text]
    )
    : [acc, text]
    ;

  type splitOnceOnChar<
    acc extends string,
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
    ? string.startsWith<d_tail, tail> extends true
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
    ? Internal.intercalate<acc extends `` ? head : `${acc}${delimiter}${head}`, tail, delimiter>
    : never.close.inline_var<"head" | "tail">
    ;

  type delimitedCase<text extends string, delimiter extends string>
    = string.join<Internal.takeUntilCaseChangeRec<[], text>, delimiter>
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
}
