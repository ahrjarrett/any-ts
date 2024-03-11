export {

}

import type { Semantic } from "./semantic/exports"

// interface object_<type extends object = object> extends Semantic<type> { }

declare namespace object {
  type some<type extends typeof object = typeof object> = type

  export interface object_ extends Semantic<object> { }
  const object: object_

  export {
    object_ as object,
    some,
    some as any,
  }
}

type _54 = object.any
//   ^?

declare const _54: _54
//            ^?

