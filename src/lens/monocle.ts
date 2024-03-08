export type { named }

import type { some } from "../some"
import type { any } from "../any"
import type { nonempty } from "../empty"
import type { never } from "../exports"

type pick<props extends any.array<any.keyof<type>>, type> = never | ({ [prop in props[number]]: type[prop] })

declare namespace named {
  type fromNames<names extends any.array<any.showable>> = never | ({ [name in `${names[number]}`]: name })
  type fromPairs<pairs extends any.entries> = never | ({ [pair in pairs[number]as pair[0]]: pair[1] })
}

// /** 
//  * @example
//  * class At where
//  *   at :: Index m -> Lens' m (Maybe (IxValue m))
//  * 
//  * class Index here
//  *   ix :: Index m -> Traversal' m (IxValue m)
//  */
// interface Structure<type = unknown> { [0]: type }
// interface Index<type = unknown> { [1]: type }
// interface IxValue<type = unknown> { [-1]: type }
// interface ArrayStructure<type = unknown> extends Structure<type>, Index<number> { }
// declare namespace family {
//   interface ArrayIxValue extends Index, IxValue { [-1]: Extract<this[0], any.array>[number] }
//   interface ArrayIndex<type extends any.array> extends Index { }
//   // type inferArray<type extends any.array> = type[number]
//   const byName: {
//     Array: { index: "Int", value: "a" }
//   }
// }

// declare namespace typeclass {
//   interface Index<type> { }
//   interface At {
//     at<const m>(index: Index<m>): 
//   }
// }

interface sa<s = unknown, a = s> {
  ["_s"]: s
  ["_a"]: a
}
interface as<a = unknown, s = unknown> extends sa<s, a> { }
type SA<type extends sa> = never | sa<type["_s"], type["_a"]>

type interpret<optic extends sa, s, a = s>
  = Proto[identify<optic>][tag<a>] & sa<s, a> // { _s: s, _a: a })

type identify<optic extends sa>
  = [optic] extends [Iso] ? "Iso"
  : [optic] extends [Lens] ? "Lens"
  : [optic] extends [Prism] ? "Prism"
  : [optic] extends [Optional] ? "Optional"
  : [optic] extends [Traversal] ? "Traversal"
  : (never.illegal_state<"unhanded optic variant in `identify`">)
  ;

type tag<type>
  = [type] extends [nonempty.array] ? "nonempty_array"
  : [type] extends [any.array] ? "array"
  : [type] extends [Option<any>] ? "option"
  : [type] extends [Result<any, any>] ? "result"
  : [type] extends [any.object] ? "object"
  : [type] extends [any.primitive] ? "primitive"
  : (never.illegal_state<"unhandled variant in `tag`">)

declare const IsoProto: {
  nonempty_array: Iso.__nonempty__,
  array: Iso.__array__,
  option: Iso.__option__,
  result: Iso.__result__,
  object: Iso.__object__,
  primitive: Iso.__proto__,
}

declare const LensProto: {
  nonempty_array: Lens.__proto__,
  array: Lens.__proto__,
  option: Lens.__proto__,
  result: Lens.__proto__,
  object: Lens.__proto__,
  primitive: Lens.__proto__,
}

declare const PrismProto: {
  nonempty_array: Prism.__proto__,
  array: Prism.__proto__,
  option: Prism.__proto__,
  result: Prism.__proto__,
  object: Prism.__proto__,
  primitive: Prism.__proto__,
}

declare const OptionalProto: {
  nonempty_array: Optional.__proto__,
  array: Optional.__proto__,
  option: Optional.__proto__,
  result: Optional.__proto__,
  object: Optional.__proto__,
  primitive: Optional.__proto__,
}

declare const TraversalProto: {
  nonempty_array: Traversal.__proto__,
  array: Traversal.__proto__,
  option: Traversal.__proto__,
  result: Traversal.__proto__,
  object: Traversal.__proto__,
  primitive: Traversal.__proto__,
}

type Proto = typeof Proto
const Proto = {
  Iso: IsoProto,
  Lens: LensProto,
  Prism: PrismProto,
  Optional: OptionalProto,
  Traversal: TraversalProto,
} as const

type matchLens<_type> = Lens.__proto__
type matchPrism<_type> = Prism.__proto__

interface Iso extends Iso.__proto__ {
  get(s: this["_s"]): this["_a"],
  reverseGet(a: this["_a"]): this["_s"]
}

interface IsoConstructor {
  toFrom<s, a>(get: (s: s) => a, reverseGet: (a: a) => s): interpret<Iso, s, a>
  identity: {
    <const s extends any.array = never>(): interpret<Iso, s, s>
    <const s extends any.object = never>(): interpret<Iso, s, s>
    <s extends any.primitive = never>(): interpret<Iso, s, s>
    <const s extends any.array>(s: s): interpret<Iso, s, s>
    <const s extends any.object>(s: s): interpret<Iso, s, s>
    <s extends any.primitive>(s: s): interpret<Iso, s, s>
  }
}

declare const Iso: IsoConstructor



type Option<type> = Some<type> | None
interface Some<type> { _tag: "Some", value: type }
interface None { _tag: "None" }

declare namespace Option {
  export { infer_ as infer }
  type infer_<type> = [type] extends [Option<infer maybe>] ? maybe : never
}

interface Ok<type> { _tag: "Ok", ok: type }
interface Err<type> { _tag: "Err", err: type }
type Result<ok, err> = Ok<ok> | Err<err>
declare namespace Result {
  export { infer_ as infer }
  namespace infer_ {
    type ok<type> = [type] extends [Ok<infer ok>] ? ok : never
    type err<type> = [type] extends [Err<infer err>] ? err : never
  }
}

declare namespace Iso {
  export { any_ as any }
  type any_ = interpret<Iso, any>

  export { infer_ as infer }
  namespace infer_ {
    type left<type> = [type] extends [Iso] ? type["_s"] : never
    type right<type> = [type] extends [Iso] ? type["_a"] : never
  }

  export interface __array__ extends __proto__<any.array> {
    index(ix: number): interpret<Optional, this["_s"], this["_a"][number]>
    findFirst: FindFirst<this>
  }

  export interface __nonempty__ extends __proto__<nonempty.array> {
    indexNonEmpty(ix: number): interpret<Optional, this["_s"], this["_a"][number]>
    findFirstNonEmpty: FindFirstNonEmpty<this>
  }

  export interface __object__ extends __proto__ {
    key(key: string): interpret<Optional, this["_s"], this["_a"][keyof this["_a"]]>
    atKey(key: string): interpret<Lens, this["_s"], Option<this["_a"][keyof this["_a"]]>>
  }

  export interface __option__ extends __proto__<Option<unknown>> {
    some(): interpret<Prism, this["_s"], Option.infer<this["_a"]>>
  }

  export interface __result__ extends __proto__<Result<unknown, unknown>> {
    ok(): interpret<Prism, this["_s"], Result.infer.ok<this["_a"]>>
    err(): interpret<Prism, this["_s"], Result.infer.err<this["_a"]>>
  }

  export interface __proto__<a = unknown, s = unknown> extends as<a, s> {
    URI: "makelens/Iso"
    asLens(): interpret<Lens, this["_s"], this["_a"]>
    asPrism(): interpret<Prism, this["_s"], this["_a"]>
    asOptional(): interpret<Optional, this["_s"], this["_a"]>
    asTraversal(): interpret<Traversal, this["_s"], this["_a"]>
    compose<b>(other: Iso): interpret<Iso, this["_s"], b>
    composeLens<b>(lens: interpret<Lens, this["_a"], b>): interpret<Lens, this["_s"], b>
    composePrism<b>(prism: interpret<Prism, this["_a"], b>): interpret<Prism, this["_s"], b>
    composeOptional<b>(optional: interpret<Optional, this["_a"], b>): interpret<Optional, this["_s"], b>
    composeTraversal<b>(traversal: interpret<Traversal, this["_a"], b>): interpret<Traversal, this["_s"], b>
    fromNullable(): interpret<Prism, this["_s"], NonNullable<this["_a"]>>
    reverse(): interpret<Iso, this["_a"], this["_s"]>
    modify<b>(fn: (a: this["_a"]) => b): (s: this["_s"]) => this["_s"]
    prop<prop extends keyof this["_a"]>(prop: prop): interpret<Lens, this["_s"], this["_a"][prop]>
    pick<const props extends any.array<any.keyof<this["_a"]>>>(...props: props): interpret<Lens, this["_s"], pick<props, this["_a"]>>
    filter: Filter<this>
    imap<b>(to: (a: this["_a"]) => b, from: (b: b) => this["_a"]): interpret<Iso, this["_s"], b>
    // modifyF: ModifyF<this>
    // traverse<T extends URIS>(T: Traversable1<T>): <S, A>(sta: Iso<S, Kind<T, A>>) => Traversal<S, A>
  }

  interface Filter<type extends sa> {
    <target extends type["_a"]>(guard: any.typeguard<type["_a"], target>): interpret<Prism, type["_s"], target>
    <arbitrary>(guard: any.typeguard<type["_a"], arbitrary>): interpret<Prism, type["_s"], arbitrary>
    (predicate: some.predicate<type["_a"]>): interpret<Prism, type["_s"], type["_a"]>
  }

  interface FindFirstNonEmpty<type extends sa<unknown, nonempty.array>> extends FindFirst<type> { }
  interface FindFirst<type extends sa<unknown, any.array>> {
    <target extends type["_a"][number]>(guard: any.typeguard<type["_a"][number], target>): interpret<Optional, type["_s"], target>
    <arbitrary>(guard: any.typeguard<type["_a"], arbitrary>): interpret<Optional, type["_s"], arbitrary>
    (predicate: some.predicate<type["_a"]>): interpret<Optional, type["_s"], type["_a"]>
  }
}

declare const Lens: LensConstructor
interface LensConstructor { }
interface Lens extends Lens.__proto__ {
  get(s: this["_s"]): this["_a"]
  set(a: this["_a"]): (s: this["_s"]) => this["_s"]
}

declare namespace Lens {
  export { infer_ as infer }
  namespace infer_ {
    type left<type> = [type] extends [Lens] ? type["_s"] : never
    type right<type> = [type] extends [Lens] ? type["_a"] : never
  }
  export interface __proto__ extends sa { }
}

declare const Prism: PrismConstructor
interface PrismConstructor { }
interface Prism extends Prism.__proto__ {
  getOption(s: this["_s"]): Option<this["_a"]>
  reverseGet(a: this["_a"]): this["_s"]
}

declare namespace Prism {
  export { infer_ as infer }
  namespace infer_ {
    type left<type> = [type] extends [Prism] ? type["_s"] : never
    type right<type> = [type] extends [Prism] ? type["_a"] : never
  }

  export interface __proto__ extends sa { }
}

declare const Optional: OptionalConstructor
interface OptionalConstructor { }
interface Optional extends Optional.__proto__ {
  getOption(s: this["_s"]): Option<this["_a"]>
  set(a: this["_a"]): (s: this["_s"]) => this["_a"]
}


declare namespace Optional {
  namespace infer {
    type left<type> = [type] extends [Optional] ? type["_s"] : never
    type right<type> = [type] extends [Optional] ? type["_a"] : never
  }

  interface __proto__ extends sa {
  }
}

export interface ModifyF<S, A> {
  // <F extends URIS3>(F: Applicative3<F>): <R, E>(f: (a: A) => Kind3<F, R, E, A>) => (s: S) => Kind3<F, R, E, S>
  // <F extends URIS2>(F: Applicative2<F>): <E>(f: (a: A) => Kind2<F, E, A>) => (s: S) => Kind2<F, E, S>
  // <F extends URIS2, E>(F: Applicative2C<F, E>): (f: (a: A) => Kind2<F, E, A>) => (s: S) => Kind2<F, E, S>
  // <F extends URIS>(F: Applicative1<F>): (f: (a: A) => Kind<F, A>) => (s: S) => Kind<F, S>
  // <F>(F: Applicative<F>): (f: (a: A) => HKT<F, A>) => (s: S) => HKT<F, S>
}

declare const Traversal: TraversalConstructor
interface TraversalConstructor { }
interface Traversal extends Traversal.__proto__ {
  modifyF: ModifyF<this["_s"], this["_a"]>
}

declare namespace Traversal {
  namespace infer {
    type left<type> = [type] extends [Traversal] ? type["_s"] : never
    type right<type> = [type] extends [Traversal] ? type["_a"] : never
  }

  interface __proto__ extends sa {
  }
}


const thing = [
  Iso.identity<{ abc: 123 }>().prop("abc"),
  Iso.identity(),
  Iso.identity<1>().asTraversal(),
  Iso.identity<[1, 2?, 3?]>().prop(1),
  Iso.identity<[1, 2, 3]>().indexNonEmpty(2),
] as const
