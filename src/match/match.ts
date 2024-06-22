import type { some } from "../some/some.js";
import type { any } from "../any/any.js"
import type { never } from "../never/never.js"

export type {
  match_emptyObject as emptyObject,
}

export declare namespace finite {
  export {
    match_finiteBoolean as boolean,
    match_finiteKey as key,
    match_finiteIndex as index,
    match_finiteLiteral as literal,
    match_finiteNumber as number,
    match_finiteString as string,
    match_finiteObject as object,
    match_finiteArray as array,
  }
}

export declare namespace nonfinite {
  export {
    match_nonfiniteArray as array,
    match_nonfiniteObject as record,
    match_nonfiniteObject as object,
  }
}

export type match_finiteArray<t>
  = [
    t extends any.array
    ? number extends t["length"] ? never
    : t
    : never
  ] extends [infer out extends any.array] ? out : never
  ;

export type match_nonfiniteArray<t>
  = [
    t extends any.array
    ? number extends t["length"] ? t
    : never
    : never
  ] extends [infer out] ? out : never
  ;

export type match_emptyObject<t>
  = [t] extends [any.struct]
  ? [keyof t] extends [never] ? {}
  : never
  : never
  ;

export type match_finiteString<t>
  = [t] extends [string]
  ? [string] extends [t] ? never
  : string
  : never
  ;

export type match_finiteNumber<t>
  = [t] extends [number]
  ? [number] extends [t] ? never
  : number
  : never
  ;

export type match_finiteBoolean<t>
  = [Extract<t, boolean>] extends [infer out]
  ? [boolean] extends [out] ? never
  : out
  : never
  ;

export type match_finiteBooleanStrict<t>
  = [[t] extends [boolean] ? [boolean] extends [t] ? never : t : never] extends [infer out]
  ? out
  : never
  ;

export type match_finiteKey<t>
  = [t] extends [any.key]
  ? any.key extends t ? never
  : any.key
  : never
  ;

export type match_finiteIndex<t>
  = match_strictSubsetOf<t, any.index>
  ;

export type match_strictSubsetOf<type, set>
  = set extends set
  ? [set extends type ? never : Extract<type, set>] extends [infer out]
  ? out
  : never.close.inline_var<"out">
  : never.close.distributive<"set">
  ;

export type match_finiteLiteral<t>
  = match_finiteBoolean<t>
  | match_strictSubsetOf<t, any.key>
  ;

export type match_nonfiniteObject<t, value = unknown>
  = [t] extends [object]
  ? [t] extends [any.array] ? never
  : [string] extends [keyof t] ? { [x: string]: value }
  : [number] extends [keyof t] ? { [x: number]: value }
  : [symbol] extends [keyof t] ? { [x: symbol]: value }
  : never
  : never
  ;

export type match_nonfiniteStruct<t, value = unknown>
  = [t] extends [object]
  ? [t] extends [any.array]
  ? [number] extends [t["length"]] ? any.array<value> : never
  : [string] extends [keyof t] ? { [x: string]: value }
  : [number] extends [keyof t] ? { [x: number]: value }
  : [symbol] extends [keyof t] ? { [x: symbol]: value }
  : never
  : never
  ;

export type match_finiteStruct<t, value = unknown>
  = [t] extends [object]
  ? [t] extends [any.array]
  ? [number] extends [t["length"]] ? never : any.array<value>
  : [string] extends [keyof t] ? never
  : [number] extends [keyof t] ? never
  : [symbol] extends [keyof t] ? never
  : { [x: any.key]: value }
  : never
  ;

export type match_finiteObject<t, constraint extends object = {}>
  = [t] extends [object]
  ? [t] extends [any.array] ? never
  : [string] extends [keyof t] ? never
  : [number] extends [keyof t] ? never
  : [symbol] extends [keyof t] ? never
  : constraint
  : never
  ;

export declare namespace strict {
  export {
    match_finiteBooleanStrict as finiteBoolean,
    match_strictSubsetOf as subsetOf,
  }
}
