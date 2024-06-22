import { _, id } from "../util.js";

export type { TypeError_ as TypeError }

export declare namespace TypeError_ {
  export const URI: "any-ts/TypeError"
  export type URI = typeof TypeError_.URI

  export { $symbol as symbol }
  export const $symbol: unique symbol
  export type $symbol = typeof $symbol

  export type { TypeError as new }
  export type TypeError<msg extends string = string, got = _> = never | TypeError_<[msg: msg, got: got]>
}

export interface TypeError_<
  error extends
  | readonly [msg: string, got: _]
  = readonly [msg: string, got: _]
> extends id<{ msg: error[0], got: error[1] }> {
  [TypeError_.$symbol]: TypeError_.URI
}
