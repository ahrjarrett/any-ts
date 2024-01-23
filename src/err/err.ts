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

namespace TypeError {
  /** @category term constructors */
  export function template<tag extends keyof Msg>(tag: tag): <const err>(err: err) => typeError<Msg[tag], err>
  export function template<tag extends any.string>(tag: tag): <const err>(type: err) => typeError<tag, err>
  export function template<tag extends keyof Msg>(tag: tag): unknown {
    return <const err>(err: err) => ({
      error: err,
      message: Msg[tag],
      capture: [Msg[tag], err]
    })
  }
}
