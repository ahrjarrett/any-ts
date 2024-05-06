export type { Catch }

import type { any } from "../any/exports"
import type { Union } from "../union/exports";
import type { never } from "../never/exports";

type tuple<xs, constraint extends any.array = any.array>
  = [xs] extends [constraint]
  ? [number] extends [xs["length"]] ? never.as.nothing
  : constraint
  : never.close.unmatched_expr
  ;

type nontuple<xs, constraint extends any.array = any.array>
  = [xs] extends [constraint]
  ? [number] extends [xs["length"]] ? constraint
  : never.as.nothing
  : never.close.unmatched_expr
  ;

type literal<xs, constraint extends any.literal = any.literal>
  = [xs] extends [any.literal]
  ? [number] extends [xs] ? never.as.nothing
  : [string] extends [xs] ? never.as.nothing
  : [boolean] extends [xs] ? never.as.nothing
  : constraint
  : never.close.unmatched_expr
  ;

type nonliteral<xs, constraint extends any.literal = any.literal>
  = [xs] extends [any.literal]
  ? [number] extends [xs] ? constraint
  : [string] extends [xs] ? constraint
  : [boolean] extends [xs] ? constraint
  : never.as.nothing
  : never.close.unmatched_expr
  ;

type union<xs, constraint = unknown>
  = [xs] extends [constraint]
  ? Union.is<xs> extends true ? constraint
  : never.as.nothing
  : never.close.unmatched_expr
  ;

type nonunion<xs, constraint = unknown>
  = [xs] extends [constraint]
  ? Union.is<xs> extends true ? never.as.nothing
  : constraint
  : never.close.unmatched_expr
  ;

declare namespace Catch {
  export {
    literal,
    nonliteral,
    nonliteral as nonLiteral,

    tuple,
    nontuple,
    nontuple as nonTuple,

    union,
    nonunion,
    nonunion as nonUnion,
  }
}
