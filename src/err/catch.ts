export type { Catch }

import type { any } from "../any-namespace"

type nonTuple<xs, constraint extends any.array>
  = [xs] extends [constraint]
  ? [number] extends [xs["length"]] ? constraint
  : never
  : never
  ;

type nonLiteral<xs, constraint extends any.literal = any.literal>
  = [xs] extends [any.literal]
  ? [number] extends [xs] ? constraint
  : [string] extends [xs] ? constraint
  : [boolean] extends [xs] ? constraint
  : never
  : never
  ;

declare namespace Catch {
  export {
    nonLiteral,
    nonTuple,
  }
}
