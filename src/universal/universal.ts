export {
  Universal
}

import * as any from "../any"

/**
 * TODO:
 * - [x]: support interpreter argument for {@link Tagless `Tagless`}
 * - [x]: write an {@link Ordered.object `Ordered.object`} interpreter
 *        - [x] find implementation from TypeScript Discord
 * - [x]: in `any-ts`, write an enforcer with the following behavior: 
 *        - [x]: passing a key that is a numeric of any kind raises a `TypeError`
 *        - [x]: numeric keys should be identified in the Error message
 * - [ ]: `show`
 * - [ ]: the following cases are not working:
 * @example
*  const _3 = evaluate(Tuple(["abc", Number(123)]))
*  const _4 = Intersection(["abc", { def: 1 }], ["ghi", { jkl: 1000 }]).type
*/

type parseNumeric<type> = type extends `${infer x extends number}` ? x : never

namespace Universal { export const never: never = void 0 as never }
declare namespace Universal {
  type key<key extends any.index> =
    | `${Exclude<key, symbol>}`
    | parseNumeric<key>
    | key
    ;

  type keyof<type>
    = type extends any.array
    ? Universal.key<Extract<keyof type, `${number}`>>
    : Universal.key<keyof type>
    ;
}
