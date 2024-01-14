export { never }

namespace never { export const never: never = void 0 as never }
declare namespace never {
  type unrepresentable<
    type extends never,
    description extends
    | string
    = "Illegal state should be unrepresentable: `never.unrepresentable` should never be called"
  > = [type] extends [never] ? never : description

  export namespace close {
    type unmatched_expr = never
    type inline_var<_varName extends string> = never
    type distributive<_varName extends string> = never
  }
}
