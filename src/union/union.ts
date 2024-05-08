/*
 eslint-disable
 @typescript-eslint/ban-types,
 custom-rules/use-global-this,
 @typescript-eslint/naming-convention,
 @typescript-eslint/no-empty-interface,
 @typescript-eslint/no-explicit-any,
 @typescript-eslint/no-namespace,
 @typescript-eslint/no-shadow,
 prettier/prettier,
*/
export type {
  Union,
  // is,
  // distribute,
  // exists,
}

import type { never } from "../never/exports.js"

declare namespace Union {
  /**
   * {@link is `Union.is`} is a type-level predicate that evaluates to
   * `true` if the type it receives is a union (is a union containing 
   * more than 1 member), and evaluates to `false` if the type is a singleton
   * (non-union). 
   * 
   * **Note:** given `never`, {@link is `Union.is`} evaluates to `never`.
   */
  type is<type> =
    ([type] extends [infer over] ? over : never) extends
    | infer over ? over extends over ? [type] extends [over]
    ? false
    : true
    : never.close.distributive<"over">
    : never.close.inline_var<"over">
    ;

  type distribute<T> = T extends T ? T : never;

  type exists<
    needle,
    haystack,
    cases extends { onMatch: unknown, onNoMatch: unknown } = { onMatch: true, onNoMatch: false }
  > = (needle extends haystack ? true : false) extends
    | infer out
    ? [out] extends [never] ? cases["onNoMatch"]
    : is<out> extends true ? cases["onMatch"]
    : out extends true ? cases["onMatch"]
    : cases["onNoMatch"]
    : never.close.inline_var<"out">
    ;
}
