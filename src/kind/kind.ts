export {
  type kind as Kind,
  type Kind as kind__internal
}

import type { any, _ } from "../any"
import { Err } from "../err/exports"
import { Union } from "../union/exports"

declare namespace kind {
  export {
    kind as new,
  }
  export {
    apply,
    apply$,
    bind,
    bind$,
    partial,
    partiallyApply,
  }
}

/** 
 * Yet another HKT encoding 🫠
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
 * by the author of one HKT library, although this coment might have been inconvenient for a
 * different reason 🤔
 * 
 * @example
 *  import type { Kind } from "any-ts"
 * 
 *  // shorthand for declaring a unary function, stolen from `free-types` by @geoffreytools
 *  interface Duplicate extends Kind.new<1> { 
 *    // since there can only be one "return value", it lives at index `-1`:
 *    [-1]: [this[0], this[0]] // accessing `this[1]` raises a type error, since this kind is unary
 *  }
 *  
 *  // constrains the first argument to a string
 *  interface Capitalize extends Kind.new<[string]> {
 *    [-1]: globalThis.Capitalize<this[0]>  // we can use `this[0]` as a string in the body of the function
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
type satisfies<type> = { [ix in Extract<keyof type, `${number}`>]: type[ix] }
type identity<type> = type
type nonunion<type> = [Union.is<type>] extends [true] ? ReturnType<typeof Err.NonUnion> : unknown

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
  interface A10 { [10]: [_, _, _, _, _, _, _, _, _, _] }
  interface params extends A00, A01, A02, A03, A04, A05, A06, A07, A08, A09, A10 { }
  interface prev { [0]: 0, [1]: 0, [2]: 1, [3]: 2, [4]: 3, [5]: 4, [6]: 5, [7]: 6, [8]: 7, [9]: 8, [10]: 9 }
  interface slots { [0]: Fn1, [1]: Fn2, [2]: Fn3, [3]: Fn4, [4]: Fn5, [5]: Fn6, [6]: Fn7, [7]: Fn8, [8]: Fn9, [9]: Fn10 }
}

type slots<arity extends Arity> = cached.slots[cached.prev[arity]]

type Arity = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
interface Scope { 0?: _, 1?: _, 2?: _, 3?: _, 4?: _, 5?: _, 6?: _, 7?: _, 8?: _, 9?: _ }

type bind<fn extends Kind, args extends satisfies<fn>> = never | (fn & structured<args>)
type apply<fn extends Kind, args extends satisfies<fn>> = bind<fn, args>[-1]
type partial<fn extends Kind, args extends Partial<satisfies<fn>>> = never | (fn & structured<args>)
type partiallyApply<fn extends Kind, args extends Partial<satisfies<fn>>> = partial<fn, args>[-1]

/** 
 * {@link bind$ `bind$`} is a variant of {@link bind `bind`} that does not typecheck {@link args `args`}
 * against the signature of {@link fn `fn`}.
 * 
 * The `$` sigil here has been appended to indicate that this is the "less strict" variant when compared
 * to its unpostfixed cousin, and is provided as an escape hatch.
 * 
 * This pattern (postfixing the `$` sigil to mark an escape hatch) is a convention used across the
 * `any-ts` project.
 */
type bind$<fn extends Kind, args extends any.array | Scope> = never | (fn & structured<args>)
/** 
 * {@link apply$ `apply$`} is a variant of {@link apply `apply`} that does not typecheck {@link args `args`}
 * against the signature of {@link fn `fn`}.
 * 
 * The `$` sigil here has been appended to indicate that this is the "less strict" variant when compared
 * to its unpostfixed cousin, and is provided as an escape hatch.
 * 
 * This pattern (postfixing the `$` sigil to mark a more permissive variant or an escape hatch) is a 
 * convention used across the `any-ts` project.
 */
type apply$<fn extends Kind, args extends any.array | Scope> = bind$<fn, args>[-1]


/** @internal */
interface Kind<scope = Scope> extends Mutable<scope & {}> { [-1]: unknown }

/** @internal */
/** @ts-expect-error - we do extra checks on `type` to make sure `type` is not a union */
interface Mutable<type extends {}> extends identity<type> { }
