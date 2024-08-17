export {
  Universal
}

import type { any } from "../any/exports.js"

declare namespace Universal {
  /** @internal */
  type parseInt<t> = [t] extends [`${infer n extends number}`] ? n : t;

  /** ### {@link Universal.get `Universal.get`} */
  type get<t, k extends any.index> = t[keyOf<t, k>]

  /** ### {@link Universal.keyOf `Universal.keyOf`} */
  type keyOf<t, k extends any.index = keyof t>
    = (k extends any.key ? (`${k}` | parseInt<k>) : unknown) & keyof t

  /** ### {@link Universal.key `Universal.key`} */
  type key<k> = `${k & any.showable}` | globalThis.Exclude<k, any.showable>
}
