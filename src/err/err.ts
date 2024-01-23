/*
 eslint-disable
 @typescript-eslint/naming-convention,
 @typescript-eslint/no-empty-interface,
 @typescript-eslint/no-namespace,
 @typescript-eslint/no-shadow,
 prettier/prettier,
*/

export {
  type TypeError,
  type Err,
  Msg,
}

import type { any } from "../exports"

/** @category model */
type Msg = typeof Msg
const Msg = {
  /** TODO: switch over to an HKT impl */
  IsNotAssignableTo: "Expected input to not be assignable, but input was assignable instead",
  NonObject: "Expected an array, but got a non-array type instead",
  NonEmptyArray: "Expected a non-empty array, but got an empty array instead",
  NonEmptyString: "Expected a non-empty string, but got an empty string instead",
  KeyUniqueness: "Expected keys to be unique, but encountered 1 or more duplicate keys",
  Literal: "Expected a literal type, but encountered a non-literal instead",
  MaxOneProp: "Expected a non-object type, or an object type with at most 1 property",
  NonLiteral: "Expected a non-literal type, but encountered a literal instead",
  Shallow: "Expected a primitive type or a shallow array",
} as const

/** @category model */
type typeError<msg extends string, error>
  = never | TypeError<[𝗺𝘀𝗴: msg, 𝗴𝗼𝘁: error]>

/** @category model */
interface TypeError<map extends readonly [msg: string, error: unknown]>
  extends TypeError.new<[map[0], map[1]]> { }

/** @category coproduct, structure-preserving */
type Err = typeof Err
const Err
  : { [tag in keyof Msg]: TypeError.template<[𝗱𝗶𝘀𝗰𝗿𝗶𝗺𝗶𝗻𝗮𝗻𝘁: tag]> }
  = Object.keys(Msg).reduce(
    (acc: any.struct, tag) => ({ ...acc, [tag]: TypeError.template(tag) }),
    {}
  ) as never

declare namespace TypeError {
  export {
    /** @category function application */
    catch_ as catch,
    /** @category type constructors */
    new_ as new
  }

  /** @category type constructors */
  type new_<map extends readonly [msg: string, got: unknown]>
    = TypeError.catch<TypeError.bind<map[0]>, map[1]>

  /** @category type constructors */
  export interface template<errorTag extends readonly [tag: keyof Msg]> {
    <const type>(type: type): typeError<Msg[errorTag[0]], type>
  }

  /** @category function application */
  export interface bind<message extends string> {
    error: unknown
    message: message
    capture: [msg: this["message"], got: this["error"]]
  }

  /** @category function application */
  type catch_<template extends TypeError.bind<string>, error>
    = (template & { error: error })["capture"]
    ;
}

declare namespace TypeError {
  interface Template {
    [0]: unknown  /// inbound
    [-1]: unknown /// error channel
  }

  export type render<fn extends Template, x> = (fn & { 0: x })
  type throw_<fn extends Template> = fn[-1]
  export { throw_ as throw }


  type eval<type> = never | { [ix in keyof type]: type[ix] }
  type _5 = eval<render<Template, 56>>

  export type typecheck<type> = [type] extends [Template] ? TypeError.throw<type> : type
  export { typecheck as try }

  namespace not {
    type assignableTo<disallow, type>
      = [type] extends [disallow] ? render<assignableToTemplate, type> : unknown
    type assignableToWithMsg<disallow, type, template extends Template = assignableToTemplate>
      = [type] extends [disallow] ? render<template, type> : unknown
    interface assignableToTemplate extends Template {
      [-1]: this[0] extends any.showable ? `Did not expect to receive a type assignable to "${this[0]}"` : "TODO: BOUND IS UN-SHOWABLE"
    }
  }

  export namespace raise {
    export { If as if }
    namespace If {








      /**
       * @example
       *  const nonNumber = TypeError.raise.if.assignableTo(100)
       *  //    ^? const nonNumber: 
       *  //         <const type extends not.assignableTo<100, type>>(type: type) => typecheck<type>
       *
       *  const thisIsFine = nonNumber(99)
       *  const thisThrowsATypeError = nonNumber(100)
       *  //    ^? const throwsTypeError: "Did not expect to receive a type assignable to `100`"
       */
      function assignableTo<const disallow>(disallow: disallow)
        : <const type extends not.assignableTo<disallow, type>>(type: type) => TypeError.try<type>
      function assignableTo<
        const disallow,
        template extends Template
      >(
        disallow: disallow,
        template: template
      )
        : <const type extends not.assignableToWithMsg<disallow, type>>(type: type)
          => TypeError.try<type>

    }
  }
}

namespace TypeError {
  /** @category term constructors */
  export function template<tag extends keyof Msg, meta>(tag: tag): <const err>(err: err) => typeError<Msg[tag], err>
  export function template<tag extends any.string>(tag: tag): <const err>(type: err) => typeError<tag, err>
  export function template<tag extends keyof Msg>(tag: tag): unknown {
    return <const err>(err: err) => ({
      error: err,
      message: Msg[tag],
      capture: [Msg[tag], err]
    })
  }
}
