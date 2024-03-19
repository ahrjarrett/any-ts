import type { Kind } from "../kind/exports"
import type { any } from "../any/any"
import type { string } from "./string"
import type { char } from "./char"
import type { assert, expect } from "../test/exports"

import type { Fn1, Fn2, interpret1, interpret2 } from "./kind"

declare namespace Config {
  export interface options { recursive: boolean }
  export interface defaults extends options { recursive: false }
  export { defaults as default }
}

declare namespace Fn {
  // re-exports
  export {
    Fn1,
    Fn2,
    interpret1,
    interpret2,
  }

  // internal exports
  export {
    between,
    capitalize,
    is,
    prefix,
    postfix,
    unprefix,
    unpostfix,
    replace,
    show,
    snake,
  }

  /////////////
  /// BEGIN: AFTER
  export namespace AFTER {
    namespace is {
      interface capitalizedString extends Kind<[any.showable]> { [-1]: string.is.alpha<`${this[0]}`> }
      interface uppercaseString extends Kind<[any.showable]> { [-1]: string.is.uppercase<`${this[0]}`> }
      interface uppercaseAlphaChar extends Kind<[any.showable]> { [-1]: char.is.uppercaseAlpha<`${this[0]}`> }

    }
    interface show extends Kind<[any.showable]> { [-1]: `${this[0]}` }
    interface capitalize extends Kind<[any.showable]> { [-1]: globalThis.Capitalize<`${this[0]}`> }

    /** {@link embed `embed`} is the dual of {@link between `between`} */
    interface embed<middle extends any.showable> extends Kind<[any.showable, any.showable]> { [-1]: `${this[0]}${middle}${this[1]}` }

    /** {@link between `between`} is the dual of {@link embed `embed`} */
    interface between<
      left extends any.showable,
      right extends any.showable
    > extends
      Kind<[any.showable]> { [-1]: `${left}${this[0]}${right}` }

    /** {@link prefix `prefix`} is the inverse of {@link unprefix `unprefix`} and the dual of {@link postfix `postfix`}  */
    interface prefix<before extends any.showable> extends Kind<[any.showable]> { [-1]: `${before}${this[0]}` }

    /** {@link postfix `postfix`} is the inverse of {@link unpostfix `unpostfix`} and the dual of {@link prefix `prefix`}  */
    interface postfix<after extends any.showable> extends Kind<[any.showable]> { [-1]: `${this[0]}${after}` }

    /** {@link unprefix `unprefix`} is the inverse of {@link prefix `prefix`} and the dual of {@link unpostfix `unpostfix`}  */
    interface unprefix<prefix extends any.showable> extends Kind<[string]> { [-1]: string.unprefix<prefix, this[0]> }

    /** {@link unpostfix `unpostfix`} is the inverse of {@link postfix `postfix`} and the dual of {@link unprefix `unprefix`}  */
    interface unpostfix<suffix extends any.showable> extends Kind<[string]> { [-1]: string.unpostfix<suffix, this[0]> }

    interface replace<needle extends any.showable, next extends any.showable> extends Fn1<string> { [-1]: string.replace<needle, next, this[0]> }
    interface snake extends Kind<[any.showable]> { [-1]: `_${Lowercase<`${this[0]}`>}` }
  }
  /// END: AFTER
  /////////////

  namespace is {
    interface capitalizedString extends Fn1<any.showable> { [-1]: string.is.alpha<`${this[0]}`> }
    interface uppercaseString extends Fn1<any.showable> { [-1]: string.is.uppercase<`${this[0]}`> }
    interface uppercaseAlphaChar extends Fn1<any.showable> { [-1]: char.is.uppercaseAlpha<`${this[0]}`> }
  }

  interface show extends Fn1<any.showable> { [-1]: `${this[0]}` }
  interface between<middle extends any.showable> extends Fn2<any.showable, any.showable> { [-1]: `${this[0]}${middle}${this[1]}` }
  interface capitalize extends Fn1<any.showable> { [-1]: globalThis.Capitalize<`${this[0]}`> }

  interface prefix<before extends any.showable> extends Fn1<any.showable> { [-1]: `${before}${this[0]}` }
  interface postfix<after extends any.showable> extends Fn1<any.showable> { [-1]: `${this[0]}${after}` }
  interface unprefix<prefix extends any.showable> extends Fn1<string> { [-1]: string.unprefix<prefix, this[0]> }
  interface unpostfix<suffix extends any.showable> extends Fn1<string> { [-1]: string.unpostfix<suffix, this[0]> }

  interface replace<needle extends any.showable, next extends any.showable> extends Fn1<string> { [-1]: string.replace<needle, next, this[0]> }
  interface snake extends Fn1<any.showable> { [-1]: `_${Lowercase<`${this[0]}`>}` }
}

declare namespace Spec {
  type __is_before__ = [
    interpret1<Fn.is.capitalizedString, " ">,
  ]

  type __Fn_isUppercaseAlphaChar__ = [
    // ^?
    /* unhappy path */
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "a">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "z">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, " ">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "-">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "0">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "Aa">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "AA">>>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseAlphaChar, "aa">>>,
    /* happy path */
    expect<assert.is.true<interpret1<Fn.is.uppercaseAlphaChar, "A">>>,
    expect<assert.is.true<interpret1<Fn.is.uppercaseAlphaChar, "Z">>>,
  ]


  type __is_AFTER__ = [
    // ^?
    expect<assert.is.false<Kind.apply$<Fn.AFTER.is.capitalizedString, [" "]>>>,
    expect<assert.is.false<boolean>>,
    expect<assert.equal<
      interpret1<Fn.is.capitalizedString, " ">,
      Kind.apply$<Fn.AFTER.is.capitalizedString, [" "]>
    >>,
    expect<assert.is.false<interpret1<Fn.is.uppercaseString, "a">>>,
    expect<assert.is.true<Kind.apply$<Fn.AFTER.is.uppercaseString, ["A"]>>>,
    expect<assert.equal<
      interpret1<Fn.is.uppercaseString, " ">,
      Kind.apply$<Fn.AFTER.is.uppercaseString, [" "]>
    >>,
    expect<assert.equal<
      interpret1<Fn.is.uppercaseString, "A">,
      Kind.apply$<Fn.AFTER.is.uppercaseString, ["A"]>
    >>,
    expect<assert.equal<
      interpret1<Fn.is.uppercaseString, "a">,
      Kind.apply$<Fn.AFTER.is.uppercaseString, ["a"]>
    >>,
    expect<assert.equal<interpret1<Fn.show, "a">, "a">>,
    expect<assert.equal<interpret2<Fn.between<"x: 1; y: 2; z: 3;">, ["(", ")"]>, "(x: 1; y: 2; z: 3;)">>,
    expect<assert.equal<Kind.apply$<Fn.AFTER.embed<"x: 1; y: 2; z: 3;">, ["{ ", " }"]>, "{ x: 1; y: 2; z: 3; }">>,
    expect<assert.equal<
      interpret1<Fn.is.capitalizedString, " ">,
      Kind.apply$<Fn.AFTER.is.capitalizedString, [" "]>
    >>,
    expect<assert.equal<
      interpret1<Fn.is.uppercaseString, " ">,
      Kind.apply$<Fn.AFTER.is.uppercaseString, [" "]>
    >>,
  ]
}

