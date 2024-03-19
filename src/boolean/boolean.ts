export {
  boolean,
}

import { empty, nonempty } from ".."
import type { any } from "../any/exports"
import type { _ } from "../util"

namespace boolean { export const never: never = void 0 as never }
declare namespace boolean {
  export {
    /** {@link all `boolean.all`} @external */
    all,
    /** 
     * ### {@link any_ `boolean.any`} @external 
     * @category combinators
     * 
     * {@link any_ `boolean.any`} accepts a list of booleans and returns `true`
     * if the list contains `true`.
     * 
     * If the `strict` argument is provided (is not `never`), `boolean.any`
     * returns true iff `type` contains exactly `true` (`boolean` on its own
     * is not enough). 
     * 
     * The tradeoff here is precision for performance, since the only way to 
     * verify that `type` contains `true` (and not `boolean` requires a recursive 
     * check).
     */
    any_ as any,
    /** {@link if_ `boolean.if`} @external */
    if_ as if,
    /** {@link is `boolean.is`} @external */
    is,
    /** {@link not `boolean.not`} @external */
    not,
    /** {@link unless `boolean.unless`} @external */
    unless,
    /** {@link any `boolean.any`} @external */
    and,
    /** {@link or `boolean.or`} @external */
    or,
  }

  type if_<cond, onTrue = _, onFalse = _> = boolean.is.true<cond> extends true ? onTrue : onFalse
  type unless<flag, noFlag = _, onFlag = _> = boolean.is.true<flag> extends true ? onFlag : noFlag

  type is<type> = [type] extends [boolean] ? true : false
  namespace is {
    export {
      /** {@link true_ `boolean.is.true`} @external */
      true_ as true,
      /** {@link false_ `boolean.is.false`} @external */
      false_ as false,
      /** {@link finite `boolean.is.finite`} @external */
      finite,
      /** {@link nonfinite `boolean.is.nonfinite`} @external */
      nonfinite,

      /** {@link universal `boolean.is.universal`} @external */
      universal,
      /** {@link universal `boolean.is.nonliteral`} @external */
      universal as nonliteral,
    }

    type true_<type> = [type] extends [never] ? false : 0 extends 1 & type ? false : [type] extends [true] ? true : false
    type false_<type> = [type] extends [never] ? false : 0 extends 1 & type ? false : [type] extends [false] ? true : false
    type finite<type> = boolean.not<nonfinite<type>>
    type nonfinite<type>
      = [type] extends [never] ? never : 0 extends 1 & type ? false
      : [type, boolean] extends [boolean, type] ? true : false
      ;

    type universal<type>
      = [type] extends [never] ? false : 0 extends 1 & type ? false : [type, boolean] extends [boolean, type] ? true : false
  }

  type and<left extends boolean, right extends boolean>
    = boolean.is.true<left> extends true ? boolean.is.true<right> extends true
    ? true
    : false
    : false
    ;

  type or<left extends boolean, right extends boolean>
    = boolean.is.true<left> extends true ? true
    : boolean.is.true<left> extends true ? true
    : false
    ;

  type all<type extends any.array>
    = [type] extends [empty.array] ? true
    : boolean.is.true<type[number]>
    ;

  type any_<type extends any.array, strict = never>
    = [type] extends [empty.array] ? false
    : [strict] extends [never]
    ? boolean.not<boolean.is.false<type[number]>>
    : internal.anyStrict<type>
    ;

  /** Respects the law of the excluded middle */
  type not<type extends any.boolean> = boolean.is.true<type> extends true ? false : boolean.is.false<type> extends true ? true : never

  // TODO: implement `implies`:
  // type implies<x, y> = !x || y
}

declare namespace internal {
  type anyStrict<type extends any.array>
    = type extends nonempty.array<infer head, infer tail>
    ? [true, head] extends [head, true] ? true
    : anyStrict<tail>
    : false
    ;
}
