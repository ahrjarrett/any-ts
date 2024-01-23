/*
 eslint-disable
 @typescript-eslint/naming-convention,
 @typescript-eslint/no-namespace,
 @typescript-eslint/no-shadow,
 prettier/prettier,
*/
export type {
  close,
  illegal_state,
}

declare namespace close {
  type inline_var<_varName extends string> = never;
  type unmatched_expr = never
  type distributive<_varname extends string = never> = never;
}

type illegal_state<__description extends string = never> = never