export {
  type intrinsic,
}

import type { id } from "../util"

declare namespace intrinsic {
  /** @ts-expect-error */
  export interface any_object<type extends object = object> extends id<type> { }
  export { any_object as object }
}
