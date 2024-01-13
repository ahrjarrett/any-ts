import * as any from "./__internal"

export {
  empty,
  nonempty,
}

/** @internal */
type _ = unknown

const string = "" as const
const array = [] as const

namespace empty { export const never: never = void 0 as never }
declare namespace empty {
  export type array<type extends typeof array = typeof array> = type

  type string_ = typeof string
  export { string_ as string }
}

namespace nonempty { export const never: never = void 0 as never }
declare namespace nonempty {
  export type array<
    head = _,
    type extends
    | any.array<head>
    = any.array<head>
  > = type

  export type arrayof<
    invariant
    , head extends
    | invariant
    = invariant
    , type extends
    | any.array<head>
    = any.array<head>
  > = type

  type string_<head extends string = string, tail extends string = string> = `${head}${tail}`
  export { string_ as string }
}
