export type {
  Fn1,
  Fn2,
  interpret1,
  interpret2,
}

import type { any } from "../any-namespace"

interface Fn1<type = unknown> { [-1]: unknown, [0]: type }
interface Fn2<left = unknown, right = unknown> { [-1]: any.showable, [0]: left, [1]: right, }

type interpret1<fn extends Fn1, x extends fn[0]> = (fn & { [0]: x })[-1]
type interpret2<fn extends Fn2, x extends any.two<fn[0], fn[1]>> = (fn & { [0]: x[0], [1]: x[1] })[-1]
