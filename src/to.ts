export { to }

import * as any from "./any"

namespace to { export const never: never = void 0 as never }
declare namespace to {
  export type entries<type = any.object>
    = [keyof type] extends [any.keyof<type, infer key>]
    ? key extends key
    ? any.field<any.key, type[key]>
    : never
    : never
    ;
}
