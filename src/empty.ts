import type { any } from "./any/exports.js"
import type { _ } from "./util.js"

export {
  type empty,
  type nonempty,
}

declare namespace empty {
  const string_: ""
  type string_ = typeof string_
  const array: readonly []
  type array<type extends typeof array = typeof array> = type
  type object_ = typeof object_
  const object_: {}

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

declare namespace nonempty {
  // namespace exports
  export {
    /** the {@link mutable `nonempty.mut`} namespace contains non-empty, mutable type variants @external */
    mutable as mut,
    /** the {@link mutable `nonempty.mutable`} namespace contains non-empty, mutable type variants @external */
    mutable,
  }
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
    string_ as string,

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

declare namespace mutable {
  type array<head = unknown, tail extends any.array = any.array<head>> = [head, ...tail]
  type list<type extends nonempty.array = nonempty.array> = type
  type entries<
    head extends [any.index, _] = [any.index, _],
    tail extends [any.index, _][] = [any.index, _][]
  > = [head, ...tail]
  type keys<head extends any.key = any.key, tail extends any.key[] = any.key[]> = [head, ...tail]
  type path<head extends any.index = any.index, tail extends any.index[] = any.index[]> = [head, ...tail]
}