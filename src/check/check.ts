export type {
  check,
  checkNot,
  doesNotSatisfy,
  TypeError,
  TypeError$,
  violatesRule,
  violatesRuleWithMsg,
}

import type { _, any } from "../any"
import type { Kind } from "../kind/exports"
import type { never } from "../semantic-never/exports"

interface TypeError$ extends Kind<[string, _, _]> { [-1]: TypeError<this[0], [invariant: this[1], got: this[2]]> }
interface TypeError<msg extends string, pair extends [want: _, got: _]> extends Kind<[string, pair[0], pair[1]]> { }

type doesNotSatisfy<lowerBound, actual> = Kind.apply<TypeError$, [`Expected \`type\` to satisfy \`invariant\``, lowerBound, actual]>
type violatesRule<rule, violation> = Kind.apply<TypeError$, [`\`type\` cannot extend \`invariant\``, rule, violation]>
type violatesRuleWithMsg<rule, violation, msg extends string> = Kind.apply<TypeError$, [msg, rule, violation]>

type check<type, invariant> = [type] extends [invariant] ? invariant : doesNotSatisfy<invariant, type>

declare namespace check {
  export type silent<type, invariant> = [type] extends [invariant] ? invariant : never
  export type handle<type, invariant> = [check.silent<type, invariant>] extends [never] ? type : type
  export {
    TypeError,
    TypeError$,
    doesNotSatisfy,
    violatesRule,
    violatesRuleWithMsg,
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

    export type silent<type, match, subsetOf>
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
      = [check.strict.silent<type, match, subsetOf>] extends [never] ? check.strict.subsetOf<type, match, subsetOf, errorMsg> : type
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
  export type silent<type, constraint, invariant> = [type] extends [invariant] ? never : constraint
  export type handle<type, constraint, invariant>
    = [checkNot.silent<type, constraint, invariant>] extends [never]
    ? violatesRule<invariant, type> : type
    ;
  export {
    TypeError,
    TypeError$,
    doesNotSatisfy,
    violatesRule,
    violatesRuleWithMsg,
  }
}
