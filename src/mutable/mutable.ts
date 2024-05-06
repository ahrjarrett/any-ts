export type { mut }

import type { any } from "../any/exports"
import type { _ } from "../util"
import type { pathsof } from "../paths/paths"

type array<type = unknown> = type[]
type list<type extends mut.array = mut.array> = type
type keys<type extends mut.array<any.key> = mut.array<any.key>> = type
type path<type extends mut.array<any.index> = mut.array<any.index>> = type
type entry<type extends [any.index, _] = [any.index, _]> = type
type entries<type extends mut.array<mut.entry> = mut.array<mut.entry>> = type

type one<only = _> = [_1: only]
type two<fst = _, snd = _> = [_1: fst, _2: snd]
type three<fst = _, snd = _, thr = _> = [_1: fst, _2: snd, _3: thr]

type field<k extends any.index = any.index, v = _> = [key: k, value: v]

type arrayOf<
  invariant,
  type extends
  | mut.array<invariant>
  = mut.array<invariant>
> = type

type entryOf<
  invariant,
  type extends
  | [any.index, invariant]
  = [any.index, invariant]
> = type

type entriesOf<
  invariant,
  type extends
  | any.array<[any.index, invariant]>
  = any.array<[any.index, invariant]>
> = type

type pathOf<
  invariant,
  type extends
  | pathsof<invariant>
  = pathsof<invariant>
> = type

type mut<type>
  = type extends any.primitive ? type
  : type extends any.array ? { -readonly [ix in keyof type]: mut<type[ix]> }
  : type extends any.object ? { -readonly [ix in keyof type]: mut<type[ix]> }
  : type
  ;

declare namespace mut {
  export {
    /** {@link array `mut.array`} */
    array,
    /** @deprecated use `mut.arrayOf` instead */
    arrayOf as arrayof,
    /** {@link arrayOf `mut.arrayOf`} */
    arrayOf,
    /** {@link entry `mut.entry`} */
    entry,
    /** {@link entries `mut.entries`} */
    entries,
    /** {@link entryOf `mut.entryOf`} */
    entryOf,
    /** @deprecated use `mut.entryOf` instead */
    entryOf as entryof,
    /** @deprecated use `mut.entriesOf` instead  */
    entriesOf as entriesof,
    /** {@link entriesOf `mut.entriesOf`} */
    entriesOf,
    /** {@link field `mut.field`} */
    field,
    /** {@link keys `mut.keys`} */
    keys,
    /** {@link list `mut.list`} */
    list,
    /** {@link one `mut.one`} */
    one,
    /** {@link two `mut.two`} */
    two,
    /** {@link three `mut.three`} */
    three,
    /** {@link path `mut.path`} */
    path,
    /** @deprecated use `mut.pathOf` instead */
    pathOf as pathof,
    /** {@link pathOf `mut.pathOf`} */
    pathOf,
  }
}

// entriesOf
// entry
// /** @deprecated use entryOf `mut.entryOf` instead */
// entryof
// entryOf
// field
// keys
// list
// one
// path
// /** @deprecated use pathOf `mut.pathOf` instead */
// pathof
// pathOf
// three
// two
//   * /

// /** {@link array `mut.array`} @external */
// array,
// /** {@link arrayof `mut.arrayof`} @external */
// arrayof,
// /** {@link arrayof `mut.arrayOf`} @external */
// arrayof as arrayOf,
// /** {@link entries `mut.entries`} @external */
// entries,
// /** {@link entriesof `mut.entriesof`} @external */
// entriesof,
// /** {@link entriesof `mut.entriesOf`} @external */
// entriesof as entriesOf,
// /** {@link entry `mut.entry`} @external */
// entry,
// /** {@link entryof `mut.entryof`} @external */
// entryof,
// /** {@link entryof `mut.entryOf`} @external */
// entryof as entryOf,
// /** {@link field `mut.field`} @external */
// field,
// /** {@link keys `mut.keys`} @external */
// keys,
// /** {@link list `mut.list`} @external */
// list,
// /** {@link one `mut.one`} @external */
// one,
// /** {@link path `mut.path`} @external */
// path,
// /** {@link pathof `mut.pathof`} @external */
// pathof,
// /** {@link pathof `mut.pathOf`} @external */
// pathof as pathOf,
// /** {@link three `mut.three`} @external */
// three,
// /** {@link two `mut.two`} @external */
// two,
