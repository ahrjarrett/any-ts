/** exports that come with an (empty) term-level equivalent */
export { empty, nonempty } from "./empty.js"
export {
  assert,
  describe,
  expect,
  expectToFail
} from "./test/exports.js"

export type { any } from "./any/exports.js"
export type { array, nonemptyArray, queue, tuple } from "./array/exports.js"
export type { some } from "./some.js"
export type { object } from "./object/exports.js"
export type { boolean } from "./boolean/exports.js"
export type { cache } from "./cache/exports.js"
export type { evaluate } from "./evaluate/exports.js"
export type { check, typecheck } from "./check/exports.js"
export type {
  Catch,
  Catch as Match,
  enforce,
  Err,
  Msg,
  Partial,
  partial,
  TypeError
} from "./err/exports.js"
export type {
  bigint,
  int,
  nat,
  number,
  real,
} from "./number/exports.js"

export type {
  Kind,
  Ext,
  Extensible,
  Extractable,
  guard,
  Guard,
  Intersectable,
  Negate,
} from "./kind/exports.js"

export type * as experimental from "./kind-new/exports.js"

export type { traversable, traversal } from "./traversable/exports.js"
export type { Tree } from "./tree/exports.js"
export type { iter } from "./iter/exports.js"
export type {
  mut,
  /** @deprecated use the `mut` type or `mut` namespace instead */
  mut as mutable
} from "./mutable/exports.js"
export type { pathsof } from "./paths/exports.js"
export type { never } from "./never/exports.js"
export type { Identity } from "./identity.js"
export type { id } from "./util.js"
export type {
  char,
  charset,
  string
} from "./string/exports.js"
export type { Universal } from "./universal/exports.js"
export type { to } from "./to.js"

export {
  Focus,
  type FocusConstructor
} from "./lens/focus.js"

export type { Widen } from "./widen/exports.js"
