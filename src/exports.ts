/** exports that come with an (empty) term-level equivalent */
export { empty, nonempty } from "./empty"
export {
  assert,
  describe,
  expect,
  expectToFail
} from "./test/exports"

export type { any } from "./any"
export type { some } from "./some"
export type { } from "./associative/exports"
export type { boolean } from "./boolean/exports"
export type { cache } from "./cache/exports"
export type { evaluate } from "./evaluate/exports"
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

export type { iter } from "./iter/exports"
export type { mut, mutable } from "./mutable/exports"
export type { pathsof } from "./paths/exports"
export type { never } from "./semantic/exports"
export type {
  char,
  chars,
  string
} from "./string/exports"
export type { Universal } from "./universal/exports"
export type { to } from "./to"
