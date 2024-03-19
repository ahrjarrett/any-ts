export type {
  /** {@link array `mut.array`} @external */
  array,
  /** {@link arrayof `mut.arrayof`} @external */
  arrayof,
  /** {@link arrayof `mut.arrayOf`} @external */
  arrayof as arrayOf,
  /** {@link entries `mut.entries`} @external */
  entries,
  /** {@link entriesof `mut.entriesof`} @external */
  entriesof,
  /** {@link entriesof `mut.entriesOf`} @external */
  entriesof as entriesOf,
  /** {@link entry `mut.entry`} @external */
  entry,
  /** {@link entryof `mut.entryof`} @external */
  entryof,
  /** {@link entryof `mut.entryOf`} @external */
  entryof as entryOf,
  /** {@link field `mut.field`} @external */
  field,
  /** {@link keys `mut.keys`} @external */
  keys,
  /** {@link list `mut.list`} @external */
  list,
  /** {@link one `mut.one`} @external */
  one,
  /** {@link path `mut.path`} @external */
  path,
  /** {@link pathof `mut.pathof`} @external */
  pathof,
  /** {@link pathof `mut.pathOf`} @external */
  pathof as pathOf,
  /** {@link three `mut.three`} @external */
  three,
  /** {@link two `mut.two`} @external */
  two,
}

import type { any } from "../any/any"
import type { _ } from "../util"
import { pathsof } from "../paths/paths"

type list<type extends mut.array = mut.array> = type
type keys<type extends mut.keys = mut.keys> = type
type path<type extends mut.path = mut.path> = type
type entry<type extends mut.entry = mut.entry> = type
type entries<type extends mut.entries = mut.entries> = type

type array<type = unknown> = mut.array<type>
type one<only = _> = [_𝟭: only]
type two<fst = _, snd = _> = [_𝟭: fst, _𝟮: snd]
type three<fst = _, snd = _, thr = _> = [_𝟭: fst, _𝟮: snd, _𝟯: thr]
type field<k extends any.index = any.index, v = _> = [𝐤𝐞𝐲: k, 𝐯𝐚𝐥𝐮𝐞: v]

type arrayof<
  invariant,
  type extends
  | mut.array<invariant>
  = mut.array<invariant>
> = type

type entryof<
  invariant,
  type extends
  | [any.index, invariant]
  = [any.index, invariant]
> = type

type entriesof<
  invariant,
  type extends
  | any.array<[any.index, invariant]>
  = any.array<[any.index, invariant]>
> = type

type pathof<
  invariant,
  type extends
  | pathsof<invariant>
  = pathsof<invariant>
> = type


namespace mut { export const never: never = void 0 as never }
declare namespace mut {
  export {
    /** {@link array `mut.array`} @internal */
    array,
    /** {@link entries `mut.entries`} @internal */
    entries,
    /** {@link entry `mut.entry`} @internal */
    entry,
    /** {@link keys `mut.keys`} @internal */
    keys,
    /** {@link list `mut.list`} @internal */
    list,
    /** {@link path `mut.path`} @internal */
    path,
  }
  type array<type = unknown> = type[]
  type list<type extends mut.array = mut.array> = type
  type entries<type extends mut.array<mut.entry> = mut.array<mut.entry>> = type
  type entry<type extends [any.index, _] = [any.index, _]> = type
  type keys<type extends mut.array<any.key> = mut.array<any.key>> = type
  type path<type extends mut.array<any.index> = mut.array<any.index>> = type
}
