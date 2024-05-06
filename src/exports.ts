/** exports that come with an (empty) term-level equivalent */
export { empty, nonempty } from "./empty"
export {
  assert,
  describe,
  expect,
  expectToFail
} from "./test/exports"

export type { any } from "./any/exports"
export type { some } from "./some"
export type { object } from "./object/exports"
export type { boolean } from "./boolean/exports"
export type { cache } from "./cache/exports"
export type { evaluate } from "./evaluate/exports"
export type { check, checkNot } from "./check/exports"
export type {
  Catch,
  Catch as Match,
  enforce,
  Err,
  Msg,
  Partial,
  partial,
  TypeError
} from "./err/exports"
export type {
  bigint,
  int,
  nat,
  number,
  real,
} from "./number/exports"

export type {
  Kind,
  Ext,
  Extensible,
  Extractable,
  guard,
  Guard,
  Intersectable,
  Negate,
} from "./kind/exports"
export type { traversable, traversal } from "./traversable/exports"
export type { Tree } from "./tree/exports"
export type { iter } from "./iter/exports"
export type { mut, mutable } from "./mutable/exports"
export type { pathsof } from "./paths/exports"
export type { never } from "./never/exports"
export type {
  char,
  charset,
  string
} from "./string/exports"
export type { Universal } from "./universal/exports"
export type { to } from "./to"

export {
  Focus,
  type FocusConstructor
} from "./lens/focus"

export type { Widen } from "./widen/exports"
