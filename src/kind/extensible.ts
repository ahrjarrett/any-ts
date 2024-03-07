export {
  type Ext,
  type Guard,
  type guard,
  type Negate,
  type Extensible,
  type Extractable,
  type Intersectable,
}

import type { any } from "../any-namespace"
import type { Kind } from "./kind"
import type { variance } from "../variance/variance"

/**
 * Credit goes to Kristian Notari for figuring out how to get this to work 🎉
 * https://github.com/kristiannotari
 *
 * An example of a possible use case is below:
 * 
 * @example
 *  import type { Ext } from "any-ts"
 * 
 *  // {@link not `not`} accepts an arbitrary predicate, and returns a 
 *  // new predicate with the logic inverted 
 *  //
 *  // So if the function you give it would have returned `true` for a
 *  // certain input, it will now also return `false`.
 *  //
 *  // The runtime logic for that operation is trivial. The thing that
 *  // makes this combinator innovative is that if you give it a type-guard,
 *  // _it also inverts the logic at the type-level_.
 *  function not<fn extends Ext.Extensible<any>>(fn: fn): Ext.Negate<fn>
 *  function not<from, to extends from>(fn: any.typeguard<from, to>): Ext.Negate<Ext.extend<from, to>>
 *  function not<type>(fn: some.predicate<type>): some.predicate<type>
 *  function not(fn: Ext.Extensible<any> | any.typeguard | any.predicate) { return (u: unknown) => !(fn)(u) }
 * 
 *  const isNullable = (u: unknown): u is any.nullable => u == null
 * 
 *  declare const maybeDef456: 
 *    | { def: 456 }
 *    | null 
 *    | undefined 
 *
 *  if(not(isNullable)(maybeDef456)) { 
 *    maybeDef456 
 *    // ^? const maybeDef456: { def: 456 } 😌
 *  }
 */
type Extensible<from = never> =
  | Intersectable<from>
  | Extractable<from>
  ;

interface Intersectable<in from = never> extends Kind<[
  source: null | undefined | any.nonnullable,
  from: variance.contra<from>,
]> {
  <source extends from>(x: source): x is Ext.intersect<this, source>
  [-1]: any.nonnullable | null | undefined
}

interface Extractable<in from = never> extends Kind<[
  source: null | undefined | any.nonnullable,
  from: variance.contra<from>,
]> {
  <source extends from>(x: source): x is Ext.extract<this, source>
  [-1]: any.nonnullable | null | undefined
}

type guard<from, to> = never | Guard<[from, to]>
interface Guard<pair extends any.two> extends Extractable<pair[0]> {
  <source extends pair[0]>(input: source | pair[1]): input is pair[1]
  [-1]: pair[1]
}

interface Negate<fn extends Extensible<any>> extends Extractable<Ext.from<fn>> { [-1]: Ext.negate<this, fn> }

declare namespace Ext {
  export type bind<fn extends Extensible, source> = fn & { [0]: source }
  export type call<fn extends Extensible, source> = bind<fn, source>[-1]
  export type apply<fn extends Extensible, source> = [call<fn, source>] extends [infer target] ? target : never
  export type intersect<fn extends Intersectable, source> = source & apply<fn, source>
  export type extract<fn extends Extractable, source> = Extract<apply<fn, source>, source>
  export type narrow<fn extends Extensible, source> = source & apply<fn, source>
  export type negate<negate extends Extensible, fn extends Extensible> = Exclude<negate[0], Ext.narrow<fn, negate[0]>>
  export type from<fn extends Extensible> = Exclude<fn[1], undefined> extends variance.contra<infer type> ? type : never
  type extend_<from = unknown, target = unknown> = never | guard<from, target>
  export { extend_ as extend, guard, }
}
