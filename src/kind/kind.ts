export type {
  kind as Kind,
  Kind as $$,
  Scope,
}

import type { never } from "../semantic-never/exports"
import type { any } from "../any/exports"
import type { _ } from "../util"
import type { Err } from "../err/exports"
import type { Union } from "../union/exports"
import type { nonempty } from "../empty"

declare namespace kind {
  /** namespace exports */
  export {
    kind as new,
    Fold as fold,
    Reduce as reduce,
  }
  /** aliased exports */
  export {
    inferConstraints as infer,
  }
  /** direct exports */
  export {
    apply,
    apply$,
    bind,
    bind$,
    check,
    constraintsOf,
    partial,
    partiallyApply,
    satisfies,
  }
}

interface Fn1 { [0]: _ }
interface Fn2 { [0]: _, [1]: _ }
interface Fn3 { [0]: _, [1]: _, [2]: _ }
interface Fn4 { [0]: _, [1]: _, [2]: _, [3]: _ }
interface Fn5 { [0]: _, [1]: _, [2]: _, [3]: _, [4]: _ }
interface Fn6 { [0]: _, [1]: _, [2]: _, [3]: _, [4]: _, [5]: _ }
interface Fn7 { [0]: _, [1]: _, [2]: _, [3]: _, [4]: _, [5]: _, [6]: _ }
interface Fn8 { [0]: _, [1]: _, [2]: _, [3]: _, [4]: _, [5]: _, [6]: _, [7]: _ }
interface Fn9 { [0]: _, [1]: _, [2]: _, [3]: _, [4]: _, [5]: _, [6]: _, [7]: _, [8]: _ }
interface Fn10 { [0]: _, [1]: _, [2]: _, [3]: _, [4]: _, [5]: _, [6]: _, [7]: _, [8]: _, [9]: _ }

/** @internal */
declare namespace cached {
  interface A00 { [0]: [] }
  interface A01 { [1]: [_] }
  interface A02 { [2]: [_, _] }
  interface A03 { [3]: [_, _, _] }
  interface A04 { [4]: [_, _, _, _] }
  interface A05 { [5]: [_, _, _, _, _] }
  interface A06 { [6]: [_, _, _, _, _, _] }
  interface A07 { [7]: [_, _, _, _, _, _, _] }
  interface A08 { [8]: [_, _, _, _, _, _, _, _] }
  interface A09 { [9]: [_, _, _, _, _, _, _, _, _] }
  interface params extends A00, A01, A02, A03, A04, A05, A06, A07, A08, A09 { }
  interface prev { [0]: 0, [1]: 0, [2]: 1, [3]: 2, [4]: 3, [5]: 4, [6]: 5, [7]: 6, [8]: 7, [9]: 8, [10]: 9 }
  interface slots { [0]: Fn1, [1]: Fn2, [2]: Fn3, [3]: Fn4, [4]: Fn5, [5]: Fn6, [6]: Fn7, [7]: Fn8, [8]: Fn9, [9]: Fn10 }
}

/** 
 * ### {@link kind `Kind`}
 * 
 * - {@link https://stackblitz.com/edit/hkt?file=src%2Fkind.ts Sandbox}
 * - {@link https://tsplay.dev/WzqD2m TypeScript playground}
 * 
 * ### Problem statement
 * 
 * What problem(s) does the 
 * {@link https://github.com/ahrjarrett/any-ts `any-ts`} encoding attempt to solve?
 * 
 * > _Problem:_ current HKT encodings require constraints to be applied "after the fact" 
 * (inside the body of the HKT), rather than at the declaration site; this has historically 
 * led to drift, and makes their APIs awkward to use and difficult to grok
 * 
 * > _Problem:_ because arguments are applied _by name_ rather than _by position_, every
 * new HKT encoding increases the fragmentation of the ecosystem, making the interop
 * story a nightmare (and again, DX suffers).
 * 
 * ### Proposition
 * 
 * {@link kind `Kind`} solves both problems by treating
 * constraints and arguments the same: **as simple arrays**.
 *
 * With {@link kind `Kind`}:
 * 
 * 1. constraints are applied positionally, at the time of declaration; and
 * 2. arguments are interpreted positionally, at the time of application.
 *  
 * As it turns out, taking this approach gives us something else for free: since an argument's
 * position corresponds 1:1 with its address, we're also able to _apply_ arguments using an array, 
 * which, since that's how arguments are typically applied in JavaScript, feels comfy and quite
 * natural, even for those without much experience with type-level programming.
 * 
 * @example
 *  import type { Kind } from "any-ts"
 * 
 *  // shorthand for declaring a unary function, stolen from `free-types` by @geoffreytools
 *  interface Duplicate extends Kind<1> { 
 *    // since there can only be one "return value", it lives at index `-1`:
 *    [-1]: [this[0], this[0]] // accessing `this[1]` raises a type error, since this kind is unary
 *  }
 *  
 *  // constrains the first argument to a string
 *  interface Capitalize extends Kind<[string]> {
 *    // Note that we can use `this[0]` _as a string_ in the body of the function:
 *    [-1]: globalThis.Capitalize<this[0]>
 *  }
 */
type kind<params extends nonunion<params> = Scope>
  = [Union.is<params>] extends [true] ? ReturnType<typeof Err.NonUnion>
  : Kind<[params] extends [any.array] ? structured<params>
    : [params] extends [keyof Scope] ? slots<params>
    : params
  >

type parseInt<type extends any.index> = `${type & any.key}` extends `${infer x extends number}` ? x : never;
type structured<type> = never | [type] extends [any.array] ? { [ix in Extract<keyof type, `${number}`> as parseInt<ix>]: type[ix] } : type
type satisfies<type> = never | ({ [ix in Exclude<keyof type, -1>]+?: type[ix] })

type inferConstraints<fn extends Kind>
  = fn extends Kind<infer constraints>
  ? constraints
  : never.close.inline_var<"constraints">
  ;

/**
 * ### {@link check `Kind.check`}
 * ---
 * Given a {@link Kind `Kind`} and a set of arguments, checks that the arguments
 * satisfy the Kind's constraints.
 * 
 * '{}' is assignable to the constraint of type 'P', but 'P' could be instantiated with a different subtype of constraint 'object'.
 * 
 * Because {@link apply `Kind.apply`} (along with {@link bind `Kind.bind`}, 
 * {@link call `Kind.call`}, etc.) requires the user 
 * 
 * introspect the `Kind`
 * 
 * 
 */
type check<fn extends Kind, args extends { [x: number]: unknown }> = args extends satisfies<fn> ? args : never

type identity<type> = type
type nonunion<type> = [Union.is<type>] extends [true] ? ReturnType<typeof Err.NonUnion> : unknown

type slots<arity extends Arity> = cached.slots[cached.prev[arity]]

type Arity = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
interface Scope { 0?: _, 1?: _, 2?: _, 3?: _, 4?: _, 5?: _, 6?: _, 7?: _, 8?: _, 9?: _ }

type bind<fn extends Kind, args extends satisfies<fn>> = never | (fn & structured<args>)
type apply<fn extends Kind, args extends satisfies<fn>> = bind<fn, args>[-1]

type constraintsOf<fn extends Kind, type extends satisfies<fn> = satisfies<fn>> = type

/** 
 * {@link bind$ `Kind.bind$`} is an "escape hatch" variant of {@link bind `Kind.bind`} 
 * that circumvents typechecking.
 * 
 * In most cases, you probably want {@link bind `Kind.bind`}. The use case for 
 * {@link bind$ `Kind.bind$`} is when you're working with higher-kinded types
 * generically (without having much information about the `Kind`) ahead of time.
 * 
 * Without it, you run into the same problem as you sometimes see with regular
 * types, e.g. `'T' is assignable to the constraint of type 'U', but 'U' could 
 * be instantiated with a different subtype of constraint 'object'.`
 */
type bind$<F extends Kind, args extends any.array | Scope> = never | (F & structured<args>)

/** 
 * {@link apply$ `Kind.apply$`} is an "escape hatch" variant of {@link apply `Kind.apply`} 
 * that circumvents typechecking.
 * 
 * In most cases, you probably want {@link apply `Kind.apply`}. The use case for 
 * {@link apply$ `Kind.apply$`} is when you're working with higher-kinded types
 * generically (without having much information about the `Kind`) ahead of time.
 * 
 * Without it, you run into the same problem as you sometimes see with regular
 * types, e.g. `'T' is assignable to the constraint of type 'U', but 'U' could 
 * be instantiated with a different subtype of constraint 'object'.`
 */
type apply$<F extends Kind, args extends any.array | Scope> = bind$<F, args>[-1]

/** 
 * ### Prior art:
 * - the 
 * {@link https://github.com/geoffreytools/free-types-core/blob/master/src/Type.ts#L37-L46 HKT encoding} 
 * that ships with {@link https://github.com/geoffreytools/free-types `free-types`}
 * - {@link https://github.com/arktypeio/arktype `arktype`'s} innovative 
 * {@link https://twitter.com/ssalbdivad/status/1701961436560273747 trait implementation}
 * - the {@link https://en.wikipedia.org/wiki/Tensor-hom_adjunction tensor-hom adjunction} 
 * (isn't this just a special case of curry/uncurry?)
 * 
 * [NOTE (from above)]: In fact, the only attempt I've seen to create a specification was 
 * {@link https://github.com/gvergnaud/hotscript/pull/104#issuecomment-1658588732 roundly ignored}
 * by the author of one HKT library, although this comment might have been inconvenient for a
 * different reason 🤔
 * 
 * @internal 
 */
interface Kind<scope = Scope> extends Mutable<scope & {}> { [-1]: unknown }

/** @internal */
/** @ts-expect-error we do extra checks {@link kind elsewhere} to make sure `type` is not a union */
interface Mutable<type extends {}> extends identity<type> { }

//////////////////
/// DEPRECATED ///
//////////////////
/** @deprecated use {@link kind.bind `Kind.bind`} instead */
type partial<fn extends Kind, args extends Partial<satisfies<fn>>> = never | (fn & structured<args>)
/** @deprecated use {@link kind.apply `Kind.apply`} instead */
type partiallyApply<fn extends Kind, args extends Partial<satisfies<fn>>> = partial<fn, args>[-1]

/**
 * {@link reduce `reduce`}
 * 
 * Fell out of a [conversation with `@MajorLift`](https://github.com/poteat/hkt-toolbelt/issues/59#issuecomment-2018937609) 
 */
type reduce<f extends kind<2>, xs extends any.array, x>
  = xs extends nonempty.array<infer hd, infer tl>
  ? reduce<f, tl, apply$<f, [x, hd]>>
  : x
  ;

/**
 * {@link Reduce `Kind.reduce`}
 * 
 * Fell out of a [conversation with `@MajorLift`](https://github.com/poteat/hkt-toolbelt/issues/59#issuecomment-2018937609) 
 */
interface Reduce<T = _> extends kind<[f: kind<[T, T]>, xs: any.array, x: T]> {
  [-1]: [this[0], this[1], this[2]] extends
  [kind<[T, T]> & infer f extends kind<2>, any.array & any.list<infer xs>, infer x]
  ? reduce<f, xs, x>
  : never
}

/**
 * {@link Fold `Kind.fold`}
 * 
 * Fell out of a [conversation with `@MajorLift`](https://github.com/poteat/hkt-toolbelt/issues/59#issuecomment-2018937609) 
 */
interface Fold<T = _> extends kind<[f: kind<[T, T]>, xs: any.array]> {
  [-1]: [this[0], this[1]] extends
  [kind<[T, T]> & infer f extends kind<2>, any.array & any.list<infer xs>]
  ? xs extends nonempty.array<infer hd, infer tl>
  ? reduce<f, tl, hd>
  : never
  : never
}
