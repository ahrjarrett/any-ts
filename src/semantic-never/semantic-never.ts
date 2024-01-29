export type {
  as_identity,
  close,
  illegal_state,
}

declare namespace close {
  type inline_var<_varName extends string> = never;
  type unmatched_expr<__description extends string = never> = never
  type distributive<_varname extends string = never> = never;
}

type illegal_state<__description extends string = never> = never
type as_empty<__description extends string = never> = never
type as_identity<__description extends string = never> = never
