import type { never } from "../semantic-never/exports"

export namespace URI {
  export const IllegalState: unique symbol = Symbol.for("any-ts/semantic-never::IllegalState")
  export type IllegalState = typeof never.$$.IllegalState
}
