export type {
  symbol,
}

import { never } from "..";

/** 
 * {@link is_symbol `symbol.is`} 
 * - internal ref: {@link is_symbol `is_symbol`}) 
 * @external 
 */
type is_symbol<type, distributive = never>
  = [distributive] extends [never]
  ? ([type] extends [symbol] ? true : false)
  : type extends type ? is_symbol<type, never>
  : never.close.distributive<"type">
  ;

/** 
 * ### {@link symbol `symbol`}
 * The {@link symbol `symbol`} namespace is a collection of **types**, 
 * **type functions**, and **type constructors** for working with 
 * type-level symbols.
 * 
 * Links:
 * 
 * - see also: {@link globalThis.SymbolConstructor `globalThis.SymbolConstructor`}
 * - see also: {@link globalThis.Symbol `globalThis.Symbol`}
 * - qualified name: {@link is_symbol `is_symbol`}) 
 * - fully qualified path: {@link is_symbol `any.symbol.is`}
 * @external 
 */
declare namespace symbol {
  export type {
    is_symbol as is,
  }
}
