import type { any } from "../any/exports.js"
import type { check } from "../check/exports.js"
import type { mut } from "../mutable/exports.js"
import type { never } from "../never/exports.js"

export declare namespace queue {
  export {
    dequeue,
    dequeued,
    enqueue,
    enqueued,
  }
}

declare namespace internal {
  type dequeue<xs>
    = [xs] extends [[]] ? dequeued<[], undefined, "mutable">
    : [xs] extends [[...infer lead extends mut.array, infer last]] ? dequeued<lead, last, "mutable">
    : [xs] extends [readonly [...infer lead extends any.array, infer last]] ? dequeued<lead, last>
    : dequeued

  type enqueue<xs, x> = never | (
    [xs] extends [mut.array] ? enqueued<xs, x, "mutable">
    : [xs] extends [any.array] ? enqueued<xs, x, "mutable">
    : enqueued
  )
}

type dequeued<lead extends any.array = [], last = undefined, asMutable = never>
  = never | ([asMutable] extends [never] ? readonly [LEAD: Readonly<lead>, LAST: last] : [LEAD: lead, LAST: last])

type enqueued<lead extends any.array = any.array, last extends any.type = any.type, asMutable = never>
  = never | ([asMutable] extends [never] ? readonly [LEAD: Readonly<lead>, LAST: last] : [LEAD: lead, LAST: last])

type dequeue<xs extends check.isTuple<xs>, distribute = never>
  = [distribute] extends [never] ? internal.dequeue<xs>
  : xs extends xs ? internal.dequeue<xs>
  : never.close.distributive
  ;

type enqueue<sequence extends check.isTuple<sequence>, element = any.type, distribute = never>
  = [distribute] extends [never] ? internal.enqueue<sequence, element>
  : sequence extends sequence ? internal.enqueue<sequence, element>
  : never.close.distributive
  ;
