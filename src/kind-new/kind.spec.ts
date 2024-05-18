import type { any } from "../any/exports.js"
import type { _ } from "../util.js"
import type { nonempty } from "../empty.js"
import type { never } from "../never/exports.js"
import type { assert, expect } from "../test/exports.js"

import type {
  Kind,
  Kind2,
  Kind3,
} from "./kind.js"

type pipe<fns extends any.array<Kind>, acc = unknown>
  = [fns] extends [nonempty.array<Kind.infer.one<infer fn>, any.arrayOf<Kind, infer todo>>]
  ? pipe<todo, Kind.apply<fn, acc>>
  : acc


type evaluate<type> = never | { [k in keyof type]: type[k] }

declare namespace kinds {
  namespace binary {
    interface intercalate<delimiter extends any.showable> extends Kind2<[string, string], string> {
      [-1]: `${this[0]}${delimiter}${this[1]}`
    }
  }

  interface identity extends Kind { [-1]: this[0] }
  interface duplicate extends Kind { [-1]: [this[0], this[0]] }
  interface duplicateWithIndex extends Kind<[unknown, any.index]> { [-1]: [this[0][0], this[0][1]] }
  interface show extends Kind<any.showable> { [-1]: `${this[0]}` }
  interface join extends Kind<[any.showable, any.showable]> { [-1]: `${this[0][0]}${this[0][1]}` }
  interface append<type extends any.showable> extends Kind<any.showable> { [-1]: `${this[0]}${type}` }
  interface prepend<type extends any.showable> extends Kind<any.showable> { [-1]: `${type}${this[0]}` }
  interface embed<type extends any.showable> extends Kind<[any.showable, any.showable]> { [-1]: `${this[0][0]}${type}${this[0][1]}` }
  interface range extends Kind<number> { [-1]: functions.range<this[0]> }

  namespace array {
    interface map<fn extends Kind> extends Kind<any.array> {
      [-1]
      : [this[0]] extends [any.array & any.list<infer xs>] ? map.array<fn, xs>
      : never
    }
  }

  namespace object {
    interface map<fn extends Kind> extends Kind<object> {
      [-1]
      : [this[0]] extends [object & infer xs] ? map.object<fn, xs>
      : never
    }
  }

  namespace map {
    export type array<fn extends Kind, xs extends any.array> = { [ix in keyof xs]: Kind.apply<fn, xs[ix]> }
    export type { object_ as object }
    export type object_<fn extends Kind, type> = { [k in keyof type]: Kind.apply<fn, [type[k]]> }
  }
  namespace mapWithIndex {
    export { object_ as object }
    export type object_<fn extends Kind<[unknown, any.index]>, type extends object> = { [k in keyof type]: Kind.apply<fn, [type[k], k]> }
  }

  interface unit<value = unknown> extends Kind<any.index> { [-1]: { [ix in this[0]]: value } }
  interface assign<key extends any.key> extends Kind { [-1]: { [ix in key]: this[0] } }
  interface mergeInto<target> extends Kind { [-1]: evaluate<functions.mergeLeft<target, this[0]>> }

  interface indexBy<tag extends any.key> extends Kind<any.array<any.indexableBy<tag>>> {
    [-1]
    : [this[0]] extends [any.array<any.indexableBy<tag>> & infer xs extends this[0]]
    ? functions.indexBy<tag, xs>
    : never.close.inline_var<"xs">
  }

  interface intercalate<delimiter extends any.showable> extends Kind<[string, string], string> {
    [-1]: `${this[0][0]}${delimiter}${this[0][1]}`
  }

  interface reduce<_ = unknown> extends Kind3<[f: Kind2<[_, _]>, xs: any.array, init: _], _> {
    [-1]
    : [this[0], this[1], this[2]] extends
    | [Kind2<[_, _]> & infer f extends Kind2, any.array & any.list<infer xs>, infer init extends _]
    ? Extract<functions.reduce<f, xs, init>, _>
    : never.close.inline_var<"f" | "xs" | "init">
  }

  interface fold<_ = unknown> extends Kind2<[f: Kind2<[_, _]>, xs: any.array]> {
    [-1]
    : [this[0], this[1]] extends
    | [Kind2<[_, _]> & infer f extends Kind2, any.array & any.list<infer xs>]
    ? xs extends nonempty.array<infer hd, infer tl> ? functions.reduce<f, tl, hd>
    : never.close.inline_var<"f" | "xs">
    : never.close.inline_var<"hd" | "tl">
  }
}

declare namespace functions {
  type reduce<fn extends Kind2, xs extends any.array, x>
    = xs extends nonempty.array<infer hd, infer tl>
    ? functions.reduce<fn, tl, Kind.applyN<fn, [x, hd]>>
    : x
    ;

  type mergeLeft<left, right> = never | { [k in keyof left | keyof right]: k extends keyof right ? right[k] : left[Extract<k, keyof left>] }

  type indexBy<ix extends any.index, xs extends any.array<any.indexableBy<ix>>>
    = never | { [x in xs[number]as x[ix]]: x }

  type range<n extends number, maxInclusive = never> = go.range<[], 0, n, maxInclusive>

  namespace go {
    type range<acc extends any.array, ix extends number, max extends number, maxInclusive>
      = [[...acc, ix]] extends [any.list<infer next>]
      ? [next["length"]] extends [max] ? [maxInclusive] extends [never] ? next : [...next, next["length"]]
      : go.range<next, next["length"], max, maxInclusive>
      : never
      ;
  }
}

type __reduce__ = [
  // ^?
  expect<assert.equal<
    Kind.applyN<kinds.reduce<string>, [
      f: kinds.binary.intercalate<"::">,
      xs: ["1", "2", "3"],
      empty: "0"
    ]>,
    "0::1::2::3"
  >>,
  expect<assert.equal<
    Kind.applyN<kinds.reduce, [
      f: kinds.binary.intercalate<"::">,
      xs: ["1", "2", "3"],
      empty: "0"
    ]>,
    "0::1::2::3"
  >>,
]

type __fold__ = [
  // ^?
  expect<assert.equal<
    Kind.applyN<
      kinds.fold,
      [
        f: kinds.binary.intercalate<", ">,
        xs: ["1", "2", "3"]
      ]
    >,
    "1, 2, 3"
  >>,
  expect<assert.equal<
    Kind.applyN<
      kinds.fold<string>,
      [
        f: kinds.binary.intercalate<", ">,
        xs: ["1", "2", "3"]
      ]
    >,
    "1, 2, 3"
  >>,
]

type __apply__ = [
  Kind.apply<kinds.duplicate, 10>,
  Kind.apply<kinds.show, "hey">,
]

type __pipe__ = [
  expect<assert.equal<
    pipe<
      [
        kinds.identity,
        kinds.range,
        kinds.array.map<kinds.prepend<"id-">>,
        kinds.array.map<kinds.assign<"tag">>,
        kinds.array.map<kinds.mergeInto<{ otherProp: "example" }>>,
        kinds.indexBy<"tag">,
      ],
      20
    >,
    {
      "id-0": { tag: "id-0", otherProp: "example" },
      "id-1": { tag: "id-1", otherProp: "example" },
      "id-2": { tag: "id-2", otherProp: "example" },
      "id-3": { tag: "id-3", otherProp: "example" },
      "id-4": { tag: "id-4", otherProp: "example" },
      "id-5": { tag: "id-5", otherProp: "example" },
      "id-6": { tag: "id-6", otherProp: "example" },
      "id-7": { tag: "id-7", otherProp: "example" },
      "id-8": { tag: "id-8", otherProp: "example" },
      "id-9": { tag: "id-9", otherProp: "example" },
      "id-10": { tag: "id-10", otherProp: "example" },
      "id-11": { tag: "id-11", otherProp: "example" },
      "id-12": { tag: "id-12", otherProp: "example" },
      "id-13": { tag: "id-13", otherProp: "example" },
      "id-14": { tag: "id-14", otherProp: "example" },
      "id-15": { tag: "id-15", otherProp: "example" },
      "id-16": { tag: "id-16", otherProp: "example" },
      "id-17": { tag: "id-17", otherProp: "example" },
      "id-18": { tag: "id-18", otherProp: "example" },
      "id-19": { tag: "id-19", otherProp: "example" }
    }
  >>
]

// type kind<input = never, out = _>
//   = [input] extends [never] ? Kind.any
//   : [input] extends [arity] ? typeof byArity[input]
//   : Kind<input, out>
//   ;
// type args = any.one | any.two | any.three | any.four
// type one = { 0: _ }
// type kind2<args extends two = two, output = _> = Kind2<{ 0: args[0], 1: args[1] }>
// type kind3<args extends three = three, output = _> = Kind3<{ 0: args[0], 1: args[1], 2: args[2] }>
// type kind4<args extends four = four, output = _> = Kind4<{ 0: args[0], 1: args[1], 2: args[2], 3: args[3] }>
// type lowerBound = { [0]?: _, [1]?: _, [2]?: _, [3]?: _ }
// type unsafeBind<fn extends Kind.any, input extends lowerBound> = (fn & { [0]: input[0], [1]: input[1], [2]: input[2], [3]: input[3] })
// type unsafeApply<fn extends Kind.any, input extends lowerBound> = unsafeBind<fn, input>[-1]
// type arity = 1 | 2 | 3 | 4
// declare const byArity: {
//   [1]: kind.Kind1,
//   [2]: kind.Kind2,
//   [3]: kind.Kind3,
//   [4]: kind.Kind4,
// }
// import type { any } from "../any/exports.js"
// import type { id, _ } from "../util.js"
// import type { nonempty } from "../empty.js"
// import type { never } from "../never/exports.js"
// import type { assert, expect } from "../test/exports.js"
// export type { kind as Kind }
// type arity = 1 | 2 | 3 | 4
// type kind<args extends arity | lowerBound = never, out = _>
//   = [args] extends [never] ? kind.any
//   : [args] extends [arity] ? typeof byArity[args]
//   : kind.Kind<Extract<args, one>, out>
//   ;
// type one = { 0: _ }
// type two = { 0: _, 1: _ }
// type three = { 0: _, 1: _, 2: _ }
// type four = { 0: _, 1: _, 2: _, 3: _ }
// type _3 = kind.any
// interface Kind<arg extends one = one, output = _>
//   extends id<{ [-1]: output, [0]: arg[0], [1]?: never, [2]?: never, [3]?: never }> { length: 1 }
// declare namespace kind {
//   export interface One<arg extends one = one, output = _> extends
//     id<{ [-1]: output, [0]: arg[0], [1]?: never, [2]?: never, [3]?: never }> { length: 1 }
//   export interface Two<args extends two = two, output = _>
//     extends id<{ [-1]: output, [0]: args[0], [1]: args[1], [2]?: never, [3]?: never }> { length: 2 }
//   export interface Three<args extends three = three, output = _>
//     extends id<{ [-1]: output, [0]: args[0], [1]: args[1], [2]: args[2], [3]?: never }> { length: 3 }
//   export interface Four<args extends four = four, output = _>
//     extends id<{ [-1]: output, [0]: args[0], [1]: args[1], [2]: args[2], [3]: args[3] }> { length: 4 }
//   export namespace unsafe {
//     export {
//       unsafeApply as apply,
//       unsafeBind as bind,
//     }
//   }
//   export { infer_ as infer }
//   export type any_ =
//     | kind.Kind
//     | kind.two
//     | kind.three
//     | kind.four
//   export {
//     apply,
//     bind,
//     // kind as of,
//     Kind,
//     any_ as any,
//     One as one,
//     Two as two,
//     Three as three,
//     Four as four,
//   }
// }
// declare namespace infer_ {
//   type one<fn extends kind.one = kind.one> = fn
//   type two<fn extends kind.two = kind.two> = fn
//   type three<fn extends kind.three = kind.three> = fn
//   type four<fn extends kind.four = kind.four> = fn
// }
// declare const byArity: {
//   [1]: Kind,
//   [2]: kind.two,
//   [3]: kind.three,
//   [4]: kind.four,
// }
// // type kind<arity extends 1 | 2 | 3 | 4> = typeof byArity[arity]
// type lowerBound = { [0]?: _, [1]?: _, [2]?: _, [3]?: _ }
// type __typecheck_pipe__ = [
//   typecheck.pipe<[
//     kinds.range,
//     kinds.identity,
//     kinds.arrayMap<kinds.prepend<"id-">>,
//     kinds.arrayMap<kinds.assign<"tag">>,
//     kinds.arrayMap<kinds.mergeInto<{ otherProp: "example" }>>,
//     kinds.indexBy<"tag">,
//     // kinds.arrayMap<kinds.objectMap<kinds.mergeInto<{ otherProp: "example" }>>>,
//     // kinds.array.map<kinds.duplicate
//     // kinds.duplicate,
//     // kinds.intercalate<", ">,
//   ], 20>,
// ]
// type typecheck<fn extends kind.any> = never | { [0]?: fn[0], [1]?: fn[1], [2]?: fn[2], [3]?: fn[3] }
// declare namespace typecheck {
//   type pipe<fns extends any.array<kind<1>>, acc = unknown>
//     = [fns] extends [nonempty.array<kind.infer.one<infer fn>, any.arrayOf<kind<1>, infer todo>>]
//     ? pipe<todo, kind.apply<fn, [acc]>>
//     : acc
//   interface flow extends kind<1> {
//   }
// }
// type bind<fn extends kind.any, input extends typecheck<fn>>
//   = never | (fn & { [0]: input[0], [1]: input[1], [2]: input[2], [3]: input[3] })
// type apply<fn extends kind.any, input extends typecheck<fn>>
//   = never | bind<fn, input>[-1]
// type evaluate<type> = never | { [k in keyof type]: type[k] }
// type unsafeBind<fn extends kind.any, input extends lowerBound> = (fn & { [0]: input[0], [1]: input[1], [2]: input[2], [3]: input[3] })
// type unsafeApply<fn extends kind.any, input extends lowerBound> = unsafeBind<fn, input>[-1]
// declare namespace kinds {
//   namespace binary {
//     interface intercalate<delimiter extends any.showable> extends kind.two<[string, string], string> {
//       [-1]: `${this[0]}${delimiter}${this[1]}`
//     }
//   }
//   interface identity extends kind<1> { [-1]: this[0] }
//   interface duplicate extends kind<1> { [-1]: [this[0], this[0]] }
//   interface duplicateWithIndex extends kind<[unknown, any.index]> { [-1]: [this[0][0], this[0][1]] }
//   interface show extends kind<[any.showable]> { [-1]: `${this[0]}` }
//   type __ = evaluate<show>
//   interface join extends kind.Kind<[any.showable, any.showable]> { [-1]: `${this[0][0]}${this[0][1]}` }
//   interface append<type extends any.showable> extends kind.Kind<any.showable> { [-1]: `${this[0]}${type}` }
//   interface prepend<type extends any.showable> extends kind.Kind<any.showable> { [-1]: `${type}${this[0]}` }
//   interface embed<type extends any.showable> extends kind.Kind<[any.showable, any.showable]> { [-1]: `${this[0][0]}${type}${this[0][1]}` }
//   interface range extends kind.Kind<number> { [-1]: functions.range<this[0]> }
//   interface arrayMap<fn extends kind<1>> extends kind.Kind<any.array> {
//     [-1]
//     : [this[0]] extends [any.array & any.list<infer xs>] ? array.map<fn, xs>
//     : never
//   }
//   interface objectMap<fn extends kind<1>> extends kind.Kind<object> {
//     [-1]
//     : [this[0]] extends [object & infer xs] ? object.map<fn, xs>
//     : never
//   }
//   namespace array {
//     type map<fn extends kind<1>, xs extends any.array> = { [ix in keyof xs]: kind.apply<fn, [xs[ix]]> }
//   }
//   namespace object {
//     type map<fn extends kind<1>, type> = { [k in keyof type]: kind.apply<fn, [type[k]]> }
//     type mapWithIndex<fn extends kind.Kind<[unknown, any.index]>, type extends object> = { [k in keyof type]: kind.apply<fn, [[type[k], k]]> }
//   }
//   interface unit<value = unknown> extends kind<[any.index]> { [-1]: { [ix in this[0]]: value } }
//   interface assign<key extends any.key> extends kind<1> { [-1]: { [ix in key]: this[0] } }
//   interface mergeInto<target extends object> extends kind<object> { [-1]: evaluate<functions.mergeLeft<target, this[0]>> }
//   interface indexBy<tag extends any.key> extends kind<any.array<any.indexableBy<tag>>> {
//     [-1]
//     : [this[0]] extends [any.array<any.indexableBy<tag>> & infer xs extends this[0]]
//     ? functions.indexBy<tag, xs>
//     : never.close.inline_var<"xs">
//   }
//   interface intercalate<delimiter extends any.showable> extends kind.Kind<[string, string], string> {
//     [-1]: `${this[0][0]}${delimiter}${this[0][1]}`
//   }
//   interface reduce<_ = unknown> extends kind.three<[f: kind.two<[_, _]>, xs: any.array, init: _], _> {
//     [-1]
//     : [this[0], this[1], this[2]] extends
//     | [kind.two<[_, _]> & infer f extends kind<2>, any.array & any.list<infer xs>, infer init extends _]
//     ? Extract<functions.reduce<f, xs, init>, _>
//     : never.close.inline_var<"f" | "xs" | "init">
//   }
//   interface fold<_ = unknown> extends kind.two<[f: kind.two<[_, _]>, xs: any.array]> {
//     [-1]
//     : [this[0], this[1]] extends
//     | [kind.two<[_, _]> & infer f extends kind<2>, any.array & any.list<infer xs>]
//     ? xs extends nonempty.array<infer hd, infer tl> ? functions.reduce<f, tl, hd>
//     : never.close.inline_var<"f" | "xs">
//     : never.close.inline_var<"hd" | "tl">
//   }
// }
// declare namespace functions {
//   type reduce<f extends kind<2>, xs extends any.array, x>
//     = xs extends nonempty.array<infer hd, infer tl>
//     ? functions.reduce<f, tl, apply<f, [x, hd]>>
//     : x
//     ;
//   type mergeLeft<left, right> = never | { [k in keyof left | keyof right]: k extends keyof right ? right[k] : left[Extract<k, keyof left>] }
//   type indexBy<ix extends any.index, xs extends any.array<any.indexableBy<ix>>>
//     = never | { [x in xs[number]as x[ix]]: x }
//   type range<n extends number, maxInclusive = never> = go.range<[], 0, n, maxInclusive>
//   namespace go {
//     type range<acc extends any.array, ix extends number, max extends number, maxInclusive>
//       = [[...acc, ix]] extends [any.list<infer next>]
//       ? [next["length"]] extends [max] ? [maxInclusive] extends [never] ? next : [...next, next["length"]]
//       : go.range<next, next["length"], max, maxInclusive>
//       : never
//       ;
//   }
// }
// type __reduce__ = [
//   // ^?
//   expect<assert.equal<
//     kind.apply<kinds.reduce<string>, [
//       f: kinds.binary.intercalate<"::">,
//       xs: ["1", "2", "3"],
//       empty: "0"
//     ]>,
//     "0::1::2::3"
//   >>,
//   expect<assert.equal<
//     kind.apply<kinds.reduce, [
//       f: kinds.binary.intercalate<"::">,
//       xs: ["1", "2", "3"],
//       empty: "0"
//     ]>,
//     "0::1::2::3"
//   >>,
// ]
// type __fold__ = [
//   expect<assert.equal<
//     kind.apply<
//       kinds.fold,
//       [
//         f: kinds.binary.intercalate<", ">,
//         xs: ["1", "2", "3"]
//       ]
//     >,
//     "1, 2, 3"
//   >>,
//   expect<assert.equal<
//     kind.apply<
//       kinds.fold<string>,
//       [
//         f: kinds.binary.intercalate<", ">,
//         xs: ["1", "2", "3"]
//       ]
//     >,
//     "1, 2, 3"
//   >>,
// ]
// type __apply__ = [
//   apply<kinds.duplicate, [10]>,
//   apply<kinds.show, ["hey"]>,
// ]
// // type deref<T extends string>
// //   = [T] extends [string.startsWith<"#/components/schemas/", infer after>] ? after
// //   : never
// //   ;
// // type __deref__ = deref<"#/components/schemas/auth_strategies_serializer">
// // //   ^?
// // interface dereference {
// // }
// // // type dereference<T extends Node.ref> = deref<T["$ref"]>
// // type __dereference__ = dereference<{ $ref: "#/components/schemas/auth_strategies_serializer" }>
// // //   ^?
// // function deref<const T extends Node.ref>(node: Node.ref) {
// //   return array.last(node.$ref.slice("#/".length).split("/"))
// // }
// // // type fn1<
// // //   codomain = unknown, 
// // //   domain extends 
// // //   | { 0: unknown } 
// // //   = { 0: unknown }
// // // > = never | { [-1]: codomain, [0]: domain[0], [1]?: never, [2]?: never, [3]?: never }
// // // type fn2<
// // //   codomain = unknown, 
// // //   domain extends 
// // //   | { 0: unknown, 1: unknown } 
// // //   = { 0: unknown, 1: unknown }
// // // > = never | { [-1]: codomain, [0]: domain[0], [1]: domain[1], [2]?: never, [3]?: never }
// // // type fn3<
// // //   codomain = unknown, 
// // //   domain extends 
// // //   | { 0: unknown, 1: unknown, 2: unknown } 
// // //   = { 0: unknown, 1: unknown, 2: unknown }
// // // > = never | { [-1]: codomain, [0]: domain[0], [1]: domain[1], [2]: domain[2], [3]?: never }
// // // type fn4<
// // //   codomain = unknown, 
// // //   domain extends 
// // //   | { 0: unknown, 1: unknown, 2: unknown, 3: unknown } 
// // //   = { 0: unknown, 1: unknown, 2: unknown, 3: unknown }
// // // > = never | { [-1]: codomain, [0]: domain[0], [1]: domain[1], [2]: domain[2], [3]?: domain[3] }
