export type {
  check,
  checkNot,
  doesNotSatisfy,
  violatesRule,
  violatesRuleWithMsg,
  Signatures,
}

export type { typeError as __TESTING__ }

import type { any } from "../any/exports.js"
import type { _ } from "../util.js"
import type { never } from "../never/exports.js"
import { Union } from "../union/exports.js"
import { TypeError } from "../err/err.js"

interface Signatures {
  TypeError: {
    <msg extends string, const arg>(msg: msg, arg: arg): TypeError<[msg, [arg]]>
    <msg extends string, const arg1, const arg2>(msg: msg, arg1: arg1, arg2: arg2): TypeError<[msg, [arg1, arg2]]>
  }
}

/**
 * In the context of this file, the "happy path" (the argument passes the check) is
 * handled returning the constraint that should be applied to the type parameter.
 * Usually at that point we're reasonably sure that the type parameter is in fact a
 * valid input, but returning the constraint ensures that the type system is also
 * aware of that fact (allowing the user to use the type parameter as such in the body
 * of the function's return type).
 * 
 * To make it easier to pick out where the happy path is being handled, when the happy
 * path is being handled, the constraint is returned surrounded by 3 parens, 
 * `(((like_this)))`.
 */
type unused = never.uninhabited<"Inhabit this type to return \`never\` instead of a \`TypeError\` on failure">

// declare const TypeErrorURI: unique symbol
// type TypeErrorURI = typeof TypeErrorURI

// interface TypeError<
//   msg extends string,
//   pair extends [_] | [_, _]
// > extends Kind<[msg, pair]> { [TypeErrorURI]: TypeErrorURI }

type typeError<msg extends string, args extends [_, _?]> = never | (
  [args] extends [[_]] ? TypeError<[msg, [got: args[0]]]>
  : [args] extends [[_, _]] ? TypeError<[msg, [want: args[0], got: args[1]]]>
  : never.illegal_state<"args">
)

declare namespace typeError {
  type signature = Signatures["TypeError"]
}

type doesNotSatisfy<lowerBound, actual> = TypeError<[`Expected \`actual\` to satisfy \`lowerBound\``, [lowerBound: lowerBound, actual: actual]]>
type violatesRule<rule, actual> = TypeError<[`\`actual\` violates \`rule\``, [rule: rule, actual: actual]]>
type violatesRuleWithMsg<rule, violation, msg extends string> = TypeError<[msg, [rule: rule, violation: violation]]>

type isStringLiteral<
  type,
  hush = unused,
  constraint extends string = string,
> = [string] extends [type]
  ? [hush] extends [never.unused_arg]
  ? typeError<`Expected string literal`, [type]>
  : never.prevent_match
  : (((constraint)))
  ;

type isNonFiniteString<
  type,
  hush = unused
> = [string] extends [type]
  ? (((string)))
  : [hush] extends [never.unused_arg]
  ? typeError<`Expected non-finite string`, [type]>
  : never.prevent_match
  ;

type isNumberLiteral<
  type,
  hush = unused,
  constraint extends number = number,
> = [number] extends [type]
  ? [hush] extends [never.unused_arg]
  ? typeError<`Expected string literal`, [type]>
  : never.prevent_match
  : (((constraint)))
  ;

type isNonFiniteNumber<
  type,
  hush = unused
> = [number] extends [type]
  ? (((number)))
  : [hush] extends [never.unused_arg]
  ? typeError<`Expected non-finite number`, [type]>
  : never.prevent_match
  ;

type isBooleanLiteral<type, hush = unused>
  = [boolean] extends [type]
  ? [hush] extends [never.unused_arg]
  ? typeError<`Expected boolean literal`, [type]>
  : never.prevent_match
  : (((boolean)))
  ;

type isNonFiniteBoolean<
  type,
  hush = unused
> = [boolean] extends [type]
  ? (((boolean)))
  : [hush] extends [never.unused_arg]
  ? typeError<`Expected non-finite boolean`, [type]>
  : never.prevent_match
  ;

type isLiteral<
  type,
  constraint extends any.literal = any.literal,
  hush = unused
>
  = [type] extends [constraint] ? (
    | (string extends type ? [string] : never.as.nothing)
    | (number extends type ? [number] : never.as.nothing)
    | (boolean extends type ? [boolean] : never.as.nothing)
  ) extends infer out
  ? [out] extends [never]
  ? (((constraint)))
  : [hush] extends [never.unused_arg]
  ? typeError<"Expected literal", [Extract<out, any.one>[0]]>
  : never.prevent_match
  : never.close.inline_var<"out">
  : never.prevent_match
  ;

type widen<
  type
> = type extends boolean ? boolean
  : type extends number ? number
  : type extends string ? string
  : never
  ;

type isNonLiteral<
  type,
  hush = unused,
  constraint extends any.literal = any.literal,
> = [type] extends [constraint] ?
  (
    [hush] extends [never.unused_arg] ? (
      [(
        | (string extends type ? string : never.as.nothing)
        | (number extends type ? number : never.as.nothing)
        | (boolean extends type ? boolean : never.as.nothing)
      )] extends [infer out]
      ? [out] extends [never] ? [hush] extends [never.unused_arg] ? typeError<"Expected non-literal", [type]>
      : never.prevent_match
      : [widen<out>, type] extends [type, widen<out>]
      ? (((out)))
      : typeError<"Expected non-literal", [Exclude<type, widen<out>>]>
      : never.close.inline_var<"out">
    )
    : (
      (
        | (string extends type ? string : never.as.nothing)
        | (number extends type ? number : never.as.nothing)
        | (boolean extends type ? boolean : never.as.nothing)
      ) extends infer out
      ? [out] extends [never] ? [hush] extends [never.unused_arg] ? never.prevent_match
      : never.prevent_match
      : [widen<out>, type] extends [type, widen<out>]
      ? (((out)))
      : never.as.nothing
      : never.close.inline_var<"out">
    )
  )
  : never.prevent_match
  ;

type isNonArrayObject<
  type,
  constraint extends {} = {},
  hush = unused
>
  = (type extends any.array ? false : true) extends
  | infer bool
  ? [boolean] extends [bool] ?
  (
    [hush] extends [never.unused_arg]
    ? typeError<
      "Expected \`type\` to be a non-array, but one of its members was an array",
      [Extract<type, any.array>]
    >
    : never.prevent_match
  )
  : [bool] extends [false] ?
  (
    [hush] extends [never.unused_arg]
    ? typeError<"Expected \`type\` to be a non-array, but got an array", [type]>
    : never.prevent_match
  )
  : (((constraint)))
  : never.close.inline_var<"bool">
  ;

type isUnion<type, constraint = any.nullable | any.nonnullable, hush = unused>
  = Union.is<type> extends true ? (((constraint)))
  : [hush] extends [never.unused_arg] ? typeError<`Expected a union`, [type]>
  : never.prevent_match
  ;

type isNonUnion<type, constraint = any.nullable | any.nonnullable, hush = unused>
  = Union.is<type> extends false ? (((constraint)))
  : [hush] extends [never.unused_arg] ? typeError<`Expected a non-union`, [type]>
  : never.prevent_match
  ;

type checkTuple<type> = [type] extends [any.array] ? [number] extends [type["length"]] ? false : true : false

type isTuple<type, constraint extends any.array = any.array, hush = never.unused_arg>
  = checkTuple<type> extends true ? ([type] extends [constraint] ? (((constraint))) : never)
  : ([hush] extends [never.unused_arg] ? typeError<`Expected a tuple`, [type]> : never.prevent_match)
  ;

type isNonEmptyObject<type, hush = never>
  = [keyof type] extends [never] ? [hush] extends [never] ? typeError<`Expected a non-empty object`, [{}]> : never : {}

type isEmptyObject<type, hush = never>
  = [keyof type] extends [never] ? {} : [hush] extends [never] ? typeError<`Expected an empty object`, [{}]> : never

type check<type, invariant> = [type] extends [invariant] ? invariant : doesNotSatisfy<invariant, type>

declare namespace check {
  export type hush<type, invariant> = [type] extends [invariant] ? invariant : never
  export type handle<type, invariant> = [check.hush<type, invariant>] extends [never] ? type : type
  // namespace exports
  export {
    is,
    non,
  }
  export {
    doesNotSatisfy,
    violatesRule,
    violatesRuleWithMsg,
  }

  namespace is {
    export {
      isBooleanLiteral as booleanLiteral,
      isEmptyObject as emptyObject,
      isNumberLiteral as numberLiteral,
      isStringLiteral as stringLiteral,
      isLiteral as literal,
      isUnion as union,
      isTuple as tuple,
    }
  }

  namespace non {
    export {
      isNonArrayObject as array,
      isNonUnion as union,
      isNonEmptyObject as emptyObject,
      isNonLiteral as literal,
      isNonFiniteBoolean as finiteBoolean,
      isNonFiniteString as finiteString,
      isNonFiniteNumber as finiteNumber,
    }
  }

  export namespace strict {
    /**
     * @example
     *  import { checkNot } from "any-ts"
     * 
     *  // Let's create our own checker; this one ships with `any-ts` already, but for the learnings:
     * 
     *  // Here we pass `any.literal` as the constraint **and** as the type to disallow (the third parameter
     *  // is the upper bound that `type` must not extend (comparison is distributive).
     *  type checkLiteral<type> = check.strict.subsetOf<type, any.literal, any.literal>
     * 
     *  // Here's how we can use `checkLiteral` to constraint a function argument:
     *  declare function literalsOnly<type extends checkLiteral<type>>(value: type): type
     * 
     *  // Here's how we can use `checkLiteral` to constraint a type parameter:
     *  type literalsOnly<type extends checkLiteral<type>> = check.strict.handle<type, any.literal, any.literal>
     * 
     *  ///////////////////////
     *  /// Let's use them! ///
     *  ///////////////////////
     *  //    (✅)
     *  type ex_1 = literalsOnly<0>
     *  //   ?^ type ex_1 = 0
     * 
     *  //    (✅)
     *  const ex_1 = literalsOnly(0)
     *  //    ?^ const ex_1: 0
     * 
     *  //    (🚫)     TypeError ↓↓↓↓↓↓
     *  type ex_2 = literalsOnly<number>
     *  //   ?^ type ex_2 = TypeError<"Expected `type` to be a strict subset of `subsetOf`", [invariant: string | number | boolean, got: number]>
     * 
     *  //    (🚫)      TypeError ↓↓
     *  const ex_2 = literalsOnly(0 as number)
     *  //    ?^ const ex_2: TypeError<"Expected `type` to be a strict subset of `subsetOf`", [invariant: string | number | boolean, got: number]>
     */
    export type subsetOf<type, match, subsetOf, errorMsg extends string = never>
      = [type] extends [match] ?
      (
        (subsetOf extends type ? true : false) extends
        | any.boolean<infer bool>
        ? [boolean] extends [bool]
        ? [errorMsg] extends [never]
        ? violatesRuleWithMsg<subsetOf, type, `Expected \`type\` to be a strict subset of \`subsetOf\``>
        : violatesRuleWithMsg<subsetOf, type, errorMsg>
        : match
        : never.close.inline_var<"bool">
      )
      : doesNotSatisfy<match, type>
      ;

    export type hush<type, match, subsetOf>
      = [type] extends [match] ?
      (
        (subsetOf extends type ? true : false) extends
        | any.boolean<infer bool>
        ? [boolean] extends [bool]
        ? never.as.nothing
        : unknown
        : never.close.inline_var<"bool">
      )
      : never
      ;

    export type handle<type, match, subsetOf, errorMsg extends string = never>
      = [check.strict.hush<type, match, subsetOf>] extends [never] ? check.strict.subsetOf<type, match, subsetOf, errorMsg> : type
  }
}

/**
 * Apply an arbitary constraint on a type parameter, without introducing a circular constraint, 
 * and without declaring a second type parameter.
 * 
 * @example
 *  import { checkNot } from "any-ts"
 * 
 *  // This helper ships with `any-ts`, but for the learnings, let's make a type 
 *  // that accepts object-like arguments, but **disallows arrays**:
 *  type NonArray<type, constraint = {}> = checkNot<type, constraint, any.array>
 * 
 *  // Here's how we can use it to constrain a function argument:
 *  declare function noArrays<type extends NonArray<type>>(object: type): type
 * 
 *  // Here's how we can use it to constrain a type parameter:
 *  type noArrays<type extends NonArray<type>> = checkNot.handle<type, {}, any.array>
 * 
 *  // (Optional): Here's how we can apply an additional constraint on a function argument:
 *  declare function customConstraint<type extends NonArray<type, { [x: number]: boolean }>>(object: type): type
 * 
 *  // (Optional): Here's how we can apply an additional constraint on type parameter:
 *  type customConstraint<type extends NonArray<type, { [x: number]: boolean }>> = NonArray.handle<type>
 * 
 *  ////////////////////////
 *  /// Let's try it out ///
 *  //    (✅)
 *  type ex_1 = noArrays<{ abc: 123 }>
 *  //   ?^  type ex_1 = { abc: 123; }
 *  
 *  //    (✅)
 *  const ex_1 = noArrays({ abc: 123 })
 *  //    ?^  const ex_1: { abc: number }
 *  
 *  //    (🚫)  TypeError ↓
 *  type ex_2 = noArrays<[]>
 *  //   ?^ type ex_2 = TypeError<"`type` cannot extend `invariant`", [invariant: any.array<unknown>, got: []]>
 *  
 *  //    (🚫)   TypeError ↓
 *  const ex_2 = noArrays([])
 *  //    ?^ const ex_1: TypeError<"`type` cannot extend `invariant`", [invariant: any.array<unknown>, got: []]>
 *  
 *  //    (✅)
 *  type ex_3 = customConstraint<{ 0: false, 1: true }>
 *  //   ?^  type ex_3 = { 0: false; 1: true }
 *  
 *  //    (✅)
 *  const ex_3 = customConstraint({ 0: false, 1: true })
 *  //    ?^   { 0: false; 1: true }
 *  
 *  //    (🚫)          TypeError  ↓↓↓↓↓↓↓↓↓↓
 *  type ex_4 = customConstraint<[false, true]>
 *  //   ?^   type ex_4 = TypeError<"`type` cannot extend `invariant`", [invariant: any.array<unknown>, got: [false, true]]>
 *  
 *  //    (🚫)            TypeError ↓↓↓↓↓↓↓↓↓↓
 *  const ex_4 = customConstraint([false, true])
 *  //    ?^   TypeError<"`type` cannot extend `invariant`", [invariant: any.array<unknown>, got: [false, true]]>
 */
type checkNot<type, constraint, cannotMatch>
  = [type] extends [cannotMatch]
  ? violatesRule<cannotMatch, type>
  : constraint
  ;

declare namespace checkNot {
  export type hush<type, constraint, invariant> = [type] extends [invariant] ? never : constraint
  export type handle<type, constraint, invariant>
    = [checkNot.hush<type, constraint, invariant>] extends [never]
    ? violatesRule<invariant, type> : type
    ;
  export {
    doesNotSatisfy,
    violatesRule,
    violatesRuleWithMsg,
  }
}
