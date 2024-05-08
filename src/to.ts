export { to }

import type { mut } from "./mutable/exports.js";
import type { any } from "./any/exports.js"

declare namespace to {
  export type entries<type = any.nonnullable>
    = [keyof type] extends [any.keyof<type, infer key>]
    ? key extends key
    ? any.field<key, type[key]>
    : never
    : never
    ;

  export { toString as string }
  type toString<type extends any.showable> = `${type}`

  export type vector<type> = never | { [ix in Exclude<keyof type, keyof any[]>]: type[ix] }
  export type keyValuePairs<type, mutable = never>
    = keyof type extends any.keyof<type, infer key>
    ? [mutable] extends [never]
    ? any.array<key extends key ? readonly [key, type[key]] : never>
    : mut.array<key extends key ? [key, type[key]] : never>
    : never
    ;
}
