import * as F from "free-types"
import * as L from "type-lenses"
import { any, empty, nonempty, some } from "../exports"


declare namespace junk {
  type traverse<tree, path extends any.path> = impl.traverse<tree, path, { history: [], structure: tree }>
  type _5 = traverse<{ a: { b: { c: 1 }, d: 2 } }, ["a", "b", "z"]>
  //   ^?
  type defined<type> = [type] extends [undefined] ? never : type
  interface Type<args extends { [0]?: unknown, [1]?: unknown, [2]?: unknown } = { [0]?: unknown, [1]?: unknown, [2]?: unknown }> {
    [-2]: this
    [-1]: unknown
    "...": args
    [0]: defined<args[0]>
    [1]: defined<args[1]>
    [2]: defined<args[2]>
  }
  interface Focus extends Type<{ 0: unknown, 1: any.path }> {
    // [uri.this]: this[0]
    // [uri.prev]: this[1]
    [-1]: traverse<this[0], this[1]>
  }
  type eval<type> = never | ({ [ix in keyof type]: type[ix] })
  type apply<fn extends Type, args extends fn["..."]> = never | (fn & { 0: args[0], 1: args[1] })
  type _5 = eval<apply<Focus, [{ a: { b: { c: 123 } } }, ["a", "b"]]>>
  interface TypeConstructor<type, prev extends { [x: number]: unknown }> extends Type<prev> {
    [uri.this]: this
    [uri.curr]: type
    [uri.prev]: prev
    // map<b>(fn: (a: type) => b): TypeConstructor
  }
}

type _0 = F.StructFromUnion

declare namespace uri {
  export type curr = typeof uri.curr
  export const curr: unique symbol
  export type prev = typeof uri.prev
  export const prev: unique symbol
  export type this_ = typeof uri.this_
  export const this_: unique symbol
  export { this_ as this }
}

declare const TypeConstructor: TypeConstructorConstructor

type head<type extends nonempty.array> = type[0]
type tail<type extends nonempty.array>
  = type extends readonly [] ? readonly [] : type extends readonly [any, ...infer tail] ? tail : never
type lead<type extends any.array> = type extends readonly [...infer lead, any] ? lead : never
type last<type extends any.array> = type extends readonly [...any, infer last] ? last : never

type behead<type extends nonempty.array> = type extends readonly [infer head, ...infer tail] ? readonly [head: head, tail: tail] : never
type dequeue<type extends nonempty.array> = type extends readonly [...infer lead, infer last] ? readonly [lead: lead, last: last] : never

interface TypeConstructorConstructor {
  id<const type = never>(): TypeConstructor<type>
  id<const type>(type: type): TypeConstructor<type>
  from<const args extends nonempty.array>([head, ...tail]: args): TypeConstructor<head<args>, tail<args>>
  from<input extends any.array, output>(fn: some.function<input, output>): TypeConstructor<some.function<input, output>>
}

interface Ok<ok> { tag: "Ok", ok: ok }
interface Err<err> { tag: "Err", err: err }
type Result<ok, err> = Ok<ok> | Err<err>

type Params<
  focus = unknown,
  tried extends any.key = any.key,
  breadcrumbs extends any.path = any.path,
  structure = unknown
> = never | [𝐬𝐭𝐫𝐮𝐜𝐭𝐮𝐫𝐞: structure, 𝐛𝐫𝐞𝐚𝐝𝐜𝐫𝐮𝐦𝐛𝐬: breadcrumbs, 𝐟𝐨𝐜𝐮𝐬: focus, 𝐭𝐫𝐢𝐞𝐝: tried]

declare namespace TypeError {
  interface PathNotFound<params extends Params>
    extends Err<{
      tag: "SegmentNotFound"
      focus: params[0]
      segment: params[1]
      history: params[2]
    }> { }
}

declare namespace impl {
  type traverse<tree, path extends any.path, meta extends { history: any.path, structure: unknown }>
    = path extends empty.array ? Ok<tree>
    : path extends nonempty.arrayof<any.key, any.keyof<tree, infer head>, infer tail>
    ? traverse<tree[head], tail, { history: [...meta["history"], head], structure: meta["structure"] }>
    : TypeError.PathNotFound<Params<tree, head<path>, meta["history"], meta["structure"]>>
    ;
}

type traverse<tree, path extends any.path> = impl.traverse<tree, path, { history: [], structure: tree }>

type _5 = traverse<{ a: { b: { c: 123 } } }, ["a", "b", "z"]>

declare const History: HistoryConstructor
interface HistoryConstructor<prev extends any.array = []> {
  <const next>(next: next): History<next, prev>
}

const _1 = History(123)(456)(789)

interface History<type, prev extends any.array = []> {
  <const next>(next: next): History<next, [...prev, ...([type] extends [never] ? [] : [type])]>
  concat: HistoryConstructor<[...prev, ...([type] extends [never] ? [] : [type])]>
}

declare const Focus: FocusConstructor
interface FocusConstructor {
  of<const structure extends {} = never>(): Focus<structure, []>
  of<const structure extends {}>(structure: structure): Focus<structure, []>
}

interface Storage<type = {}> { [0]: type }

interface Focus<structure extends {} = {}, breadcrumbs extends any.path = []> extends Storage {
  [-3]: breadcrumbs
  [-2]: structure
  get [-1](): traverse<this[-2], this[-3]>
  dig<prop extends focusedProps<this>>(prop: prop): Focus<this[-2], [...this[-3], prop]>
  pop(): Focus<this[-2], Extract<lead<this[-3]>, any.path>>
  get forget(): this[-1]
}

type focusedProps<self extends { [-1]: unknown }>
  = self[-1] extends Ok<infer ok>
  ? ok extends any.primitive ? never
  : any.key & keyof ok
  : never
  ;

const focus = Focus.of({ a: { b: { c: 123 }, d: 456 } }).dig("a").dig("b").pop().dig("d")

// interface Focus {
//   "𝐭𝐫𝐲𝐢𝐧𝐠": head<Extract<this[1], any.path>>
//   [-1]: traverse<this[0], Extract<this[1], any.path>>
//   [0]: unknown
//   [1]: unknown
// }

type eval<type> = never | { [ix in keyof type]: type[ix] }
type apply<fn extends Focus, tree, path extends any.path> = (fn & { 0: tree, 1: path })

type _6 = eval<apply<Focus, { a: { b: { c: 123 } } }, ["a", "b"]>>

