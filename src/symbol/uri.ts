import type { never } from "../never/exports.js"

export namespace URI {
  export const IllegalState: unique symbol = Symbol.for("any-ts/never::IllegalState")
  export type IllegalState = typeof never.$$.IllegalState
}
