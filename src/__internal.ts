import { pathsof } from "./paths/paths"

// module aliases
export { never }

export {
  term,
}

export {
  type _ as thing,
  type array,
  type arraylike,
  type dictionary,
  type entries,
  type enumerable,
  type entry,
  type field,
  type index,
  type indexedby,
  type invertible,
  type key,
  type keyof,
  type indexof,
  type literal,
  type named,
  type nonnullable,
  type nullable,
  type numeric,
  type path,
  type pathof,
  type primitive,
  type showable,
  type struct,
  type type,
  type typeguard,
}

export { object } from "./object"

/** @internal */
type _ = unknown

/** 
 * Note: this term is not meant to be consumed; it is only
 * exposed for the "side-effect" (allows us to support 
 * namespace aliasing using "import equals" syntax, as 
 * documented in the readme)
 * 
 * @category term, implementation detail
 * @internal
 */
const never: never = void 0 as never

/** @category nullary, primitive @internal */
type type = nullable | nonnullable
/** @category nullary, primitive @internal */
type nullable = null | undefined
/** @category nullary, primitive @internal */
type nonnullable = {}

/** @category nullary, primitive @internal */
type key = string | number
/** @category nullary, primitive @internal */
type index = string | number | symbol
/** @category nullary, primitive @internal */
type literal = string | number | boolean
/** @category nullary, primitive @internal */
type showable = string | number | boolean | bigint | null | undefined
/** @category nullary, primitive @internal */
type primitive = string | number | boolean | bigint | null | undefined | symbol

/** @category unary, composite @internal */
type array<type = unknown> = globalThis.ReadonlyArray<type>
/** @category binary, composite @internal */
type field<k extends index = index, v = unknown> = readonly [𝐤𝐞𝐲: k, 𝐯𝐚𝐥𝐮𝐞: v]
/** @category unary, composite @internal */
type entry<type extends field = field> = type
/** @category unary, composite @internal */
type entries<type extends array<entry> = array<entry>> = type
/** @category nullary, composite @internal */
type path = array<index>

/** @category nullary, composite @internal */
interface struct { [𝐢𝐱: keyof never]: any }
/** @category nullary, composite @internal */
interface invertible { [𝐢𝐱: key]: key }
/** @category unary, composite @internal */
interface dictionary<type = unknown> { [𝐢𝐱: keyof never]: type }
/** @category unary, composite @internal */
interface enumerable<type = _> { [𝐢𝐱: number]: type }
/** @category unary, composite @internal */
interface arraylike<type = _> extends enumerable<type> { length: number }


type indexof<
  type extends array,
  _witness extends
  | Extract<keyof type, `${number}`>
  = Extract<keyof type, `${number}`>
> = _witness


/** {@link numeric `any.numeric`} @external */
type numeric<type extends numeric.type = numeric.type> = type

declare namespace numeric {
  type parse<type> = type extends `${infer x extends number}` ? x : never
  /** @category nullary, primitive @internal, exotic */
  type type = number | `${number}`

  type indexof<
    type extends array,
    _witness extends
    | Extract<keyof type, `${number}`>
    = Extract<keyof type, `${number}`>
  > = numeric.parse<_witness>
}

declare namespace showable {
  type parse<type> = Extract<type, showable>

  type keyof<type, _witness extends keyof type = keyof type> = _witness & key
}



/**
 * @arity
 *  | position | notes | 
 *  |---|---|
 *  | `binary` | a type constructor that describes a relationship between two types |
 *  | `unary`  | acts as an invariant when 2nd argument is omitted                  |
 *  | `unary`  | acts as a witness when 2nd argument is in inference position       |
 * @internal 
 */
type keyof<type, _witness extends key & keyof type = key & keyof type> = _witness


/**
 * @arity 
 *  | position | notes | 
 *  |---|---|
 *  | `binary` | a type constructor that describes a relationship between two types |
 *  | `unary`  | acts as an invariant when 2nd argument is omitted                  |
 *  | `unary`  | acts as a witness when 2nd argument is in inference position       |
 * @internal 
 */
type named<
  type extends field,
  _witness extends
  | { [ix in type[0]]: type[1] }
  = { [ix in type[0]]: type[1] }
> = _witness

type indexedby<ix extends index, _witness extends { [x in ix]: unknown } = { [x in ix]: unknown }> = _witness

type pathof<type, _witness extends pathsof<type> = pathsof<type>> = _witness

namespace term { export const never: never = void 0 as never }
declare namespace term { export { named } }

type typeguard<map extends readonly [𝐟𝐫𝐨𝐦: unknown, 𝐭𝐨: unknown] = readonly [𝐟𝐫𝐨𝐦: any, 𝐭𝐨: unknown]>
  = never | { (u: map[0]): u is map[1] }
