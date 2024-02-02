export type {
  as_empty,
  as_identity,
  as_nothing,
  close,
  illegal_state,
  not_meant_for_use,
}
export { $$ }

declare namespace $$ { type IllegalState = typeof IllegalState }
namespace $$ { export const IllegalState: unique symbol = Symbol.for("any-ts/semantic-never::IllegalState") }

declare namespace close {
  type inline_var<_varName extends string> = never;
  type unmatched_expr<__description extends string = never> = never
  type distributive<_varname extends string = never> = never;
}

/**
 * TODO: Experiment with using {@link $$.IllegalState `$$.IllegalState`} as a runtime value
 * indicating that an illegal state was reached
 */
type illegal_state<__description extends string = never> = never
type as_empty<__description extends string = never> = never
type as_nothing<__description extends string = never> = never
type as_identity<__description extends string = never> = never
type not_meant_for_use<__description extends string = never> = never
