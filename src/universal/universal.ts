export {
  Universal
}

import type { any } from "../any/any"

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

  type get<index extends any.key, type>
    = index extends keyof type ? type[index]
    : parseNumeric<index> extends any.number<infer x>
    ? x extends keyof type ? type[x]
    : never
    : `${index}` extends any.string<infer s>
    ? s extends keyof type ? type[s]
    : never
    : never
    ;

  type values<type>
    = type extends any.array
    ? type[number]
    : type extends any.object
    ? type[keyof type]
    : type
    ;
}
