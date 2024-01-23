/*
 eslint-disable
 @typescript-eslint/ban-types,
 custom-rules/use-global-this,
 @typescript-eslint/naming-convention,
 @typescript-eslint/no-empty-interface,
 @typescript-eslint/no-explicit-any,
 @typescript-eslint/no-namespace,
 @typescript-eslint/no-shadow,
 prettier/prettier,
*/

import type { any } from "../exports"
import type { Discriminant } from "../tag/tag"

export {
  type Interpreter,
  type Interpret,
  type apply,
  type applySelf,
  type ApplySelf,
}

interface Interpreter { [0]: unknown, [-1]: unknown, [-2]: unknown }
type apply<fn extends Interpreter, x> = (fn & { [0]: x })[-1]

interface ApplySelf<fn extends Interpreter, x extends any.indexedBy<0 | Discriminant>> extends Interpreter {
  [-1](): applySelf<fn, x>
}

interface Interpret<interpreter extends Interpreter, discriminant> extends Interpreter {
  [-1]: this[0] extends infer x ? (interpreter & { 0: x })[-1] : never
  [-2]: discriminant
}

type applySelf<
  fn extends Interpreter,
  x extends any.indexedBy<0 | Discriminant>
> = (fn & { [0]: x[0], [-2]: x[Discriminant] })[-1]
