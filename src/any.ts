// module namespaces
export {
  some,
  numeric,
}

// aliased exports
export {
  /** {@link boolean_ `any.boolean`} @external */
  type boolean_ as boolean,
  /** {@link function_ `any.function`} @external */
  type function_ as function,
  /** {@link number_ `any.number`} @external */
  type number_ as number,
  /** {@link object_ `any.object`} @external */
  type object_ as object,
  /** {@link string_ `any.string`} @external */
  type string_ as string,
}

// direct exports
export {
  /** {@link array `any.array`} @external */
  type array,
  /** {@link arrayof `any.arrayof`} @external */
  type arrayof,
  /** {@link arrayof `any.arrayOf`} alias for {@link arrayof `any.arrayof`} @external */
  type arrayof as arrayOf,
  /** {@link arraylike `any.arraylike`} @external */
  type arraylike,
  /** {@link double `any.double`} @external */
  type binary,
  /** {@link dictionary `any.dictionary`} @external */
  type dictionary,
  /** {@link dictionary `any.dict`} alias for {@link dictionary `any.dictionary`} @external */
  type dictionary as dict,
  /** {@link double `any.double`} @external */
  type double,
  /** {@link entries `any.entries`} @external */
  type entries,
  /** {@link entryof `any.entryof`} @external */
  type entryof,
  /** {@link entryof `any.entryOf`} alias for {@link entryof `any.entryof`} @external */
  type entryof as entryOf,
  /** {@link entriesof `any.entriesof`} @external */
  type entriesof,
  /** {@link entriesof `any.entriesOf`} alias for {@link entriesof `any.entriesOf`} @external */
  type entriesof as entriesOf,
  /** {@link entry `any.entry`} @external */
  type entry,
  /** {@link enumerable `any.enumerable`} @external */
  type enumerable,
  /** {@link field `any.field`} @external */
  type field,
  /** {@link fieldof `any.fieldof`} @external */
  type fieldof,
  /** {@link fieldof `any.fieldOf`} alias for {@link fieldof `any.fieldof`} @external */
  type fieldof as fieldOf,
  /** {@link guard `any.guard`} - a variant of {@link typeguard `any.typeguard`} that fixes the input type to `unknown` @external */
  type guard,
  /** {@link index `any.index`} - `string | number | symbol` @external */
  type index,
  /** {@link indexof `any.indexof`} @external */
  type indexof,
  /** {@link indexof `any.indexOf`} alias for {@link indexof `any.indexof`} @external */
  type indexof as indexOf,
  /** {@link indexedby `any.indexedby`} @external */
  type indexedby,
  /** {@link indexedby `any.indexedBy`} alias for {@link indexedby `any.indexedby`} @external */
  type indexedby as indexedBy,
  /** {@link invertible `any.invertible`} @external */
  type invertible,
  /** {@link key `any.key`} @external */
  type key,
  /** {@link keyof `any.keyof`} @external */
  type keyof,
  /** {@link keyof `any.keyOf`} alias for {@link keyof `any.keyof`} @external */
  type keyof as keyOf,
  /** {@link list `any.list`} @external */
  type list,
  /** {@link literal `any.literal`} @external */
  type literal,
  /** {@link named `any.named`} @external */
  type named,
  /** {@link nonnullable `any.nonnullable`} @external */
  type nonnullable,
  /** {@link nullable `any.nullable`} @external */
  type nullable,
  /** {@link one `any.one`} @external */
  type one,
  /** {@link path `any.path`} @external */
  type path,
  /** {@link pathof `any.pathof`} @external */
  type pathof,
  /** {@link pathof `any.pathOf`} alias for {@link pathof `any.pathof`} @external */
  type pathof as pathOf,
  /** {@link predicate `any.predicate`} @external */
  type predicate,
  /** {@link primitive `any.primitive`} @external */
  type primitive,
  /** {@link showable `any.showable`} @external */
  type showable,
  /** {@link showableKeyof `any.showableKeyof`} @external */
  type showableKeyof,
  /** {@link showableKeyof `any.showableKeyOf`} alias for {@link showableKeyof `any.showableKeyof`} @external */
  type showableKeyof as showableKeyOf,
  /** {@link single `any.single`} @external */
  type single,
  /** {@link struct `any.struct`} @external */
  type struct,
  /** {@link subtypeof `any.subtypeof`} @external */
  type subtypeof,
  /** {@link subtypeof `any.subtypeOf`} alias for {@link subtypeof `any.subtypeof`} @external */
  type subtypeof as subtypeOf,
  /** {@link ternary `any.ternary`} @external */
  type ternary,
  /** {@link three `any.three`} @external */
  type three,
  /** {@link triple `any.triple`} @external */
  type triple,
  /** {@link two `any.two`} @external */
  type two,
  /** {@link type `any.type`} @external */
  type type,
  /** {@link typeguard `any.typeguard`} @external */
  type typeguard,
  /** {@link unary `any.unary`} @external */
  type unary,
}

import { to } from "./to"
import { pathsof } from "./paths/paths"

/** @internal */
type _ = unknown

// 🡓🡓 aliased exports 🡓🡓
type string_<type extends string = string> = type
type number_<type extends number = number> = type
type boolean_<type extends boolean = boolean> = type
type function_<type extends any.function = any.function> = type
type object_<type extends any.object = any.object> = type
// 🡑🡑 aliased exports 🡑🡑

// 🡓🡓 direct exports 🡓🡓
type type<type extends any.type = any.type> = type
type nullable<type extends any.nullable = any.nullable> = type
type nonnullable<type extends any.nonnullable = any.nonnullable> = type

type key<type extends any.key = any.key> = type
type index<type extends any.index = any.index> = type
type literal<type extends any.literal = any.literal> = type
type showable<type extends any.showable = any.showable> = type
type primitive<type extends any.primitive = any.primitive> = type
type numeric<type extends any.numeric = any.numeric> = type

type one<first = _> = readonly [_𝟭: first]
type two<first = _, second = _> = readonly [_𝟭: first, _𝟮: second]
type three<first = _, second = _, third = _> = readonly [_𝟭: first, _𝟮: second, _𝟯: third]
type single<type extends one = one> = type
type double<type extends two = two> = type
type triple<type extends three = three> = type
type unary<type extends some.unary = some.unary> = type
type binary<type extends some.binary = some.binary> = type
type ternary<type extends some.ternary = some.ternary> = type
type predicate<type extends any.predicate = any.predicate> = type
type typeguard<𝐢𝐧 = any, 𝐨𝐮𝐭 = _> = any.typeguard<[𝐢𝐧: 𝐢𝐧, 𝐨𝐮𝐭: 𝐨𝐮𝐭]>
type guard<target = _> = any.typeguard<[𝐢𝐧: any, 𝐨𝐮𝐭: target]>

type array<type = _> = any.array<type>
type list<type extends any.array = any.array> = type
type entries<type extends any.array<entry> = any.array<entry>> = type
type struct<type extends any.struct = any.struct> = type
type dictionary<type = _> = any.dictionary<type>
type enumerable<type extends any.enumerable = any.enumerable> = type
type arraylike<type extends any.arraylike = any.arraylike> = type
type invertible<type extends any.invertible = any.invertible> = type
type path<type extends any.path = any.path> = type

/** 
 * Use {@link field `any.field`} when its more convenient to pass the key/value
 * separately, and {@link entry `any.entry`} when you'd prefer passing them as a pair.
 * @external 
 */
type field<key extends any.index = any.index, value = _> = any.field<key, value>
/** 
 * Use {@link entry `any.entry`} when its more convenient to pass the key/value together
 * as a pair, and {@link field `any.field`} when you'd prefer to pass them separately.
 * @external 
 */
type entry<type extends any.entry = any.entry> = type

declare namespace any {
  // aliased exports
  export {
    /** {@link object_ `any.object`} @internal */
    type object_ as object,
    /** {@link function_ `any.function`} @internal */
    type function_ as function,
  }
  // direct exports
  export {
    /** {@link array `any.array`} @internal */
    type array,
    /** {@link arraylike `any.arraylike`} @internal */
    type arraylike,
    /** {@link dictionary `any.dictionary`} @internal */
    type dictionary,
    /** {@link entries `any.entries`} @internal */
    type entries,
    /** {@link enumerable `any.enumerable`} @internal */
    type enumerable,
    /** {@link entry `any.entry`} @internal */
    type entry,
    /** {@link field `any.field`} @internal */
    type field,
    /** {@link index `any.index`} @internal */
    type index,
    /** {@link invertible `any.invertible`} @internal */
    type invertible,
    /** {@link key `any.key`} @internal */
    type key,
    /** {@link literal `any.literal`} @internal */
    type literal,
    /** {@link nonnullable `any.nonnullable`} @internal */
    type nonnullable,
    /** {@link nullable `any.nullable`} @internal */
    type nullable,
    /** {@link numeric `any.numeric`} @internal */
    type numeric,
    /** {@link path `any.path`} @internal */
    type path,
    /** {@link predicate `any.predicate`} @internal */
    type predicate,
    /** {@link primitive `any.primitive`} @internal */
    type primitive,
    /** {@link showable `any.showable`} @internal */
    type showable,
    /** {@link struct `any.struct`} @internal */
    type struct,
    /** {@link type `any.type`} @internal */
    type type,
    /** {@link typeguard `any.typeguard`} @internal */
    type typeguard,
  }

  type key = string | number
  type index = string | number | symbol
  type numeric = number | `${number}`
  type path = readonly index[]
  interface struct { [𝐢𝐱: keyof never]: any }
  type literal = string | number | boolean
  type primitive = string | number | boolean | bigint | null | undefined | symbol
  interface invertible { [𝐢𝐱: key]: key }
  interface dictionary<type = _> { [𝐢𝐱: keyof never]: type }
  type showable = string | number | boolean | bigint | null | undefined
  type type = nullable | nonnullable
  type nullable = null | undefined
  type nonnullable = {}
  type array<type = _> = globalThis.ReadonlyArray<type>
  type field<k extends index = index, v = _> = readonly [𝐤𝐞𝐲: k, 𝐯𝐚𝐥𝐮𝐞: v]
  type entry<type extends readonly [any.index, _] = readonly [any.index, _]> = type
  type entries<type extends any.array<any.entry> = any.array<any.entry>> = type
  interface enumerable<type = _> { [𝐢𝐱: number]: type }
  interface arraylike<type = _> extends enumerable<type> { length: number }

  interface predicate<type = any> { (u: type): boolean }
  type typeguard<
    map extends
    | readonly [𝐟𝐫𝐨𝐦: _, 𝐭𝐨: _]
    = readonly [𝐟𝐫𝐨𝐦: any, 𝐭𝐨: _]
  > = never | { (u: map[0]): u is map[1] }
}

type keyof<
  invariant,
  type extends
  | keyof invariant
  = keyof invariant
> = type

type showableKeyof<
  invariant,
  type extends
  | any.key & keyof invariant
  = any.key & keyof invariant
> = type

type indexof<
  invariant extends any.array,
  type extends
  | Extract<keyof invariant, `${number}`>
  = Extract<keyof invariant, `${number}`>
> = type

type indexedby<
  invariant extends any.index,
  type extends
  | { [𝒊𝒙 in invariant]: _ }
  = { [𝒊𝒙 in invariant]: _ }
> = type

type pathof<
  invariant,
  type extends
  | pathsof<invariant>
  = pathsof<invariant>
> = type

type named<
  invariant extends field,
  type extends
  | { [𝒊𝒙 in invariant[0]]: invariant[1] }
  = { [𝒊𝒙 in invariant[0]]: invariant[1] }
> = type

type arrayof<
  invariant,
  type extends
  | any.array<invariant>
  = any.array<invariant>
> = type

type entryof<
  invariant,
  type extends
  | readonly [any.index, invariant]
  = readonly [any.index, invariant]
> = type

type entriesof<
  invariant,
  type extends
  | any.array<readonly [any.index, invariant]>
  = any.array<readonly [any.index, invariant]>
> = type

type fieldof<
  invariant,
  type extends
  | to.entries<invariant>
  = to.entries<invariant>
> = type

type subtypeof<
  invariant,
  subtype extends
  | invariant extends invariant ? invariant : never
  = invariant extends invariant ? invariant : never
> = subtype

namespace some { export const never: never = void 0 as never }
/**
 * The {@link some `some`} namespace is the dual of {@link any `any`}.
 * 
 * Whereas the {@link any `any`} namespace is analogous to 
 * {@link https://en.wikipedia.org/wiki/Universal_quantification universal quantification}
 * (read: "for all"), {@link some `some`} is more closely related to 
 * {@link https://en.wikipedia.org/wiki/Existential_quantification _existential_ quantification}
 * (read: "there exists").
 */
declare namespace some {
  // aliased exports
  export {
    /** {@link arrayof `some.arrayof`} @external */
    arrayof,
    /** {@link arrayof `some.arrayOf`} @external */
    arrayof as arrayOf,
    /** {@link function_ `some.function`} @external */
    function_ as function,
    /** {@link fieldof `some.fieldof`} @external */
    fieldof,
    /** {@link fieldof `some.fieldOf`} @external */
    fieldof as fieldOf,
    /** {@link subtypeof `some.subtypeof`} @external */
    subtypeof,
    /** {@link subtypeof `some.subtypeOf`} @external */
    subtypeof as subtypeOf,
  }

  // direct exports
  export {
    /** {@link binary `some.binary`} @external */
    binary,
    /** {@link field `some.field`} @external */
    field,
    /** {@link named `some.named`} @external */
    named,
    /** {@link predicate `some.predicate`} @external */
    predicate,
    /** {@link record `some.record`} @external */
    record,
    /** {@link ternary `some.ternary`} @external */
    ternary,
    /** {@link unary `some.unary`} @external */
    unary,
  }

  type predicate<type = never> = any.predicate<type>

  /** {@link unary `some.unary`} @external */
  interface unary<
    out = _,
    arg = any
  > { (_: arg): out }

  /** {@link binary `some.binary`} @external */
  interface binary<
    out = _,
    arg_0 = any,
    arg_1 = any
  > { (_0: arg_0, _1: arg_1): out }

  /** {@link ternary `some.ternary`} @external */
  interface ternary<
    out = _,
    arg_0 = any,
    arg_1 = any,
    arg_2 = any
  > { (_0: arg_0, _1: arg_1, _2: arg_2): out }

  /** {@link field `some.field`} @external */
  type field<key extends any.index = any.index, value = _> = any.field<key, value>

  /** {@link record `some.record`} @external */
  type record<
    key extends
    | any.index
    = any.key,
    value = _
  > = globalThis.Record<key, value>
}


declare namespace numeric {
  // direct exports
  export {
    /** {@link parse `numeric.parse`} @external */
    parse,
    /** {@link indexof `numeric.indexof`} @external */
    indexof,
  }
  type parse<type> = type extends `${infer x extends number}` ? x : never
  type indexof<
    invariant extends any.array,
    type extends
    | Extract<keyof invariant, `${number}`>
    = Extract<keyof invariant, `${number}`>
  > = numeric.parse<type>
}

// NOTE: Do not move this namespace. It needs to stay here (_after_ the ambient `any` namespace),
// otherwise the aliases it exports like `any.object_` will not be preserved.
namespace any {
  // TODO: generate this identifier from manifest
  export type PKG_VERSION = typeof PKG_VERSION
  export const PKG_VERSION = "0.3.0"
  /** @internal */
  type id<type> = type
  /** @internal */
  // NOTE: Do not move. It needs to stay here (in the non-ambient `any` namespace) to preserve
  // the `any.object` name (otherwise the alias is not preserved)
  export interface object_ extends id<object> { }
  /** @internal */
  // NOTE: Do not move. It needs to stay here (in the non-ambient `any` namespace) to preserve
  // the `any.function` name (otherwise the alias is not preserved)
  export interface function_<arg extends any.array<any> = any.array<any>, out = _> { (...arg: arg): out }
  /** 
   * Note: this term is not meant to be consumed; it is only
   * exposed for the "side-effect" (allows us to support 
   * namespace aliasing using "import equals" syntax, as 
   * documented in the readme)
   * 
   * @category term, implementation detail
   * @internal
   */
  export const never: never = void 0 as never
}
