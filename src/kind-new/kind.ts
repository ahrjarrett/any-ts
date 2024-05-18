import type { id, _ } from "../util.js"

export type {
  kind as Kind,
  Kind2,
  Kind3,
  Kind4,
}

type apply<fn extends kind, input extends fn[0]> = never | bind<fn, input>[-1]
type bind<fn extends kind, input extends fn[0]> = never | (fn & { [0]: input })

interface kind<input = _, output = _> extends
  id<{ [-1]: output, [0]: input, [1]?: never, [2]?: never, [3]?: never }> { length: 1 }
interface Kind2<args extends two = two, output = _> extends
  id<{ [-1]: output, [0]: args[0], [1]: args[1], [2]?: never, [3]?: never }> { length: 2 }
interface Kind3<args extends three = three, output = _> extends
  id<{ [-1]: output, [0]: args[0], [1]: args[1], [2]: args[2], [3]?: never }> { length: 3 }
interface Kind4<args extends four = four, output = _> extends
  id<{ [-1]: output, [0]: args[0], [1]: args[1], [2]: args[2], [3]: args[3] }> { length: 4 }

declare namespace kind {
  export {
    apply,
    bind,
    kind as Kind1,
    Kind2,
    Kind3,
    Kind4,
    any_ as any,
    applyN,
    bindN,
  }
  // namespace exports
  export { infer_ as infer }
}

declare namespace infer_ {
  type one<fn extends kind = kind> = fn
  type two<fn extends Kind2 = Kind2> = fn
  type three<fn extends Kind3 = Kind3> = fn
  type four<fn extends Kind4 = Kind4> = fn
}

type any_ =
  | kind.Kind1
  | kind.Kind2
  | kind.Kind3
  | kind.Kind4
  ;
type applyN<fn extends Kind2 | Kind3 | Kind4, input extends typecheck<fn>>
  = never | bindN<fn, input>[-1]
  ;
type bindN<fn extends Kind2 | Kind3 | Kind4, input extends typecheck<fn>>
  = never | (fn & { [0]: input[0], [1]: input[1], [2]: input[2], [3]: input[3] })
  ;
type typecheck<fn extends kind.any>
  = never | { [0]?: fn[0], [1]?: fn[1], [2]?: fn[2], [3]?: fn[3] }
  ;
type two = { 0: _, 1: _ }
type three = { 0: _, 1: _, 2: _ }
type four = { 0: _, 1: _, 2: _, 3: _ }
