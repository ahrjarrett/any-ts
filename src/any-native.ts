export type { native }

import type { _ } from "./any"
import type { id } from "./id"

declare namespace native {
  export {
    function_ as function,
    object_ as object,
  }
}

declare namespace native {
  interface object_ extends id<object> { }
  interface function_<arg extends native.array<any> = native.array<any>, out = _> { (...arg: arg): out }
  type array<type = unknown> = readonly type[]
  type key<type extends string | number = string | number> = type
  type index = keyof never
  type entry = readonly [native.index, _]
  type scalar = string | number | boolean | null
  type field<key extends native.index = native.index, value = _> = readonly [key, value]
  interface predicate<type = any> { (u: type): boolean }
}
