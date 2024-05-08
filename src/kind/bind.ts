import type { Kind } from "./kind.js"
import type { any } from "../any/exports.js"
import type { _ } from "../util.js"

declare namespace Bind {
  interface zero extends Kind { [-1]: Kind<0> }
  interface one<a = _> extends Kind<[a]> { [-1]: Kind<[this[0]]> }
  interface two<a = _, b = _> extends Kind<[a, b]> { [-1]: Kind<[this[0], this[1]]> }
  interface three<a = _, b = _, c = _> extends Kind<[a, b, c]> { [-1]: Kind<[this[0], this[1], this[2]]> }
  interface four<a = _, b = _, c = _, d = _> extends Kind<[a, b, c, d]> { [-1]: Kind<[this[0], this[1], this[2], this[3]]> }
  interface five<a = _, b = _, c = _, d = _, e = _> extends Kind<[a, b, c, d, e]> { [-1]: Kind<[this[0], this[1], this[2], this[3], this[4]]> }

  type partial<type extends Kind> = globalThis.Omit<type, -1> extends any.subtypeOf<type, infer next> ? next : never
}

