export type { any_ as any }

import type { any } from "./any"
import type { some } from "./any"
import type { to } from "./to"
import type { pathsof } from "./paths/paths"

type _ = unknown

declare namespace any_ {
  export type {
    string_ as string,
    number_ as number,
    boolean_ as boolean,
    object_ as object,
    function_ as function,
  }

  export type {
    arrayof as arrayOf,
    dictionary as dict,
    indexedby as indexedBy,
    keyOf as keyof,
  }
}

declare namespace any_ {
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
  type one<only = _> = readonly [_𝟭: only]
  type two<fst = _, snd = _> = readonly [_𝟭: fst, _𝟮: snd]
  type three<fst = _, snd = _, thr = _> = readonly [_𝟭: fst, _𝟮: snd, _𝟯: thr]
  type json<type extends any.json = any.json> = type
  type single<type extends one = one> = type
  type double<type extends two = two> = type
  type triple<type extends three = three> = type
  type unary<type extends some.unary = some.unary> = type
  type binary<type extends some.binary = some.binary> = type
  type ternary<type extends some.ternary = some.ternary> = type
  type predicate<type extends any.predicate = any.predicate> = type
  type asserts<target = _> = any.assertion<[𝐢𝐧: any, 𝐨𝐮𝐭: target]>
  type assertion<𝐢𝐧 = any, 𝐨𝐮𝐭 = _> = any.assertion<[𝐢𝐧: 𝐢𝐧, 𝐨𝐮𝐭: 𝐨𝐮𝐭]>
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
  type keys<type extends any.keys = any.keys> = type
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
  type keyOf<
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

  type indexableby<
    invariant extends any.index,
    type extends
    | { [ix in invariant]: any.index }
    = { [ix in invariant]: any.index }
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

}
