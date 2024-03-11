/** TODO: make `TypeError` legacy */
export type { Err, TypeError } from "./err"
export { Case, Msg } from "./err"
export type { enforce, Partial, Partial as partial } from "./enforce"
export type { Catch } from "./catch"

export type {
  check,
  checkNot,
  TypeError as Error,
  TypeError$,
  doesNotSatisfy,
  violatesRule
} from "./check"
