import type { _ } from "../util.js"
import type { TypeError } from "../type-error/exports.js"

/**
 * # {@link empty `empty 🕳`}
 * `=================`
 *
 * {@link empty `empty`} is a namespace for empty types, and type constructors that 
 * target emptiness.
 * 
 * The idea of `empty` is an important one in our field. It's easy to
 * underestimate its importance and focus on the "happy" (nonempty) path.
 * 
 * But we should talk about (and think through) both cases, and treat emptiness as 
 * a first-class concern, rather than as an after-thought.
 * 
 * But I'm probably preaching to the choir here, so enough talk, let's dig in.
 */
export declare namespace empty {
  export { string_ as string }

  /**
   * ## {@link empty.string `empty.string`}
   * 
   * - Evaluates to the empty string type (`""`) when used as a nullary type
   * - Functions as a pattern matcher when used as a unary type constructor
   * - Functions as a constraint when applied to a type parameter
   * - See also: {@link empty.string.debug `empty.string.debug`}
   * 
   * @example
   *  ////////////////////
   *  //   HAPPY PATH
   *  type ex_01 = empty.string
   *  //    ^? type ex_01 = ""
   *  type ex_02 = empty.string<"">
   *  //    ^? type ex_02 = ""
   *  type ex_03 = empty.string.debug<"">
   *  //    ^? type ex_03 = ""
   *  const ex_04 = empty.string("")
   *  //    ^? const ex_04: ""
   *  ////////////////////
   * 
   *  ////////////////////
   *  //   ERROR PATH
   *  type ex_05 = empty.string<"101 Dalmations">
   *  //    ^? type ex_05 = never
   *  //
   *  //    🚫 Argument of type 'string' is not assignable to parameter of type 'never'
   *  //                               ↓↓↓
   *  const ex_06 = empty.string("Cruella de Vil")
   *  //    ^? const ex_06: never
   *  ////////////////////
   * 
   *  /////////////////////
   *  //   ADVANCED USE
   *  //
   *  // You can use `empty.string` as a type-level optimization.
   *  /
   *  // For example, you could create an overload that short-circuits an expensive 
   *  // type-level operation by handling the edge case separately:
   *  function stringToChars<T extends empty.string<T>>(emptyString: T): []
   *  function stringToChars<T extends any.string>(string: T): ExpensiveTypelevelComputation<T> // ...
   *  /////////////////////
   */
  export type string_<type = "", debug = never>
    = [type] extends [""] ? ""
    : [debug] extends [never] ? never
    : TypeError.new<"Expected an empty string", type>
    ;

  export function string_<const T extends empty.string<T>>(empty: T): T
  export namespace string_ {
    /**
     * ## {@link empty.string.debug `empty.string.debug`}
     * 
     * - Evaluates to the empty string type (`""`) when used as a nullary type
     * - Functions as a pattern matcher when used as a unary type constructor
     * - Functions as a constraint when applied to a type parameter
     * - Unlike {@link empty.string `empty.string`}, 
     *   {@link empty.string.debug `empty.string.debug`} _raises_ a `TypeError`
     *   when it encounters anything but (`""`)
     * - Unlike {@link empty.string `empty.string`},
     *   {@link empty.string.debug `empty.string.debug`} **evaluates to** a
     *   `TypeError` when it encounters anything but (`""`)
     * - See also: {@link empty.string `empty.string`}
     * 
     * @example
     *  ////////////////////
     *  //   ERROR PATH
     *  //    🚫 TypeError<[msg: "Expected an empty string", got: "101 Dalmations"]>'
     *  //                                   ↓↓↓
     *  type ex_01 = empty.string.debug<"101 Dalmations">
     *  //
     *  //    ^? type ex_01 = TypeError<[msg: "Expected an empty string", got: "101 Dalmations"]>
     *  //                           🚫 TypeError<[msg: "Expected an empty string", got: "Cruella de Vil"]>
     *  //                                ↓↓↓
     *  const ex_02 = empty.string.debug("Cruella de Vil")
     *  //    ^? const ex_02: TypeError<[msg: "Expected an empty string", got: "Cruella de Vil"]>
     *  ////////////////////
     */
    type debug<T extends empty.string<T, "debug">> = empty.string<T, "debug">
    function debug<const T extends empty.string<T, "debug">>(empty: T): T
  }

  export { object_ as object }
  /**
   * ## {@link empty.object `empty.object`}
   * 
   * - Evaluates to the empty object type (`{}`) when used as a nullary type
   * - Functions as a pattern matcher when used as a unary type constructor
   * - Functions as a constraint when applied to a type parameter
   * - See also: {@link empty.object.debug `empty.object.debug`}
   * 
   * @example
   * 
   *  ////////////////////
   *  //   HAPPY PATH
   *  type ex_01 = empty.object
   *  //    ^? type ex_01 = {}
   *  type ex_02 = empty.object<{}>
   *  //    ^? type ex_02 = {}
   *  ////////////////////
   * 
   *  ////////////////////
   *  //   ERROR PATH
   *  type ex_03 = empty.object<{ dalmatians: 101 }>
   *  //    ^? type ex_03 = never
   *  ////////////////////
   * 
   *  /////////////////////
   *  //   ADVANCED USE
   *  //
   *  // You can use `empty.object` as a type-level optimization.
   *  //
   *  // For example, you could create an overload that short-circuits an expensive 
   *  // type-level operation by handling the edge case separately:
   *  function mergeDeep<T extends empty.object<T>>(emptyObject: T): empty.object
   *  function mergeDeep<T extends any.object>(object: T): ExpensiveTypelevelComputation<T> // ...
   *  /////////////////////
   */
  export type object_<type = {}, debug = never>
    = [keyof type] extends [never] ? {}
    : [debug] extends [never] ? never
    : TypeError.new<"Expected an empty object", type>
    ;

  export function object_<const T extends empty.object<T>>(empty: T): T
  export namespace object_ {
    /**
     * ## {@link empty.object.debug `empty.object.debug`}
     * 
     * - Evaluates to the empty object type (`{}`) when used as a nullary type
     * - Functions as a pattern matcher when used as a unary type constructor
     * - Functions as a constraint when applied to a type parameter
     * - Unlike {@link empty.object `empty.object`}, 
     *   {@link empty.object.debug `empty.object.debug`} **raises** a `TypeError`
     *   when it encounters anything besides (`{}`)
     * - Unlike {@link empty.object `empty.object`},
     *   {@link empty.object.debug `empty.object.debug`} **evaluates to** a
     *   `TypeError` when it encounters anything besides (`{}`)
     * - See also: {@link empty.object `empty.object`}
     * 
     * @example
     *  ////////////////////
     *  //   HAPPY PATH
     *  type ex_01 = empty.object.debug<{}>
     *  //    ^? type ex_01 = {}
     *  //
     *  const ex_02 = empty.object({})
     *  //    ^? const ex_01: {}
     *  ////////////////////
     * 
     *  ////////////////////
     *  //  ERROR PATH
     *  // 
     *  //    🚫 TypeError<[msg: "Expected an empty object", got: { dalmatians: 101 }]>
     *  //                                 ↓↓↓
     *  type ex_03 = empty.object.debug<{ dalmatians: 101 }>
     *  //    ^? type ex_03 = TypeError<[msg: "Expected an empty object", got: { dalmatians: 101 }]>
     *  //
     *  //    🚫 TypeError<[msg: "Expected an empty object", got: { villain: "Cruella de Vil" }]>
     *  //                                  ↓↓↓
     *  const ex_04 = empty.object.debug({ villain: "Cruella de Vil" })
     *  //    ^? const ex_04: TypeError<[msg: "Expected an empty object", got: { villain: "Cruella de Vil" }]>
     *  ////////////////////
     */
    type debug<T extends empty.object<T, "debug">> = empty.object<T, "debug">
    function debug<const T extends empty.object<T, "debug">>(empty: T): T
  }

  /**
   * ## {@link empty.array `empty.array`}
   * 
   * - Evaluates to the empty array type (`[]`) when used as a nullary type
   * - Functions as a pattern matcher when used as a unary type constructor
   * - Functions as a constraint when applied to a type parameter
   * - See also: {@link empty.array.debug `empty.array.debug`}
   * 
   * @example
   *  ////////////////////
   *  //   HAPPY PATH
   *  type ex_01 = empty.array
   *  //    ^? type ex_01 = readonly []
   *  type ex_02 = empty.array<[]>
   *  //    ^? type ex_02 = []
   *  ////////////////////
   * 
   *  ////////////////////
   *  //   ERROR PATH
   *  type ex_03 = empty.array<["Perdita", "Pongo"]>
   *  //    ^? type ex_03 = never
   *  ////////////////////
   * 
   *  /////////////////////
   *  //   ADVANCED USE
   *  //
   *  // You can use `empty.array` as a type-level optimization.
   *  //
   *  // For example, you could create an overload that short-circuits an expensive 
   *  // type-level operation by handling the edge case separately:
   *  function flattenDeep<T extends empty.array<T>>(emptyArray: T): empty.array
   *  function flattenDeep<T extends any.array>(array: T): ExpensiveTypelevelComputation<T> // ...
   *  /////////////////////
   */
  export type array<type = readonly [], debug = never>
    = [type] extends [[]] ? []
    : [type] extends [readonly []] ? readonly []
    : [debug] extends [never] ? never
    : TypeError.new<"Expected an empty array", type>
  export function array<const T extends empty.array<T>>(empty: T): T
  export namespace array {
    /**
     * ## {@link empty.array.debug `empty.array.debug`}
     * 
     * - Evaluates to the empty array type (`readonly []`) when used as a nullary type
     * - Functions as a pattern matcher when used as a unary type constructor
     * - Functions as a constraint when applied to a type parameter
     * 
     * - Unlike {@link empty.array `empty.array`}, 
     *   {@link empty.array.debug `empty.array.debug`} **raises** a `TypeError`
     *   when it encounters anything besides (`[]` or `readonly []`)
     * - Unlike {@link empty.array `empty.array`},
     *   {@link empty.array.debug `empty.array.debug`} **evaluates to** a
     *   `TypeError` when it encounters anything besides (`[]` or `readonly []`)
     * - See also: {@link empty.array `empty.array`}
     * 
     * @example
     *  ////////////////////
     *  //   HAPPY PATH
     *  type ex_01 = empty.array.debug
     *  //    ^? type ex_01 = readonly []
     *  type ex_02 = empty.array.debug<[]>
     *  //    ^? type ex_02 = []
     *  const ex_03 = empty.array.debug([])
     *  //    ^? const ex_03: []
     *  ////////////////////
     * 
     *  ////////////////////
     *  //   ERROR PATH
     *  //
     *  //    🚫 TypeError_<[msg: "Expected an empty array", got: ["Perdita", "Pongo"]]>
     *  //                               ↓↓↓
     *  type ex_04 = empty.array.debug<["Perdita", "Pongo"]>
     *  //    ^? type ex_04 = TypeError_<[msg: "Expected an empty array", got: ["Perdita", "Pongo"]]>
     *  //
     *  //    🚫 TypeError_<[msg: "Expected an empty array", got: ["Perdita", "Pongo"]]>
     *  //                               ↓↓↓
     *  const ex_05 = empty.array.debug(["Perdita", "Pongo"])
     *  //    ^? TypeError_<[msg: "Expected an empty array", got: ["Perdita", "Pongo"]]>
     *  //    ^? const ex_05: TypeError_<[msg: "Expected an empty array", got: ["Perdita", "Pongo"]]>
     *  ////////////////////
     */
    type debug<T extends empty.array<T, "debug">> = empty.array<T, "debug">
    function debug<const T extends empty.array<T, "debug">>(empty: T): T
  }

  export type path<type = readonly [], debug = never>
    = [type] extends [[]] ? []
    : [type] extends [readonly []] ? readonly []
    : [debug] extends [never] ? never
    : TypeError.new<"Expected an empty path", type>
    ;
}
