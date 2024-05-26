import type { any } from "../any/exports.js"
import type { some } from "../some.js"
import type { evaluate } from "../evaluate/exports.js"

export declare namespace object {
  type filterValues<T, Bound> = filter.values<T, Bound>
  type filterKeys<T, Bound extends any.index> = filter.keys<T, Bound>
  type fromKeys<T extends any.keys> = never | { [K in T[number]]: K }
}

/** @experimental */
export declare namespace signature {
  /** @experimental */
  type filter = {
    <A, B>(guard: any.typeguard<A, B>): <const T extends any.dict<A>>(object: T) => filter.values<T, B>
    <A>(predicate: some.predicate<A>): <const T extends any.dict<A>>(object: T) => filter.values<T, A>
    <A, B, const T extends any.dict<A>>(object: T, guard: any.typeguard<A, B>): filter.values<T, B>
    <A, const T extends any.dict<A>>(object: T, predicate: some.predicate<A>): filter.values<T, A>
  }

  /** @experimental */
  type filterKeys = {
    <A extends any.index, B extends any.index>(guard: any.typeguard<A, B>): <const T extends any.indexedBy<A>>(object: T) => filter.keys<T, B>
    <A extends any.index>(predicate: some.predicate<A>): <const T extends any.indexedBy<A>>(object: T) => filter.keys<T, A>
    <A extends any.index, B extends any.index, const T extends any.indexedBy<A>>(object: T, guard: any.typeguard<A, B>): filter.keys<T, B>
    <A extends any.index, const T extends any.indexedBy<A>>(object: T, predicate: some.predicate<A>,): filter.keys<T, A>
  }
}

export declare namespace filter {
  type keys<t, bound extends any.index> = never |
    evaluate<
      & filter.keys.satisfy<t, bound>
      & filter.keys.partiallySatisfy<t, bound>
      & filter.keys.mightSatisfy<t, bound>
    >

  namespace keys {
    type satisfy<t, bound extends any.index> = never |
      { -readonly [k in keyof t as filter.allSatisfy<k, bound> extends true ? k : never]: t[k] }
    type partiallySatisfy<t, bound extends any.index> = never |
      { -readonly [k in keyof t as filter.partiallySatisfy<k, bound> extends true ? k : never]: t[k] }
    type mightSatisfy<t, bound extends any.index> = never |
      { -readonly [k in keyof t as filter.mightSatisfy<k, bound> extends true ? k : never]: t[k] }
  }

  type values<t, bound> = never |
    evaluate<
      & filter.values.satisfy<t, bound>
      & filter.values.partiallySatisfy<t, bound>
      & filter.values.mightSatisfy<t, bound>
    >

  namespace values {
    type satisfy<t, bound> = never |
      { -readonly [k in keyof t as filter.allSatisfy<t[k], bound> extends true ? k : never]: t[k] }
    type partiallySatisfy<t, bound> = never |
      { -readonly [k in keyof t as filter.partiallySatisfy<t[k], bound> extends true ? k : never]+?: t[k] }
    type mightSatisfy<t, bound> = never |
      { -readonly [k in keyof t as filter.mightSatisfy<t[k], bound> extends true ? k : never]+?: filter.cast<t[k], bound> }
  }

  type cast<type, invariant, distribute = never>
    = [distribute] extends [never]
    ? (type extends invariant ? type : never) extends infer narrow
    ? [narrow] extends [never] ? invariant
    : narrow
    : never
    : type extends type ? filter.cast<type, invariant, never>
    : never
    ;

  type allSatisfy<t, bound>
    = (
      bound extends bound
      ? (t extends t & bound ? t : never) extends infer out
      ? out
      : never
      : never
    ) extends infer out
    ? [t, out] extends [out, t] ? true
    : false
    : never
    ;

  type partiallySatisfy<t, bound>
    = filter.allSatisfy<t, bound> extends true ? false
    : [bound extends bound ? (t extends bound ? true : never) : never] extends [never] ? false
    : true
    ;

  type mightSatisfy<t, bound>
    = [t] extends [bound] ? never
    : [t extends t ? (bound extends t ? true : never) : never] extends [never] ? false
    : true
    ;
}
