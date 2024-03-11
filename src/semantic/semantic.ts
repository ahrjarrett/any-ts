export type {
  Semantic
}

import type { id } from "../id"

/** @ts-expect-error */
interface Semantic<type extends object = object> extends id<type> { }
