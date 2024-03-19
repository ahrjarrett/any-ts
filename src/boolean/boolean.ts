export {
  boolean,
}

import type { any } from "../any/exports"
import type { _ } from "../util"
import { assert, expect } from "../test/exports"

namespace boolean { export const never: never = void 0 as never }
declare namespace boolean {
  export {
    /** {@link all `boolean.all`} @external */
    all,
    /** {@link any_ `boolean.any`} @external */
    any_ as any,
    /** {@link if_ `boolean.if`} @external */
    if_ as if,
    /** {@link is `boolean.is`} @external */
    is,
    /** {@link not `boolean.not`} @external */
    not,
    /** {@link unless `boolean.unless`} @external */
    unless,
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

    type __finite__ = [
      is.finite<boolean>,
      is.finite<true>,
      is.finite<false>,
      is.finite<never>,
    ]
    type __nonfinite__ = [
      is.nonfinite<boolean>,
      is.nonfinite<true>,
      is.nonfinite<false>,
      is.nonfinite<never>,
    ]

    type universal<type>
      = [type] extends [never] ? false : 0 extends 1 & type ? false : [type, boolean] extends [boolean, type] ? true : false
  }

  type all<type extends any.array> = boolean.is.true<type[number]>
  type any_<type extends any.array> = boolean.is.universal<type[number]>

  /** Respects the law of the excluded middle */
  type not<type extends any.boolean> = boolean.is.true<type> extends true ? false : boolean.is.false<type> extends true ? true : never

  // TODO: implement `implies`:
  // type implies<x, y> = !x || y
}

declare namespace __Spec__ {
  type __not__ = [
    expect<assert.is.true<boolean.not<false>>>,
    expect<assert.is.false<boolean.not<true>>>,
    expect<assert.is.never<boolean.not<boolean>>>,
  ]
}
