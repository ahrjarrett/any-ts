export type { any }

type _ = unknown

declare namespace any {
  export {
    function_ as function,
    object_ as object,
  }
}

declare namespace any {
  type id<type> = type
  interface object_ extends id<object> { }
  interface function_<arg extends any.array<any> = any.array<any>, out = _> { (...arg: arg): out }
  type array<type = unknown> = readonly type[]
  type key<type extends string | number = string | number> = type
  type index = keyof never
  type entry = readonly [any.index, _]
  type scalar = string | number | boolean | null
  type field<key extends any.index = any.index, value = _> = readonly [key, value]
  interface predicate<type = any> { (u: type): boolean }
}
