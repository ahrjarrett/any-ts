import * as any from "./any"
import { enforce } from "./err/enforce"

export {
  empty,
  nonempty,
}

/** @internal */
type _ = unknown

type string_ = typeof string_
const string_ = "" as const
const array = [] as const
type array<type extends typeof array = typeof array> = type
type object_ = typeof object_
const object_ = {} as const


declare namespace empty {
  export {
    /** {@link array `empty.path`} @external */
    array as path,
    /** {@link array `empty.array`} @external */
    array,
    /** {@link object_ `empty.object`} @external */
    object_ as object,
    /** {@link string_ `empty.string`} @external */
    string_ as string,
  }
}

namespace empty {
  empty.array = array
  empty.path = array
  empty.string = string
  empty.object = object
}

declare namespace nonempty {
  export {
    /** {@link array `nonempty.array`} @external */
    array,
    /** {@link arrayof `nonempty.arrayof`} @external */
    arrayof,
    /** {@link arrayof `nonempty.arrayOf`} @external */
    arrayof as arrayOf,
    /** {@link arrayofStrict `nonempty.arrayofStrict`} @external */
    arrayofStrict,
    /** {@link arrayofStrict `nonempty.arrayOfStrict`} @external */
    arrayofStrict as arrayOfStrict,
    /** {@link path `nonempty.path`} @external */
    path,
    /** {@link path `nonempty.pathRight`} @external */
    path as pathRight,
    /** {@link pathLeft `nonempty.pathLeft`} */
    pathLeft,
    /** {@link string_ `nonempty.string`} @external */
    string_ as string
  }

  type array<
    head = _,
    tail extends
    | any.array
    = any.array<head>
  > = readonly [head, ...tail]

  type arrayof<
    invariant,
    head extends
    | invariant
    = invariant,
    tail extends
    | any.array<invariant>
    = any.array<invariant>
  > = readonly [head, ...tail]

  type string_<
    head extends string = string,
    tail extends string = string
  > = `${head}${tail}`

  type arrayofStrict<
    invariant,
    head extends
    | invariant
    = invariant,
    type extends
    | any.array<head>
    = any.array<head>
  > = type

  type path<
    head extends any.index = any.index,
    tail extends
    | any.array<any.index>
    = any.array<any.index>
  > = readonly [head, ...tail]

  type pathLeft<
    init extends
    | any.array<any.index>
    = any.array<any.index>,
    last extends any.index = any.index
  > = readonly [...init, last]
}

namespace nonempty {
  export const never: never = void 0 as never
  // export const string
  //   : <text extends enforce.nonEmptyString<text>>(text: text) => text
  //   = (text) => text
}
