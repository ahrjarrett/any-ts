export { to }

import type { any } from "./any/any"

namespace to { export const never: never = void 0 as never }
declare namespace to {
  export type entries<type = any.nonnullable>
    = [keyof type] extends [any.keyof<type, infer key>]
    ? key extends key
    ? any.field<key, type[key]>
    : never
    : never
    ;
}
