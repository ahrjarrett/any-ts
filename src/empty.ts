import * as any from "./__internal"
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
    array as path,
    array,
    object_ as object,
    string_ as string,
  }
}

namespace empty {
  empty.array = array
  empty.path = array
  empty.string = string
  empty.object = object
}

namespace nonempty {
  export const string
    : <text extends enforce.nonEmptyString<text>>(text: text) => text
    = (text) => text
}

declare namespace nonempty {
  export type array<
    head = _,
    type extends
    | any.array<head>
    = any.array<head>
  > = type

  export type arrayof<
    invariant,
    head extends
    | invariant
    = invariant,
    tail extends
    | any.array<invariant>
    = any.array<invariant>
  > = readonly [head, ...tail]

  export type arrayofStrict<
    invariant,
    head extends
    | invariant
    = invariant,
    type extends
    | any.array<head>
    = any.array<head>
  > = type

  /** 
   * {@link nonempty.path `nonempty.path`} 
   */
  export type path<
    head extends any.index = any.index,
    tail extends
    | any.array<any.index>
    = any.array<any.index>
  > = readonly [head, ...tail]

  /** 
   * {@link nonempty.pathLeft `nonempty.pathLeft`} 
   */
  export type pathLeft<
    init extends
    | any.array<any.index>
    = any.array<any.index>,
    last extends any.index = any.index
  > = readonly [...init, last]
}
