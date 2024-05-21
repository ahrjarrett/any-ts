import type { any } from "../any/exports.js"
import type { never } from "../never/exports.js"
import type { mut } from "../mutable/exports.js"
import type { empty } from "../empty/empty.js"
import type { nonempty } from "../nonempty/nonempty.js"
import type { traversable } from "../traversable/traversable.js"
import type { Union } from "../union/exports.js"
import type { Err } from "../err/exports.js"
import type { some } from "../exports.js"

type Tree<type> = {
  value: type
  children: readonly Tree<type>[]
}

declare namespace impl {
  type splitPath<acc extends any.array, type extends string, delimiter extends any.showable>
    = Union.is<delimiter> extends true ? Fn.return<typeof Err.NonUnion<delimiter>>
    : type extends empty.string ? acc
    : type extends `${infer head}${delimiter}${infer tail}`
    ? impl.splitPath<[...acc, head], tail, delimiter>
    : [...acc, type]
    ;
  type joinTrees<acc, trees extends any.array>
    = trees extends empty.array ? acc
    : trees extends nonempty.array<infer head, infer tail>
    ? joinTrees<joinRight<acc, head>, tail>
    : never.illegal_state<"unhandled case in `impl.joinTrees`">
    ;
}

type splitPath<path extends string, delimiter extends any.showable> = impl.splitPath<[], path, delimiter>
type splitPaths<paths extends any.array<string>, delimiter extends any.showable>
  = { [ix in keyof paths]: splitPath<paths[ix], delimiter> }

type joinRight<left, right> = never.as.identity
  | [right] extends [never] ? left
  : [right] extends [any.primitive] ? right
  : [left] extends [any.primitive] ? right
  : { [ix in keyof left | keyof right]
    : joinRight<
      ix extends keyof left ? left[ix] : never,
      ix extends keyof right ? right[ix] : never
    >
  }

type fromPaths<delimiter extends any.showable, type extends any.array<any.string>>
  = splitPaths<type, delimiter> extends any.arrayOf<any.array<string>, infer split>
  ? { [ix in keyof split]: traversable.unfold<split[ix], {}> } extends any.list<infer trees>
  ? impl.joinTrees<unknown, trees>
  : never.close.inline_var<"trees">
  : never.close.inline_var<"split">
  ;

export namespace object {
  export type valuesOf<type> = type extends any.array ? type[number] : type[keyof type]

  export const toArray = <const T extends any.enumerable>(contiguous: T): any.array<valuesOf<T>> => {
    if (Array.isArray(contiguous)) return contiguous
    let ix = 0;
    let out: mut.array = []
    while (ix in contiguous) out.push(contiguous[ix++])
    return out as never
  }

  export function map<K extends string, A, B>(
    obj: { [k in K]: A },
    fn: (a: A, k: K) => B
  ): { [k in K]: B };
  export function map<K extends string, A, B>(
    fn: (a: A, k: K) => B
  ): (object: { [k in K]: A }) => { [k in K]: B };
  export function map<K extends string, A, B>(
    ...args:
      | [fn: (a: A, k: K) => B]
      | [object: { [k in K]: A }, fn: (a: A, k: K) => B]
  ) {
    if (args.length === 1) {
      const [fn] = args
      return (object: { [k in K]: A }) => map(object, fn)
    }
    else {
      const [object, fn] = args
      let out: Record<string, B> = {}
      for (const k in object) out[k] = fn(object[k], k)
      return out
    }
  }

  /** 
   * {@link hasNaturalIndex `hasNaturalIndex`} checks whether an object's
   * index signature is "contiguous", i.e. whether or not it could be 
   * losslessly converted into an array.
   * 
   * Is said to have a "natural" index because its indices are all
   * {@link https://en.wikipedia.org/wiki/Natural_number natural numbers}.
   * 
   * @example
   *  hasNaturalIndex([1,2,3]) // true
   *  hasNaturalIndex({ 0: "Mon", 1: "Tue", 2: "Wed", 3: "Thu", 4: "Fri" }) // true
   *  hasNaturalIndex({ 1: "one", 2: "two", 3: "three" }) // false
   *  hasNaturalIndex({ 0: true, 1: false, kind: "boolean" }) // false
   */
  export const hasNaturalIndex
    : some.predicate<object>
    = (object) => {
      /** 
       * Optimization: If `object` is already an array, short-circuit to avoid 
       * doing unnecessary work / preserve the original reference
       */
      if (Array.isArray(object)) return true
      let ix = 0
      const max = globalThis.Object.keys(object).length
      if (max === 0) return false
      while (ix < max)
        if (!(ix++ in object)) return false
      return true
    }
}

export declare namespace Tree {
  type pathable<
    type extends
    | empty.path | Tree.nonempty
    = empty.path | Tree.nonempty
  > = type

  type nonempty<
    last = any.nonnullable,
    lead extends any.path = any.path
  > = readonly [...lead, last]

  type shift<xs extends Tree.pathable>
    = xs extends readonly [any.index<infer head>, ...Tree.pathable<infer tail>]
    ? any.two<head, tail>
    : never

  type go<paths extends Tree.pathable | any.array<Tree.pathable>>
    = Tree.breadthFirst<paths extends Tree.pathable ? paths : paths[number]>

  type breadthFirst<xs extends Tree.pathable>
    = [xs] extends [any.one] ? xs[0]
    : ({ [e in Tree.shift<xs> as e[0]]: Tree.breadthFirst<e[1]> })
}
export namespace Tree {
  export type fromPaths<paths extends Tree.pathable | any.array<Tree.pathable>>
    = mut<Tree.go<paths>>;

  const isKeyable = (u: unknown): u is any.index => ["number", "string", "symbol"].includes(typeof u)
  const isObject = (u: unknown): u is any.dict => typeof u === "object" && u !== null

  function has<k extends any.index>(k: k): any.typeguard<any.type, any.indexedBy<k>>
  function has<k extends any.index, v>(k: k, guard: any.guard<v>): any.typeguard<any.type, { [p in k]: v }>
  function has<k extends any.index>(k: k, guard = (u: any.type): u is typeof u => true) {
    return (u: any.type) => isObject(u) && k in u && guard(u[k])
  }

  /**
   * Helper that allows {@link fromHandlers `fromHandlers`} to be
   * tail-recursive without sacrificing readability.
   *
   * The `k` in the signature is shorthand for "continuation"; see also:
   * {@link https://en.wikipedia.org/wiki/Continuation-passing_style continuation passing style}.
   */
  const loop: <a, b>(f: (a: a, k: (a: a) => b) => b) => (a: a) => b = (f) => (a) => {
    const next = (a_: typeof a) => f(a_, next)
    return f(a, next)
  }

  export function fromPaths<const paths extends any.array<pathable>>(paths: paths): Tree.fromPaths<paths>
  export function fromPaths<const paths extends any.array<pathable>>(paths: paths) {
    const go = loop<any.array<pathable>, any>((xss, continuation) => {
      let out: Record<keyof any, any> = {}
      for (const xs of xss) {
        const [hd, ...tl] = xs
        if (xs.length === 1) return hd
        else if (!isKeyable(hd)) return hd
        else if (has(hd, Array.isArray)(out)) out[hd]?.push(tl)
        else out[hd] = [tl]
      }
      if (object.hasNaturalIndex(out)) return object.toArray(out).map(continuation)
      else return object.map(out, continuation)
    })
    return go(paths)
  }
}

declare namespace Fn {
  export type arg0<type> = type extends (..._: infer args) => any ? args[0] : never
  type return_<type> = type extends (..._: any) => infer out ? out : never
  export { return_ as return }
}

declare namespace __Spec__ {
  type __fromPaths__ = [
    fromPaths<".", ["a.b.c", "a.b.d", "b.f.l"]>
  ]

  type __splitPath__ = [
    splitPath<"", ".">,
    splitPath<"", "">,
    splitPath<".", ".">,
    splitPath<"abc", "abc.">,
    splitPath<"abc.def.ghi.jkl", ".">,
  ]
}

// function fromPaths<delimiter extends any.showable, const paths extends any.array<any.string>>(
//   delimiter: delimiter,
//   ...paths: paths
// ): fromPaths<delimiter, paths>
// function fromPaths(delimiter: any.showable, ...paths: any.array<any.string>): unknown {
//   const ps = paths.map(path => `${path}`.split(`${delimiter}`))
//   const go
//     : (paths: any.array<any.array<string>>) => any.array<Tree<string>>
//     = (paths) => {
//       if (paths[0] && paths[0].length === 0) return []
//       else {
//         const branches = paths.reduce(
//           (acc, [head, ...tail]) => !head ? acc : ({
//             ...acc,
//             [head]: [...(acc[head as never] ? acc[head as never] : [tail])]
//           }),
//           {}
//         )
//         return Object.entries(branches).map(([k, v]) => make(k, go(v as never)))
//       }
//     }
//   return unmake(make("tmp", go(ps))).tmp
// }
// const make
//   : <const value, const children extends any.array>(value: value, children: children) => { value: value, children: children }
//   = (value, children) => ({ value, children })
// const unmake
//   : <const type extends any.showable>(tree: Tree<type>) => { [ix in `${type}`]: {} }
//   = (tree) => ({ [`${tree.value}`]: tree.children.map(unmake).reduce((acc, curr: any.object) => ({ ...acc, ...curr }), {}) }) as never
