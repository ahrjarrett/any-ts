// module aliases
export { never }

export {
  type 𝗈𝖻𝗃𝖾𝖼𝗍,
  type 𝗈𝖻𝗃𝖾𝖼𝗍 as object,
}

export {
  type array,
  type arraylike,
  type dictionary,
  type entries,
  type enumerable,
  type entry,
  type field,
  type index,
  type invertible,
  type key,
  type keyof,
  type indexof,
  type literal,
  type nonnullable,
  type nullable,
  type primitive,
  type showable,
  type struct,
  type type,
}

/** @internal */
type _ = unknown

/** @internal */
declare namespace impl {
  /** @internal term */
  const object: object
  /** @internal */
  type id<type> = type
}

/** 
 * Don't ask.
 * 
 * @category nullary, implementation detail 
 * @internal
 */
interface 𝗈𝖻𝗃𝖾𝖼𝗍 extends impl.id<typeof impl.object> { }

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
type field<k extends index = key, v = unknown> = readonly [𝐤𝐞𝐲: k, 𝐯𝐚𝐥𝐮𝐞: v]
/** @category unary, composite @internal */
type entry<type extends field = field> = type
/** @category unary, composite @internal */
type entries<type extends array<entry> = array<entry>> = type

/** @category nullary, composite @internal */
interface struct { [𝒊𝒙: keyof never]: any }
/** @category nullary, composite @internal */
interface invertible { [𝒊𝒙: key]: key }
/** @category unary, composite @internal */
interface dictionary<type = unknown> { [𝒊𝒙: keyof never]: type }
/** @category unary, composite @internal */
interface enumerable<type = _> { [𝒊𝒙: number]: type }
/** @category unary, composite @internal */
interface arraylike<type = _> extends enumerable<type> { length: number }

/** @category binary, invariant @internal */
type indexof<invariant, type extends keyof invariant = keyof invariant> = type
/** @category binary, invariant @internal */
type keyof<invariant, type extends key & keyof invariant = key & keyof invariant> = type
