/** exports that come with an (empty) term-level equivalent */
export { empty, nonempty } from "./empty"
export {
  assert,
  describe,
  expect,
  expectToFail
} from "./test/exports"

export type { any } from "./any-namespace"
export type { some } from "./any"
export type { assoc } from "./associative/exports"
export type { boolean } from "./boolean/exports"
export type { cache } from "./cache/exports"
export type { evaluate } from "./evaluate/exports"
export type {
  enforce,
  Err,
  Msg,
  TypeError
} from "./err/exports"
export type {
  bigint,
  int,
  nat,
  number,
  real,
} from "./number/exports"

export type { Kind } from "./kind/exports"

export type { iter } from "./iter/exports"
export type { mut } from "./mutable/exports"
export type { pathsof } from "./paths/exports"
export type { never } from "./semantic-never/exports"
export type {
  char,
  chars,
  string
} from "./string/exports"
export type { Universal } from "./universal/exports"
export type { to } from "./to"
