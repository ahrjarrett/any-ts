export {
  never,
}

declare namespace close {
  type inline_var<_varName extends string> = never;
  type unmatched_expr<__description extends string = never> = never
  type distributive<_varname extends string = never> = never;
}

namespace never {
  export declare namespace $$ {
    export type IllegalState = typeof never.$$.IllegalState
  }
  export namespace $$ {
    export const IllegalState: unique symbol = Symbol.for("any-ts/semantic-never::IllegalState")
  }
}

declare namespace never {
  // namespace re-exports
  export { close }
  /**
   * TODO: Experiment with using {@link $$.IllegalState `$$.IllegalState`} as a runtime value
   * indicating that an illegal state was reached
   */
  export type illegal_state<__description extends string = never> = never
  export type as_empty<__description extends string = never> = never
  export type as_nothing<__description extends string = never> = never
  export type as_identity<__description extends string = never> = never
  export type not_meant_for_use<__description extends string = never> = never
}
