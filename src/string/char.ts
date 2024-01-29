export {
  char,
  chars,
}

import { empty, nonempty } from "../empty"

namespace char { export const never: never = void 0 as never }
declare namespace char {
  type _ = string
  type head<chars extends _> = chars extends nonempty.string<infer head, any> ? head : never
  type tail<chars extends _> = chars extends nonempty.string<any, infer tail> ? tail : never
  type behead<chars extends _> = chars extends nonempty.string<infer head, infer tail> ? [head: head, tail: tail] : never
  type second<chars extends _> = chars extends nonempty.string<any, infer tail> ? char.first<tail> : never
  type is<char extends _>
    = char extends empty.string ? false : tail<char> extends empty.string ? true : false

  export {
    behead,
    head,
    head as first,
    is,
    second,
    tail,
  }
}

namespace chars { export const never: never = void 0 as never }
declare namespace chars {
  type _ = string
  type first<chars extends _> = chars extends nonempty.string<infer first> ? first : never
  type is<chars extends _>
    = chars extends nonempty.string<any, infer tail> ? tail extends empty.string ? false : true : false
}

declare namespace __Spec__ {
  type __char_is__ = [
    // ^?
    char.is<"">,
    char.is<string>,
    char.is<"hello">,
    // happy path
    char.is<"h">,
  ]

  type __chars_is__ = [
    // ^?
    chars.is<"">,
    chars.is<string>,
    chars.is<"h">,
    // happy path
    chars.is<"hello">,
  ]
}
