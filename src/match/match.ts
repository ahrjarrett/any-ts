import type { any } from "../any/any.js"
import type { never } from "../never/never.js"

export type {
  match_finiteArray as finiteArray,
  match_finiteBoolean as finiteBoolean,
  match_finiteKey as finiteKey,
  match_finiteIndex as finiteIndex,
  match_finiteLiteral as finiteLiteral,
  match_finiteNumber as finiteNumber,
  match_finiteString as finiteString,

}

export type {
  match_record as record,
  match_emptyObject as emptyObject,
  match_nonfiniteArray as nonfiniteArray,
  match_strict as strict,
}

declare namespace match_strict {
  export {
    match_finiteBooleanStrict as finiteBoolean,
    match_strictSubsetOf as subsetOf,
  }
}

type match_finiteArray<t>
  = [
    t extends any.array
    ? number extends t["length"] ? never
    : t
    : never
  ] extends [infer out extends any.array] ? out : never
  ;

type match_nonfiniteArray<t>
  = [
    t extends any.array
    ? number extends t["length"] ? t
    : never
    : never
  ] extends [infer out] ? out : never
  ;

type match_record<t>
  = [t] extends [any.struct]
  ? [t] extends [any.array]
  ? never
  : any.struct
  : never
  ;

type match_emptyObject<t>
  = [t] extends [any.struct]
  ? [keyof t] extends [never] ? {}
  : never
  : never
  ;

type match_finiteString<t>
  = [t] extends [string]
  ? [string] extends [t] ? never
  : string
  : never
  ;

type match_finiteNumber<t>
  = [t] extends [number]
  ? [number] extends [t] ? never
  : number
  : never
  ;

type match_finiteBoolean<t>
  = [globalThis.Extract<t, boolean>] extends [infer out]
  ? [boolean] extends [out] ? never
  : out
  : never
  ;

type match_finiteBooleanStrict<t>
  = [[t] extends [boolean] ? [boolean] extends [t] ? never : t : never] extends [infer out]
  ? out
  : never
  ;

type match_finiteKey<t>
  = [t] extends [any.key]
  ? any.key extends t ? never
  : any.key
  : never
  ;

type match_finiteIndex<t> = match_strict.subsetOf<t, any.index>

type match_strictSubsetOf<t, set>
  = set extends set
  ? [set extends t ? never : globalThis.Extract<t, set>] extends [infer out]
  ? out
  : never.close.inline_var<"out">
  : never.close.distributive<"set">
  ;

type match_finiteLiteral<t> = match_finiteBoolean<t> | match_strict.subsetOf<t, any.key>
