import type { any } from "../any/exports.js"
import type { _ } from "../util.js"

/** The {@link nonempty `nonempty`} namespace exports a set of type constructors that target **non-empty** types */
export declare namespace nonempty {
  /** The {@link mut `nonempty.mut`} namespace exports a set of type constructors that target **mutable**, **non-empty** types */
  export namespace mut {
    type array<head = _, tail extends any.array = any.array<head>> = [head, ...tail]
    type list<type extends nonempty.array = nonempty.array> = type
    type entry<type extends [any.index, _] = [any.index, _]> = type
    type keys<head extends any.key = any.key, tail extends any.key[] = any.key[]> = [head, ...tail]
    type path<head extends any.index = any.index, tail extends any.index[] = any.index[]> = [head, ...tail]
    type entries<head extends mut.entry = mut.entry, tail extends mut.entry[] = mut.entry[]> = [head, ...tail]
  }

  export {
    /** {@link string_ `nonempty.string`} @external */
    string_ as string,
  }
  /** @internal Use {@link nonempty.string `nonempty.string`} instead */
  export type string_<
    head extends string = string,
    tail extends string = string
  > = `${head}${tail}`

  /** {@link array `nonempty.array`} @external */
  export type array<
    head = _,
    tail extends
    | any.array
    = any.array<head>
  > = readonly [head, ...tail]

  /** {@link arrayOf `nonempty.arrayOf`} @external */
  export type arrayOf<
    invariant,
    head extends
    | invariant
    = invariant,
    tail extends
    | any.array<invariant>
    = any.array<invariant>
  > = readonly [head, ...tail]


  /** {@link arrayOfStrict `nonempty.arrayOfStrict`} @external */
  export type arrayOfStrict<
    invariant,
    head extends
    | invariant
    = invariant,
    type extends
    | any.array<head>
    = any.array<head>
  > = type

  export {
    /** {@link path `nonempty.pathRight`} @external */
    path as pathRight,
  }

  /** {@link path `nonempty.path`} @external */
  export type path<
    head extends any.index = any.index,
    tail extends
    | any.array<any.index>
    = any.array<any.index>
  > = readonly [head, ...tail]

  /** {@link pathLeft `nonempty.pathLeft`} */
  export type pathLeft<
    init extends
    | any.array<any.index>
    = any.array<any.index>,
    last extends any.index = any.index
  > = readonly [...init, last]
}