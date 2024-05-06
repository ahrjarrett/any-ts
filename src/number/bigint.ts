export type {
  bigint,
}

import type { any } from "../any/exports"
import { never } from "../never/exports"

declare namespace bigint {
  type is<x> = [x] extends [bigint] ? true : false
  namespace is {
    type literal<x> = [x] extends [bigint] ? [bigint] extends [x] ? false : true : false
    type universal<x> = [bigint] extends [x] ? true : false
  }

  type parse<type>
    = [type] extends [bigint] ? type
    : [type] extends [any.key]
    ? [`${type}`] extends [`${infer x extends number}n`] ? bigint.parse<x>
    : [`${type}`] extends [`${infer x extends bigint}`] ? x
    : never.close.unmatched_expr
    : never.close.unmatched_expr
    ;

  namespace parse {
    type literal<type> = [bigint] extends [type] ? never.as_nothing : bigint.parse<type>
    type universal<type> = [bigint] extends [type] ? type : [`${bigint}`] extends [type] ? bigint : never.as_nothing
  }
}
