/**
 * _Throughout this file:_
 * 
 * (((happy_path)))
 */

export {
  TEST as is,
  CHECK as check,
  TYPECHECK as typecheck,
}

import type { any } from "../any/exports.js"
import type { _ } from "../util.js"
import type { Identity as id } from "../identity.js"

export type TypeErrorURI = "any-ts/TypeError"
export interface TypeError<type extends [string, unknown]> extends id<type> {
  [any.unit]: TypeErrorURI
}

declare namespace TEST {
  //////////
  /// IS
  type isUnion<t, u = t> = u extends u ? [t, u] extends [u, t] ? never : any.unit : never
  type isTuple<t> = [t] extends [any.array] ? [number] extends [t["length"]] ? never : any.unit : never
  type isLiteral<t, u = t>
    = [u] extends [any.literal]
    ? number extends u ? never
    : string extends u ? never
    : boolean extends u ? never
    : any.unit
    : never
  //////////
  /// NON
  type isNonUnion<t> = [any.unit] extends [TEST.isUnion<t>] ? never : any.unit
  type isNonTuple<t> = [any.unit] extends [TEST.isTuple<t>] ? never : any.unit
  type isNonLiteral<t> = [any.unit] extends [TEST.isLiteral<t>] ? never : any.unit
}

export declare namespace CHECK {
  type isTuple<t, constraint extends any.array = any.array>
    = [any.unit] extends [TEST.isTuple<t>] ? [t] extends [constraint] ? (((constraint))) : never : never
    ;
  type isNonFiniteArray<t, constraint extends any.array = any.array>
    = [any.unit] extends [TEST.isNonTuple<t>] ? [t] extends [constraint] ? (((constraint))) : never : never
    ;
  type isLiteral<t, constraint extends any.literal = any.literal>
    = [any.unit] extends [TEST.isLiteral<t>] ? [t] extends [constraint] ? (((constraint))) : never : never
    ;
  type isNonFiniteLiteral<t, constraint extends any.literal = any.literal>
    = [any.unit] extends [TEST.isNonLiteral<t>] ? [t] extends [constraint] ? (((constraint))) : never : never
    ;
  type isUnion<t, constraint = _>
    = [any.unit] extends [TEST.isUnion<t>] ? [t] extends [constraint] ? (((constraint))) : never : never
    ;
  type isNonUnion<t, constraint = _>
    = [any.unit] extends [TEST.isNonUnion<t>] ? [t] extends [constraint] ? (((constraint))) : never : never
    ;
}

export declare namespace TYPECHECK {
  const MSG: {
    union: "Expected a union",
    tuple: "Expected a finite array (tuple)",
    literal: "Expected a finite literal (string, number, or boolean)",
    finiteArray: "Expected a finite array (tuple), but got a non-finite array instead",
    finiteLiteral: "Expected a finite literal, but got a non-finite literal instead",
    //////////
    /// NON
    nonUnion: "Type cannot be a union",
    nonTuple: "Type must be an non-finite array",
    nonFiniteTuple: "Type cannot be finite: only non-finite arrays allowed",
    nonLiteral: "Type must be a non-finite literal (string, number, or boolean)",
    nonFiniteLiteral: "Type cannot be finite: only non-finite strings, numbers or booleans allowed",
  }
  namespace Err {
    ///////////
    /// IS
    type union<got> = never | Err.msg<typeof MSG.union, got>
    type tuple<got> = never | Err.msg<typeof MSG.tuple, got>
    type finiteTuple<got> = never | Err.msg<typeof MSG.finiteArray, got>
    type literal<got> = never | Err.msg<typeof MSG.literal, got>
    type finiteLiteral<got> = never | Err.msg<typeof MSG.finiteLiteral, got>
    ///////////
    /// NON
    type nonUnion<got> = never | Err.msg<typeof MSG.union, got>
    type nonLiteral<got> = Err.msg<typeof MSG.nonLiteral, got>
    type nonFiniteLiteral<got> = Err.msg<typeof MSG.nonFiniteLiteral, got>
    type nonTuple<got> = Err.msg<typeof MSG.nonTuple, got>
    type nonFiniteTuple<got> = Err.msg<typeof MSG.nonFiniteTuple, got>
    ///////////
    /// UTILS
    type msg<msg extends string, got> = never | TypeErrorConstructor<msg, got>
    /** @internal */
    type TypeErrorConstructor<msg extends string, got> = never | TypeError<[msg: msg, got: got]>
  }

  type isUnion<t, constraint = _>
    = [any.unit] extends [TEST.isUnion<t>] ? [t] extends [constraint] ? (((constraint))) : never : Err.union<t>
    ;
  type isNonUnion<t, constraint = _>
    = [any.unit] extends [TEST.isNonUnion<t>] ? [t] extends [constraint] ? (((constraint))) : never : Err.nonUnion<t>
    ;
  type isTuple<t, constraint extends any.array = any.array>
    = [any.unit] extends [TEST.isTuple<t>] ? [t] extends [constraint] ? (((constraint))) : Err.tuple<t> : Err.finiteTuple<t>
    ;
  type isNonFiniteArray<t, constraint extends any.array = any.array>
    = [any.unit] extends [TEST.isNonTuple<t>] ? [t] extends [constraint] ? (((constraint))) : Err.nonTuple<t> : Err.nonFiniteTuple<t>
    ;
  type isLiteral<t, constraint extends any.literal = any.literal>
    = [any.unit] extends [TEST.isLiteral<t>] ? [t] extends [constraint] ? (((constraint))) : Err.literal<t> : Err.finiteLiteral<t>
    ;
  type isNonFiniteLiteral<t, constraint extends any.literal = any.literal>
    = [any.unit] extends [TEST.isNonLiteral<t>] ? [t] extends [constraint] ? (((constraint))) : Err.nonLiteral<t> : Err.nonFiniteLiteral<t>
    ;
}
