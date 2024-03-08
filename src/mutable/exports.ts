export * as mut from "./mutable"
export {
  mutable,
}

import type { any } from "../any"

type mutable<type>
  = type extends any.primitive ? type
  : type extends any.array ? { -readonly [ix in keyof type]: mutable<type[ix]> }
  : type extends any.object ? { -readonly [ix in keyof type]: mutable<type[ix]> }
  : type
  ;

declare function mutable<const type>(type: type): mutable<type>
